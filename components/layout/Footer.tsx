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

        if (ua.indexOf("Win") > -1) os = "Windows";
        else if (ua.indexOf("Mac") > -1) os = "macOS";
        else if (ua.indexOf("Linux") > -1) os = "Linux";
        else if (ua.indexOf("Android") > -1) os = "Android";
        else if (ua.indexOf("iOS") > -1) os = "iOS";

        setClientInfo({ os, browser });
    }, []);

    return (
        <footer className="w-full border-t-2 border-[#00473E] py-16 px-6 bg-[#00473E] text-white">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* Column 1: Brand & Compliance */}
                <div className="flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-[#FF8E60] text-2xl">shield_person</span>
                            <span className="font-bold tracking-tight text-xl text-[#FAF6F0]">MySupportInfo.com</span>
                        </div>
                        <p className="text-[#FFC4B7]/80 text-sm leading-relaxed max-w-xs">
                            Secure, privacy-first system metrics and load-latency network diagnostics.
                        </p>
                    </div>
                    {/* Security Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#FAF6F0]/5 border border-[#FFC4B7]/15 rounded-xl px-4 py-2.5 w-fit">
                        <span className="w-2 h-2 rounded-full bg-[#009E52] animate-pulse" />
                        <span className="text-[10px] text-[#FFC4B7] uppercase font-bold tracking-wider">
                            100% Client-Side • No Data Logs
                        </span>
                    </div>
                </div>

                {/* Column 2: Navigation Links */}
                <div className="flex flex-col gap-6">
                    <span className="text-xs font-black uppercase text-[#FF8E60] tracking-widest">Diagnostics</span>
                    <nav className="flex flex-col gap-3.5">
                        <Link className="text-sm font-semibold text-[#FFC4B7]/70 hover:text-[#FF8E60] transition-colors" href="/">
                            System Dashboard
                        </Link>
                        <Link className="text-sm font-semibold text-[#FFC4B7]/70 hover:text-[#FF8E60] transition-colors" href="/bufferbloat">
                            Bufferbloat Latency Test
                        </Link>
                        <Link className="text-sm font-semibold text-[#FFC4B7]/70 hover:text-[#FF8E60] transition-colors" href="/faq">
                            Knowledge Base (FAQ)
                        </Link>
                        <Link className="text-sm font-semibold text-[#FFC4B7]/70 hover:text-[#FF8E60] transition-colors" href="/privacy">
                            Privacy Centre
                        </Link>
                    </nav>
                </div>

                {/* Column 3: Client Info Box */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-[#FF8E60] tracking-widest">Active Footprint</span>
                        <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#009E52]" />
                            <span className="text-[9px] text-[#009E52] font-bold uppercase tracking-wider">Connected</span>
                        </div>
                    </div>
                    <div className="bg-[#FAF6F0]/5 border border-[#FFC4B7]/10 p-4 rounded-2xl flex flex-col gap-3 font-mono text-xs">
                        <div className="flex justify-between border-b border-[#FFC4B7]/10 pb-2">
                            <span className="text-[#FFC4B7]/50 uppercase text-[9px] tracking-wider font-sans font-bold">Client OS</span>
                            <span className="text-[#FAF6F0] font-bold">{clientInfo.os}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#FFC4B7]/50 uppercase text-[9px] tracking-wider font-sans font-bold">Browser</span>
                            <span className="text-[#FAF6F0] font-bold">{clientInfo.browser}</span>
                        </div>
                    </div>
                    <p className="text-[10px] text-[#FFC4B7]/50 leading-tight">
                        Detection runs inside your browser sandbox. Your data never leaves your device.
                    </p>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[#FFC4B7]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-[#FFC4B7]/40 uppercase tracking-widest">
                <div>© 2026 MySupportInfo.com</div>
                <div className="font-medium text-[#FFC4B7]/30 normal-case tracking-normal text-right">
                    Made with Care & Privacy in Mind.
                </div>
            </div>
        </footer>
    );
}
