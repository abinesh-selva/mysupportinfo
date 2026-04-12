"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Copy } from "lucide-react";

interface InfoCardProps {
    label: string;
    value: string;
    icon?: ReactNode;
    delay?: number;
}

export default function InfoCard({ label, value, icon, delay = 0 }: InfoCardProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        // TODO: Add toast notification
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
                    <p className="text-lg font-semibold text-white break-all">{value}</p>
                </div>
                {icon && <div className="text-gray-500 group-hover:text-white transition-colors">{icon}</div>}
            </div>

            <button
                onClick={handleCopy}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                aria-label="Copy to clipboard"
            >
                <Copy className="w-4 h-4" />
            </button>
        </motion.div>
    );
}
