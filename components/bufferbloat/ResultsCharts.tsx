interface RunMetrics {
    progress: number;
    download: number;
    latency: number;
    jitter: number;
    upload: number;
}

interface ResultsChartsProps {
    data: RunMetrics[];
}

export const ResultsCharts = ({ data }: ResultsChartsProps) => {
    // We assume the test runs for approx 100 ticks (0-100 progress).
    // To make it look "live", we render the SVG with a fixed width of 100 units,
    // and map the data points to this coordinate space.

    // Fallback if data is empty (initial state)
    const hasData = data && data.length > 0;

    // Get latest entries or defaults
    const currentMetric = hasData ? data[data.length - 1] : { download: 0, latency: 0, jitter: 0, upload: 0 };

    // Prepare chart data with base latency simulation
    const chartData = hasData ? data.map((d, i) => ({
        ...d,
        // Mock base latency relative to active latency for visualization
        // Use Math.sin(i) for deterministic "randomness" to avoid hydration errors
        baseLatency: Math.max(10, d.latency - (d.download > 10 ? d.download * 0.1 : 0) - Math.abs(Math.sin(i)) * 5)
    })) : [];

    const currentBaseLatency = hasData && chartData.length > 0 ? chartData[chartData.length - 1].baseLatency : 0;

    // Dynamic Max scaling to keep the graph looking good as it grows
    const currentMaxDownload = hasData ? Math.max(...chartData.map(d => d.download), 50) : 100;
    const maxDownload = currentMaxDownload + (currentMaxDownload * 0.1); // +10% padding

    const currentMaxLatency = hasData ? Math.max(...chartData.map(d => d.latency), 50) : 100;
    const maxLatency = currentMaxLatency + (currentMaxLatency * 0.1);

    // SVG Helper to create path d
    const createPath = (key: keyof typeof chartData[0], maxVal: number, height: number, width: number) => {
        if (!hasData || chartData.length === 0) return "";

        const points = chartData.map((d) => {
            const x = (d.progress / 100) * width; // Map progress 0-100 to width
            const val = d[key] as number;
            const y = height - (val / maxVal) * height; // Invert Y
            return `${x},${y}`;
        });

        return `M ${points.join(" L ")}`;
    };

    const createAreaPath = (key: keyof typeof chartData[0], maxVal: number, height: number, width: number) => {
        if (!hasData || chartData.length === 0) return "";
        const linePath = createPath(key, maxVal, height, width);
        // Close the curve
        const lastX = (chartData[chartData.length - 1].progress / 100) * width;
        return `${linePath} L ${lastX},${height} L 0,${height} Z`;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full animate-in fade-in zoom-in duration-500">
            {/* Download Chart */}
            <div className="bg-white border-2 border-[#00473E] shadow-block rounded-2xl p-8 border-l-4 border-l-[#009E52] relative overflow-hidden h-96 flex flex-col transition-all duration-300">
                <div className="flex justify-between items-start mb-6 z-10 relative">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-[#009E52] text-3xl">download</span>
                        <div>
                            <h3 className="font-extrabold text-lg text-[#00473E]">Download Speed</h3>
                            <p className="text-xs text-[#00473E]/50 uppercase tracking-widest font-black">Real-time Performance</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black text-[#00473E] tabular-nums">{currentMetric.download.toFixed(1)}</div>
                        <span className="text-xs text-[#00473E]/50 font-black uppercase tracking-wider">Mbps</span>
                    </div>
                </div>

                <div className="relative flex-1 w-full min-h-0 bg-[#009E52]/5 rounded-lg border border-[#009E52]/10 overflow-hidden">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-[#00473E]/30 pointer-events-none z-0 pb-4 pl-2 font-mono">
                        {[1, 0.75, 0.5, 0.25, 0].map((pct) => (
                            <div key={pct} className="flex items-center w-full border-b border-[#00473E]/5 h-full relative">
                                <span className="absolute left-1 top-2 opacity-70">{Math.round(maxDownload * pct)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Chart */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="downloadChartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#009E52" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#009E52" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {hasData && (
                            <>
                                {/* Area */}
                                <path
                                    d={createAreaPath('download', maxDownload, 240, 1000)} // Using 1000 as virtual width
                                    fill="url(#downloadChartGradient)"
                                    vectorEffect="non-scaling-stroke"
                                    className="transition-all duration-75 ease-linear"
                                />
                                {/* Line */}
                                <path
                                    d={createPath('download', maxDownload, 240, 1000)}
                                    fill="none"
                                    stroke="#009E52"
                                    strokeWidth="2.5"
                                    vectorEffect="non-scaling-stroke"
                                    className="transition-all duration-75 ease-linear"
                                />
                            </>
                        )}
                    </svg>
                </div>
            </div>

            {/* Latency Chart */}
            <div className="bg-white border-2 border-[#00473E] shadow-block rounded-2xl p-8 border-l-4 border-l-[#FF8E60] relative overflow-hidden h-96 flex flex-col transition-all duration-300">
                <div className="flex justify-between items-start mb-6 z-10 relative">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-[#FF8E60] text-3xl">avg_pace</span>
                        <div>
                            <h3 className="font-extrabold text-lg text-[#00473E]">Latency Monitor</h3>
                            <p className="text-xs text-[#00473E]/50 uppercase tracking-widest font-black">Bufferbloat Analysis</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="text-right">
                            <div className="text-2xl font-black text-[#FF8E60] tabular-nums">{currentMetric.latency}</div>
                            <p className="text-[10px] text-[#00473E]/60 font-bold uppercase tracking-wider">Loaded <span className="text-[#FF8E60]">•</span></p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black text-[#009E52] tabular-nums">{Math.round(currentBaseLatency)}</div>
                            <p className="text-[10px] text-[#00473E]/60 font-bold uppercase tracking-wider">Base <span className="text-[#009E52]">•</span></p>
                        </div>
                    </div>
                </div>

                <div className="relative flex-1 w-full min-h-0 bg-[#FF8E60]/5 rounded-lg border border-[#FF8E60]/10 overflow-hidden">
                    <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-[#00473E]/30 pointer-events-none z-0 pb-4 pl-2 font-mono">
                        {[1, 0.75, 0.5, 0.25, 0].map((pct) => (
                            <div key={pct} className="flex items-center w-full border-b border-[#00473E]/5 h-full relative">
                                <span className="absolute left-1 top-2 opacity-70">{Math.round(maxLatency * pct)}</span>
                            </div>
                        ))}
                    </div>

                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="latencyLoadedGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FF8E60" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#FF8E60" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="latencyBaseGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#009E52" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#009E52" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {hasData && (
                            <>
                                {/* Loaded Latency (Back) */}
                                <path d={createAreaPath('latency', maxLatency, 240, 1000)} fill="url(#latencyLoadedGradient)" vectorEffect="non-scaling-stroke" className="transition-all duration-75 ease-linear" />
                                <path d={createPath('latency', maxLatency, 240, 1000)} fill="none" stroke="#FF8E60" strokeWidth="2.5" vectorEffect="non-scaling-stroke" className="transition-all duration-75 ease-linear" />

                                {/* Base Latency (Front) */}
                                <path d={createAreaPath('baseLatency', maxLatency, 240, 1000)} fill="url(#latencyBaseGradient)" vectorEffect="non-scaling-stroke" className="transition-all duration-75 ease-linear" />
                                <path d={createPath('baseLatency', maxLatency, 240, 1000)} fill="none" stroke="#009E52" strokeWidth="2" vectorEffect="non-scaling-stroke" className="transition-all duration-75 ease-linear" />
                            </>
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
};
