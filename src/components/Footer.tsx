export default function Footer() {
  return (
    <footer className="w-full bg-[#1c1c1c] pt-24 pb-12 px-6 relative z-10 overflow-hidden text-gray-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-32 relative z-10">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="TenderMind Logo" className="w-10 h-10 object-contain" />
            <span className="text-3xl font-bold tracking-tight text-white">TenderMind</span>
          </div>
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            Find tenders smarter, faster. Built for modern businesses that demand speed, intelligence, and scale.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-colors text-xl">𝕏</div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-colors font-bold">in</div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-colors text-xl">☺</div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white mb-2">Product</h4>
            <a href="#" className="hover:text-[#7CED70] transition-colors">Features</a>
            <a href="#" className="hover:text-[#7CED70] transition-colors">Pricing</a>
            <a href="#" className="hover:text-[#7CED70] transition-colors">Security</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white mb-2">Company</h4>
            <a href="#" className="hover:text-[#7CED70] transition-colors">About</a>
            <a href="#" className="hover:text-[#7CED70] transition-colors">Blog</a>
            <a href="#" className="hover:text-[#7CED70] transition-colors">Contact</a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 overflow-hidden flex justify-center pointer-events-none px-4">
        <span className="text-[12vw] font-bold tracking-tighter text-white/[0.03] whitespace-nowrap select-none leading-none">
          TenderMind
        </span>
      </div>
      
      <div className="max-w-6xl mx-auto border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center relative z-10 gap-4">
        <p className="text-gray-500 text-sm">© 2026 TenderMind, Inc. All rights reserved</p>
        <p className="text-gray-500 text-sm">Powered By Advanced Agentic Coding</p>
      </div>
    </footer>
  );
}
