"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto pt-6 px-4 sm:px-6 relative z-50">
      <nav className="flex items-center justify-between px-6 py-3 bg-[#F6F8F6] rounded-full shadow-sm relative">
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

        {/* Desktop Menu */}
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

        <div className="hidden md:block">
          <Link href="/match" className="bg-[#7CED70] hover:bg-[#68db5c] text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full transition-colors">
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-gray-900 p-2 focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-3 bg-[#F6F8F6] rounded-2xl shadow-xl border border-gray-200/60 p-5 z-50 flex flex-col transition-all duration-200">
          <div className="flex flex-col gap-3 text-base font-medium text-gray-700">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 hover:bg-gray-200/50 rounded-xl transition-colors active:bg-gray-300/50"
            >
              Home
            </Link>
            <Link
              href="/tenders"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 hover:bg-gray-200/50 rounded-xl transition-colors active:bg-gray-300/50"
            >
              Tenders
            </Link>
            <Link
              href="/match"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 hover:bg-gray-200/50 rounded-xl transition-colors active:bg-gray-300/50"
            >
              AI Matcher
            </Link>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 hover:bg-gray-200/50 rounded-xl transition-colors active:bg-gray-300/50"
            >
              Profile
            </Link>
            <div className="pt-3 mt-1 border-t border-gray-200 flex justify-center">
              <Link
                href="/match"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-[#7CED70] hover:bg-[#68db5c] text-gray-900 text-sm font-semibold px-6 py-3 rounded-full transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
