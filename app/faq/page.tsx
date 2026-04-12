"use client";

import FAQItem from './FAQItem';

export default function FAQPage() {
    return (
        <div className="max-w-[1200px] mx-auto px-6 py-16 w-full">

            {/* Headline & Intro */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-foreground">Frequently Asked Questions</h1>
                <p className="text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                    Find answers to common questions about privacy, data collection, and our technical support dashboard. We believe in transparency and data security.
                </p>
            </div>

            {/* FAQ Accordion List */}
            <div className="max-w-[800px] mx-auto space-y-4">
                <FAQItem
                    question="Do you store my IP address?"
                    answer="We take a privacy-first approach. Your IP address is used only for real-time geolocation detection (to help troubleshoot region-specific issues) and is not stored in our permanent database logs after your session expires."
                    initialOpen={true}
                />
                <FAQItem
                    question="How does the Bufferbloat test work?"
                    answer="The test simulates network traffic by maxing out your download and upload connection for a short period. While this happens, it continuously pings a central server to measure latency. If latency spikes significantly during the load test, you have bufferbloat."
                />
                <FAQItem
                    question="Is this tool free to use?"
                    answer="Yes, MySupportInfo.com is currently 100% free for individual users. We may introduce premium features for enterprise support teams in the future, but the core diagnostic tools will remain free."
                />
                <FAQItem
                    question="Can I share my results?"
                    answer="Absolutely. After a test runs, we generate a unique, temporary link you can copy to your clipboard and send to your ISP technician or IT support agent. This link expires automatically after 24 hours."
                />
                <FAQItem
                    question="Why does my grade differ from other speed tests?"
                    answer="Most speed tests only measure throughput (Mbps). We measure 'Quality of Experience' by analyzing latency under load. You might have 1000 Mbps internet but still experience lag if your router suffers from bufferbloat (Grade C or lower)."
                />
                <FAQItem
                    question="What browser should I use?"
                    answer="Our tool works best on modern browsers like Chrome, Edge, Firefox, and Safari (versions released within the last 2 years). We leverage the latest Web APIs for accurate timing measurement."
                />
            </div>

            {/* Footer Section CTA */}
            <div className="max-w-[800px] mx-auto mt-20 pt-10 border-t-2 border-foreground/10 text-center">
                <h4 className="text-primary font-black text-sm uppercase tracking-widest mb-4">Still have questions?</h4>
                <p className="text-foreground/60 mb-8 max-w-sm mx-auto font-medium">
                    Can&apos;t find the answer you&apos;re looking for? Please chat with our friendly team.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-3 block-btn-primary rounded-xl font-bold">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
}
