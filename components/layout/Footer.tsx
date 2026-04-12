"use client";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t border-glass-border py-12 px-6 bg-background-dark">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">shield_person</span>
                        <span className="font-bold tracking-tight text-lg">MySupportInfo.com</span>
                    </div>
                    <p className="text-white/40 text-sm">Your technical footprint, visualized privately.</p>
                </div>
                <div className="flex gap-10">
                    <Link className="text-xs font-semibold text-white/40 hover:text-primary transition-colors uppercase tracking-widest" href="/privacy">Privacy</Link>
                    <Link className="text-xs font-semibold text-white/40 hover:text-primary transition-colors uppercase tracking-widest" href="/terms">Terms</Link>
                    <Link className="text-xs font-semibold text-white/40 hover:text-primary transition-colors uppercase tracking-widest" href="/faq">FAQ</Link>
                    <Link className="text-xs font-semibold text-white/40 hover:text-primary transition-colors uppercase tracking-widest" href="/security">Security</Link>
                </div>
                <div className="text-xs font-bold text-white/30 uppercase tracking-widest">
                    © 2026 MySupportInfo.com
                </div>
            </div>
        </footer>
    );
}
