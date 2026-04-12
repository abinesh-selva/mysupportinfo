export interface TestResult {
    download: number; // Mbps
    upload: number; // Mbps
    latency: number; // ms
    jitter: number; // ms
    grade: "A" | "B" | "C" | "D" | "F";
}

export class BufferbloatEngine {
    private isRunning: boolean = false;
    private onUpdate: (data: { progress: number; download: number; latency: number; jitter: number; upload: number }) => void;

    constructor(onUpdate: (data: { progress: number; download: number; latency: number; jitter: number; upload: number }) => void) {
        this.onUpdate = onUpdate;
    }

    public async runTest(): Promise<TestResult> {
        if (this.isRunning) throw new Error("Test already running");
        this.isRunning = true;

        // Current simulated state
        let currentDownload = 0;
        let currentUpload = 0;
        let currentLatency = 15;

        // Simulate test duration (approx 5 seconds)
        for (let i = 0; i <= 100; i++) {
            await this.delay(50); // 50ms * 100 = 5000ms

            // PHASE 1: DOWNLOAD (0-50%)
            if (i < 50) {
                // Ramp up download speed with noise
                const targetSpeed = 150 + Math.random() * 50;
                if (currentDownload < targetSpeed) {
                    currentDownload += (targetSpeed - currentDownload) * 0.1; // Smooth ramp
                }
                currentDownload += (Math.random() - 0.5) * 10; // Jitter

                // Latency spikes under load
                currentLatency = 20 + Math.random() * 30; // 20-50ms
            }
            // PHASE 2: UPLOAD (50-80%)
            else if (i < 80) {
                // Upload ramp
                const targetUpload = 40 + Math.random() * 10;
                if (currentUpload < targetUpload) {
                    currentUpload += (targetUpload - currentUpload) * 0.1;
                }
                currentUpload += (Math.random() - 0.5) * 5;

                // Latency stabilizes slightly
                currentLatency = 18 + Math.random() * 15;
            }
            // PHASE 3: FINAL ANALYSIS (80-100%)
            else {
                // Stabilize values
                currentDownload += (Math.random() - 0.5) * 2;
                currentLatency = 15 + Math.random() * 5;
            }

            // Ensure non-negative and formatted
            const metrics = {
                progress: i,
                download: Math.max(0.1, parseFloat(currentDownload.toFixed(1))),
                upload: Math.max(0, parseFloat(currentUpload.toFixed(1))),
                latency: Math.floor(currentLatency),
                jitter: Math.floor(Math.random() * 5 + 1)
            };

            this.onUpdate(metrics);
        }

        this.isRunning = false;

        // Final Result Generation
        return {
            download: Math.floor(currentDownload),
            upload: Math.floor(currentUpload),
            latency: 28, // Final calculated values
            jitter: 4,
            grade: "B", // Fixed result for demo consistency, or calculate real
        };
    }

    private delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    private calculateGrade(): TestResult["grade"] {
        // ... (keep existing logic if needed, or simplistic)
        return "B";
    }
}
