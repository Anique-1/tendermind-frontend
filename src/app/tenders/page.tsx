"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function TendersPage() {
  const [query, setQuery] = useState("");
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://216.128.158.238:8000";
      const res = await fetch(`${apiUrl}/api/tenders/search?query=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setTenders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-6xl mx-auto py-20 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#0F3F19] mb-6">Explore Tenders</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Access real-time public procurement data from the European Union TED portal.</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-20 flex gap-4">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by keywords (e.g. 'Software development', 'Medical supplies')"
            className="flex-grow px-8 py-5 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#7CED70] outline-none transition-all shadow-sm text-lg"
          />
          <button 
            type="submit" 
            className="bg-[#0F3F19] hover:bg-black text-white font-bold px-10 py-5 rounded-full transition-all"
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-[#7CED70] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400 font-medium">Fetching live tenders...</p>
            </div>
          ) : tenders.length > 0 ? (
            tenders.map((tender: any) => (
              <div key={tender.notice_id} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col justify-between hover:border-[#7CED70] transition-colors group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100">
                      ID: {tender.notice_id}
                    </span>
                    <span className="text-[#218d18] font-bold text-xs uppercase tracking-widest">{tender.country}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F3F19] mb-4 leading-tight group-hover:text-[#51d343] transition-colors">{tender.title}</h3>
                </div>
                <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-gray-400 font-medium text-sm">TED EU Portal</span>
                  <a 
                    href={tender.ted_url || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0F3F19] font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    View Details <span className="text-lg">→</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400">
              No tenders found. Try searching for "Software" or "Construction".
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
