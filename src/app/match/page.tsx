"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MatcherPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Voice Search Logic
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    // Force stop any existing instances
    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        console.log("Voice recognition started...");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        recognition.stop();
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);

        if (event.error === 'network') {
          alert("Network Error: Your browser can't reach the speech service. Check your internet or try a non-incognito window.");
        } else if (event.error === 'aborted') {
          console.log("Recognition aborted by user or system.");
        } else if (event.error === 'not-allowed') {
          alert("Microphone permission denied.");
        }
      };

      recognition.onend = () => setIsListening(false);

      // Small delay to prevent 'aborted' errors on quick clicks
      setTimeout(() => {
        recognition.start();
      }, 100);

    } catch (err) {
      console.error("Failed to initialize recognition:", err);
    }
  };

  const runPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://216.128.158.238:8000";
      const res = await fetch(`${apiUrl}/api/agents/langgraph-pipeline`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, limit: 3 }),
      });

      const data = await res.json();

      if (res.ok) {
        setResults(data);
      } else {
        setError(data.detail || "An unexpected error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the AI backend.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (notice_id: string, content: string) => {
    if (!content) return;
    const doc = new jsPDF();
    let y = 25;
    const margin = 20;
    const pageWidth = 170;

    // Document Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(15, 63, 25); // #0F3F19
    doc.text("TenderMind Bid Response", margin, y);
    y += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(33, 141, 24); // Darker Green
    doc.text(`Notice ID: ${notice_id}`, margin, y);
    y += 20;

    const lines = content.split('\n');
    
    lines.forEach(line => {
      if (y > 275) {
        doc.addPage();
        y = 20;
      }

      // 1. Heading Detection
      const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (hMatch) {
        const level = hMatch[1].length;
        const text = hMatch[2];
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20 - (level * 1.5));
        doc.setTextColor(15, 63, 25);
        const splitH = doc.splitTextToSize(text, pageWidth);
        doc.text(splitH, margin, y);
        y += (splitH.length * 10) + 2;
        return;
      }

      // 2. Blockquote Detection
      if (line.trim().startsWith('>')) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        const text = line.trim().substring(1).trim();
        const splitQuote = doc.splitTextToSize(text, pageWidth - 10);
        doc.setDrawColor(124, 237, 112); // #7CED70
        doc.setLineWidth(1);
        doc.line(margin, y - 4, margin, y + (splitQuote.length * 5) - 4);
        doc.text(splitQuote, margin + 5, y);
        y += (splitQuote.length * 5) + 5;
        return;
      }

      // 3. Normal Text & Bold Support
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      
      // Remove table markers for clean text in PDF if they appear
      const cleanLine = line.replace(/\|/g, ' ').trim();
      if (cleanLine === '' && line.trim() === '') {
        y += 5;
        return;
      }

      // Simple Bold Detection for the whole line if it's a key value pair or title
      if (line.startsWith('**') && line.endsWith('**')) {
        doc.setFont("helvetica", "bold");
        const text = line.replace(/\*\*/g, '');
        const splitText = doc.splitTextToSize(text, pageWidth);
        doc.text(splitText, margin, y);
        y += (splitText.length * 6);
      } else {
        doc.setFont("helvetica", "normal");
        // Inline bold replacement with spaces to keep it simple for PDF
        const text = line.replace(/\*\*/g, ''); 
        const splitText = doc.splitTextToSize(text, pageWidth);
        doc.text(splitText, margin, y);
        y += (splitText.length * 6);
      }
    });

    doc.save(`Bid_Draft_${notice_id}.pdf`);
  };

  const renderMarkdown = (content: string) => {
    if (!content) return null;
    
    const elements: React.ReactNode[] = [];
    const lines = content.split('\n');
    let i = 0;

    while (i < lines.length) {
      let line = lines[i];

      // 1. Tables
      if (line.trim().startsWith('|')) {
        const tableRows: string[][] = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          const row = lines[i].trim();
          // Skip the separator line |---|---|
          if (!row.includes('---')) {
            const cells = row.split('|').map(c => c.trim()).filter((c, idx, arr) => {
              if (idx === 0 || idx === arr.length - 1) return c !== '';
              return true;
            });
            if (cells.length > 0) tableRows.push(cells);
          }
          i++;
        }
        
        if (tableRows.length > 0) {
          elements.push(
            <div key={`table-${i}`} className="overflow-x-auto my-8 rounded-2xl border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={isDarkMode ? 'bg-[#7CED70]/10' : 'bg-gray-50'}>
                  <tr>
                    {tableRows[0].map((cell, idx) => (
                      <th key={idx} className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#7CED70]' : 'text-[#0F3F19]'}`}>
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y divide-gray-200 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}>
                  {tableRows.slice(1).map((row, rIdx) => (
                    <tr key={rIdx} className={isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-6 py-4 text-sm text-gray-400">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        continue;
      }

      // 2. Blockquotes
      if (line.trim().startsWith('>')) {
        elements.push(
          <blockquote key={i} className={`pl-6 border-l-4 italic my-6 py-2 ${isDarkMode ? 'border-[#7CED70] text-gray-400 bg-[#7CED70]/5' : 'border-[#0F3F19] text-gray-500 bg-gray-50'}`}>
            {line.trim().substring(1).trim()}
          </blockquote>
        );
        i++;
        continue;
      }

      // 3. Headings (H1 to H6)
      const headingMatch = line.trim().match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2];
        const sizes = [
          '',
          'text-4xl font-extrabold mb-6 mt-10 pb-2 border-b-2',
          'text-2xl font-bold mb-4 mt-8 flex items-center gap-3',
          'text-xl font-bold mb-3 mt-6',
          'text-lg font-bold mb-2 mt-5',
          'text-base font-bold mb-2 mt-4',
          'text-sm font-bold mb-1 mt-3'
        ];
        const Tag = `h${level}` as any;
        elements.push(
          <Tag key={i} className={`${sizes[level]} ${isDarkMode ? 'text-[#7CED70] border-[#7CED70]/20' : 'text-[#0F3F19] border-gray-100'}`}>
            {level === 2 && <span className="w-2 h-8 bg-[#7CED70] rounded-full"></span>}
            {text}
          </Tag>
        );
        i++;
        continue;
      }

      // 4. Bold Text
      const boldRegex = /\*\*(.*?)\*\*/g;
      if (line.includes('**')) {
        const parts = line.split(boldRegex);
        const processedLine = parts.map((part, index) => {
          if (index % 2 === 1) return <strong key={index} className={`font-bold px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-[#7CED70]/10 text-[#7CED70]' : 'bg-[#7CED70]/20 text-[#0F3F19]'}`}>{part}</strong>;
          return part;
        });
        elements.push(<p key={i} className="mb-4 leading-relaxed">{processedLine}</p>);
        i++;
        continue;
      }

      // 5. Bullets
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        elements.push(
          <div key={i} className="mb-3 ml-6 flex gap-3 items-start">
            <span className={`mt-2 w-2 h-2 rounded-full shrink-0 ${isDarkMode ? 'bg-[#7CED70]' : 'bg-[#0F3F19]'}`}></span>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{line.trim().substring(1).trim()}</span>
          </div>
        );
        i++;
        continue;
      }

      // 6. Normal Paragraph
      if (line.trim() !== '') {
        elements.push(<p key={i} className="mb-4 leading-relaxed">{line}</p>);
      } else {
        elements.push(<div key={i} className="h-4"></div>);
      }
      i++;
    }
    return elements;
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#0a110a] text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />

      <main className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex justify-between items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${isDarkMode ? 'bg-[#7CED70]/20 text-[#7CED70] border border-[#7CED70]/30' : 'bg-[#7CED70]/10 border border-[#7CED70]/20 text-[#0F3F19]'}`}>
              🛡️ Powered by Sovereign AI
            </div>
            <h1 className={`text-5xl font-bold mb-6 ${isDarkMode ? 'text-[#7CED70]' : 'text-[#0F3F19]'}`}>AI Agentic Matcher</h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg max-w-2xl`}>
              Search, score, and draft bids using secure European AI models.
            </p>
          </motion.div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-2xl border transition-all ${isDarkMode ? 'bg-[#0F3F19] border-[#7CED70]/30 text-[#7CED70]' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
          >
            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <form onSubmit={runPipeline} className="max-w-3xl mx-auto mb-20">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`flex flex-col gap-6 p-10 rounded-[40px] border transition-all shadow-sm relative overflow-hidden ${isDarkMode ? 'bg-[#152515] border-[#7CED70]/20' : 'bg-gray-50 border-gray-100'}`}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#7CED70]"></div>
            <label className={`text-sm font-bold uppercase tracking-widest text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>Procurement Intent</label>

            <div className="relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Cloud software projects in Germany..."
                className={`w-full px-8 py-5 pr-16 rounded-2xl border outline-none transition-all shadow-sm text-lg text-center ${isDarkMode ? 'bg-[#0a110a] border-gray-700 focus:ring-[#7CED70] text-white' : 'bg-white border-gray-200 focus:ring-[#7CED70] text-gray-900'}`}
              />
              <button
                type="button"
                onClick={startListening}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 animate-pulse text-white' : 'bg-[#7CED70]/10 text-[#7CED70] hover:bg-[#7CED70]/20'}`}
              >
                🎙️
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#7CED70] hover:bg-[#68db5c] text-gray-900 font-bold px-10 py-5 rounded-full transition-all shadow-md disabled:opacity-50"
            >
              {loading ? "Orchestrating Agents..." : "Run AI Pipeline"}
            </button>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-center font-medium"
              >
                {error}
              </motion.div>
            )}
          </motion.div>
        </form>

        {loading && (
          <div className="text-center py-20">
            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="w-4 h-4 bg-[#7CED70] rounded-full"
                ></motion.div>
              ))}
            </div>
            <p className="text-gray-400 font-medium italic">Running Tender Monitor & Match Scorer Agents...</p>
          </div>
        )}

        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12 pb-20"
            >
              <h2 className={`text-3xl font-bold text-center mb-10 ${isDarkMode ? 'text-[#7CED70]' : 'text-[#0F3F19]'}`}>AI Pipeline Results</h2>

              {/* Top Matches */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {results.top_matches.map((match: any, i: number) => (
                  <motion.div
                    key={match.notice_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-8 rounded-3xl border shadow-sm flex flex-col justify-between transition-colors ${isDarkMode ? 'bg-[#152515] border-[#7CED70]/10' : 'bg-white border-gray-100'}`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className={`font-bold text-xl ${isDarkMode ? 'text-[#7CED70]' : 'text-[#218d18]'}`}>{match.score}% Match</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{match.notice_id}</span>
                      </div>
                      <h3 className={`font-bold leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{match.title}</h3>

                      {/* Match Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {match.tags && match.tags.map((tag: string, j: number) => (
                          <span key={j} className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-tighter ${isDarkMode ? 'bg-[#7CED70]/10 text-[#7CED70]' : 'bg-[#218d18]/10 text-[#218d18]'}`}>
                            ✓ {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {renderMarkdown(match.reasoning)}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Eligibility Section */}
              {results.eligibility_reports.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-12 rounded-[40px] text-white transition-colors ${isDarkMode ? 'bg-[#0F3F19]' : 'bg-[#0F3F19]'}`}
                >
                  <h3 className="text-2xl font-bold mb-8">Eligibility Verification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {results.eligibility_reports.map((report: any) => (
                      <div key={report.notice_id} className="bg-white/10 p-6 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-sm tracking-widest uppercase opacity-60">ID: {report.notice_id}</span>
                          <span className={`px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest ${report.verdict === 'eligible' ? 'bg-[#7CED70] text-[#0F3F19]' : 'bg-orange-400 text-white'}`}>
                            {report.verdict}
                          </span>
                        </div>
                        <div className="text-sm leading-relaxed opacity-80">
                          {renderMarkdown(report.reasoning)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Bid Drafts */}
              {results.bid_drafts.length > 0 && (
                <div className={`p-12 rounded-[40px] border shadow-inner transition-colors ${isDarkMode ? 'bg-[#0a110a] border-[#7CED70]/10' : 'bg-[#F6F8F6] border-gray-100'}`}>
                  <h3 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-[#7CED70]' : 'text-[#0F3F19]'}`}>Secure AI Bid Drafts</h3>
                  <div className="space-y-8">
                    {results.bid_drafts.map((draft: any) => (
                      <motion.div
                        key={draft.notice_id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-10 rounded-3xl border shadow-sm transition-colors ${isDarkMode ? 'bg-[#152515] border-[#7CED70]/10' : 'bg-white border-gray-100'}`}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <h4 className={`font-bold text-xl flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <span className="w-8 h-8 bg-[#7CED70] rounded-full flex items-center justify-center text-sm text-[#0F3F19]">📄</span>
                            Draft for {draft.notice_id}
                          </h4>
                          <div className="flex gap-4">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(draft.markdown_content);
                                alert("Bid draft copied to clipboard!");
                              }}
                              className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${isDarkMode ? 'border-[#7CED70]/30 text-[#7CED70] hover:bg-[#7CED70]/10' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                            >
                              Copy Text 📋
                            </button>
                            <button
                              onClick={() => downloadPDF(draft.notice_id, draft.markdown_content)}
                              className="bg-[#7CED70] text-[#0F3F19] text-xs font-bold px-4 py-2 rounded-full hover:bg-[#68db5c] transition-colors"
                            >
                              Download PDF ↓
                            </button>
                          </div>
                        </div>
                        <div className={`prose prose-green max-w-none p-12 rounded-[32px] border transition-colors shadow-inner ${isDarkMode ? 'bg-[#0a110a] text-gray-300 border-gray-800' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                          {renderMarkdown(draft.markdown_content)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
