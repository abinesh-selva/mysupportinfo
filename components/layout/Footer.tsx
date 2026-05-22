"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
    const [clientInfo, setClientInfo] = useState({ os: "Detecting...", browser: "Detecting..." });

    useEffect(() => {
        const ua = navigator.userAgent;
        let browser = "Unknown Browser";
        let os = "Unknown OS";

        if (ua.indexOf("Edg/") > -1 || ua.indexOf("Edge/") > -1) {
            browser = "Edge";
        } else if (ua.indexOf("OPR/") > -1 || ua.indexOf("Opera") > -1) {
            browser = "Opera";
        } else if (ua.indexOf("Chrome") > -1) {
            browser = "Chrome";
        } else if (ua.indexOf("Firefox") > -1) {
            browser = "Firefox";
        } else if (ua.indexOf("Safari") > -1) {
            browser = "Safari";
        }

        if (/Android/i.test(ua)) os = "Android";
        else if (/iPad/i.test(ua)) os = "iPadOS";
        else if (/iPhone|iPod/i.test(ua)) os = "iOS";
        else if (/Win/i.test(ua)) os = "Windows";
        else if (/CrOS/i.test(ua)) os = "ChromeOS";
        else if (/Mac/i.test(ua)) os = navigator.maxTouchPoints > 1 ? "iPadOS" : "macOS";
        else if (/Linux/i.test(ua)) os = navigator.maxTouchPoints > 0 ? "Android/Linux Tablet" : "Linux";

        setClientInfo({ os, browser });
    }, []);

    return (
        <footer className="w-full border-t-2 border-background-dark py-16 px-6 bg-background-dark text-white">
            <div className="max-w-site mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* Column 1: Brand & Compliance */}
                <div className="flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-primary text-2xl">shield_person</span>
                            <span className="font-bold tracking-tight text-xl text-background">MySupportInfo.vercel.app</span>
                        </div>
                        <p className="text-accent/80 text-sm leading-relaxed max-w-xs">
                            Secure, privacy-first system metrics and load-latency network diagnostics.
                        </p>
                    </div>
                    {/* Security Badge */}
                    <div className="inline-flex items-center gap-2 bg-background/5 border border-accent/15 rounded-xl px-4 py-2.5 w-fit">
                        <span className="text-3xs text-accent uppercase font-bold tracking-wider">
                            Your technical footprint, visualised privately.
                        </span>
                    </div>
                </div>

                {/* Column 2: Navigation Links */}
                <div className="flex flex-col gap-6">
                    <span className="text-xs font-black uppercase text-primary tracking-widest">Diagnostics</span>
                    <nav className="flex flex-col gap-3.5">
                        <Link className="text-sm font-semibold text-accent/70 hover:text-primary transition-colors" href="/bufferbloat">
                            Bufferbloat Latency Test
                        </Link>
                        <Link className="text-sm font-semibold text-accent/70 hover:text-primary transition-colors" href="/faq">
                            Knowledge Base (FAQ)
                        </Link>
                        <Link className="text-sm font-semibold text-accent/70 hover:text-primary transition-colors" href="/privacy">
                            Privacy Centre
                        </Link>
                        <Link className="text-sm font-semibold text-accent/70 hover:text-primary transition-colors" href="/terms">
                            Terms of Use
                        </Link>
                    </nav>
                </div>

                {/* Column 3: Client Info Box */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-primary tracking-widest">Active Footprint</span>
                        <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                            <span className="text-4xs text-secondary font-bold uppercase tracking-wider">Connected</span>
                        </div>
                    </div>
                    <div className="bg-background/5 border border-accent/10 p-4 rounded-2xl flex flex-col gap-3 font-mono text-xs">
                        <div className="flex justify-between border-b border-accent/10 pb-2">
                            <span className="text-accent/50 uppercase text-4xs tracking-wider font-sans font-bold">Client OS</span>
                            <span className="text-background font-bold">{clientInfo.os}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-accent/50 uppercase text-4xs tracking-wider font-sans font-bold">Browser</span>
                            <span className="text-background font-bold">{clientInfo.browser}</span>
                        </div>
                    </div>
                    <p className="text-3xs text-accent/50 leading-tight">
                        Detection runs inside your browser sandbox. Your data never leaves your device.
                    </p>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="max-w-site mx-auto mt-12 pt-8 border-t border-accent/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-accent/40 uppercase tracking-widest">
                <div>© 2026 MySupportInfo.vercel.app</div>
                <div className="font-medium text-accent/30 normal-case tracking-normal text-right">
                    Made with Care & Privacy in Mind.
                </div>
            </div>
        </footer>
    );
}
