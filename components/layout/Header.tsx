"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <header className="sticky top-0 z-40 w-full border-b border-glass-border bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined fill-1">shield_with_heart</span>
                    </div>
                    <h2 className="text-xl font-black tracking-tight">MySupport<span className="text-primary font-medium italic">Info</span></h2>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <Link className={`text-sm font-semibold transition-colors ${isActive('/') ? 'text-white/90' : 'text-white/50'} hover:text-primary`} href="/">Dashboard</Link>
                    <Link className={`text-sm font-semibold transition-colors ${isActive('/bufferbloat') ? 'text-white/90' : 'text-white/50'} hover:text-primary`} href="/bufferbloat">Bufferbloat</Link>
                    <Link className={`text-sm font-semibold transition-colors ${isActive('/faq') ? 'text-white/90' : 'text-white/50'} hover:text-primary`} href="/faq">FAQ</Link>
                    <Link className={`text-sm font-semibold transition-colors ${isActive('/privacy') ? 'text-white/90' : 'text-white/50'} hover:text-primary`} href="/privacy">Privacy</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Privacy First</span>
                        <span className="text-[10px] text-white/60">Client-Side Only</span>
                    </div>
                    <div className="size-9 rounded-full bg-gradient-to-tr from-primary to-blue-400 border border-white/20 p-[2px]">
                        <div className="w-full h-full rounded-full bg-background-dark flex items-center justify-center overflow-hidden">
                            <span className="material-symbols-outlined text-primary text-xl">person</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
