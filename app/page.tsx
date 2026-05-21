"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
    Monitor, Signal, HardDrive, Cpu, Clock, EyeOff, Terminal,
    MapPin, Wifi, Copy, Share2, Download, Palette, Globe,
    Battery, ShieldCheck, ShieldAlert, Languages, Smartphone,
    Activity, Zap, Layout, Lock, Info, ArrowRight, HelpCircle,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

type TabType = "network" | "browser" | "hardware" | "privacy";

interface SystemStats {
    browserName: string;
    browserVersion: string;
    osName: string;
    language: string;
    connectionType: string;
    connectionSpeed: string;
    latency: string;
    ip: string;
    ipv6: string;
    ispName: string;
    city: string;
    country: string;
    countryCode: string;
    vpnDetected: boolean;
    resolution: string;
    windowSize: string;
    pixelRatio: string;
    colorDepth: string;
    orientation: string;
    touchSupport: string;
    cpuCores: number | string;
    ram: string;
    webglVendor: string;
    batteryLevel: string;
    batteryCharging: string;
    persistence: string;
    doNotTrack: string;
    adBlocker: string;
    userAgent: string;
    timezone: string;
}

const flagEmoji = (code: string) =>
    code.toUpperCase().split("").map(c =>
        String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)
    ).join("");

const getLatencyStatus = (val: string): "good" | "warn" | "bad" | "info" => {
    const ms = parseInt(val);
    if (isNaN(ms)) return "info";
    if (ms < 20) return "good";
    if (ms < 80) return "warn";
    return "bad";
};

const getSpeedStatus = (val: string): "good" | "warn" | "bad" | "info" => {
    const mbps = parseFloat(val);
    if (isNaN(mbps)) return "info";
    if (mbps > 50) return "good";
    if (mbps > 10) return "warn";
    return "bad";
};

const getBatteryStatus = (level: string): "good" | "warn" | "bad" | "info" => {
    if (level === "N/A") return "info";
    const pct = parseInt(level);
    if (isNaN(pct)) return "info";
    if (pct > 50) return "good";
    if (pct > 20) return "warn";
    return "bad";
};

type NavigatorWithUserAgentData = Navigator & {
    userAgentData?: {
        platform?: string;
        getHighEntropyValues?: (hints: string[]) => Promise<{ platform?: string }>;
    };
};

const platformToOS = (platform: string, ua: string): string | null => {
    const value = platform.toLowerCase();
    const hasTouch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;

    if (value.includes("android")) return "Android";
    if (value.includes("ios") || value.includes("iphone") || value.includes("ipad")) return "iOS";
    if (value.includes("windows") || value.includes("win")) return "Windows";
    if (value.includes("chrome os") || value.includes("cros")) return "ChromeOS";
    if (value.includes("mac")) {
        return ua.includes("Macintosh") && navigator.maxTouchPoints > 1 ? "iPadOS" : "macOS";
    }
    if (value.includes("linux")) {
        if (/Android/i.test(ua)) return "Android";
        if (hasTouch) return "Android/Linux Tablet";
        return "Linux";
    }

    return null;
};

const detectOSName = async (ua: string): Promise<string> => {
    const nav = navigator as NavigatorWithUserAgentData;

    try {
        const hints = await nav.userAgentData?.getHighEntropyValues?.(["platform"]);
        const osFromHints = platformToOS(hints?.platform || nav.userAgentData?.platform || "", ua);
        if (osFromHints) return osFromHints;
    } catch { /* ignore unavailable client hints */ }

    const platform = platformToOS(navigator.platform || "", ua);
    if (platform && platform !== "Linux") return platform;

    if (/Android/i.test(ua)) return "Android";
    if (/iPad/i.test(ua)) return "iPadOS";
    if (/iPhone|iPod/i.test(ua)) return "iOS";
    if (/Windows NT|Win64|Win32/i.test(ua)) return "Windows";
    if (/CrOS/i.test(ua)) return "ChromeOS";
    if (/Macintosh|Mac OS X/i.test(ua)) return navigator.maxTouchPoints > 1 ? "iPadOS" : "macOS";
    if (/Linux/i.test(ua)) return navigator.maxTouchPoints > 0 ? "Android/Linux Tablet" : "Linux";

    return platform || "Unknown OS";
};

const IP_CACHE_KEY = "msi_ip_v2";
const IP_CACHE_TTL = 5 * 60 * 1000;

