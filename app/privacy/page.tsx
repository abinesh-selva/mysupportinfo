"use client";

export default function PrivacyPage() {
    return (
        <div className="w-full">
            <main className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12">
                {/* PageHeading Component */}
                <div className="flex flex-wrap justify-between gap-6 mb-12">
                    <div className="flex flex-col gap-3">
                        <p className="text-foreground text-5xl font-black leading-tight tracking-[-0.033em]">Privacy & Terms</p>
                        <p className="text-foreground/70 text-xl font-normal leading-normal font-medium">A modern, transparent approach to technical support data.</p>
                    </div>
                    <div className="flex items-end">
                        <span className="px-4 py-2 bg-accent shadow-block-sm text-primary border-2 border-foreground rounded-full text-sm font-bold">
                            Version 2.4.0 • Updated Oct 2023
                        </span>
                    </div>
                </div>

                {/* Stats Component */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {[
                        { title: "Tracking Cookies", value: "Zero" },
                        { title: "GDPR Compliance", value: "Fully Ready" },
                        { title: "Data Processing", value: "Local Only" },
                        { title: "Data Storage", value: "Volatile" }
                    ].map((stat, i) => (
                        <div key={i} className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border-2 border-foreground bg-white shadow-block transition-transform hover:scale-[1.02]">
                            <p className="text-foreground/60 text-sm font-bold uppercase tracking-wide">{stat.title}</p>
                            <p className="text-foreground text-3xl font-black tracking-tight">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* SideNavBar Component (Legal at a Glance) */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 flex flex-col gap-6 rounded-xl p-6 border-2 border-foreground bg-white shadow-block">
                            <div>
                                <h3 className="text-foreground text-xl font-bold mb-1">Legal at a Glance</h3>
                                <p className="text-foreground/60 text-sm font-bold">Summary of our core principles</p>
                            </div>
                            <nav className="flex flex-col gap-2">
                                <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white border-2 border-foreground shadow-[2px_2px_0px_0px_#353534] transition-all font-bold" href="#detect">
                                    <span className="material-symbols-outlined">info</span>
                                    <span className="text-sm leading-normal">1. Detection Scope</span>
                                </a>
                                <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-accent/20 border border-transparent hover:border-foreground/10 transition-all font-medium" href="#no-tracking">
                                    <span className="material-symbols-outlined">visibility_off</span>
                                    <span className="text-sm leading-normal">2. No Data Collection</span>
                                </a>
                                <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-accent/20 border border-transparent hover:border-foreground/10 transition-all font-medium" href="#gdpr">
                                    <span className="material-symbols-outlined">shield</span>
                                    <span className="text-sm leading-normal">3. GDPR Rights</span>
                                </a>
                                <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-accent/20 border border-transparent hover:border-foreground/10 transition-all font-medium" href="#local">
                                    <span className="material-symbols-outlined">memory</span>
                                    <span className="text-sm leading-normal">4. Client-side Processing</span>
                                </a>
                                <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-accent/20 border border-transparent hover:border-foreground/10 transition-all font-medium" href="#security">
                                    <span className="material-symbols-outlined">lock</span>
                                    <span className="text-sm leading-normal">5. Security Standards</span>
                                </a>
                            </nav>
                            <hr className="border-foreground/10 my-2 border-2" />
                            <div className="p-4 rounded-lg bg-accent/30 border-2 border-primary border-dashed">
                                <p className="text-xs text-primary font-black uppercase tracking-wider mb-2">Pro Tip</p>
                                <p className="text-foreground/80 text-xs leading-relaxed font-medium">
                                    We don&apos;t store your technical specs. Once you close this tab, the detected information is wiped from your browser&apos;s memory.
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* SectionHeader Component - 1 */}
                        <section className="scroll-mt-28" id="detect">
                            <h2 className="text-foreground text-3xl font-black leading-tight tracking-tight border-b-4 border-accent pb-4 mb-6">1. Information We Detect</h2>
                            <div className="prose prose-slate max-w-none text-foreground/80 leading-relaxed space-y-4 font-medium">
                                <p>Our service is designed to help you troubleshoot browser and device issues by identifying specific technical parameters. The following information is detected locally on your machine:</p>
                                <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                    <li><strong>Browser Identity:</strong> Name, version, and rendering engine.</li>
                                    <li><strong>Operating System:</strong> OS name, version, and architecture (e.g., Windows 11, macOS 14).</li>
                                    <li><strong>Display Specs:</strong> Screen resolution, color depth, and pixel ratio.</li>
                                    <li><strong>Capabilities:</strong> Support for JavaScript, Cookies, CSS Grid, and WebGL.</li>
                                    <li><strong>Network:</strong> Estimated connection type (cellular, wifi) and latency.</li>
                                </ul>
                            </div>
                        </section>

                        {/* SectionHeader Component - 2 */}
                        <section className="scroll-mt-28" id="no-tracking">
                            <h2 className="text-foreground text-3xl font-black leading-tight tracking-tight border-b-4 border-accent pb-4 mb-6">2. No Persistent Data Collection</h2>
                            <div className="prose prose-slate max-w-none text-foreground/80 leading-relaxed space-y-4 font-medium">
                                <p>Unlike traditional analytics tools, MySupportInfo.com does not utilize persistent trackers or &quot;fingerprinting&quot; techniques to identify users across sessions. We do not maintain a database of your visit history or technical specifications.</p>
                                <div className="p-6 rounded-xl bg-white border-2 border-foreground shadow-block-sm my-6">
                                    <h4 className="text-primary font-black mb-2 flex items-center gap-2">
                                        <span className="material-symbols-outlined">verified_user</span>
                                        Privacy Guarantee
                                    </h4>
                                    <p className="text-sm font-medium">We never sell, rent, or share the detected parameters with third-party advertisers. The data remains in your browser until you choose to copy/paste it to a support agent.</p>
                                </div>
                            </div>
                        </section>

                        {/* SectionHeader Component - 3 */}
                        <section className="scroll-mt-28" id="gdpr">
                            <h2 className="text-foreground text-3xl font-black leading-tight tracking-tight border-b-4 border-accent pb-4 mb-6">3. GDPR & CCPA Compliance</h2>
                            <div className="prose prose-slate max-w-none text-foreground/80 leading-relaxed space-y-4 font-medium">
                                <p>Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you have the right to know what data is processed. Since all processing occurs on your device, you are in full control of your &quot;personal data&quot; at all times.</p>
                                <p>If you use our &quot;Email Report&quot; feature, we process the destination email address only for the duration of the SMTP transaction. We do not store these email addresses in our marketing lists.</p>
                            </div>
                        </section>

                        {/* SectionHeader Component - 4 */}
                        <section className="scroll-mt-28" id="local">
                            <h2 className="text-foreground text-3xl font-black leading-tight tracking-tight border-b-4 border-accent pb-4 mb-6">4. Client-side Processing</h2>
                            <div className="prose prose-slate max-w-none text-foreground/80 leading-relaxed space-y-4 font-medium">
                                <p>The core logic of our dashboard is executed via client-side JavaScript. This means your CPU does the work, and the results are displayed on your screen without ever being transmitted to our servers for analysis. This architecture ensures maximum speed and unmatched privacy.</p>
                                <div className="relative w-full h-64 rounded-xl overflow-hidden my-8 group border-2 border-foreground shadow-block">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-black/80 flex items-center justify-center z-20">
                                        <div className="text-center p-8 bg-white border-2 border-foreground shadow-block rounded-xl max-w-md">
                                            <span className="material-symbols-outlined text-5xl text-primary mb-4">memory</span>
                                            <p className="text-foreground text-lg font-black">Edge-Processing Architecture</p>
                                            <p className="text-foreground/70 text-sm mt-2 font-bold">Your data never leaves your device unless you manually export it.</p>
                                        </div>
                                    </div>
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        data-alt="Abstract server network visualization"
                                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmyD7jkd2-AVHBANN76e5g30fLx8BcNHJ1R5ZbvKaa9sb-i8yhhZmTrG1wWIPv8bKfC_MAtRQ4IanZHMrn7mPU4s71yjyEeVadIyRGvWppVUzknfiowV48fNzjiu9ht8V_mNKefrpTFPqsLM6R16nzgSBgG37c7xC7be3KuojQ6XfNn4mMm_KBn2ZIxR4E5XBXHll2e9zI1JBM50yxdmIJbmb7dcLQHkAbqoWMnIGwz82eWBCjJLicpCimHPDZX-p3TufWj3fGlD4')" }}
                                    ></div>
                                </div>
                            </div>
                        </section>

                        {/* SectionHeader Component - 5 */}
                        <section className="scroll-mt-28" id="security">
                            <h2 className="text-foreground text-3xl font-black leading-tight tracking-tight border-b-4 border-accent pb-4 mb-6">5. Security Standards</h2>
                            <div className="prose prose-slate max-w-none text-foreground/80 leading-relaxed space-y-4 font-medium">
                                <p>We employ modern security headers (HSTS, CSP, X-Frame-Options) to ensure that your interaction with our site is not intercepted or spoofed. Our entire platform is served over encrypted TLS 1.3 connections.</p>
                            </div>
                        </section>

                        <div className="pt-12 border-t-2 border-foreground/10 flex flex-col items-center text-center gap-6">
                            <div className="flex gap-4">
                                <button className="block-btn-primary flex items-center gap-2 px-6 py-3 rounded-lg text-sm">
                                    <span className="material-symbols-outlined text-xl">download</span>
                                    Download as PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
