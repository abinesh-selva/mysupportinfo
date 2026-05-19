# 🛡️ MySupportInfo

**MySupportInfo** is a premium, privacy-first, client-side system diagnostic and network speed/stability testing tool. Built with modern web technologies, it features an aesthetic, high-fidelity **Neobrutalist Design System** that is both highly interactive and instantly responsive. 

It enables users and IT support teams to instantly analyze a device's technical specifications, view browser characteristics, and run a professional-grade **Bufferbloat Latency Diagnostic**—all with **100% client-side execution** and **zero data logging**.

---

## ✨ Key Features

### 💻 Advanced Device & Browser Diagnostics
- **Core Detection:** Instantly detects Operating System (Windows, macOS, Linux, Android, iOS) and Browser name/version (Chrome, Edge, Firefox, Safari, Opera).
- **Display Properties:** Captures Screen Resolution, Viewport Size, and Device Pixel Ratio (DPR) with real-time automatic updating upon resizing or zooming.
- **Hardware Profile:** Estimates available RAM, logical CPU Core counts, and detects the physical GPU/WebGL renderer.
- **Network Metadata:** Shows estimated connection type, downlink speed, idle round-trip latency, and public IP address.
- **Privacy Signals:** Detects "Do Not Track" headers, browser cookie persistence settings, and local timezone details.
- **Screenshot Report:** Allows downloading a visual `.png` card of the diagnostic orb instantly using client-side canvas rendering.

### ⚡ Professional Bufferbloat Diagnostic
- **Real-Time Simulation:** Simulates multi-phase network load (download saturation, upload saturation, and stabilization) to measure baseline vs. loaded latency.
- **Interactive Charting:** Fully custom, responsive SVG graphs mapping real-time download speed, loaded latency spikes, and base latency.
- **Grade & Assessment:** Analyzes network Quality of Experience (QoE) and awards an official grade (`A` through `F`) based on bufferbloat ms increase, complete with action-oriented tips to fix poor network performance (SQM, QoS limits, etc.).

### 🔒 Uncompromising Volatile Privacy
- **Client-Side Processing:** All computations, user-agent parsing, and load testing are executed directly in the browser sandbox.
- **Zero Tracking:** No persistent cookies, analytics databases, database logging, or tracking IDs. GDPR and CCPA compliant by design.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router architecture)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a curated Neobrutalist design palette
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for smooth, premium micro-interactions
- **Utilities:** `html2canvas` for client-side report rendering, `lucide-react` for iconography
- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) (modern sans-serif) and [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (serif details)

---

## 📂 Project Structure

```text
mysupportinfo/
├── app/
│   ├── bufferbloat/        # Bufferbloat latency test page & layout (SEO optimized)
│   ├── faq/                # FAQ Knowledge Base & layout
│   ├── privacy/            # Privacy Policy & compliance center
│   ├── globals.css         # Tailwind global layer directives and classes
│   ├── layout.tsx          # Root Layout (Fonts, Google Analytics & WebApplication Schema)
│   ├── page.tsx            # Main System Diagnostics dashboard
│   ├── robots.ts           # Dynamic SEO robots.txt rules
│   └── sitemap.ts          # Dynamic XML Sitemap generator
├── components/
│   ├── bufferbloat/
│   │   └── ResultsCharts.tsx # Custom Neobrutalist SVG charts (Real-time speed & latency)
│   ├── layout/
│   │   ├── Header.tsx      # Responsive header with path-active styling
│   │   └── Footer.tsx      # Privacy badge & active client-footprint tracker
│   └── ui/
│       └── FadeIn.tsx      # Custom Framer Motion scroll/reveal component
├── lib/
│   └── bufferbloat-engine.ts # Simulation engine for network latency under load
├── tailwind.config.ts      # Custom Neobrutalist design system config (colors, shadows, borders)
└── tsconfig.json           # TypeScript configuration
```

---

## 🚀 Getting Started

To run the project locally or in a development sandbox, follow these steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
To build a production bundle and run the server:
```bash
npm run build
npm start
```

---

## 📈 SEO & Schema Implementations

- **Metadata API:** Dynamic per-page page title templates, descriptive meta descriptions, custom keywords, and correct OpenGraph / Twitter Card configurations.
- **Canonical URLs:** Structured `alternates: { canonical: ... }` on all layouts to prevent duplicate indexing.
- **Structured JSON-LD Schema:** Embeds `WebApplication` rich snippets (Schema.org) dynamically in the root layout head containing application category, free pricing offers, target operating systems, and detailed features.
- **Search Engine Discovery:** Custom-coded automated [sitemap.ts](https://github.com/) and [robots.ts](https://github.com/) endpoints to maximize discoverability.

---

## 🛡️ License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.