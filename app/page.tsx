"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
    Monitor,
    Signal,
    HardDrive,
    Cpu,
    Clock,
    EyeOff,
    Terminal,
    MapPin,
    Wifi,
    Copy,
    Share2,
    Download,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import html2canvas from "html2canvas";

interface SystemStats {
    browserName: string;
    browserVersion: string;
    osName: string;
    ip: string;
    resolution: string;
    windowSize: string;
    pixelRatio: string;
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
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [ipLoading, setIpLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [urlCopied, setUrlCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const ua = navigator.userAgent;
            let browserName = "Unknown";
            let browserVersion = "";
            let osName = "Unknown OS";

            if (ua.indexOf("Edg/") > -1 || ua.indexOf("Edge/") > -1) {
                browserName = "Microsoft Edge";
                browserVersion = ua.match(/Edg\/(\d+)/)?.[1] || ua.match(/Edge\/(\d+)/)?.[1] || "";
            } else if (ua.indexOf("OPR/") > -1 || ua.indexOf("Opera") > -1) {
                browserName = "Opera";
                browserVersion = ua.match(/OPR\/(\d+)/)?.[1] || ua.match(/Opera\/(\d+)/)?.[1] || "";
            } else if (ua.indexOf("Chrome") > -1) {
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

            const screenRes = `${window.screen.width} x ${window.screen.height}`;
            const windowSizeVal = `${window.innerWidth} x ${window.innerHeight}`;
            const pixelRatioVal = `${window.devicePixelRatio}x`;
            // @ts-expect-error - Experimental API
            const conn = navigator.connection;
            const connType = conn ? conn.effectiveType.toUpperCase() : "Unknown";
            const connSpeed = conn && conn.downlink ? `${conn.downlink} Mbps` : "Unknown";
            const persistence = navigator.cookieEnabled ? "ENABLED" : "DISABLED";
            // @ts-expect-error - Experimental API
            const ram = navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : "Unknown";
            const cpu = navigator.hardwareConcurrency || "Unknown";
            const latency = conn && conn.rtt ? `${conn.rtt} ms` : "Unknown";
            const dnt = navigator.doNotTrack === "1" ? "ENABLED" : "DISABLED";
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

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

            let ip = "Scanning...";
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);
                const res = await fetch("https://api.ipify.org?format=json", { signal: controller.signal });
                clearTimeout(timeoutId);
                const data = await res.json();
                ip = data.ip;
            } catch {
                ip = "Unavailable";
            }
            setIpLoading(false);

            setStats({
                browserName, browserVersion, osName, ip,
                resolution: screenRes, windowSize: windowSizeVal, pixelRatio: pixelRatioVal,
                connectionType: connType, connectionSpeed: connSpeed,
                persistence, ram, userAgent: ua, cpuCores: cpu,
                latency, webglVendor: webgl, doNotTrack: dnt, timezone: tz,
            });
            setLoading(false);
        };
        fetchStats();
    }, []);

    // Live viewport updates on zoom/resize
    useEffect(() => {
        const handleResize = () => {
            setStats(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    windowSize: `${window.innerWidth} x ${window.innerHeight}`,
                    pixelRatio: `${window.devicePixelRatio}x`,
                    resolution: `${window.screen.width} x ${window.screen.height}`,
                };
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const copyAllInfo = async () => {
        if (!stats) return;
        const text = [
            `MySupportInfo — Device Diagnostic Report`,
            `Generated: ${new Date().toLocaleString()}`,
            ``,
            `BROWSER:      ${stats.browserName} ${stats.browserVersion}`,
            `OS:           ${stats.osName}`,
            `IP Address:   ${stats.ip}`,
            `Viewport:     ${stats.windowSize} (${stats.pixelRatio} DPR)`,
            `Screen:       ${stats.resolution}`,
            `Connection:   ${stats.connectionType} — ${stats.connectionSpeed}`,
            `Latency RTT:  ${stats.latency}`,
            `CPU Cores:    ${stats.cpuCores}`,
            `RAM:          ${stats.ram}`,
            `WebGL:        ${stats.webglVendor}`,
            `Timezone:     ${stats.timezone}`,
            `Do Not Track: ${stats.doNotTrack}`,
            `Cookies:      ${stats.persistence}`,
            ``,
            `User Agent:   ${stats.userAgent}`,
        ].join("\n");
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const shareLink = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setUrlCopied(true);
        setTimeout(() => setUrlCopied(false), 2500);
    };

    const downloadReport = async () => {
        if (!reportRef.current) return;
        setDownloading(true);
        try {
            const canvas = await html2canvas(reportRef.current, {
                backgroundColor: "#FAF6F0",
                scale: 2,
                logging: false,
                useCORS: true,
            });
            const link = document.createElement("a");
            link.download = `mysupportinfo-${Date.now()}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        } finally {
            setDownloading(false);
        }
    };

    const Card = ({
        icon: Icon,
        title,
        value,
        subtext,
        fullWidth = false,
        isCode = false,
    }: {
        icon: React.ComponentType<{ className?: string; size?: number }>;
        title: string;
        value: string | React.ReactNode;
        subtext: string;
        fullWidth?: boolean;
        isCode?: boolean;
    }) => (
        <div className={`bg-white border-2 border-[#00473E] shadow-block-sm p-5 rounded-2xl flex flex-col justify-between hover:bg-[#FAF6F0]/20 transition-all duration-300 ${fullWidth ? "col-span-1 md:col-span-2" : ""}`}>
            <div className="flex items-center gap-2.5 mb-4">
                <div className="p-1.5 bg-[#009E52]/10 rounded-lg text-[#009E52]">
                    <Icon size={16} />
                </div>
                <span className="text-[#00473E]/70 font-semibold text-[10px] uppercase tracking-[0.18em]">{title}</span>
            </div>
            <div>
                {isCode ? (
                    <div className="font-mono text-[11px] text-[#FFC4B7] bg-[#00473E] p-3 rounded-lg break-all leading-relaxed border border-[#00473E]">
                        {value}
                    </div>
                ) : (
                    <div className="text-xl font-bold text-[#00473E] mb-1">{value}</div>
                )}
                <div className="text-[10px] text-[#00473E]/60 mt-2 leading-tight font-medium">{subtext}</div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF6F0] text-[#002924] selection:bg-[#FF8E60]/40 font-sans pb-24">

            {/* ── Hero ─────────────────────────────────────────────── */}
            <div className="text-center px-6 pt-16 pb-10">
                <FadeIn>
                    <h1 className="font-serif leading-none mb-6 select-none">
                        <span className="block text-5xl md:text-7xl lg:text-[5.5rem] font-light text-[#00473E] tracking-tight">
                            Device Detection
                        </span>
                        <span className="block text-6xl md:text-8xl lg:text-[7rem] font-bold text-[#FF8E60] italic tracking-tight -mt-2">
                            Dashboard
                        </span>
                    </h1>
                    <p className="text-[#00473E]/70 max-w-sm mx-auto text-sm leading-relaxed mb-10 font-medium">
                        Instant, secure access to your system and browser details.
                        Designed for technical support without compromising your privacy.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                            onClick={copyAllInfo}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#FF8E60] text-[#002924] border-2 border-[#00473E] shadow-block-sm rounded-xl text-sm font-bold hover:bg-[#FF7D54] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-40"
                        >
                            <Copy size={15} />
                            {copied ? "Copied!" : "Copy All Info"}
                        </button>
                        <button
                            onClick={shareLink}
                            className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#00473E] border-2 border-[#00473E] shadow-block-sm rounded-xl text-sm font-bold hover:bg-[#FFC4B7]/20 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                        >
                            <Share2 size={15} />
                            {urlCopied ? "Copied!" : "Share Link"}
                        </button>
                    </div>
                </FadeIn>
            </div>

            {/* ── Central Orb ──────────────────────────────────────── */}
            <div className="flex justify-center px-4 mb-16">
                <div
                    ref={reportRef}
                    className="relative w-full max-w-[560px] aspect-square rounded-full flex flex-col items-center justify-center overflow-hidden bg-[#00473E] border-4 border-[#FFC4B7]/25 shadow-block"
                >
                    {/* Stitched ring */}
                    <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#FFC4B7]/15 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center px-10">
                        <span className="text-[9px] text-[#FFC4B7]/75 uppercase tracking-[0.35em] font-bold mb-4">
                            Main Browser
                        </span>

                        <h2 className="font-serif font-bold text-white mb-7" style={{ fontSize: "clamp(2.4rem, 8vw, 4rem)", lineHeight: 1.05 }}>
                            {loading ? "…" : `${stats?.browserName} ${stats?.browserVersion}`}
                        </h2>

                        <div className="flex items-start gap-10 mb-9">
                            <div className="text-center">
                                <p className="text-[8px] text-[#FFC4B7]/60 uppercase tracking-[0.3em] font-bold mb-1.5">OS Environment</p>
                                <p className="text-base font-semibold text-[#FFC4B7]">
                                    {loading ? "…" : stats?.osName}
                                </p>
                            </div>
                            <div className="w-px h-10 bg-[#FFC4B7]/20 self-center" />
                            <div className="text-center">
                                <p className="text-[8px] text-[#FFC4B7]/60 uppercase tracking-[0.3em] font-bold mb-1.5">Global IP</p>
                                <p className="text-base font-semibold text-[#FFC4B7] font-mono tabular-nums">
                                    {ipLoading ? "…" : stats?.ip}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={downloadReport}
                            disabled={loading || downloading}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#FF8E60] border-2 border-[#00473E] shadow-block-sm text-[#00473E] rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-[#FF7D54] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-40"
                        >
                            <Download size={13} />
                            {downloading ? "Generating…" : "Download Screenshot Report"}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Advanced Metrics ─────────────────────────────────── */}
            <main className="max-w-6xl mx-auto px-6">
                <FadeIn>
                    <div className="mb-6 flex items-center gap-3">
                        <Terminal className="text-[#FF8E60]" size={18} />
                        <h2 className="text-[11px] font-bold text-[#00473E] uppercase tracking-[0.25em]">
                            Advanced Metrics
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                        <Card
                            icon={Monitor}
                            title="Viewport Size"
                            value={loading ? "…" : stats?.windowSize || "Unknown"}
                            subtext={loading ? "" : `Screen: ${stats?.resolution} · DPR: ${stats?.pixelRatio} — auto-updates on zoom`}
                        />
                        <Card
                            icon={Signal}
                            title="Connection"
                            value={loading ? "…" : (
                                <span>
                                    {stats?.connectionType}{" "}
                                    <span className="text-[#00473E]/70 text-base">({stats?.connectionSpeed})</span>
                                </span>
                            )}
                            subtext="Effective network type and estimated downlink speed."
                        />
                        <Card
                            icon={HardDrive}
                            title="Cookies"
                            value={loading ? "…" : (
                                <span className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${stats?.persistence === "ENABLED" ? "bg-[#009E52]" : "bg-red-400"}`} />
                                    {stats?.persistence}
                                </span>
                            )}
                            subtext="Required for session management and user preferences."
                        />
                        <Card
                            icon={Cpu}
                            title="RAM Estimate"
                            value={loading ? "…" : stats?.ram || "Unknown"}
                            subtext="Helps diagnose performance bottlenecks in heavy apps."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <Card
                            icon={Terminal}
                            title="Full User Agent"
                            value={loading ? "Loading…" : stats?.userAgent || ""}
                            subtext="Complete string servers use to identify your device software."
                            fullWidth
                            isCode
                        />
                        <Card
                            icon={Cpu}
                            title="CPU Cores"
                            value={loading ? "…" : stats?.cpuCores || "Unknown"}
                            subtext="Number of logical processors available to your browser."
                            fullWidth
                        />
                    </div>
                </FadeIn>

                <FadeIn delay={0.15} className="mt-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <Card
                            icon={Clock}
                            title="Latency (RTT)"
                            value={loading ? "…" : stats?.latency || "Unknown"}
                            subtext="Round-trip time reported by the Network Information API."
                        />
                        <Card
                            icon={Terminal}
                            title="WebGL Renderer"
                            value={<span className="text-sm line-clamp-2">{loading ? "…" : stats?.webglVendor || "Unknown"}</span>}
                            subtext="GPU hardware acceleration layer detected via WebGL."
                        />
                        <Card
                            icon={EyeOff}
                            title="Do Not Track"
                            value={loading ? "…" : stats?.doNotTrack || "Unknown"}
                            subtext="Your browser's tracking preference signal."
                        />
                        <Card
                            icon={MapPin}
                            title="Timezone"
                            value={loading ? "…" : stats?.timezone || "Unknown"}
                            subtext="Your local timezone via Intl.DateTimeFormat API."
                        />
                    </div>
                </FadeIn>

                {/* ── Navigation Cards ──────────────────────────────── */}
                <FadeIn delay={0.3} className="mt-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <Link href="/bufferbloat" className="group relative overflow-hidden rounded-3xl bg-[#00473E] border-2 border-[#00473E] shadow-block hover:scale-[1.02] transition-all duration-300">
                            <div className="p-8 relative flex flex-col justify-between min-h-[260px]">
                                <div>
                                    <div className="size-12 rounded-2xl bg-[#FF8E60] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        <Signal size={22} className="text-[#00473E]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">Bufferbloat Test</h3>
                                    <p className="text-[#FFC4B7] text-sm leading-relaxed">Analyse network latency under load to detect lag spikes.</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-[#FF8E60] font-bold uppercase tracking-widest text-[10px] mt-6">
                                    <span>Run Diagnostic</span>
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/privacy" className="group relative overflow-hidden rounded-3xl bg-[#FFC4B7] border-2 border-[#00473E] shadow-block hover:scale-[1.02] transition-all duration-300">
                            <div className="p-8 relative flex flex-col justify-between min-h-[260px]">
                                <div>
                                    <div className="size-12 rounded-2xl bg-[#00473E] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        <EyeOff size={22} className="text-[#FFC4B7]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#00473E] mb-2">Privacy Centre</h3>
                                    <p className="text-[#00473E]/80 text-sm leading-relaxed">Review how we handle your data locally without tracking.</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-[#00473E] font-bold uppercase tracking-widest text-[10px] mt-6">
                                    <span>View Policy</span>
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </Link>

                        <Link href="/faq" className="group relative overflow-hidden rounded-3xl bg-white border-2 border-[#00473E] shadow-block hover:scale-[1.02] transition-all duration-300">
                            <div className="p-8 relative flex flex-col justify-between min-h-[260px]">
                                <div>
                                    <div className="size-12 rounded-2xl bg-[#009E52]/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-outlined text-[#009E52] text-2xl">help</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#00473E] mb-2">Knowledge Base</h3>
                                    <p className="text-[#00473E]/70 text-sm leading-relaxed">Common questions about network testing and privacy.</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-[#00473E] font-bold uppercase tracking-widest text-[10px] mt-6">
                                    <span>Read FAQ</span>
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </FadeIn>

                <div className="mt-14 text-center border-t border-[#00473E]/10 pt-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Wifi size={13} className="text-[#00473E]/50" />
                        <span className="font-semibold text-[#00473E]/60 text-sm">MySupportInfo.com</span>
                    </div>
                    <p className="text-[#00473E]/40 text-[11px] font-medium">Your technical footprint, visualised privately.</p>
                </div>
            </main>
        </div>
    );
}
