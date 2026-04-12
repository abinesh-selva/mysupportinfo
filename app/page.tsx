"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Monitor,
    Signal,
    HardDrive,
    Cpu,
    Globe,
    Clock,
    EyeOff,
    Terminal,
    MapPin,
    Wifi
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

// --- Types ---
interface SystemStats {
    browserName: string;
    browserVersion: string;
    osName: string;
    ip: string;
    resolution: string;
    connectionType: string;
    connectionSpeed: string;
    persistence: string;
    ram: string;
    userAgent: string;
    cpuCores: number | string;
    latency: string;
    webglVendor: string;
    doNotTrack: string;
    timezone: string;
}

export default function Home() {
    // --- State ---
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [ipLoading, setIpLoading] = useState(true);

    // --- Effects ---
    useEffect(() => {
        const fetchStats = async () => {
            // 1. Browser & OS Detection
            const ua = navigator.userAgent;
            let browserName = "Unknown";
            let browserVersion = "";
            let osName = "Unknown OS";

            if (ua.indexOf("Chrome") > -1) {
                browserName = "Chrome";
                browserVersion = ua.match(/Chrome\/(\d+)/)?.[1] || "";
            } else if (ua.indexOf("Firefox") > -1) {
                browserName = "Firefox";
                browserVersion = ua.match(/Firefox\/(\d+)/)?.[1] || "";
            } else if (ua.indexOf("Safari") > -1) {
                browserName = "Safari";
                browserVersion = ua.match(/Version\/(\d+)/)?.[1] || "";
            }

            if (ua.indexOf("Win") > -1) osName = "Windows";
            else if (ua.indexOf("Mac") > -1) osName = "macOS";
            else if (ua.indexOf("Linux") > -1) osName = "Linux";
            else if (ua.indexOf("Android") > -1) osName = "Android";
            else if (ua.indexOf("iOS") > -1) osName = "iOS";

            // 2. Hardware & Connection
            // 2. Hardware & Connection
            const screenRes = `${window.screen.width} x ${window.screen.height}`;
            // @ts-expect-error - Experimental API
            const conn = navigator.connection;
            const connType = conn ? conn.effectiveType.toUpperCase() : "UNKNOWN";
            const connSpeed = conn && conn.downlink ? `${conn.downlink} Mbps` : "Unknown";
            const persistence = navigator.cookieEnabled ? "ENABLED" : "DISABLED";
            // @ts-expect-error - Experimental API
            const ram = navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : "Unknown";
            const cpu = navigator.hardwareConcurrency || "Unknown";
            const latency = conn && conn.rtt ? `${conn.rtt} ms` : "Unknown";
            const dnt = navigator.doNotTrack === "1" ? "ENABLED" : "DISABLED";
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // 3. WebGL
            let webgl = "Unknown";
            try {
                const canvas = document.createElement("canvas");
                const gl = canvas.getContext("webgl");
                if (gl) {
                    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
                    if (debugInfo) {
                        webgl = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                    }
                }
            } catch (e) {
                console.error("WebGL detection failed", e);
            }

            // 4. IP Fetch (Async)
            let ip = "Scanning...";
            try {
                const res = await fetch("https://api.ipify.org?format=json");
                const data = await res.json();
                ip = data.ip;
            } catch (e) {
                ip = "Unavailable";
            }
            setIpLoading(false);

            setStats({
                browserName,
                browserVersion,
                osName,
                ip,
                resolution: screenRes,
                connectionType: connType,
                connectionSpeed: connSpeed,
                persistence,
                ram,
                userAgent: ua,
                cpuCores: cpu,
                latency,
                webglVendor: webgl,
                doNotTrack: dnt,
                timezone: tz,
            });
            setLoading(false);
        };

        fetchStats();
    }, []);

    // --- Render Helpers ---
    const Card = ({
        icon: Icon,
        title,
        value,
        subtext,
        fullWidth = false,
        isCode = false,
    }: {
        icon: any;
        title: string;
        value: string | React.ReactNode;
        subtext: string;
        fullWidth?: boolean;
        isCode?: boolean;
    }) => (
        <div
            className={`bg-[#111214] border border-white/5 p-6 rounded-2xl flex flex-col justify-between ${fullWidth ? "col-span-1 md:col-span-2" : ""
                }`}
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                    <Icon size={20} />
                </div>
                <span className="text-slate-400 font-medium text-sm">{title}</span>
            </div>
            <div>
                {isCode ? (
                    <div className="font-mono text-xs text-slate-300 bg-black/30 p-3 rounded-lg break-all leading-relaxed">
                        {value}
                    </div>
                ) : (
                    <div className="text-2xl font-bold text-white mb-2">{value}</div>
                )}
                <div className="text-[10px] text-slate-500 mt-2 italic leading-tight">
                    {subtext}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0b0c0d] text-white selection:bg-blue-500/30 font-sans pb-20">
            {/* Header Placeholder (Layout handles real header) */}
            <div className="h-4"></div>

            <main className="max-w-6xl mx-auto px-6">
                <FadeIn>
                    {/* Hero Section */}
                    <div className="relative flex flex-col items-center justify-center py-20 mb-12">
                        {/* Circular Hub */}
                        <div className="relative grid place-items-center mb-12 group cursor-default">
                            {/* Outer Rings */}
                            <div className="absolute inset-0 rounded-full border border-white/5 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-spin-slow opacity-20 pointer-events-none" />
                            <div className="absolute inset-0 rounded-full border border-dashed border-white/10 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 opacity-30 pointer-events-none" />

                            {/* Center Content */}
                            <div className="relative text-center z-10">
                                <div className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
                                    Active Session Diagnostics
                                </div>
                                <div className="mb-8">
                                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold">
                                        Main Browser
                                    </div>
                                    <h1 className="text-6xl font-black tracking-tighter text-white">
                                        {loading ? "..." : stats?.browserName}
                                        <span className="text-[#333] ml-2">
                                            {loading ? "" : stats?.browserVersion}
                                        </span>
                                    </h1>
                                </div>
                                <div className="flex items-center justify-center gap-16 mb-10">
                                    <div className="text-center">
                                        <div className="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-bold">
                                            OS Environment
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            {loading ? "..." : stats?.osName}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-bold">
                                            Global IP
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            {ipLoading ? "Scanning..." : stats?.ip}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => window.location.reload()}
                                    disabled={loading}
                                    className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-wait"
                                >
                                    {loading ? (
                                        <span className="animate-spin text-lg">⟳</span>
                                    ) : (
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                    )}
                                    {loading ? "Scanning..." : "Rescan System"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Metrics Grid */}
                    <div className="mb-8 flex items-center gap-3">
                        <Terminal className="text-blue-500" size={24} />
                        <h2 className="text-2xl font-bold text-white">Advanced Metrics</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Row 1 */}
                        <Card
                            icon={Monitor}
                            title="Display"
                            value={loading ? "..." : stats?.resolution || "Unknown"}
                            subtext="Affects how fonts and layouts are scaled by the rendering engine."
                        />
                        <Card
                            icon={Signal}
                            title="Connection"
                            value={
                                loading ? (
                                    "..."
                                ) : (
                                    <span>
                                        {stats?.connectionType}{" "}
                                        <span className="text-slate-500 text-lg">
                                            ({stats?.connectionSpeed})
                                        </span>
                                    </span>
                                )
                            }
                            subtext="Effective network type and downlink speed estimation."
                        />
                        <Card
                            icon={HardDrive}
                            title="Persistence"
                            value={
                                loading ? (
                                    "..."
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <div
                                            className={`w-2 h-2 rounded-full ${stats?.persistence === "ENABLED"
                                                ? "bg-emerald-500"
                                                : "bg-red-500"
                                                }`}
                                        />
                                        {stats?.persistence}
                                    </span>
                                )
                            }
                            subtext="Required for session management and user preference storage."
                        />
                        <Card
                            icon={Cpu}
                            title="RAM Estimate"
                            value={loading ? "..." : stats?.ram || "Unknown"}
                            subtext="Helpful for diagnosing performance bottlenecks in heavy apps."
                        />

                        {/* Row 2 */}
                        <Card
                            icon={Globe}
                            title="Full User Agent String"
                            value={loading ? "Loading..." : stats?.userAgent || ""}
                            subtext="The complete string used by servers to identify your device software."
                            fullWidth={true}
                            isCode={true}
                        />
                        <Card
                            icon={Cpu}
                            title="CPU Cores"
                            value={loading ? "..." : stats?.cpuCores || "Unknown"}
                            subtext="Number of logical processors available."
                            fullWidth={true} // Spanning 2 cols to match design if needed, or keeping it 1
                        />

                        {/* Row 3 - Adjusting grid to match screenshot which has 2-column UA string and CPU cores next to it? 
                           Screenshot: UA String is wide. CPU Cores is single.
                           Actually screenshot shows UA String spanning 2 cols. CPU Cores is next to it? No, grid is 4 columns?
                           Rows:
                           1. Display, Connection, Persistence, RAM (4 cols)
                           2. UA String (2 cols), CPU Cores (2 cols? or 1?)
                           Screenshot shows UA String is wide. CPU Cores is to the right.
                           Looking at screenshot: 
                           Row 1: Display, Connection, Persistence, RAM
                           Row 2: User Agent (Wide), CPU Cores (Normal) -> Wait, that's 3 cols? 
                           Let's simplify to 4 cols. UA = col-span-2. CPU = col-span-2?
                        */}
                    </div>
                </FadeIn>

                {/* Additional Rows for Latency, WebGL etc */}
                <FadeIn delay={0.2} className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card
                            icon={Clock}
                            title="Latency (RTT)"
                            value={loading ? "..." : stats?.latency || "Unknown"}
                            subtext="Round-trip time estimation."
                        />
                        <Card
                            icon={Terminal}
                            title="WebGL Vendor"
                            value={
                                <span className="text-sm line-clamp-3">
                                    {loading ? "..." : stats?.webglVendor || "Unknown"}
                                </span>
                            }
                            subtext="Detected video hardware acceleration layer."
                        />
                        <Card
                            icon={EyeOff}
                            title="Do Not Track"
                            value={loading ? "..." : stats?.doNotTrack || "Unknown"}
                            subtext="Your preference for cross-site tracking as reported by browser."
                        />
                        <Card
                            icon={MapPin}
                            title="Timezone"
                            value={loading ? "..." : stats?.timezone || "Unknown"}
                            subtext="Your local timezone setting."
                        />
                    </div>


                </FadeIn>

                {/* Navigation Tools */}
                <FadeIn delay={0.4} className="mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Bufferbloat Card */}
                        <Link href="/bufferbloat" className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#135bec]/20 to-[#135bec]/5 border border-[#135bec]/20 hover:border-[#135bec]/50 transition-all duration-300">
                            <div className="absolute top-0 right-0 p-32 bg-[#135bec]/20 blur-3xl rounded-full translate-x-12 -translate-y-12 group-hover:bg-[#135bec]/30 transition-colors"></div>
                            <div className="p-8 relative h-full flex flex-col justify-between min-h-[320px]">
                                <div>
                                    <div className="size-14 rounded-2xl bg-[#135bec] flex items-center justify-center text-white shadow-lg shadow-[#135bec]/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Signal size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-white">Bufferbloat Test</h3>
                                    <p className="text-slate-400 leading-relaxed">Analyze network latency under load to detect lag spikes.</p>
                                </div>
                                <div className="flex items-center gap-2 text-[#135bec] font-bold uppercase tracking-widest text-xs mt-8">
                                    <span>Run Diagnostic</span>
                                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </Link>

                        {/* Privacy Card */}
                        <Link href="/privacy" className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.07]">
                            <div className="p-8 relative h-full flex flex-col justify-between min-h-[320px]">
                                <div>
                                    <div className="size-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <EyeOff size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-white">Privacy Center</h3>
                                    <p className="text-slate-400 leading-relaxed">Review how we handle your data locally without tracking.</p>
                                </div>
                                <div className="flex items-center gap-2 text-white/50 font-bold uppercase tracking-widest text-xs mt-8 group-hover:text-white transition-colors">
                                    <span>View Policy</span>
                                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </Link>

                        {/* FAQ Card */}
                        <Link href="/faq" className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.07]">
                            <div className="p-8 relative h-full flex flex-col justify-between min-h-[320px]">
                                <div>
                                    <div className="size-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <div className="material-symbols-outlined text-3xl">help</div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-white">Knowledge Base</h3>
                                    <p className="text-slate-400 leading-relaxed">Common questions about network testing and privacy.</p>
                                </div>
                                <div className="flex items-center gap-2 text-white/50 font-bold uppercase tracking-widest text-xs mt-8 group-hover:text-white transition-colors">
                                    <span>Read FAQ</span>
                                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </FadeIn>

                <div className="mt-16 text-center border-t border-white/5 pt-8 mb-20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Wifi size={16} className="text-blue-500" />
                        <h3 className="font-bold text-white">MySupportInfo.com</h3>
                    </div>
                    <p className="text-slate-500 text-xs">Your technical footprint, visualized privately.</p>
                </div>
            </main>
        </div >
    );
}
