import Link from "next/link";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-10">
        <h2 className="text-lg font-bold text-background-dark mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full flex-shrink-0" />
            {title}
        </h2>
        <div className="text-foreground/75 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
);

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <div className="bg-background-dark px-6 py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <Link href="/" className="text-accent/60 text-sm font-semibold hover:text-accent transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-sm text-accent/40">chevron_right</span>
                        <span className="text-accent text-sm font-extrabold">Privacy Policy</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary rounded-2xl">
                            <span className="material-symbols-outlined text-background-dark text-2xl">shield_person</span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
                            <p className="text-accent/70 text-sm mt-1">Last updated: May 2026</p>
                        </div>
                    </div>
                    <p className="text-accent/80 text-sm leading-relaxed max-w-xl">
                        MySupportInfo is built privacy-first. All data is processed locally in your browser — nothing is stored, transmitted, or shared with third parties for advertising.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-14">

                {/* Quick summary */}
                <div className="bg-accent/25 border-2 border-background-dark rounded-2xl p-6 mb-12">
                    <p className="text-[9px] text-background-dark/60 uppercase tracking-[0.25em] font-bold mb-3">At a Glance</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { icon: "visibility_off", label: "Zero Tracking", desc: "No cookies, no fingerprinting, no cross-session tracking of any kind." },
                            { icon: "shield", label: "GDPR & CCPA", desc: "Fully compliant. All processing happens on your device — you are always in control." },
                            { icon: "memory", label: "Client-side Only", desc: "Your CPU does the work. Results are displayed in your browser and never sent to our servers." },
                        ].map(item => (
                            <div key={item.label} className="flex flex-col gap-2">
                                <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                                <p className="text-background-dark font-bold text-sm">{item.label}</p>
                                <p className="text-foreground/65 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Section title="1. Information We Detect">
                    <p>
                        Our service helps you troubleshoot browser and device issues by identifying specific technical parameters. The following information is detected <strong>locally on your device</strong>:
                    </p>
                    <ul className="list-none space-y-2 mt-2">
                        {[
                            "Browser identity: name, version, and rendering engine",
                            "Operating system: OS name, version, and architecture (e.g., Windows 11, macOS 14)",
                            "Display specs: screen resolution, color depth, and pixel ratio",
                            "Hardware capabilities: GPU, estimated RAM, touch support, battery status",
                            "Network: public IP, ISP, geolocation, connection type, and latency",
                        ].map(item => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3">
                        Your public IP and geolocation are fetched from <code className="bg-background-dark/8 px-1.5 py-0.5 rounded text-background-dark font-mono text-xs">ipapi.co</code> solely to display within your session. IPv6 detection uses <code className="bg-background-dark/8 px-1.5 py-0.5 rounded text-background-dark font-mono text-xs">api64.ipify.org</code>. WebRTC leak detection uses <code className="bg-background-dark/8 px-1.5 py-0.5 rounded text-background-dark font-mono text-xs">stun.l.google.com</code>.
                    </p>
                </Section>

                <Section title="2. No Persistent Data Collection">
                    <p>
                        MySupportInfo does <strong>not</strong> use persistent trackers or fingerprinting techniques to identify you across sessions. We maintain no database of your visit history, IP addresses, or device specifications.
                    </p>
                    <ul className="list-none space-y-2 mt-2">
                        {[
                            "No tracking cookies or local storage identifiers",
                            "No cross-session user profiles or device fingerprints",
                            "No IP address logs stored on our servers",
                            "No sale, rental, or sharing of data with third-party advertisers",
                        ].map(item => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3">
                        Vercel Analytics is used for aggregate, anonymised page-view counts only — no personal data is collected or attributable to individual users.
                    </p>
                </Section>

                <Section title="3. GDPR & CCPA Compliance">
                    <p>
                        Under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), you have the right to know what data is processed about you. Since all processing occurs on your device, you are in full control at all times.
                    </p>
                    <p>
                        There is no account to delete, no data to download, and no opt-out required — because we never collect personal data in the first place. Closing your browser tab clears all detected information from memory.
                    </p>
                </Section>

                <Section title="4. Client-side Processing">
                    <p>
                        The core logic of MySupportInfo runs entirely via client-side JavaScript. Your browser performs the detection, the results are displayed on your screen, and nothing is transmitted to our servers for analysis.
                    </p>
                    <p>
                        A short-lived IP cache is stored in <code className="bg-background-dark/8 px-1.5 py-0.5 rounded text-background-dark font-mono text-xs">sessionStorage</code> with a 5-minute TTL to avoid redundant API calls — it is automatically cleared when your session ends. This architecture provides maximum speed and unmatched privacy.
                    </p>
                </Section>

                <Section title="5. Security Standards">
                    <p>
                        We employ modern security headers — including HSTS, Content Security Policy, and X-Frame-Options — to ensure your interaction with the site cannot be intercepted or spoofed. The entire platform is served over encrypted TLS 1.3 connections via Vercel&apos;s global edge network.
                    </p>
                </Section>

                <Section title="6. Third-Party Services">
                    <p>
                        The following third-party services are used solely to retrieve data for display within your browser session:
                    </p>
                    <ul className="list-none space-y-2 mt-2">
                        {[
                            { name: "ipapi.co", desc: "Public IP address, ISP, city, country, and approximate geolocation." },
                            { name: "api64.ipify.org", desc: "IPv6 connectivity detection." },
                            { name: "stun.l.google.com", desc: "Google's STUN server for WebRTC leak detection." },
                            { name: "Vercel Analytics", desc: "Aggregate, anonymised page-view analytics — no personal data." },
                        ].map(item => (
                            <li key={item.name} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-background-dark/40 mt-2 flex-shrink-0" />
                                <span><code className="bg-background-dark/8 px-1.5 py-0.5 rounded text-background-dark font-mono text-xs">{item.name}</code> — {item.desc}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3">
                        These services are governed by their own terms and privacy policies. We are not responsible for their practices.
                    </p>
                </Section>

                <Section title="7. Contact">
                    <p>
                        If you have questions about this Privacy Policy, please refer to our <Link href="/faq" className="text-secondary font-semibold hover:underline">FAQ</Link> or <Link href="/terms" className="text-secondary font-semibold hover:underline">Terms of Use</Link> for further information about how the Service operates.
                    </p>
                </Section>

                {/* Footer links */}
                <div className="border-t-2 border-background-dark/10 pt-10 mt-4 flex flex-wrap gap-4">
                    <Link
                        href="/terms"
                        className="flex items-center gap-2 px-5 py-2.5 bg-background-dark text-white border-2 border-background-dark rounded-xl text-sm font-bold hover:bg-foreground shadow-block-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">gavel</span>
                        Terms of Use
                    </Link>
                    <Link
                        href="/faq"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-background-dark border-2 border-background-dark rounded-xl text-sm font-bold hover:bg-accent/20 shadow-block-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">help</span>
                        FAQ
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
