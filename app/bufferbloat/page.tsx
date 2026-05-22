"use client";

import React, { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { BufferbloatEngine, TestResult } from "@/lib/bufferbloat-engine";
import Link from "next/link";
import { ResultsCharts } from "@/components/bufferbloat/ResultsCharts";

export interface RunMetrics {
    progress: number;
    download: number;
    latency: number;
    jitter: number;
    upload: number;
}

function getPhaseLabel(progress: number): string {
    if (progress < 50) return "Measuring Download…";
    if (progress < 80) return "Measuring Upload…";
    return "Calculating Baseline…";
}

function gradeColor(grade: string | undefined): string {
    if (grade === "A" || grade === "B") return "#009E52";
    if (grade === "C" || grade === "D") return "#FF8E60";
    if (grade === "F") return "#ef4444";
    return "rgba(0,73,62,0.5)";
}

function gradeBgClass(grade: string | undefined): string {
    if (grade === "A") return "bg-secondary shadow-glow-green";
    if (grade === "B") return "bg-secondary/80 shadow-glow-green-md";
    if (grade === "C") return "bg-primary shadow-glow-orange";
    if (grade === "D") return "bg-primary/80 shadow-glow-orange-md";
    if (grade === "F") return "bg-red-500 shadow-glow-red";
    return "bg-background-dark/10";
}

function gradeLabel(grade: string | undefined): string {
    if (grade === "A") return "No Bufferbloat";
    if (grade === "B") return "Minimal Bufferbloat";
    if (grade === "C") return "Moderate Bufferbloat";
    if (grade === "D") return "Significant Bufferbloat";
    if (grade === "F") return "Severe Bufferbloat";
    return "Not Tested";
}

export default function BufferbloatPage() {
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<TestResult | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [runMetrics, setRunMetrics] = useState<RunMetrics | null>(null);
    const [metricsHistory, setMetricsHistory] = useState<RunMetrics[]>([]);

    const startTest = async () => {
        setIsRunning(true);
        setProgress(0);
        setRunMetrics(null);
        setMetricsHistory([]);
        setResult(null);

        const engine = new BufferbloatEngine((data) => {
            setProgress(data.progress);
            setRunMetrics(data);
            setMetricsHistory(prev => [...prev, data]);
        });
        const data = await engine.runTest();
        setResult(data);
        setIsRunning(false);
    };

    const circumference = 816;
    const offset = circumference - (progress / 100) * circumference;

    const gaugeLabel = isRunning
        ? (runMetrics && runMetrics.progress < 50 ? "Download" : runMetrics && runMetrics.progress < 80 ? "Upload" : "Analysing")
        : result ? "Download" : "Ready";

    const hasData = metricsHistory.length > 0;

    return (
        <div className="flex flex-col overflow-x-hidden text-foreground">
            <main className="max-w-site mx-auto px-6 py-12 w-full">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/" className="text-background-dark/60 text-sm font-semibold hover:text-background-dark transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-sm text-background-dark/40">chevron_right</span>
                    <span className="text-background-dark text-sm font-extrabold">Bufferbloat Test</span>
                </div>

                {/* Hero */}
                <FadeIn>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-background-dark">Bufferbloat Test</h1>
                        <p className="text-background-dark/70 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                            See how your connection holds up under real load. Detects hidden lag that causes stuttering in games, video calls, and streaming — even on fast connections.
                        </p>
                    </div>
                </FadeIn>

                {/* Main Test Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

                    {/* Gauge Panel */}
                    <div className="lg:col-span-8 bg-white border-2 border-background-dark shadow-block rounded-2xl p-5 sm:p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />

                        {/* Circular Gauge */}
                        <div className="relative w-full max-w-xs aspect-square flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 288 288">
                                <circle className="text-background-dark/5" cx="144" cy="144" fill="transparent" r="130" stroke="currentColor" strokeWidth="14" />
                                <circle
                                    className="text-primary drop-shadow-orange transition-all duration-300 ease-out"
                                    cx="144" cy="144" fill="transparent" r="130"
                                    stroke="currentColor"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                    strokeLinecap="round"
                                    strokeWidth="14"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-background-dark/60 text-xs font-bold uppercase tracking-widest mb-1">{gaugeLabel}</span>
                                <div className="text-5xl sm:text-6xl font-black text-background-dark tabular-nums">
                                    {result
                                        ? result.download
                                        : runMetrics
                                            ? runMetrics.download.toFixed(1)
                                            : <span className="text-background-dark/30">--</span>}
                                </div>
                                <span className="text-background-dark/60 text-lg font-semibold uppercase">Mbps</span>
                            </div>
                        </div>

                        {/* 3 Metrics */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 mt-8 sm:mt-12 w-full max-w-sm sm:max-w-lg">
                            <div className="text-center">
                                <span className="material-symbols-outlined text-secondary mb-2 text-3xl">network_ping</span>
                                <div className="text-2xl font-bold text-background-dark tabular-nums">
                                    {result
                                        ? <>{result.latency}<span className="text-sm font-semibold text-background-dark/50 ml-1">ms</span></>
                                        : runMetrics
                                            ? <>{runMetrics.latency}<span className="text-sm font-semibold text-background-dark/50 ml-1">ms</span></>
                                            : <span className="text-background-dark/30 text-xl">--</span>}
                                </div>
                                <div className="text-3xs text-background-dark/50 font-bold uppercase tracking-wider">
                                    {result ? "Bloat" : "Latency"}
                                </div>
                            </div>
                            <div className="text-center border-x border-background-dark/10 px-4">
                                <span className="material-symbols-outlined text-secondary mb-2 text-3xl">waves</span>
                                <div className="text-2xl font-bold text-background-dark tabular-nums">
                                    {result
                                        ? <>{result.jitter}<span className="text-sm font-semibold text-background-dark/50 ml-1">ms</span></>
                                        : runMetrics
                                            ? <>{runMetrics.jitter}<span className="text-sm font-semibold text-background-dark/50 ml-1">ms</span></>
                                            : <span className="text-background-dark/30 text-xl">--</span>}
                                </div>
                                <div className="text-3xs text-background-dark/50 font-bold uppercase tracking-wider">Jitter</div>
                            </div>
                            <div className="text-center">
                                <span className="material-symbols-outlined text-secondary mb-2 text-3xl">upload</span>
                                <div className="text-2xl font-bold text-background-dark tabular-nums">
                                    {result
                                        ? <>{result.upload}<span className="text-sm font-semibold text-background-dark/50 ml-1">Mbps</span></>
                                        : runMetrics
                                            ? <>{runMetrics.upload.toFixed(1)}<span className="text-sm font-semibold text-background-dark/50 ml-1">Mbps</span></>
                                            : <span className="text-background-dark/30 text-xl">--</span>}
                                </div>
                                <div className="text-3xs text-background-dark/50 font-bold uppercase tracking-wider">Upload</div>
                            </div>
                        </div>

                        {/* Phase indicator */}
                        {isRunning && runMetrics && (
                            <div className="mt-6 flex items-center gap-2 text-background-dark/70 text-sm font-semibold">
                                <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                                {getPhaseLabel(runMetrics.progress)}
                                <span className="text-primary font-black">{runMetrics.progress}%</span>
                            </div>
                        )}

                        {/* Run Test Button */}
                        <div className="mt-8">
                            <button
                                onClick={startTest}
                                disabled={isRunning}
                                className="px-8 sm:px-16 h-12 sm:h-14 rounded-full bg-primary border-2 border-background-dark shadow-block-sm text-foreground font-black text-base sm:text-xl hover:scale-105 active:scale-95 hover:bg-primary-dark transition-all flex items-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <span className="material-symbols-outlined">{isRunning ? "sync" : "play_arrow"}</span>
                                {isRunning ? "TESTING…" : result ? "RUN AGAIN" : "RUN TEST"}
                            </button>
                        </div>
                    </div>

                    {/* Grade Panel */}
                    <div className="lg:col-span-4">
                        <div className="bg-accent/25 border-2 border-background-dark shadow-block rounded-2xl p-8 flex flex-col items-center text-center h-full relative overflow-hidden">

                            {/* Traffic lights — A/B green, C/D orange, F red */}
                            <div className="absolute top-0 right-0 p-4">
                                <div className="flex flex-col gap-2 p-1.5 bg-white/40 rounded-full border border-background-dark/10">
                                    <div className={`w-4 h-4 rounded-full transition-all ${result?.grade === "A" || result?.grade === "B" ? "bg-secondary ring-4 ring-offset-2 ring-offset-background shadow-glow-green-sm" : "bg-secondary/20"}`} />
                                    <div className={`w-4 h-4 rounded-full transition-all ${result?.grade === "C" || result?.grade === "D" ? "bg-primary ring-4 ring-offset-2 ring-offset-background shadow-glow-orange-sm" : "bg-primary/20"}`} />
                                    <div className={`w-4 h-4 rounded-full transition-all ${result?.grade === "F" ? "bg-red-500 ring-4 ring-offset-2 ring-offset-background shadow-glow-red-sm" : "bg-red-500/20"}`} />
                                </div>
                            </div>

                            <div className="text-xs font-black text-background-dark/70 uppercase tracking-ui mb-8">Network Quality Grade</div>

                            {/* Grade circle */}
                            <div className="relative mb-6">
                                <div
                                    className="absolute inset-0 blur-3xl rounded-full"
                                    style={{ backgroundColor: result?.grade ? `${gradeColor(result.grade)}33` : "rgba(255,196,183,0.1)" }}
                                />
                                <div
                                    className="relative w-36 h-36 rounded-full border-4 flex items-center justify-center"
                                    style={{ borderColor: result?.grade ? `${gradeColor(result.grade)}44` : "rgba(0,73,62,0.1)" }}
                                >
                                    <div className={`w-28 h-28 rounded-full flex items-center justify-center text-white text-7xl font-black shadow-lg ${gradeBgClass(result?.grade)}`}>
                                        {result?.grade || "?"}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3" style={{ color: gradeColor(result?.grade) }}>
                                {gradeLabel(result?.grade)}
                            </h3>

                            <p className="text-sm text-background-dark/80 leading-relaxed mb-6 font-medium">
                                {result
                                    ? `Latency rose by ${result.latency} ms under load. ${result.latency <= 5 ? "Your connection handles congestion perfectly." : result.latency <= 30 ? "Minor buffering, generally unnoticeable." : "Consider enabling SQM or QoS on your router."}`
                                    : "Run the test to see how your connection handles congestion."}
                            </p>

                            {/* Bloat bar — shown after test */}
                            {result && (
                                <div className="w-full pt-6 border-t border-background-dark/10">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold uppercase text-background-dark/60">Bloat Increase</span>
                                        <span className="text-sm font-black" style={{ color: gradeColor(result.grade) }}>+{result.latency} ms</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-background-dark/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full transition-all duration-700 rounded-full"
                                            style={{
                                                width: `${Math.min((result.latency / 120) * 100, 100)}%`,
                                                backgroundColor: gradeColor(result.grade),
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-4xs text-background-dark/30 font-bold mt-1">
                                        <span>0 ms</span>
                                        <span>60 ms</span>
                                        <span>120+ ms</span>
                                    </div>
                                </div>
                            )}

                            {/* How it works — shown before test */}
                            {!result && !isRunning && (
                                <div className="w-full pt-6 border-t border-background-dark/10 space-y-3">
                                    <p className="text-4xs text-background-dark/50 uppercase tracking-ui font-black mb-4">How the test works</p>
                                    {[
                                        { icon: "download", label: "Phase 1", desc: "Saturates your download" },
                                        { icon: "upload", label: "Phase 2", desc: "Saturates your upload" },
                                        { icon: "analytics", label: "Phase 3", desc: "Compares latency before & during load" },
                                    ].map(item => (
                                        <div key={item.label} className="flex items-center gap-3 text-left">
                                            <span className="material-symbols-outlined text-primary text-base">{item.icon}</span>
                                            <div>
                                                <span className="text-3xs font-black text-background-dark/50 uppercase tracking-wider">{item.label} · </span>
                                                <span className="text-xs text-background-dark/70 font-medium">{item.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Live Charts — only rendered once test data exists */}
                {hasData && (
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary">show_chart</span>
                            <h2 className="text-xl font-extrabold text-background-dark">Live Test Results</h2>
                            {result && (
                                <span className="ml-auto text-xs font-black text-secondary uppercase tracking-wider bg-secondary/10 px-3 py-1 rounded-full">
                                    Test Complete
                                </span>
                            )}
                        </div>
                        <ResultsCharts data={metricsHistory} />
                    </section>
                )}

                {/* Grading Scale + How to Fix */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-background-dark/10">

                    {/* Grading Scale */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined">format_list_bulleted</span>
                            </div>
                            <h2 className="text-xl font-extrabold text-background-dark">Grading Scale</h2>
                        </div>
                        <div className="space-y-2">
                            {[
                                { grade: "A", label: "Excellent", range: "0–5 ms increase",    desc: "No bufferbloat. Perfect for gaming, video calls, and remote work.",      bg: "bg-secondary",     color: "#009E52" },
                                { grade: "B", label: "Good",      range: "6–30 ms increase",   desc: "Minimal bufferbloat. Slight lag under heavy load, generally fine.",    bg: "bg-secondary/80",  color: "#009E52" },
                                { grade: "C", label: "Fair",      range: "31–60 ms increase",  desc: "Moderate bufferbloat. Noticeable lag during large downloads.",          bg: "bg-primary",     color: "#FF8E60" },
                                { grade: "D", label: "Poor",      range: "61–100 ms increase", desc: "Significant bufferbloat. Games stutter and calls drop. Enable SQM.",   bg: "bg-primary/80",  color: "#FF8E60" },
                                { grade: "F", label: "Bad",       range: "100+ ms increase",   desc: "Severe bufferbloat. Gaming and video calls will be very difficult.",    bg: "bg-red-500",       color: "#ef4444" },
                            ].map((item) => (
                                <div
                                    key={item.grade}
                                    className={`flex items-center gap-4 p-4 rounded-xl transition-all border ${result?.grade === item.grade ? "bg-accent/30 border-background-dark/20" : "border-transparent hover:bg-accent/10 hover:border-background-dark/10"}`}
                                >
                                    <div className={`size-11 rounded-lg ${item.bg} border-2 border-background-dark flex items-center justify-center font-black text-white text-xl flex-shrink-0`}>{item.grade}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap justify-between items-center gap-x-2">
                                            <span className="font-extrabold text-background-dark">{item.label}</span>
                                            <span className="text-xs font-extrabold uppercase" style={{ color: item.color }}>{item.range}</span>
                                        </div>
                                        <div className="text-xs text-background-dark/60 mt-0.5 font-semibold">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How to Fix */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                                <span className="material-symbols-outlined">build_circle</span>
                            </div>
                            <h2 className="text-xl font-extrabold text-background-dark">How to fix a poor score</h2>
                        </div>
                        <p className="text-background-dark/70 leading-relaxed font-semibold text-sm">
                            Got a C, D, or F? Most bufferbloat issues can be solved by adjusting a few settings on your home router.
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: "settings_suggest",         title: "Enable SQM / CAKE",           desc: "Look for 'SQM', 'CAKE', or 'fq_codel' in your router settings. This is the #1 fix for bufferbloat." },
                                { icon: "settings_input_component", title: "Set a QoS bandwidth limit",   desc: "Cap your router at 90–95% of your actual speed. This stops your modem's buffer from filling up." },
                                { icon: "router",                   title: "Upgrade your router",         desc: "ISP-provided routers often have poor buffer management. A modern router with a faster CPU helps significantly." },
                            ].map((item) => (
                                <div key={item.title} className="p-4 rounded-xl bg-white border-2 border-background-dark shadow-block-sm hover:scale-101 transition-all">
                                    <div className="font-extrabold text-secondary mb-1 flex items-center gap-2 text-sm">
                                        <span className="material-symbols-outlined text-sm">{item.icon}</span>
                                        {item.title}
                                    </div>
                                    <p className="text-sm text-background-dark/70 font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