export default function Home() {
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [ipLoading, setIpLoading] = useState(true);
    const [webrtcLeak, setWebrtcLeak] = useState<string>("Scanning…");
    const [webrtcLoading, setWebrtcLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>("network");
    const [isCapturing, setIsCapturing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [urlCopied, setUrlCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [currentTime, setCurrentTime] = useState<string>("");
    const [activeQuote, setActiveQuote] = useState({ text: "", author: "" });
    const reportRef = useRef<HTMLDivElement>(null);

    const quotes = [
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { text: "The human spirit must prevail over technology.", author: "Albert Einstein" },
        { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
        { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
        { text: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" },
    ];

    useEffect(() => {
        const tick = () => setCurrentTime(new Date().toLocaleString("en-US", { hour12: true }));
        tick();
        const i = setInterval(tick, 1000);
        return () => clearInterval(i);
    }, []);

    useEffect(() => {
        setActiveQuote(quotes[new Date().getDay() % quotes.length]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Main stats detection
    useEffect(() => {
        const fetchStats = async () => {
            const ua = navigator.userAgent;
            let browserName = "Unknown";
            let browserVersion = "";

            if (ua.includes("Edg/") || ua.includes("Edge/")) {
                browserName = "Microsoft Edge";
                browserVersion = ua.match(/Edg\/(\d+)/)?.[1] || ua.match(/Edge\/(\d+)/)?.[1] || "";
            } else if (ua.includes("OPR/") || ua.includes("Opera")) {
                browserName = "Opera";
                browserVersion = ua.match(/OPR\/(\d+)/)?.[1] || ua.match(/Opera\/(\d+)/)?.[1] || "";
            } else if (ua.includes("Chrome")) {
                browserName = "Chrome";
                browserVersion = ua.match(/Chrome\/(\d+)/)?.[1] || "";
            } else if (ua.includes("Firefox")) {
                browserName = "Firefox";
                browserVersion = ua.match(/Firefox\/(\d+)/)?.[1] || "";
            } else if (ua.includes("Safari")) {
                browserName = "Safari";
                browserVersion = ua.match(/Version\/(\d+)/)?.[1] || "";
            }

            const osName = await detectOSName(ua);

            // @ts-expect-error - Experimental API
            const conn = navigator.connection;
            const connType = conn?.effectiveType?.toUpperCase() || "Unknown";
            const connSpeed = conn?.downlink ? `${conn.downlink} Mbps` : "Unknown";
            const persistence = navigator.cookieEnabled ? "ENABLED" : "DISABLED";
            // @ts-expect-error - Experimental API
            const ram = navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : "Unknown";
            const cpu = navigator.hardwareConcurrency || "Unknown";
            const latency = conn?.rtt ? `${conn.rtt} ms` : "Unknown";
            const dnt = navigator.doNotTrack === "1" ? "ENABLED" : "DISABLED";
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const language = navigator.language || "Unknown";
            const touchPoints = navigator.maxTouchPoints;
            const touchSupport = touchPoints > 0 ? `Supported (${touchPoints} pt)` : "Not Supported";
            const orientation = screen.orientation?.type?.replace("-primary", "").replace("-secondary", " (alt)") || "Unknown";
            const screenRes = `${window.screen.width} × ${window.screen.height}`;
            const windowSizeVal = `${window.innerWidth} × ${window.innerHeight}`;
            const pixelRatioVal = `${window.devicePixelRatio}x`;
            const colorDepthVal = `${window.screen.colorDepth} bit`;

            // Ad blocker detection
            let adBlocker = "Not Detected";
            try {
                const testEl = document.createElement("div");
                testEl.className = "ad ads advert banner adsbox ad-banner";
                testEl.style.cssText = "position:absolute;left:-9999px;height:1px;width:1px;opacity:0;";
                document.body.appendChild(testEl);
                await new Promise(r => setTimeout(r, 150));
                adBlocker = testEl.offsetHeight === 0 ? "Detected" : "Not Detected";
                document.body.removeChild(testEl);
            } catch { /* ignore */ }

            // Battery
            let batteryLevel = "N/A";
            let batteryCharging = "N/A";
            try {
                // @ts-expect-error - experimental
                const bat = await navigator.getBattery?.();
                if (bat) {
                    batteryLevel = `${Math.round(bat.level * 100)}%`;
                    batteryCharging = bat.charging ? "Charging" : "On Battery";
                }
            } catch { /* ignore */ }

            // WebGL
            let webgl = "Unknown";
            try {
                const canvas = document.createElement("canvas");
                const gl = canvas.getContext("webgl");
                if (gl) {
                    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                    if (dbg) webgl = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL);
                }
            } catch { /* ignore */ }

            // IP data (with sessionStorage cache)
            let ip = "Unavailable";
            let ipv6 = "Not Available";
            let ispName = "Unknown ISP";
            let city = "";
            let country = "";
            let countryCode = "";
            let vpnDetected = false;
            let usedCache = false;

            try {
                const raw = sessionStorage.getItem(IP_CACHE_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (Date.now() - parsed.ts < IP_CACHE_TTL) {
                        ({ ip, ipv6, ispName, city, country, countryCode, vpnDetected } = parsed);
                        usedCache = true;
                    }
                }
            } catch { /* ignore */ }

            if (!usedCache) {
                try {
                    const ctrl = new AbortController();
                    const tid = setTimeout(() => ctrl.abort(), 6000);
                    const res = await fetch("https://ipapi.co/json/", { signal: ctrl.signal });
                    clearTimeout(tid);
                    const data = await res.json();
                    ip = data.ip || "Unavailable";
                    ispName = data.org || "Unknown ISP";
                    city = data.city || "";
                    country = data.country_name || "";
                    countryCode = data.country_code || "";
                    const vpnKeywords = ["vpn", "mullvad", "nordvpn", "expressvpn", "surfshark", "cyberghost", "protonvpn", "torguard", "ipvanish", "windscribe"];
                    vpnDetected = vpnKeywords.some(k => ispName.toLowerCase().includes(k));
                } catch {
                    try {
                        const res = await fetch("https://api.ipify.org?format=json");
                        ip = (await res.json()).ip || "Unavailable";
                    } catch { ip = "Unavailable"; }
                }

                try {
                    const res = await fetch("https://api64.ipify.org?format=json");
                    const data = await res.json();
                    if (data.ip?.includes(":")) ipv6 = data.ip;
                } catch { /* ignore */ }

                try {
                    sessionStorage.setItem(IP_CACHE_KEY, JSON.stringify({
                        ts: Date.now(), ip, ipv6, ispName, city, country, countryCode, vpnDetected,
                    }));
                } catch { /* ignore */ }
            }

            setIpLoading(false);
            setStats({
                browserName, browserVersion, osName, language,
                connectionType: connType, connectionSpeed: connSpeed, latency,
                ip, ipv6, ispName, city, country, countryCode, vpnDetected,
                resolution: screenRes, windowSize: windowSizeVal, pixelRatio: pixelRatioVal,
                colorDepth: colorDepthVal, orientation, touchSupport,
                cpuCores: cpu, ram, webglVendor: webgl,
                batteryLevel, batteryCharging,
                persistence, doNotTrack: dnt, adBlocker,
                userAgent: ua, timezone: tz,
            });
            setLoading(false);
        };
        fetchStats();
    }, []);

    // WebRTC leak detection
    useEffect(() => {
        const detect = async () => {
            try {
                const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
                pc.createDataChannel("");
                const ips = new Set<string>();
                await new Promise<void>((resolve) => {
                    pc.onicecandidate = (e) => {
                        if (!e.candidate) { resolve(); return; }
                        const m = e.candidate.candidate.match(/(\d{1,3}\.){3}\d{1,3}/);
                        if (m) ips.add(m[0]);
                    };
                    pc.createOffer().then(o => pc.setLocalDescription(o));
                    setTimeout(resolve, 3000);
                });
                pc.close();
                setWebrtcLeak(ips.size > 0 ? `Detected: ${[...ips].join(", ")}` : "No Leak");
            } catch {
                setWebrtcLeak("Unsupported");
            }
            setWebrtcLoading(false);
        };
        detect();
    }, []);

    // Live viewport updates on resize/zoom
    useEffect(() => {
        const onResize = () => setStats(prev => prev ? {
            ...prev,
            windowSize: `${window.innerWidth} × ${window.innerHeight}`,
            pixelRatio: `${window.devicePixelRatio}x`,
            resolution: `${window.screen.width} × ${window.screen.height}`,
        } : prev);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const checkCookies = () => setStats(prev => prev
        ? { ...prev, persistence: navigator.cookieEnabled ? "ENABLED" : "DISABLED" }
        : prev
    );

    const copyAllInfo = async () => {
        if (!stats) return;
        const text = [
            "MySupportInfo — Device Diagnostic Report",
            `Generated: ${new Date().toLocaleString()}`,
            "",
            "─── BROWSER ───────────────────────────────",
            `Browser:       ${stats.browserName} ${stats.browserVersion}`,
            `OS:            ${stats.osName}`,
            `Language:      ${stats.language}`,
            `User Agent:    ${stats.userAgent}`,
            "",
            "─── NETWORK ───────────────────────────────",
            `IP (IPv4):     ${stats.ip}`,
            `IP (IPv6):     ${stats.ipv6}`,
            `Location:      ${[stats.city, stats.country].filter(Boolean).join(", ") || "Unknown"}`,
            `ISP:           ${stats.ispName}`,
            `VPN Detected:  ${stats.vpnDetected ? "Yes" : "No"}`,
            `WebRTC Leak:   ${webrtcLoading ? "Scanning…" : webrtcLeak}`,
            `Connection:    ${stats.connectionType} — ${stats.connectionSpeed}`,
            `Latency RTT:   ${stats.latency}`,
            "",
            "─── HARDWARE ──────────────────────────────",
            `Screen:        ${stats.resolution} (${stats.colorDepth})`,
            `Viewport:      ${stats.windowSize} (DPR: ${stats.pixelRatio})`,
            `CPU Cores:     ${stats.cpuCores}`,
            `RAM:           ${stats.ram}`,
            `GPU:           ${stats.webglVendor}`,
            `Battery:       ${stats.batteryLevel} — ${stats.batteryCharging}`,
            `Touch:         ${stats.touchSupport}`,
            `Orientation:   ${stats.orientation}`,
            "",
            "─── PRIVACY ───────────────────────────────",
            `Cookies:       ${stats.persistence}`,
            `Do Not Track:  ${stats.doNotTrack}`,
            `Ad Blocker:    ${stats.adBlocker}`,
            `Timezone:      ${stats.timezone}`,
            `Time:          ${currentTime}`,
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

    // Switch to full-page capture mode, screenshot, then restore tab view
    const downloadReport = async () => {
        const element = reportRef.current;
        if (!element) return;
        setDownloading(true);
        setIsCapturing(true);
        await new Promise(r => setTimeout(r, 300)); // wait for DOM to repaint all stacked sections
        try {
            const html2canvas = (await import("html2canvas")).default;
            const canvas = await html2canvas(element, {
                backgroundColor: "#FAF6F0",
                scale: 2,
                logging: false,
                useCORS: true,
                width: element.scrollWidth,
                height: element.scrollHeight,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                x: 0,
                y: 0,
            });
            const link = document.createElement("a");
            link.download = `mysupportinfo-${Date.now()}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch (err) {
            console.error("Screenshot capture failed:", err);
        } finally {
            setIsCapturing(false);
            setDownloading(false);
        }
    };

    // ─── Card component ───────────────────────────────────────────────
    const iconBgClass = (s: "good" | "warn" | "bad" | "info") => ({
        good: "bg-secondary/10 text-secondary",
        warn: "bg-yellow-50 text-yellow-600",
        bad:  "bg-red-50 text-red-400",
        info: "bg-secondary/10 text-secondary",
    }[s]);

    const Card = ({
        icon: Icon, title, value, subtext, tooltip,
        status = "info", fullWidth = false, isCode = false,
    }: {
        icon: React.ComponentType<{ className?: string; size?: number }>;
        title: string;
        value?: string | React.ReactNode;
        subtext: string;
        tooltip?: string;
        status?: "good" | "warn" | "bad" | "info";
        fullWidth?: boolean;
        isCode?: boolean;
    }) => (
        <div className={`bg-white border-2 border-background-dark shadow-block-sm p-5 rounded-2xl flex flex-col justify-between hover:bg-background/20 transition-all duration-300 ${fullWidth ? "col-span-1 md:col-span-2" : ""}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 ${iconBgClass(status)} rounded-lg`}>
                        <Icon size={16} />
                    </div>
                    <span className="text-background-dark/70 font-semibold text-[10px] uppercase tracking-[0.18em]">{title}</span>
                </div>
                {tooltip && (
                    <div className="relative group/tip">
                        <Info size={14} className="text-background-dark/25 cursor-help select-none group-hover/tip:text-background-dark/60 transition-colors" />
                        <div className="absolute right-0 bottom-7 w-56 bg-background-dark text-accent text-[10px] rounded-xl p-3 z-50 shadow-xl leading-relaxed border border-accent/10 opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity duration-200">
                            {tooltip}
                        </div>
                    </div>
                )}
            </div>
            <div>
                {isCode ? (
                    <div className="font-mono text-[11px] text-accent bg-background-dark p-3 rounded-lg break-all leading-relaxed">
                        {value}
                    </div>
                ) : (
                    <div className="text-xl font-bold text-background-dark mb-1 leading-tight break-all">{value}</div>
                )}
                <div className="text-[10px] text-background-dark/60 mt-2 leading-tight font-medium">{subtext}</div>
            </div>
        </div>
    );

    // ─── Shared status values ─────────────────────────────────────────
    const webrtcStatus: "good" | "warn" | "bad" | "info" =
        webrtcLoading ? "info"
        : webrtcLeak === "No Leak" ? "good"
        : webrtcLeak === "Unsupported" ? "info"
        : "bad";

    const privacySummary = !loading && !webrtcLoading
        ? [
            webrtcLeak === "No Leak" ? "✓ No WebRTC leak" : "⚠ WebRTC may leak",
            stats?.doNotTrack === "ENABLED" ? "✓ DNT on" : "– DNT off",
            stats?.adBlocker === "Detected" ? "✓ Ad blocker" : "– No ad blocker",
            stats?.vpnDetected ? "✓ VPN detected" : "– No VPN",
          ].join("  ·  ")
        : "Analysing privacy posture…";

    // ─── Tab card grids (shared between tab view and capture view) ────
    const networkCards = (
        <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Card
                    icon={Globe}
                    title="IP Address (IPv4)"
                    value={ipLoading ? "Scanning…" : (
                        <span className="flex items-center gap-2 flex-wrap">
                            {stats?.countryCode && (
                                <span className="text-2xl leading-none select-none">{flagEmoji(stats.countryCode)}</span>
                            )}
                            <span className="font-mono break-all">{stats?.ip}</span>
                            {stats?.vpnDetected && (
                                <span className="text-[9px] font-black uppercase tracking-wider bg-yellow-100 text-yellow-700 border border-yellow-300 px-2 py-0.5 rounded-full">VPN</span>
                            )}
                        </span>
                    )}
                    subtext={ipLoading ? "Resolving your public address…" : [stats?.city, stats?.country].filter(Boolean).join(", ") || "Location unknown"}
                    tooltip="Your public IPv4 address as seen by the internet. Assigned by your ISP or router NAT."
                />
                <Card
                    icon={Globe}
                    title="IPv6 Address"
                    value={ipLoading ? "Scanning…" : (stats?.ipv6 || "Not Available")}
                    subtext="IPv6 is available when your ISP and router support dual-stack networking."
                    tooltip="Next-gen IP addressing with a vastly larger address space. Only shown when your connection supports it."
                    status={!ipLoading && stats?.ipv6 !== "Not Available" ? "good" : "info"}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Card
                    icon={Wifi}
                    title="ISP / Network"
                    value={ipLoading ? "Scanning…" : stats?.ispName}
                    subtext="Your Internet Service Provider or mobile carrier organisation."
                    tooltip="Derived from your IP's ASN (Autonomous System Number) registration data."
                />
                <Card
                    icon={ShieldCheck}
                    title="WebRTC Leak"
                    value={webrtcLoading ? "Scanning…" : (
                        <span className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${webrtcLeak === "No Leak" ? "bg-secondary" : webrtcLeak === "Unsupported" ? "bg-background-dark/30" : "bg-red-400"}`} />
                            {webrtcLeak}
                        </span>
                    )}
                    subtext="Detects if your real IP is exposed via WebRTC even when using a VPN."
                    tooltip="WebRTC can bypass VPN tunnels. 'No Leak' means your real IP is not being exposed to websites."
                    status={webrtcStatus}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card
                    icon={Signal}
                    title="Connection Type"
                    value={loading ? "…" : stats?.connectionType}
                    subtext="Effective network generation from the Network Information API."
                    tooltip="4G = fast cellular or WiFi. Values come from the browser's Network Information API."
                    status={loading ? "info" : (stats?.connectionType === "4G" ? "good" : "warn")}
                />
                <Card
                    icon={Zap}
                    title="Estimated Speed"
                    value={loading ? "…" : stats?.connectionSpeed}
                    subtext="Rough downlink estimate — run Bufferbloat Test for accurate results."
                    tooltip="A browser estimate only. For real speed measurements, use the Bufferbloat Test tool."
                    status={loading ? "info" : getSpeedStatus(stats?.connectionSpeed || "")}
                />
                <Card
                    icon={Activity}
                    title="Latency (RTT)"
                    value={loading ? "…" : stats?.latency}
                    subtext="Round-trip time estimate. Under 20ms = excellent, 20–80ms = good."
                    tooltip="Lower is better. High latency causes lag in video calls, gaming, and real-time apps."
                    status={loading ? "info" : getLatencyStatus(stats?.latency || "")}
                />
            </div>
        </div>
    );

    const browserCards = (
        <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card
                    icon={Monitor}
                    title="Browser"
                    value={loading ? "…" : `${stats?.browserName} ${stats?.browserVersion}`}
                    subtext="Detected browser engine and major version number."
                    tooltip="Detected from the User Agent string. Useful for debugging browser-specific rendering issues."
                    status="good"
                />
                <Card
                    icon={HardDrive}
                    title="Operating System"
                    value={loading ? "…" : stats?.osName}
                    subtext="Host OS detected from browser client hints and user agent."
                    tooltip="Identifies the OS platform your browser runs on. Helps support teams reproduce your environment."
                />
                <Card
                    icon={Languages}
                    title="Language / Locale"
                    value={loading ? "…" : stats?.language}
                    subtext="Primary browser language and locale setting."
                    tooltip="Affects date formatting, number separators, and which language websites display by default."
                />
                <Card
                    icon={ShieldCheck}
                    title="JavaScript"
                    value={<span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-secondary flex-shrink-0" />ENABLED</span>}
                    subtext="JS is active — this page cannot load without it."
                    tooltip="If you can see this card, JavaScript is enabled and functioning correctly."
                    status="good"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card
                    icon={Terminal}
                    title="Full User Agent"
                    value={loading ? "Loading…" : stats?.userAgent}
                    subtext="Complete browser identification string sent with every HTTP request."
                    tooltip="Servers use this to identify your browser, OS, and rendering engine for compatibility checks."
                    fullWidth
                    isCode
                />
                <Card
                    icon={EyeOff}
                    title="Do Not Track"
                    value={loading ? "…" : (
                        <span className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${stats?.doNotTrack === "ENABLED" ? "bg-secondary" : "bg-background-dark/30"}`} />
                            {stats?.doNotTrack}
                        </span>
                    )}
                    subtext="Browser tracking opt-out preference signal sent to websites."
                    tooltip="When enabled, your browser requests websites not track you. Most sites do not honour it."
                    status={loading ? "info" : stats?.doNotTrack === "ENABLED" ? "good" : "info"}
                />
                <Card
                    icon={Lock}
                    title="Cookies"
                    value={loading ? "…" : (
                        <span className="flex items-center justify-between w-full">
                            <span className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${stats?.persistence === "ENABLED" ? "bg-secondary" : "bg-red-400"}`} />
                                {stats?.persistence}
                            </span>
                            {!isCapturing && (
                                <button
                                    onClick={checkCookies}
                                    className="text-[9px] text-primary font-black uppercase tracking-wider bg-background-dark px-2 py-0.5 rounded border border-background-dark hover:bg-primary hover:text-background-dark transition-colors"
                                >
                                    Re-test
                                </button>
                            )}
                        </span>
                    )}
                    subtext="Required for session management and user preference storage."
                    tooltip="Cookies store session data. If disabled, most login systems and preferences will not work."
                />
            </div>
        </div>
    );

    const hardwareCards = (
        <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card
                    icon={Monitor}
                    title="Viewport Size"
                    value={loading ? "…" : stats?.windowSize}
                    subtext={`Screen: ${stats?.resolution} · DPR: ${stats?.pixelRatio} · live on zoom`}
                    tooltip="The pixel area your browser content occupies. Updates live when you resize or zoom."
                />
                <Card
                    icon={Palette}
                    title="Color Depth"
                    value={loading ? "…" : stats?.colorDepth}
                    subtext="Bits used per pixel for the display's color range."
                    tooltip="24-bit = ~16.7 million colors (standard). 30-bit = HDR. Higher means richer images."
                />
                <Card
                    icon={Cpu}
                    title="CPU Cores"
                    value={loading ? "…" : stats?.cpuCores}
                    subtext="Logical processor threads available to the browser."
                    tooltip="More cores allow browsers and WebAssembly to run parallel tasks faster."
                />
                <Card
                    icon={HardDrive}
                    title="RAM Estimate"
                    value={loading ? "…" : stats?.ram}
                    subtext="Rounded memory bucket from the Device Memory API."
                    tooltip="Browsers report memory in buckets (0.5, 1, 2, 4, 8 GB) to resist fingerprinting."
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card
                    icon={Terminal}
                    title="WebGL / GPU"
                    value={<span className="text-sm line-clamp-2">{loading ? "…" : stats?.webglVendor}</span>}
                    subtext="GPU renderer string from the WebGL debug extension."
                    tooltip="Identifies your graphics card. Useful for diagnosing rendering and performance issues."
                    fullWidth
                />
                <Card
                    icon={Battery}
                    title="Battery"
                    value={loading ? "…" : (stats?.batteryLevel === "N/A" ? "Desktop / N/A" : `${stats?.batteryLevel} — ${stats?.batteryCharging}`)}
                    subtext="Charge level and status from the Battery Status API."
                    tooltip="Available on laptops and mobile. Desktop PCs report N/A. Helps diagnose performance issues."
                    status={loading ? "info" : getBatteryStatus(stats?.batteryLevel || "N/A")}
                />
                <Card
                    icon={Smartphone}
                    title="Touch Support"
                    value={loading ? "…" : stats?.touchSupport}
                    subtext="Touchscreen capability from maxTouchPoints API."
                    tooltip="Affects how events fire. Touch devices support gestures; mice use click/hover events."
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card
                    icon={Layout}
                    title="Screen Orientation"
                    value={loading ? "…" : stats?.orientation}
                    subtext="Current orientation from the Screen Orientation API."
                    tooltip="Landscape for desktops. Portrait for phones held upright. Affects responsive layout breakpoints."
                />
                <Card
                    icon={MapPin}
                    title="Timezone"
                    value={loading ? "…" : stats?.timezone}
                    subtext="Local timezone via Intl.DateTimeFormat API."
                    tooltip="Used by web apps to show times in your local zone. Can differ from your IP geolocation."
                />
                <Card
                    icon={Clock}
                    title="System Clock"
                    value={currentTime || "…"}
                    subtext="Live clock synchronized with your device's system time."
                    tooltip="Clock drift affects SSL certificate validation and TOTP 2FA codes — keep system time accurate."
                />
            </div>
        </div>
    );

    const privacyCards = (
        <div className="space-y-3">
            <div className="bg-background-dark border-2 border-background-dark rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <p className="text-[9px] text-accent/50 uppercase tracking-[0.3em] font-bold mb-1">Privacy Snapshot</p>
                    <p className="text-sm font-medium text-accent/90 leading-relaxed">{privacySummary}</p>
                </div>
                <div className="flex items-center gap-2 bg-background/5 border border-accent/15 rounded-xl px-3 py-2 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-[9px] text-accent/60 font-bold uppercase tracking-wider">Client-side only</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Card
                    icon={ShieldCheck}
                    title="WebRTC Leak"
                    value={webrtcLoading ? "Scanning…" : (
                        <span className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${webrtcLeak === "No Leak" ? "bg-secondary" : webrtcLeak === "Unsupported" ? "bg-background-dark/30" : "bg-red-400"}`} />
                            {webrtcLeak}
                        </span>
                    )}
                    subtext="Checks if your real IP is exposed through WebRTC even behind a VPN."
                    tooltip="A WebRTC leak can reveal your real IP to sites even when using a VPN. 'No Leak' means you're safe."
                    status={webrtcStatus}
                />
                <Card
                    icon={stats?.vpnDetected ? ShieldAlert : ShieldCheck}
                    title="VPN Detection"
                    value={ipLoading ? "Scanning…" : (
                        <span className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${stats?.vpnDetected ? "bg-yellow-400" : "bg-background-dark/30"}`} />
                            {stats?.vpnDetected ? "VPN Detected" : "No VPN Detected"}
                        </span>
                    )}
                    subtext="Heuristic check against known VPN provider organisation names."
                    tooltip="Checks if your ISP name matches known VPN providers. Heuristic only — not 100% conclusive."
                    status={stats?.vpnDetected ? "warn" : "info"}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Card
                    icon={EyeOff}
                    title="Do Not Track"
                    value={loading ? "…" : (
                        <span className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${stats?.doNotTrack === "ENABLED" ? "bg-secondary" : "bg-background-dark/30"}`} />
                            {stats?.doNotTrack}
                        </span>
                    )}
                    subtext="Browser tracking opt-out preference signal."
                    tooltip="A request to websites not to track you. Most sites do not honour this header."
                    status={loading ? "info" : stats?.doNotTrack === "ENABLED" ? "good" : "info"}
                />
                <Card
                    icon={ShieldAlert}
                    title="Ad Blocker"
                    value={loading ? "Detecting…" : (
                        <span className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${stats?.adBlocker === "Detected" ? "bg-secondary" : "bg-background-dark/30"}`} />
                            {stats?.adBlocker}
                        </span>
                    )}
                    subtext="Checks if an ad-filtering browser extension is active."
                    tooltip="Detected by injecting a hidden element with ad-class names and checking if it was removed."
                    status={loading ? "info" : stats?.adBlocker === "Detected" ? "good" : "info"}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Card
                    icon={Lock}
                    title="Cookies"
                    value={loading ? "…" : (
                        <span className="flex items-center justify-between w-full">
                            <span className="flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${stats?.persistence === "ENABLED" ? "bg-secondary" : "bg-red-400"}`} />
                                {stats?.persistence}
                            </span>
                            {!isCapturing && (
                                <button onClick={checkCookies} className="text-[9px] text-primary font-black uppercase tracking-wider bg-background-dark px-2 py-0.5 rounded border border-background-dark hover:bg-primary hover:text-background-dark transition-colors">Re-test</button>
                            )}
                        </span>
                    )}
                    subtext="Browser cookie acceptance state."
                    tooltip="Cookies are required by most websites for session management. Disabling breaks most logins."
                />
                <Card
                    icon={ShieldCheck}
                    title="JavaScript"
                    value={<span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-secondary flex-shrink-0" />ENABLED</span>}
                    subtext="JS is active — this diagnostic tool requires it to run."
                    tooltip="This page requires JavaScript. If you see this card, JS is working correctly."
                    status="good"
                />
            </div>
        </div>
    );

    // ─── Tab config ───────────────────────────────────────────────────
    const tabConfig: { id: TabType; label: string; icon: React.ComponentType<{ className?: string; size?: number }> }[] = [
        { id: "network",  label: "Network",  icon: Wifi          },
        { id: "browser",  label: "Browser",  icon: Globe      },
        { id: "hardware", label: "Hardware", icon: Cpu        },
        { id: "privacy",  label: "Privacy",  icon: ShieldCheck  },
    ];

    const tabSections: { id: TabType; label: string; content: React.ReactNode }[] = [
        { id: "network",  label: "Network",  content: networkCards  },
        { id: "browser",  label: "Browser",  content: browserCards  },
        { id: "hardware", label: "Hardware", content: hardwareCards },
        { id: "privacy",  label: "Privacy",  content: privacyCards  },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/40 font-sans pb-24">

            {/* ── Hero ──────────────────────────────────────────────── */}
            <div className="text-center px-6 pt-16 pb-10">
                <h1 className="font-serif leading-none mb-6 select-none">
                    <span className="block text-5xl md:text-7xl lg:text-[5.5rem] font-light text-background-dark tracking-tight">
                        Device Detection
                    </span>
                    <span className="block text-6xl md:text-8xl lg:text-[7rem] font-bold text-primary italic tracking-tight -mt-2">
                        Dashboard
                    </span>
                </h1>
                <p className="text-sm md:text-base text-background-dark/70 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
                    Instant client-side technical analysis of your environment. Inspect network, hardware, browser, and privacy posture — all in one panel.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={copyAllInfo}
                        className="flex items-center gap-2 px-6 py-2.5 bg-background-dark text-white border-2 border-background-dark shadow-block hover:bg-foreground active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all rounded-xl text-sm font-bold"
                    >
                        <Copy size={15} />
                        {copied ? "Copied!" : "Copy All Info"}
                    </button>
                    <button
                        onClick={shareLink}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white text-background-dark border-2 border-background-dark shadow-block-sm rounded-xl text-sm font-bold hover:bg-accent/20 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                    >
                        <Share2 size={15} />
                        {urlCopied ? "Copied!" : "Share Link"}
                    </button>
                </div>
            </div>

            {/* ── Report wrapper (screenshot capture area) ──────────── */}
            <div ref={reportRef} className="bg-background w-full px-6 py-4">

                {/* Orb */}
                <div className="flex justify-center px-4 mb-16">
                    <div className="relative w-full max-w-[560px] aspect-square rounded-full flex flex-col items-center justify-center overflow-hidden bg-background-dark border-4 border-accent/25 shadow-block">
                        <div className="absolute inset-4 rounded-full border-2 border-dashed border-accent/15 pointer-events-none" />
                        <div className="relative z-10 flex flex-col items-center text-center px-10">
                            <span className="text-[9px] text-accent/75 uppercase tracking-[0.35em] font-bold mb-4">Main Browser</span>
                            <h2 className="font-serif font-bold text-white mb-7" style={{ fontSize: "clamp(2.4rem, 8vw, 4rem)", lineHeight: 1.05 }}>
                                {loading ? "…" : `${stats?.browserName} ${stats?.browserVersion}`}
                            </h2>
                            <div className="flex items-start gap-10 mb-9">
                                <div className="text-center">
                                    <p className="text-[8px] text-accent/60 uppercase tracking-[0.3em] font-bold mb-1.5">OS Environment</p>
                                    <p className="text-base font-semibold text-accent">{loading ? "…" : stats?.osName}</p>
                                </div>
                                <div className="w-px h-10 bg-accent/20 self-center" />
                                <div className="text-center max-w-[120px] sm:max-w-none mx-auto">
                                    <p className="text-[8px] text-accent/60 uppercase tracking-[0.3em] font-bold mb-1.5">Global IP</p>
                                    <p className="text-xs sm:text-base font-semibold text-accent font-mono tabular-nums break-all">{ipLoading ? "…" : stats?.ip}</p>
                                </div>
                            </div>
                            {!isCapturing && (
                                <button
                                    onClick={downloadReport}
                                    disabled={loading || downloading}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-primary border-2 border-background-dark shadow-block-sm text-background-dark rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-primary-dark active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all disabled:opacity-40"
                                >
                                    <Download size={13} />
                                    {downloading ? "Generating…" : "Download Screenshot Report"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Tabs / Capture area ───────────────────────────── */}
                <div className="max-w-6xl mx-auto">
                    {isCapturing ? (
                        // Full-page capture mode: all sections stacked, no tab bar
                        <div className="space-y-10">
                            {tabSections.map(section => (
                                <div key={section.id}>
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-background-dark/10">
                                        {React.createElement(tabConfig.find(t => t.id === section.id)?.icon || Globe, {
                                            size: 16,
                                            className: "text-primary",
                                        })}
                                        <span className="text-[11px] font-bold text-background-dark uppercase tracking-[0.25em]">
                                            {section.label}
                                        </span>
                                    </div>
                                    {section.content}
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Normal tab view
                        <>
                            {/* Tab bar */}
                            <div className="flex gap-1 bg-background-dark/5 border-2 border-background-dark/10 rounded-2xl p-1 mb-8 overflow-x-auto">
                                {tabConfig.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                                            activeTab === tab.id
                                                ? "bg-background-dark text-white shadow-block-sm"
                                                : "text-background-dark/50 hover:text-background-dark"
                                        }`}
                                    >
                                        <tab.icon size={14} />
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Active tab content */}
                            {tabSections.map(section => (
                                activeTab === section.id && (
                                    <FadeIn key={section.id}>
                                        {section.content}
                                    </FadeIn>
                                )
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* ── Navigation cards ──────────────────────────────────── */}
            <main className="max-w-6xl mx-auto">
                <FadeIn delay={0.3} className="mt-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <Link href="/bufferbloat" className="group relative overflow-hidden rounded-3xl bg-background-dark border-2 border-background-dark shadow-block hover:scale-[1.02] transition-all duration-300">
                            <div className="p-8 flex flex-col justify-between min-h-[260px]">
                                <div>
                                    <div className="size-12 rounded-2xl bg-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        <Signal size={22} className="text-background-dark" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">Bufferbloat Test</h3>
                                    <p className="text-accent text-sm leading-relaxed">Analyse network latency under load to detect lag in gaming, calls, and streaming.</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-primary font-bold uppercase tracking-widest text-[10px] mt-6">
                                    <span>Run Diagnostic</span>
                                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>

                        <Link href="/privacy" className="group relative overflow-hidden rounded-3xl bg-accent border-2 border-background-dark shadow-block hover:scale-[1.02] transition-all duration-300">
                            <div className="p-8 flex flex-col justify-between min-h-[260px]">
                                <div>
                                    <div className="size-12 rounded-2xl bg-background-dark flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        <EyeOff size={22} className="text-accent" />
                                    </div>
                                    <h3 className="text-lg font-bold text-background-dark mb-2">Privacy Centre</h3>
                                    <p className="text-background-dark/80 text-sm leading-relaxed">Review how we handle your data locally — zero tracking, GDPR compliant.</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-background-dark font-bold uppercase tracking-widest text-[10px] mt-6">
                                    <span>View Policy</span>
                                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>

                        <Link href="/faq" className="group relative overflow-hidden rounded-3xl bg-white border-2 border-background-dark shadow-block hover:scale-[1.02] transition-all duration-300">
                            <div className="p-8 flex flex-col justify-between min-h-[260px]">
                                <div>
                                    <div className="size-12 rounded-2xl bg-secondary/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        <HelpCircle size={22} className="text-secondary" />
                                    </div>
                                    <h3 className="text-lg font-bold text-background-dark mb-2">Knowledge Base</h3>
                                    <p className="text-background-dark/70 text-sm leading-relaxed">Common questions about network testing, privacy, and what each metric means.</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-background-dark font-bold uppercase tracking-widest text-[10px] mt-6">
                                    <span>Read FAQ</span>
                                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </FadeIn>
            </main>
        </div>
    );
}
