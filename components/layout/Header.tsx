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
        <header className="sticky top-0 z-40 w-full border-b border-background-dark/10 bg-background/90 backdrop-blur-md">
            <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                {/* Brand Logo */}
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-background-dark border border-background-dark rounded-lg flex items-center justify-center text-accent shadow-block-sm">
                        <span className="material-symbols-outlined fill-1 text-sm">shield_with_heart</span>
                    </div>
                    <Link href="/" className="text-xl font-black tracking-tight text-background-dark" onClick={closeMenu}>
                        MySupport<span className="text-primary font-black italic font-serif ml-0.5">Info</span>
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link className={`text-sm font-extrabold transition-colors ${isActive('/bufferbloat') ? 'text-background-dark' : 'text-background-dark/60'} hover:text-primary`} href="/bufferbloat">Bufferbloat</Link>
                    <Link className={`text-sm font-extrabold transition-colors ${isActive('/faq') ? 'text-background-dark' : 'text-background-dark/60'} hover:text-primary`} href="/faq">FAQ</Link>
                    <Link className={`text-sm font-extrabold transition-colors ${isActive('/privacy') ? 'text-background-dark' : 'text-background-dark/60'} hover:text-primary`} href="/privacy">Privacy</Link>
                    <Link className={`text-sm font-extrabold transition-colors ${isActive('/terms') ? 'text-background-dark' : 'text-background-dark/60'} hover:text-primary`} href="/terms">Terms</Link>
                </nav>

                {/* Mobile Hamburger Toggle Button */}
                <button
                    onClick={toggleMenu}
                    className="flex md:hidden p-2 text-background-dark hover:text-primary transition-colors focus:outline-none"
                    aria-label="Toggle navigation menu"
                >
                    <span className="material-symbols-outlined text-2xl font-bold">
                        {isOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile Dropdown Panel */}
            {isOpen && (
                <div className="md:hidden border-t-2 border-background-dark bg-background shadow-block transition-all duration-300">
                    <nav className="flex flex-col p-6 space-y-4">
                        <Link
                            onClick={closeMenu}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-bold ${
                                isActive('/bufferbloat')
                                    ? 'bg-primary/10 border-background-dark text-background-dark shadow-block-sm'
                                    : 'bg-white border-background-dark/20 text-background-dark/70 hover:border-background-dark hover:text-primary'
                            }`}
                            href="/bufferbloat"
                        >
                            <span className="material-symbols-outlined text-secondary">signal_cellular_alt</span>
                            <span>Bufferbloat Test</span>
                        </Link>
                        <Link
                            onClick={closeMenu}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-bold ${
                                isActive('/faq')
                                    ? 'bg-primary/10 border-background-dark text-background-dark shadow-block-sm'
                                    : 'bg-white border-background-dark/20 text-background-dark/70 hover:border-background-dark hover:text-primary'
                            }`}
                            href="/faq"
                        >
                            <span className="material-symbols-outlined text-primary">help</span>
                            <span>Frequently Asked Questions</span>
                        </Link>
                        <Link
                            onClick={closeMenu}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-bold ${
                                isActive('/privacy')
                                    ? 'bg-primary/10 border-background-dark text-background-dark shadow-block-sm'
                                    : 'bg-white border-background-dark/20 text-background-dark/70 hover:border-background-dark hover:text-primary'
                            }`}
                            href="/privacy"
                        >
                            <span className="material-symbols-outlined text-background-dark">shield_person</span>
                            <span>Privacy & Compliance</span>
                        </Link>
                        <Link
                            onClick={closeMenu}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all font-bold ${
                                isActive('/terms')
                                    ? 'bg-primary/10 border-background-dark text-background-dark shadow-block-sm'
                                    : 'bg-white border-background-dark/20 text-background-dark/70 hover:border-background-dark hover:text-primary'
                            }`}
                            href="/terms"
                        >
                            <span className="material-symbols-outlined text-primary">gavel</span>
                            <span>Terms of Use</span>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
