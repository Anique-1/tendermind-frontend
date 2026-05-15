"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-100 bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-100 transition-colors group"
      >
        <span className="font-bold text-gray-900 text-lg">{question}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-gray-400 group-hover:text-[#0F3F19] bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6 text-gray-500 leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 relative z-10 w-full min-h-[600px]">
        {/* Background Image Behind Text */}
        <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden flex items-center justify-center">
          <Image
            src="/hero-section.png"
            alt="Hero Background Collage"
            fill
            className="object-contain object-center md:scale-110 opacity-80"
            priority
          />
        </div>

        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
          <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Next-Gen Procurement Intelligence
          </span>
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight text-[#0F3F19] leading-[1.1] mb-6">
          <span className="text-[#51d343]">Find Tenders</span> Smarter,<br />
          Faster with TenderMind
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl text-lg md:text-xl text-gray-500 mb-10 text-balance mx-auto">
          Monitor TED, score matches, and draft bids with **Sovereign AI**. 
          We use secure European infrastructure to ensure your sensitive procurement data never leaves the continent.
        </p>

        {/* Main CTA */}
        <a href="/match" className="bg-[#7CED70] hover:bg-[#68db5c] text-gray-900 text-lg font-medium px-8 py-4 rounded-full transition-transform hover:scale-105 shadow-sm">
          Get Started Free
        </a>
      </main>

      {/* Trusted By Section */}
      <section className="w-full bg-white py-12 border-t border-gray-50 relative z-10">
        <p className="text-center text-gray-500 font-medium mb-8">
          Trusted by fast-growing companies worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 px-6 max-w-6xl mx-auto opacity-50 grayscale">
          {/* Mock Logos matching the style */}
          <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-gray-400 rounded-sm"></div> Hexsmith</div>
          <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-gray-400 rounded-full"></div> Norse Star</div>
          <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-gray-400 rounded-tl-lg"></div> Railspeed</div>
          <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-transparent border-4 border-gray-400 rounded-full"></div> Ollio</div>
          <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-gray-400 rotate-45"></div> PictelAI</div>
          <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-gray-400 rounded-full"></div> Quixc</div>
        </div>
      </section>

      {/* Built for Precision, Intelligence, and Scale */}
      <section className="w-full bg-[#fcfdfc] py-24 px-6 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F3F19] mb-16 max-w-2xl mx-auto">
            Built for Precision, Intelligence, and Scale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col h-full">
              <div className="h-64 rounded-3xl bg-gradient-to-br from-blue-100 via-green-100 to-[#7CED70] mb-6 flex items-center justify-center p-6 shadow-sm overflow-hidden relative">
                {/* Mockup */}
                <div className="bg-white rounded-xl shadow-md w-full max-w-[200px] p-4 text-sm relative z-10">
                  <div className="flex bg-gray-100 rounded-full p-1 mb-4">
                    <div className="bg-[#0F3F19] text-white rounded-full px-3 py-1 text-xs">TED API</div>
                    <div className="px-3 py-1 text-xs text-gray-500">Live</div>
                  </div>
                  <div className="flex justify-between border-b pb-2 mb-2"><span className="text-gray-400">Sector</span><span className="font-medium text-gray-800">IT & Tech</span></div>
                  <div className="flex justify-between border-b pb-2 mb-2"><span className="text-gray-400">Country</span><span className="font-medium text-gray-800">Germany</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Value</span><span className="font-medium text-gray-800">€500k+</span></div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Real-Time Tender Monitoring</h3>
              <p className="text-gray-500 leading-relaxed">
                Experience near-instant tender updates with optimized infrastructure that ensures you never miss a lucrative public procurement opportunity.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="flex flex-col h-full">
              <div className="h-64 rounded-3xl bg-gray-200 mb-6 relative overflow-hidden flex flex-col items-center justify-end p-6 shadow-sm">
                <Image src="/image-1.png" alt="Eligibility Analysis" fill className="object-cover opacity-80 mix-blend-multiply" />
                <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-[240px] relative z-10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7CED70]/20 flex items-center justify-center text-[#218d18]">✓</div>
                  <span className="font-semibold text-sm">Turnover Eligibility Verified</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Enterprise-Grade Eligibility</h3>
              <p className="text-gray-500 leading-relaxed">
                Your bids are protected from technical disqualifications with advanced Gemini Pro AI analyzing complex legal requirements and compliance rules.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="flex flex-col h-full">
              <div className="h-64 rounded-3xl bg-[#e9eee9] mb-6 flex items-center justify-center p-6 shadow-sm relative overflow-hidden">
                <div className="bg-white rounded-xl shadow-md w-full max-w-[200px] p-4 text-sm border-t-4 border-[#7CED70]">
                  <div className="w-8 h-8 rounded-full bg-[#7CED70] mb-3 flex items-center justify-center font-bold">M</div>
                  <h4 className="font-bold text-gray-900 mb-1">Mistral-7B Scoring</h4>
                  <p className="text-xs text-gray-500 mb-4">Semantic matching agent.</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Match Score</span>
                    <span className="text-[#218d18] font-bold bg-[#7CED70]/20 px-2 rounded">94%</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Draft Bids at Scale</h3>
              <p className="text-gray-500 leading-relaxed">
                Expand globally with multi-language support and seamless AI drafting integrations tailored for growing public sector businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Made for clarity section */}
      <section className="w-full py-24 px-6 relative z-10 overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="w-full md:w-1/2 flex justify-center relative">
            {/* Inline Image instead of background */}
            <Image 
              src="/image-1.png" 
              alt="Clarity Dashboard" 
              width={400} 
              height={400} 
              className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3F19] mb-6 leading-tight">
              Made for clarity and crafted for winning bids
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Easily handle all your public procurements, keep an eye on match performance, and get deep eligibility insights all from one super easy dashboard!
            </p>
            <ul className="space-y-4 mb-8">
              {['Smart tender tracking', 'Clean dashboard UI', 'Visual eligibility reports', 'Voice Query Experience'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#7CED70]/20 flex items-center justify-center text-[#218d18] text-xs">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="/match" className="inline-block bg-[#7CED70] hover:bg-[#68db5c] text-gray-900 text-lg font-semibold px-8 py-3.5 rounded-full transition-colors">
              Get Started Free
            </a>
          </div>
        </div>
      </section>

      {/* Bright Green Growth Engine Section */}
      <section className="w-full bg-[#7CED70] py-24 px-6 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
            <div className="w-full md:w-1/2">
              <div className="inline-block px-4 py-1.5 rounded-full border border-gray-900/10 bg-transparent mb-6 text-xs font-bold tracking-widest text-[#0F3F19] uppercase">
                Why TenderMind
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-[#0F3F19] mb-8 leading-tight">
                More Than Search<br />It's Your Bid Engine
              </h2>
              <p className="text-[#0F3F19]/80 text-lg max-w-md">
                TenderMind is a powerful AI platform that streamlines procurement operations and drives government revenue growth for your business.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              {/* Inline Image instead of background */}
              <Image 
                src="/credit-card.png" 
                alt="Growth Engine Features" 
                width={800} 
                height={800} 
                className="w-full max-w-[800px] h-auto object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500 scale-125 md:scale-110 origin-right" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Automate repetitive bid operations and workflows", icon: "🤖" },
              { title: "Lower reading time with optimized AI routing", icon: "⚡" },
              { title: "Expand your business without language limitations", icon: "🌍" },
              { title: "Streamline operations with one unified platform", icon: "⚙️" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">{item.icon}</div>
                <p className="text-[#0F3F19] font-bold text-lg leading-snug">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Grade Protection */}
      <section className="w-full bg-white py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/3">
            <div className="inline-block px-3 py-1 rounded border border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Red Flags</div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F3F19] mb-6 leading-tight">Enterprise-Grade Intelligence for Every Bid</h2>
            <p className="text-gray-500 text-lg mb-8">Your data and bids are protected with industry-leading AI models and strict parsing standards.</p>
            <button className="bg-[#0F3F19] hover:bg-black text-white text-lg font-medium px-8 py-3.5 rounded-full transition-colors">
              Get Started
            </button>
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-56 justify-between transition-transform hover:-translate-y-1">
              <div>
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm mb-4 flex items-center justify-center">🔍</div>
                <div className="font-bold text-gray-900 text-xl mb-2">End-to-End Analytics</div>
              </div>
              <div className="text-sm text-gray-500">Every match is calculated from origin text to final bid markdown.</div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-56 justify-between transition-transform hover:-translate-y-1">
              <div>
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm mb-4 flex items-center justify-center">🛡️</div>
                <div className="font-bold text-gray-900 text-xl mb-2">Fraud & Bias Detection</div>
              </div>
              <div className="text-sm text-gray-500">Advanced AI intercepts biased clauses before they impact your effort.</div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-56 justify-between sm:col-span-2 transition-transform hover:-translate-y-1">
               <div>
                <div className="flex gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full border-4 border-[#7CED70] flex items-center justify-center"></div>
                  <div className="w-10 h-10 rounded-full border-4 border-[#0F3F19] flex items-center justify-center"></div>
                </div>
                <div className="font-bold text-gray-900 text-xl mb-2">Ready for Compliance</div>
              </div>
              <div className="text-sm text-gray-500">SOC2 compliance, rigorous eligibility checks, available right out of the box.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sovereignty & Security Section */}
      <section className="w-full bg-[#0F3F19] py-24 px-6 relative z-10 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="w-full md:w-1/2">
            <div className="inline-block px-3 py-1 rounded border border-[#7CED70] text-[#7CED70] text-xs font-bold uppercase tracking-widest mb-6">
              Security First
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Your Data, Your Sovereignty</h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              TenderMind is built on the principle of **Digital Sovereignty**. Unlike traditional AI tools that route your sensitive procurement intent through foreign servers, we prioritize European infrastructure.
            </p>
            <div className="space-y-6">
              {[
                { title: "Local Processing", desc: "AI models hosted on secure European cloud nodes." },
                { title: "No Data Training", desc: "Your proprietary bid strategies are never used to train global models." },
                { title: "GDPR+ Compliance", desc: "Exceeding EU data protection standards for public sector security." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#7CED70]/20 flex items-center justify-center text-[#7CED70] shrink-0">✓</div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 bg-[#7CED70]/10 rounded-full flex items-center justify-center border border-[#7CED70]/20">
               <div className="absolute inset-0 animate-pulse bg-[#7CED70]/5 rounded-full"></div>
               <div className="text-8xl">🛡️</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#0F3F19] mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-gray-500 text-lg mb-12">Everything you need to know about TenderMind.</p>
          
          <div className="space-y-4">
            {[
              { 
                q: 'What is TenderMind and how does it work?', 
                a: 'TenderMind is an AI-driven procurement platform that uses a 5-Agent pipeline to monitor the EU TED portal, score tender matches against your company profile, and automatically draft professional bid responses.' 
              },
              { 
                q: 'How quickly can I get started?', 
                a: 'You can get started in seconds. Simply set up your company profile, enter your procurement interests, and our AI agents will begin monitoring live tenders immediately.' 
              },
              { 
                q: 'Which countries does TenderMind support?', 
                a: 'We support all 27 European Union member states and pull data directly from the official TED (Tenders Electronic Daily) portal, covering billions of euros in public contracts.' 
              },
              { 
                q: 'Is TenderMind secure?', 
                a: 'Absolutely. We prioritize Digital Sovereignty, processing your data through secure European infrastructure. Your sensitive procurement strategies are never used to train public AI models.' 
              },
              { 
                q: 'What is a "Sovereign AI" engine?', 
                a: 'It means we use AI models and infrastructure that comply with strict European data residency and security standards, ensuring your data stays protected and sovereign.' 
              }
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full bg-white px-4 md:px-6 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto bg-[#F6F8F6] rounded-[40px] p-10 md:p-24 text-center relative overflow-hidden border border-gray-100 shadow-sm">
          <h2 className="text-4xl md:text-6xl font-bold text-[#0F3F19] mb-8 leading-tight">Ready to Simplify<br/>Your Bidding?</h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <a href="/match" className="bg-[#7CED70] hover:bg-[#68db5c] text-gray-900 text-lg font-bold px-10 py-4 rounded-full transition-colors shadow-sm">
              Get Started Free
            </a>
            <button className="bg-white hover:bg-gray-50 text-gray-900 text-lg font-bold px-10 py-4 rounded-full border border-gray-200 transition-colors shadow-sm">
              Book a demo
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-[32px] p-8 shadow-sm">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-4xl md:text-5xl font-black text-[#0F3F19] mb-2">€50B<span className="text-[#7CED70]">+</span></div>
              <div className="text-xs font-bold text-gray-400 tracking-widest">TENDERS MONITORED</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-4xl md:text-5xl font-black text-[#0F3F19] mb-2">27<span className="text-[#7CED70]">+</span></div>
              <div className="text-xs font-bold text-gray-400 tracking-widest">EU COUNTRIES</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-4xl md:text-5xl font-black text-[#0F3F19] mb-2">99<span className="text-[#7CED70]">%</span></div>
              <div className="text-xs font-bold text-gray-400 tracking-widest">MATCH ACCURACY</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-4xl md:text-5xl font-black text-[#0F3F19] mb-2">10k<span className="text-[#7CED70]">+</span></div>
              <div className="text-xs font-bold text-gray-400 tracking-widest">BIDS DRAFTED</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
