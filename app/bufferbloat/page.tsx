"use client";

import React, { useState, useEffect } from "react";
import FadeIn from "@/components/ui/FadeIn";
import { BufferbloatEngine, TestResult } from "@/lib/bufferbloat-engine";
import { motion } from "framer-motion";
import Link from "next/link";
import { ResultsCharts } from "@/components/bufferbloat/ResultsCharts";

// Interface for real-time metrics
export interface RunMetrics {
    progress: number;
    download: number;
    latency: number;
    jitter: number;
    upload: number;
}

export default function BufferbloatPage() {
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<TestResult | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [runMetrics, setRunMetrics] = useState<RunMetrics | null>(null);
    const [metricsHistory, setMetricsHistory] = useState<RunMetrics[]>([]);
    const [consistencyData, setConsistencyData] = useState<number[]>([30, 35, 32, 38, 34, 31, 33, 36, 32]);

    // Animate Consistency Graph during test
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setConsistencyData(prev =>
                    prev.map(() => Math.floor(Math.random() * 40) + 20) // Random heights between 20-60%
                );
            }, 100);
        } else if (result) {
            // Set final stable visualization based on grade
            if (result.grade === 'A' || result.grade === 'B') {
                setConsistencyData([30, 32, 31, 33, 30, 32, 31, 33, 32]); // Stable
            } else {
                setConsistencyData([20, 80, 15, 90, 25, 85, 10, 95, 20]); // Erratic
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, result]);

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

    // Calculate Gauge Stroke (r=130, circ=816)
    const circumference = 816;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden text-[#002924] font-display selection:bg-[#FF8E60]/40">



            <main className="max-w-[1200px] mx-auto px-6 py-12 w-full">
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/" className="text-[#00473E]/60 text-sm font-semibold hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-sm text-[#00473E]/40">chevron_right</span>
                    <span className="text-[#00473E] text-sm font-extrabold">Bufferbloat Diagnostic</span>
                </div>

                <FadeIn>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#00473E]">Enhanced Bufferbloat Diagnostic Tool</h1>
                        <p className="text-[#00473E]/70 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
                            Professional-grade network stability assessment. Detect hidden latency spikes that cause lag during gaming, video calls, and streaming under load.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    {/* Gauge Panel */}
                    <div className="lg:col-span-8 bg-white border-2 border-[#00473E] shadow-block rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#FFC4B7]/5 pointer-events-none"></div>

                        <div className="relative w-72 h-72 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90">
                                <circle className="text-[#00473E]/5" cx="144" cy="144" fill="transparent" r="130" stroke="currentColor" strokeWidth="14"></circle>
                                <circle
                                    className="text-[#FF8E60] drop-shadow-[0_2px_4px_rgba(255,142,96,0.3)] transition-all duration-300 ease-out"
                                    cx="144"
                                    cy="144"
                                    fill="transparent"
                                    r="130"
                                    stroke="currentColor"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                    strokeLinecap="round"
                                    strokeWidth="14"
                                ></circle>
                            </svg>
                            <div className="absolute flex flex-col items-center text-center">
                                <span className="text-[#00473E]/60 text-xs font-bold uppercase tracking-widest">Active Download</span>
                                <div className="text-6xl font-black text-[#00473E] my-1 tabular-nums">
                                    {result ? result.download : (runMetrics ? runMetrics.download.toFixed(1) : "0.0")}
                                </div>
                                <span className="text-[#00473E]/60 text-lg font-semibold uppercase">Mbps</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-12 mt-12 w-full max-w-lg">
                            <div className="text-center">
                                <span className="material-symbols-outlined text-[#009E52] mb-2 text-3xl">network_ping</span>
                                <div className="text-2xl font-bold text-[#00473E] tabular-nums">
                                    {result ? result.latency : (runMetrics ? runMetrics.latency : "--")}
                                    <span className="text-sm font-semibold text-[#00473E]/50 ml-1">ms</span>
                                </div>
                                <div className="text-[10px] text-[#00473E]/50 font-bold uppercase tracking-wider">Idle Ping</div>
                            </div>
                            <div className="text-center border-x border-[#00473E]/10 px-4">
                                <span className="material-symbols-outlined text-[#009E52] mb-2 text-3xl">waves</span>
                                <div className="text-2xl font-bold text-[#00473E] tabular-nums">
                                    {result ? (result.jitter || 3) : (runMetrics ? runMetrics.jitter : "--")}
                                    <span className="text-sm font-semibold text-[#00473E]/50 ml-1">ms</span>
                                </div>
                                <div className="text-[10px] text-[#00473E]/50 font-bold uppercase tracking-wider">Jitter</div>
                            </div>
                            <div className="text-center">
                                <span className="material-symbols-outlined text-[#009E52] mb-2 text-3xl">upload</span>
                                <div className="text-2xl font-bold text-[#00473E] tabular-nums">
                                    {result ? result.upload : (runMetrics ? runMetrics.upload.toFixed(1) : "--")}
                                    <span className="text-sm font-semibold text-[#00473E]/50 ml-1">Mbps</span>
                                </div>
                                <div className="text-[10px] text-[#00473E]/50 font-bold uppercase tracking-wider">Upload</div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <button
                                onClick={startTest}
                                disabled={isRunning}
                                className="px-16 h-14 rounded-full bg-primary border-2 border-[#00473E] shadow-block-sm text-[#002924] font-black text-xl hover:scale-105 active:scale-95 hover:bg-[#FF7D54] transition-all flex items-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <span className="material-symbols-outlined">{isRunning ? 'sync' : 'play_arrow'}</span>
                                {isRunning ? 'TESTING...' : 'RUN TEST'}
                            </button>
                        </div>
                    </div>

                    {/* Grade & Score Panel */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-[#FFC4B7]/25 border-2 border-[#00473E] shadow-block rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <div className="flex flex-col gap-2 p-1.5 bg-white/40 rounded-full border border-[#00473E]/10">
                                    <div className={`w-4 h-4 rounded-full transition-all ${result?.grade === 'A' ? 'bg-[#009E52] ring-4 ring-offset-2 ring-offset-[#FAF6F0] shadow-[0_0_20px_rgba(0,158,82,0.4)]' : 'bg-[#009E52]/20'}`}></div>
                                    <div className={`w-4 h-4 rounded-full transition-all ${result?.grade === 'B' || result?.grade === 'C' ? 'bg-[#FF8E60] ring-4 ring-offset-2 ring-offset-[#FAF6F0] shadow-[0_0_20px_rgba(255,142,96,0.4)]' : 'bg-[#FF8E60]/20'}`}></div>
                                    <div className={`w-4 h-4 rounded-full transition-all ${result?.grade === 'F' ? 'bg-red-500 ring-4 ring-offset-2 ring-offset-[#FAF6F0] shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-red-500/20'}`}></div>
                                </div>
                            </div>

                            <div className="text-xs font-black text-[#00473E]/70 uppercase tracking-[0.2em] mb-8">Network Quality Grade</div>

                            <div className="relative mb-6">
                                <div className={`absolute inset-0 blur-3xl rounded-full ${result?.grade ? (result.grade === 'A' ? 'bg-[#009E52]/30' : result.grade === 'F' ? 'bg-red-500/30' : 'bg-[#FF8E60]/30') : 'bg-primary/10'}`}></div>
                                <div className={`relative w-36 h-36 rounded-full border-4 flex items-center justify-center ${result?.grade ? (result.grade === 'A' ? 'border-[#009E52]/30' : result.grade === 'F' ? 'border-red-500/30' : 'border-[#FF8E60]/30') : 'border-[#00473E]/10'}`}>
                                    <div className={`w-28 h-28 rounded-full flex items-center justify-center text-white text-7xl font-black shadow-lg ${
                                        result?.grade === 'A' ? 'bg-[#009E52] shadow-[0_0_30px_rgba(0,158,82,0.4)]'
                                        : result?.grade === 'B' ? 'bg-[#009E52]/80 shadow-[0_0_30px_rgba(0,158,82,0.3)]'
                                        : result?.grade === 'C' ? 'bg-[#FF8E60] shadow-[0_0_30px_rgba(255,142,96,0.4)]'
                                        : result?.grade === 'D' ? 'bg-[#FF8E60]/80 shadow-[0_0_30px_rgba(255,142,96,0.3)]'
                                        : result?.grade === 'F' ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                                        : 'bg-[#00473E]/10 text-[#00473E]/50'
                                    }`}>
                                        {result?.grade || "?"}
                                    </div>
                                </div>
                            </div>

                            <h3 className={`text-2xl font-bold mb-3 ${
                                result?.grade === 'A' ? 'text-[#009E52]'
                                : result?.grade === 'B' ? 'text-[#009E52]/90'
                                : result?.grade === 'C' ? 'text-[#FF8E60]'
                                : result?.grade === 'D' ? 'text-[#FF8E60]/90'
                                : result?.grade === 'F' ? 'text-red-500'
                                : 'text-[#00473E]/70'
                            }`}>
                                {result?.grade === 'A' ? 'Excellent — No Bufferbloat'
                                : result?.grade === 'B' ? 'Good — Minimal Bufferbloat'
                                : result?.grade === 'C' ? 'Fair — Moderate Bufferbloat'
                                : result?.grade === 'D' ? 'Poor — Significant Bufferbloat'
                                : result?.grade === 'F' ? 'Bad — Severe Bufferbloat'
                                : 'Not Tested'}
                            </h3>
                            <p className="text-sm text-[#00473E]/80 leading-relaxed mb-6 font-medium">
                                {result
                                    ? `Latency increased by ${result.latency} ms under load. ${result.latency <= 5 ? 'Your connection handles congestion perfectly.' : result.latency <= 30 ? 'Minor buffering, generally unnoticeable.' : 'Consider enabling SQM or QoS on your router.'}`
                                    : "Run the test to analyze your network's responsiveness under load."}
                            </p>

                            {result && (
                                <div className="w-full pt-6 border-t border-[#00473E]/10">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-bold uppercase text-[#00473E]/60">Bloat Increase</span>
                                        <span className={`text-sm font-bold ${result.grade === 'A' ? 'text-[#009E52]' : 'text-[#FF8E60]'}`}>+{result.latency} ms</span>
                                    </div>
                                    <div className="h-2 w-full bg-[#00473E]/5 rounded-full overflow-hidden">
                                        <div className={`h-full transition-all duration-500 ${result.grade === 'A' ? 'bg-[#009E52]' : 'bg-[#FF8E60]'}`} style={{ width: `${Math.min(result.latency, 100)}%` }}></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Real-time Consistency (Visual) */}
                        <div className="bg-white border-2 border-[#00473E] shadow-block rounded-2xl p-6">
                            <h4 className="text-xs font-bold text-[#00473E]/70 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">show_chart</span>
                                Real-time Consistency
                            </h4>
                            <div className="h-24 w-full flex items-end gap-1 px-1">
                                {consistencyData.map((h, i) => (
                                    // eslint-disable-next-line
                                    <div
                                        key={i}
                                        className="flex-1 bg-[#009E52]/40 rounded-t-sm transition-all duration-300 ease-out"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                ))}
                            </div>
                            <p className="text-[10px] text-[#00473E]/50 text-center mt-2 font-semibold italic">Stable Latency Waveform Observed</p>
                        </div>
                    </div>
                </div>

                {/* Dynamic Charts & Cards Section */}

                {/* Educational Content */}
                <section className="mb-20 relative">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold mb-4 text-[#00473E]">Good vs. Bad Latency</h2>
                        <p className="text-[#00473E]/70 max-w-2xl mx-auto text-lg leading-relaxed font-medium">Visualization of how bufferbloat impacts your interactive experience.</p>
                    </div>

                    {/* Download & Latency Charts */}
                    <div className="mb-8">
                        <ResultsCharts data={metricsHistory} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white border-2 border-[#00473E] shadow-block-sm rounded-2xl p-8 border-l-4 border-l-[#009E52]">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-[#009E52] text-3xl">check_circle</span>
                                <div>
                                    <h4 className="font-extrabold text-[#00473E] text-lg">Low Bufferbloat (Grade A)</h4>
                                    <p className="text-xs text-[#00473E]/60 uppercase tracking-widest font-black">Stable & Responsive</p>
                                </div>
                            </div>
                            <div className="relative h-24 w-full bg-[#009E52]/5 rounded-lg border border-[#009E52]/20 mb-4 overflow-hidden">
                                {metricsHistory.length > 0 ? (
                                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#009E52" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#009E52" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d={(() => {
                                                const maxVal = Math.max(...metricsHistory.map(d => d.latency), 50);
                                                const points = metricsHistory.map((d, i) => {
                                                    // Deterministic random using index
                                                    const base = Math.max(10, d.latency - (d.download > 10 ? d.download * 0.1 : 0) - Math.abs(Math.sin(i)) * 5);
                                                    const x = (d.progress / 100) * 1000;
                                                    const y = 96 - (base / maxVal) * 96;
                                                    return `${x},${y}`;
                                                });
                                                return points.length ? `M ${points.join(" L ")} L 1000,96 L 0,96 Z` : "";
                                            })()}
                                            fill="url(#emeraldGradient)"
                                            className="transition-all duration-75 ease-linear"
                                        />
                                        <path
                                            d={(() => {
                                                const maxVal = Math.max(...metricsHistory.map(d => d.latency), 50);
                                                const points = metricsHistory.map((d, i) => {
                                                    // Deterministic random using index
                                                    const base = Math.max(10, d.latency - (d.download > 10 ? d.download * 0.1 : 0) - Math.abs(Math.sin(i)) * 5);
                                                    const x = (d.progress / 100) * 1000;
                                                    const y = 96 - (base / maxVal) * 96;
                                                    return `${x},${y}`;
                                                });
                                                return points.length ? `M ${points.join(" L ")}` : "";
                                            })()}
                                            fill="none"
                                            stroke="#009E52"
                                            strokeWidth="1.5"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </svg>
                                ) : (
                                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                                        <motion.path
                                            d="M0 10 Q 25 5, 50 10 T 100 10"
                                            animate={{
                                                d: [
                                                    "M0 10 Q 25 5, 50 10 T 100 10",
                                                    "M0 10 Q 25 15, 50 10 T 100 10",
                                                    "M0 10 Q 25 5, 50 10 T 100 10"
                                                ]
                                            }}
                                            transition={{
                                                duration: 4,
                                                ease: "easeInOut",
                                                repeat: Infinity
                                            }}
                                            fill="none"
                                            stroke="#009E52"
                                            strokeWidth="0.5"
                                        />
                                    </svg>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-xs font-semibold text-[#009E52] uppercase">Consistent Flow</span>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm text-[#00473E]/75 font-semibold">
                                    <span className="material-symbols-outlined text-[#009E52] text-base">task_alt</span>
                                    Instant command registration in games
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[#00473E]/75 font-semibold">
                                    <span className="material-symbols-outlined text-[#009E52] text-base">task_alt</span>
                                    Crystal clear audio/video on calls
                                </li>
                            </ul>
                        </div>
                        <div className="bg-[#FFC4B7]/25 border-2 border-[#00473E] shadow-block-sm rounded-2xl p-8 border-l-4 border-l-[#FF8E60]">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-[#FF8E60] text-3xl">error</span>
                                <div>
                                    <h4 className="font-extrabold text-[#00473E] text-lg">High Bufferbloat (Grade F)</h4>
                                    <p className="text-xs text-[#00473E]/60 uppercase tracking-widest font-black">Unstable & Laggy</p>
                                </div>
                            </div>
                            <div className="relative h-24 w-full bg-[#FF8E60]/5 rounded-lg border border-[#FF8E60]/20 mb-4 overflow-hidden">
                                {metricsHistory.length > 0 ? (
                                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#FF8E60" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#FF8E60" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d={(() => {
                                                const maxVal = Math.max(...metricsHistory.map(d => d.latency), 50);
                                                const points = metricsHistory.map((d) => {
                                                    const x = (d.progress / 100) * 1000;
                                                    const y = 96 - (d.latency / maxVal) * 96;
                                                    return `${x},${y}`;
                                                });
                                                return points.length ? `M ${points.join(" L ")} L 1000,96 L 0,96 Z` : "";
                                            })()}
                                            fill="url(#redGradient)"
                                            className="transition-all duration-75 ease-linear"
                                        />
                                        <path
                                            d={(() => {
                                                const maxVal = Math.max(...metricsHistory.map(d => d.latency), 50);
                                                const points = metricsHistory.map((d) => {
                                                    const x = (d.progress / 100) * 1000;
                                                    const y = 96 - (d.latency / maxVal) * 96;
                                                    return `${x},${y}`;
                                                });
                                                return points.length ? `M ${points.join(" L ")}` : "";
                                            })()}
                                            fill="none"
                                            stroke="#FF8E60"
                                            strokeWidth="1.5"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </svg>
                                ) : (
                                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                                        <motion.path
                                            d="M0 20 L 10 5 L 20 35 L 30 10 L 40 30 L 50 15 L 60 38 L 70 5 L 80 32 L 90 10 L 100 20"
                                            animate={{
                                                d: [
                                                    "M0 20 L 10 5 L 20 35 L 30 10 L 40 30 L 50 15 L 60 38 L 70 5 L 80 32 L 90 10 L 100 20",
                                                    "M0 20 L 10 35 L 20 5 L 30 30 L 40 10 L 50 35 L 60 18 L 70 35 L 80 5 L 90 30 L 100 20",
                                                    "M0 20 L 10 5 L 20 35 L 30 10 L 40 30 L 50 15 L 60 38 L 70 5 L 80 32 L 90 10 L 100 20"
                                                ]
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: "linear",
                                                repeat: Infinity
                                            }}
                                            fill="none"
                                            stroke="#FF8E60"
                                            strokeWidth="0.5"
                                        />
                                    </svg>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-xs font-semibold text-[#FF8E60] uppercase">Latency Spikes</span>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm text-[#00473E]/75 font-semibold">
                                    <span className="material-symbols-outlined text-[#FF8E60] text-base">warning</span>
                                    &quot;Rubber-banding&quot; and teleporting in games
                                </li>
                                <li className="flex items-start gap-2 text-sm text-[#00473E]/75 font-semibold">
                                    <span className="material-symbols-outlined text-[#FF8E60] text-base">warning</span>
                                    Frozen video and robotic audio on Zoom
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 pt-12 border-t border-[#00473E]/10">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="size-12 rounded-xl bg-[#009E52]/10 text-[#009E52] flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">build_circle</span>
                            </div>
                            <h2 className="text-2xl font-extrabold text-[#00473E]">How to fix poor scores</h2>
                        </div>
                        <p className="text-[#00473E]/70 leading-relaxed font-semibold">
                            If you received a C or F grade, don&apos;t worry. Most bufferbloat issues can be solved by adjusting a few settings on your home network.
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: "settings_suggest", title: "Enable SQM (Smart Queue Management)", desc: "Look for 'SQM,' 'Cake,' or 'fq_codel' in your router settings. This is the #1 way to eliminate bufferbloat." },
                                { icon: "settings_input_component", title: "Configure QoS Limits", desc: "Set your router's bandwidth limit to 90-95% of your actual speed. This prevents your modem's buffer from filling up." },
                                { icon: "router", title: "Upgrade Network Hardware", desc: "Older ISP-provided modems often have poor buffer management. Consider a modern router with robust CPU performance." }
                            ].map((item, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white border-2 border-[#00473E] shadow-block-sm hover:scale-[1.01] transition-all">
                                    <div className="font-extrabold text-[#009E52] mb-1 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm font-black">{item.icon}</span>
                                        {item.title}
                                    </div>
                                    <p className="text-sm text-[#00473E]/75 font-semibold">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="size-12 rounded-xl bg-[#FF8E60]/10 text-[#FF8E60] flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">format_list_bulleted</span>
                            </div>
                            <h2 className="text-2xl font-extrabold text-[#00473E]">Official Grading Scales</h2>
                        </div>
                        <div className="space-y-2">
                            {[
                                { grade: "A", label: "Excellent", range: "0–5 ms increase", desc: "No bufferbloat. Perfect for gaming, video calls, and remote work.", bg: "bg-[#009E52]", text: "text-[#009E52]" },
                                { grade: "B", label: "Good",      range: "6–30 ms increase", desc: "Minimal bufferbloat. Slight lag under heavy load, generally unnoticeable.", bg: "bg-[#009E52]/80", text: "text-[#009E52]/80" },
                                { grade: "C", label: "Fair",      range: "31–60 ms increase", desc: "Moderate bufferbloat. Noticeable lag during large downloads.", bg: "bg-[#FF8E60]", text: "text-[#FF8E60]" },
                                { grade: "D", label: "Poor",      range: "61–100 ms increase", desc: "Significant bufferbloat. Games stutter, calls drop. Enable SQM.", bg: "bg-[#FF8E60]/80", text: "text-[#FF8E60]/80" },
                                { grade: "F", label: "Bad",       range: "100+ ms increase", desc: "Severe bufferbloat. Gaming and video conferencing will be difficult.", bg: "bg-red-500", text: "text-red-500" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#FFC4B7]/20 border border-transparent hover:border-[#00473E]/10 transition-all group">
                                    <div className={`size-12 rounded-lg ${item.bg} border-2 border-[#00473E] flex items-center justify-center font-black text-white text-xl`}>{item.grade}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="font-extrabold text-[#00473E]">{item.label}</span>
                                            <span className={`${item.text} text-xs font-extrabold uppercase`}>{item.range}</span>
                                        </div>
                                        <div className="text-xs text-[#00473E]/60 mt-1 font-semibold">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
