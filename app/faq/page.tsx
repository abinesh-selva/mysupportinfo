import Link from "next/link";
import FAQItem from './FAQItem';

const faqs = [
    {
        question: "Do you store my IP address?",
        answer: "We take a privacy-first approach. Your IP address is used only for real-time geolocation detection (to help troubleshoot region-specific issues) and is not stored in our permanent database logs after your session expires.",
        initialOpen: true,
    },
    {
        question: "How does the Bufferbloat test work?",
        answer: "The test simulates network traffic by maxing out your download and upload connection for a short period. While this happens, it continuously pings a central server to measure latency. If latency spikes significantly during the load test, you have bufferbloat.",
    },
    {
        question: "Is this tool free to use?",
        answer: "Yes, MySupportInfo.vercel.app is currently 100% free for individual users. We may introduce premium features for enterprise support teams in the future, but the core diagnostic tools will remain free.",
    },
    {
        question: "Can I share my results?",
        answer: "Absolutely. After a test runs, we generate a unique, temporary link you can copy to your clipboard and send to your ISP technician or IT support agent. This link expires automatically after 24 hours.",
    },
    {
        question: "Why does my grade differ from other speed tests?",
        answer: "Most speed tests only measure throughput (Mbps). We measure Quality of Experience by analyzing latency under load. You might have 1000 Mbps internet but still experience lag if your router suffers from bufferbloat (Grade C or lower).",
    },
    {
        question: "What browser should I use?",
        answer: "Our tool works best on modern browsers like Chrome, Edge, Firefox, and Safari (versions released within the last 2 years). We leverage the latest Web APIs for accurate timing measurement.",
    },
];

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <div className="bg-background-dark px-6 py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <Link href="/" className="text-accent/60 text-sm font-semibold hover:text-accent transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-sm text-accent/40">chevron_right</span>
                        <span className="text-accent text-sm font-extrabold">FAQ</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary rounded-2xl">
                            <span className="material-symbols-outlined text-background-dark text-2xl">help</span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h1>
                            <p className="text-accent/70 text-sm mt-1">{faqs.length} questions answered</p>
                        </div>
                    </div>
                    <p className="text-accent/80 text-sm leading-relaxed max-w-xl">
                        Find answers to common questions about privacy, data collection, and our technical diagnostic tools. We believe in full transparency.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-14">

                {/* Topics summary */}
                <div className="bg-accent/25 border-2 border-background-dark rounded-2xl p-6 mb-12">
                    <p className="text-4xs text-background-dark/60 uppercase tracking-ui-wide font-bold mb-3">Topics Covered</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { icon: "shield_person", label: "Privacy", desc: "How we handle your IP, session data, and what is stored — spoiler: nothing." },
                            { icon: "wifi", label: "Network Testing", desc: "How the bufferbloat test works and how to interpret your grade." },
                            { icon: "devices", label: "Compatibility", desc: "Which browsers and devices work best with our diagnostic tools." },
                        ].map(item => (
                            <div key={item.label} className="flex flex-col gap-2">
                                <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                                <p className="text-background-dark font-bold text-sm">{item.label}</p>
                                <p className="text-foreground/65 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ accordion */}
                <div className="space-y-3">
                    {faqs.map((faq) => (
                        <FAQItem
                            key={faq.question}
                            question={faq.question}
                            answer={faq.answer}
                            initialOpen={faq.initialOpen}
                        />
                    ))}
                </div>

                {/* Footer links */}
                <div className="border-t-2 border-background-dark/10 pt-10 mt-12 flex flex-wrap gap-4">
                    <Link
                        href="/privacy"
                        className="flex items-center gap-2 px-5 py-2.5 bg-background-dark text-white border-2 border-background-dark rounded-xl text-sm font-bold hover:bg-foreground shadow-block-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">shield_person</span>
                        Privacy Policy
                    </Link>
                    <Link
                        href="/terms"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-background-dark border-2 border-background-dark rounded-xl text-sm font-bold hover:bg-accent/20 shadow-block-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">gavel</span>
                        Terms of Use
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-background-dark border-2 border-background-dark rounded-xl text-sm font-bold hover:bg-accent/20 shadow-block-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
