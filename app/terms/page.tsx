import Link from "next/link";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-10">
        <h2 className="text-lg font-bold text-[#00473E] mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#FF8E60] rounded-full flex-shrink-0" />
            {title}
        </h2>
        <div className="text-[#002924]/75 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
);

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#FAF6F0] pb-24">
            {/* Header */}
            <div className="bg-[#00473E] border-b-2 border-[#00473E] px-6 py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <Link href="/" className="text-[#FFC4B7]/60 text-sm font-semibold hover:text-[#FFC4B7] transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-sm text-[#FFC4B7]/40">chevron_right</span>
                        <span className="text-[#FFC4B7] text-sm font-extrabold">Terms of Use</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-[#FF8E60] rounded-2xl">
                            <span className="material-symbols-outlined text-[#00473E] text-2xl">gavel</span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Use</h1>
                            <p className="text-[#FFC4B7]/70 text-sm mt-1">Last updated: May 2026</p>
                        </div>
                    </div>
                    <p className="text-[#FFC4B7]/80 text-sm leading-relaxed max-w-xl">
                        By using MySupportInfo, you agree to these terms. The short version: this tool is free, informational, collects no data, and is provided as-is.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-14">

                {/* Quick summary */}
                <div className="bg-[#FFC4B7]/25 border-2 border-[#00473E] rounded-2xl p-6 mb-12">
                    <p className="text-[9px] text-[#00473E]/60 uppercase tracking-[0.25em] font-bold mb-3">Plain-English Summary</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { icon: "lock", label: "No Data Collected", desc: "All diagnostics run in your browser. Nothing is stored or transmitted to our servers." },
                            { icon: "volunteer_activism", label: "Free Forever", desc: "MySupportInfo is and will remain a free tool. No accounts, no subscriptions." },
                            { icon: "info", label: "Informational Only", desc: "Results are estimates for diagnostic purposes. Do not use them for legal or medical decisions." },
                        ].map(item => (
                            <div key={item.label} className="flex flex-col gap-2">
                                <span className="material-symbols-outlined text-[#FF8E60] text-2xl">{item.icon}</span>
                                <p className="text-[#00473E] font-bold text-sm">{item.label}</p>
                                <p className="text-[#002924]/65 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Section title="1. Acceptance of Terms">
                    <p>
                        By accessing or using <strong>MySupportInfo</strong> at <code className="bg-[#00473E]/8 px-1.5 py-0.5 rounded text-[#00473E] font-mono text-xs">mysupportinfo.vercel.app</code> (the "Service"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Service.
                    </p>
                    <p>
                        These terms apply to all visitors and users of the Service. We reserve the right to update these terms at any time. Continued use of the Service after changes constitutes acceptance of the updated terms.
                    </p>
                </Section>

                <Section title="2. Description of Service">
                    <p>
                        MySupportInfo is a <strong>free, read-only diagnostic tool</strong> that detects and displays technical information about your device, browser, and network connection. This includes data such as your IP address, browser version, operating system, screen resolution, and connection quality metrics.
                    </p>
                    <p>
                        All detection runs <strong>entirely within your browser</strong>. MySupportInfo does not operate any servers that collect, store, or process your personal data. Your IP address is retrieved from a third-party API (ipapi.co) solely to display it to you within your browser session.
                    </p>
                </Section>

                <Section title="3. Permitted Use">
                    <p>You may use MySupportInfo for:</p>
                    <ul className="list-none space-y-2 mt-2">
                        {[
                            "Personal technical diagnostics and troubleshooting",
                            "Sharing your device information with technical support teams",
                            "Educational and informational purposes",
                            "Network quality research and testing",
                        ].map(item => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#009E52] mt-2 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3">
                        You may <strong>not</strong> use MySupportInfo to misrepresent device or network information, to engage in any unlawful activity, or to systematically scrape or automate requests in a manner that places unreasonable load on the Service.
                    </p>
                </Section>

                <Section title="4. No Data Collection or Storage">
                    <p>
                        MySupportInfo is designed with privacy as a core principle. We do <strong>not</strong>:
                    </p>
                    <ul className="list-none space-y-2 mt-2">
                        {[
                            "Store your IP address, device data, or any diagnostic results on our servers",
                            "Use cookies for tracking or analytics (Vercel Analytics is used in aggregate, anonymised form only)",
                            "Share any information with third parties for advertising purposes",
                            "Require you to create an account or provide personal information",
                        ].map(item => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8E60] mt-2 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3">
                        For full details, see our <Link href="/privacy" className="text-[#009E52] font-semibold hover:underline">Privacy Centre</Link>.
                    </p>
                </Section>

                <Section title="5. Accuracy of Information">
                    <p>
                        All metrics displayed by MySupportInfo are <strong>estimates and approximations</strong> derived from browser APIs. They are intended for informational and diagnostic purposes only.
                    </p>
                    <p>
                        Values such as RAM, connection speed, and IP geolocation may not reflect exact system specifications. Browser security restrictions (fingerprinting protections, VPNs, proxies) may cause some values to be inaccurate, rounded, or unavailable.
                    </p>
                    <p>
                        <strong>Do not rely on this information for legal, medical, financial, or contractual purposes.</strong>
                    </p>
                </Section>

                <Section title="6. Third-Party Services">
                    <p>
                        MySupportInfo uses the following third-party APIs to retrieve certain data:
                    </p>
                    <ul className="list-none space-y-2 mt-2">
                        {[
                            { name: "ipapi.co", desc: "Used to retrieve your public IP address, ISP, and approximate geolocation." },
                            { name: "api64.ipify.org", desc: "Used to detect IPv6 connectivity." },
                            { name: "stun.l.google.com", desc: "Google's STUN server, used for WebRTC leak detection." },
                            { name: "Vercel Analytics", desc: "Aggregate, anonymised page view analytics with no personal data." },
                        ].map(item => (
                            <li key={item.name} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00473E]/40 mt-2 flex-shrink-0" />
                                <span><code className="bg-[#00473E]/8 px-1.5 py-0.5 rounded text-[#00473E] font-mono text-xs">{item.name}</code> — {item.desc}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3">
                        These services are subject to their own terms and privacy policies. We are not responsible for their content or data practices.
                    </p>
                </Section>

                <Section title="7. Intellectual Property">
                    <p>
                        The design, content, branding, and code of MySupportInfo are the intellectual property of the site owner. You may not reproduce, redistribute, or create derivative works without explicit written permission.
                    </p>
                    <p>
                        The diagnostic data displayed to you (your IP, browser info, etc.) belongs to you. You are free to copy, download, and share your own diagnostic report.
                    </p>
                </Section>

                <Section title="8. Disclaimer of Warranties">
                    <p>
                        The Service is provided <strong>"as is"</strong> and <strong>"as available"</strong> without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                    </p>
                    <p>
                        We do not warrant that the Service will be uninterrupted, error-free, or that results will be accurate or reliable.
                    </p>
                </Section>

                <Section title="9. Limitation of Liability">
                    <p>
                        To the fullest extent permitted by applicable law, MySupportInfo and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Service.
                    </p>
                    <p>
                        This includes but is not limited to loss of data, loss of profits, or damages resulting from reliance on information provided by the Service.
                    </p>
                </Section>

                <Section title="10. Governing Law">
                    <p>
                        These terms are governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of the Service shall be subject to the exclusive jurisdiction of the appropriate courts.
                    </p>
                </Section>

                <Section title="11. Contact">
                    <p>
                        If you have questions about these Terms of Use, please refer to our <Link href="/faq" className="text-[#009E52] font-semibold hover:underline">FAQ</Link> or <Link href="/privacy" className="text-[#009E52] font-semibold hover:underline">Privacy Centre</Link> for further information about how the Service operates.
                    </p>
                </Section>

                {/* Footer links */}
                <div className="border-t-2 border-[#00473E]/10 pt-10 mt-4 flex flex-wrap gap-4">
                    <Link
                        href="/privacy"
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#00473E] text-white border-2 border-[#00473E] rounded-xl text-sm font-bold hover:bg-[#002924] shadow-block-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">shield_person</span>
                        Privacy Centre
                    </Link>
                    <Link
                        href="/faq"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#00473E] border-2 border-[#00473E] rounded-xl text-sm font-bold hover:bg-[#FFC4B7]/20 shadow-block-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">help</span>
                        FAQ
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#00473E] border-2 border-[#00473E] rounded-xl text-sm font-bold hover:bg-[#FFC4B7]/20 shadow-block-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
