"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const isActive = (path: string) => pathname === path;

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-[#00473E]/10 bg-[#FAF6F0]/90 backdrop-blur-md">
            <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                {/* Brand Logo */}
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-[#00473E] border border-[#00473E] rounded-lg flex items-center justify-center text-[#FFC4B7] shadow-block-sm">
                        <span className="material-symbols-outlined fill-1 text-sm">shield_with_heart</span>
                    </div>
                    <Link href="/" className="text-xl font-black tracking-tight text-[#00473E]" onClick={closeMenu}>
                        MySupport<span className="text-[#FF8E60] font-black italic font-serif ml-0.5">Info</span>
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link className={`text-sm font-extrabold transition-colors ${isActive('/bufferbloat') ? 'text-[#00473E]' : 'text-[#00473E]/60'} hover:text-[#FF8E60]`} href="/bufferbloat">Bufferbloat</Link>
                    <Link className={`text-sm font-extrabold transition-colors ${isActive('/faq') ? 'text-[#00473E]' : 'text-[#00473E]/60'} hover:text-[#FF8E60]`} href="/faq">FAQ</Link>
                    <Link className={`text-sm font-extrabold transition-colors ${isActive('/privacy') ? 'text-[#00473E]' : 'text-[#00473E]/60'} hover:text-[#FF8E60]`} href="/privacy">Privacy</Link>
                </nav>

                {/* Mobile Hamburger Toggle Button */}
                <button
                    onClick={toggleMenu}
                    className="flex md:hidden p-2 text-[#00473E] hover:text-[#FF8E60] transition-colors focus:outline-none"
                    aria-label="Toggle navigation menu"
                >
                    <span className="material-symbols-outlined text-2xl font-bold">
                        {isOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile Dropdown Panel */}
            {isOpen && (
                <div className="md:hidden border-t-2 border-[#00473E] bg-[#FAF6F0] shadow-block transition-all duration-300">
                    <nav className="flex flex-col p-6 space-y-4">
                        <Link
                            onClick={closeMenu}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-bold ${
                                isActive('/bufferbloat')
                                    ? 'bg-[#FF8E60]/10 border-[#00473E] text-[#00473E] shadow-block-sm'
                                    : 'bg-white border-[#00473E]/20 text-[#00473E]/70 hover:border-[#00473E] hover:text-[#FF8E60]'
                            }`}
                            href="/bufferbloat"
                        >
                            <span className="material-symbols-outlined text-[#009E52]">signal_cellular_alt</span>
                            <span>Bufferbloat Test</span>
                        </Link>
                        <Link
                            onClick={closeMenu}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-bold ${
                                isActive('/faq')
                                    ? 'bg-[#FF8E60]/10 border-[#00473E] text-[#00473E] shadow-block-sm'
                                    : 'bg-white border-[#00473E]/20 text-[#00473E]/70 hover:border-[#00473E] hover:text-[#FF8E60]'
                            }`}
                            href="/faq"
                        >
                            <span className="material-symbols-outlined text-[#FF8E60]">help</span>
                            <span>Frequently Asked Questions</span>
                        </Link>
                        <Link
                            onClick={closeMenu}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-bold ${
                                isActive('/privacy')
                                    ? 'bg-[#FF8E60]/10 border-[#00473E] text-[#00473E] shadow-block-sm'
                                    : 'bg-white border-[#00473E]/20 text-[#00473E]/70 hover:border-[#00473E] hover:text-[#FF8E60]'
                            }`}
                            href="/privacy"
                        >
                            <span className="material-symbols-outlined text-[#00473E]">shield_person</span>
                            <span>Privacy & Compliance</span>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
