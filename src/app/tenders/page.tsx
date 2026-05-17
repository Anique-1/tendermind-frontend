"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function TendersPage() {
  const [query, setQuery] = useState("");
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://anique-1-tendermind-backend.hf.space";
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
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />
      
      <main className="max-w-6xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 w-full flex-grow">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F3F19] mb-4 sm:mb-6 leading-tight tracking-tight">
            Explore Tenders
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto px-2 leading-relaxed">
            Access real-time public procurement data from the European Union TED portal.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-14 sm:mb-20 flex flex-col sm:flex-row gap-3 sm:gap-4 px-2 sm:px-0">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. 'Software', 'Medical supplies'..."
            className="w-full flex-grow px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-full border border-gray-200 focus:ring-2 focus:ring-[#7CED70] outline-none transition-all shadow-sm text-base sm:text-lg bg-gray-50/50 focus:bg-white text-gray-900"
          />
          <button 
            type="submit" 
            className="w-full sm:w-auto shrink-0 bg-[#0F3F19] hover:bg-black text-white font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl sm:rounded-full transition-all shadow-md flex items-center justify-center gap-2 text-base sm:text-lg active:scale-[0.98]"
          >
            <span>Search</span>
            <span className="sm:hidden">🔍</span>
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-[#7CED70] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium text-base">Fetching live tenders from EU TED...</p>
            </div>
          ) : tenders.length > 0 ? (
            tenders.map((tender: any) => (
              <div key={tender.notice_id} className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100 flex flex-col justify-between hover:border-[#7CED70] transition-all hover:shadow-md group">
                <div>
                  <div className="flex justify-between items-start mb-4 gap-2 flex-wrap">
                    <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-gray-200/60 shadow-2xs">
                      ID: {tender.notice_id}
                    </span>
                    <span className="text-[#218d18] font-extrabold text-xs uppercase tracking-widest px-2 py-0.5 bg-[#218d18]/10 rounded-md">
                      {tender.country}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F3F19] mb-4 leading-snug group-hover:text-[#218d18] transition-colors line-clamp-3">
                    {tender.title}
                  </h3>
                </div>
                <div className="pt-6 mt-4 border-t border-gray-200 flex items-center justify-between gap-2 flex-wrap text-sm sm:text-base">
                  <span className="text-gray-400 font-medium text-xs sm:text-sm">TED EU Portal</span>
                  <a 
                    href={tender.ted_url || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0F3F19] font-bold text-xs sm:text-sm hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>View Details</span>
                    <span className="text-base sm:text-lg">→</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 px-4 text-center text-gray-400 font-medium bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 text-sm sm:text-base">
              No tenders displayed. Search for keywords like &quot;Software&quot;, &quot;Construction&quot;, or &quot;Consulting&quot; above.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
