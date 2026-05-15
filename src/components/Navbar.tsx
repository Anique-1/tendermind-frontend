import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full max-w-5xl mx-auto pt-6 px-4 sm:px-6 relative z-50">
      <nav className="flex items-center justify-between px-6 py-3 bg-[#F6F8F6] rounded-full shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="TenderMind Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-gray-900">
            TenderMind
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link href="/tenders" className="hover:text-gray-900 transition-colors">
            Tenders
          </Link>
          <Link href="/match" className="hover:text-gray-900 transition-colors">
            AI Matcher
          </Link>
          <Link href="/profile" className="hover:text-gray-900 transition-colors">
            Profile
          </Link>
        </div>

        <Link href="/match" className="bg-[#7CED70] hover:bg-[#68db5c] text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full transition-colors">
          Get Started
        </Link>
      </nav>
    </div>
  );
}
