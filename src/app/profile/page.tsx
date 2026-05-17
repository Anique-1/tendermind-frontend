"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    description: "",
    capabilities: "",
    location: "DE",
    preferred_sectors: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://anique-1-tendermind-backend.hf.space";
        const res = await fetch(`${apiUrl}/api/company/profile`);
        if (res.ok) {
          const data = await res.json();
          setProfile({
            ...data,
            capabilities: Array.isArray(data.capabilities) ? data.capabilities.join(", ") : data.capabilities,
            preferred_sectors: Array.isArray(data.preferred_sectors) ? data.preferred_sectors.join(", ") : data.preferred_sectors,
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      ...profile,
      capabilities: profile.capabilities.split(",").map((s) => s.trim()),
      preferred_sectors: profile.preferred_sectors.split(",").map((s) => s.trim()),
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://anique-1-tendermind-backend.hf.space";
      const res = await fetch(`${apiUrl}/api/company/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("Profile saved successfully!");
      } else {
        setMessage("Error saving profile.");
      }
    } catch (err) {
      setMessage("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold text-[#0F3F19] mb-4">Company Profile</h1>
        <p className="text-gray-500 mb-10 text-lg">Define your company capabilities to allow the AI Matcher to find the best tenders for you.</p>

        <form onSubmit={handleSave} className="space-y-8 bg-gray-50 p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Company Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                placeholder="e.g. TechFlow Solutions"
                className="px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#7CED70] outline-none transition-all"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Country Code (2-letter)</label>
              <input 
                type="text" 
                value={profile.location}
                onChange={(e) => setProfile({...profile, location: e.target.value})}
                placeholder="e.g. DE, FR, US"
                className="px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#7CED70] outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Description</label>
            <textarea 
              rows={3}
              value={profile.description}
              onChange={(e) => setProfile({...profile, description: e.target.value})}
              placeholder="Brief overview of your company..."
              className="px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#7CED70] outline-none transition-all resize-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Capabilities (comma separated)</label>
            <textarea 
              rows={4}
              value={profile.capabilities}
              onChange={(e) => setProfile({...profile, capabilities: e.target.value})}
              placeholder="e.g. Cloud Computing, AI Development, Cybersecurity, Managed Services"
              className="px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#7CED70] outline-none transition-all resize-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Preferred Sectors (comma separated)</label>
            <input 
              type="text" 
              value={profile.preferred_sectors}
              onChange={(e) => setProfile({...profile, preferred_sectors: e.target.value})}
              placeholder="e.g. Healthcare, Finance, Defense"
              className="px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#7CED70] outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-6 pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#7CED70] hover:bg-[#68db5c] text-gray-900 font-bold px-10 py-4 rounded-full transition-all shadow-sm disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
            {message && <span className={`font-medium ${message.includes("Error") ? "text-red-500" : "text-green-600"}`}>{message}</span>}
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
