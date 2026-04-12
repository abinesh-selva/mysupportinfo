"use client";
import { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    initialOpen?: boolean;
}

export default function FAQItem({ question, answer, initialOpen = false }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(initialOpen);

    return (
        <div className="border border-white/10 rounded-xl bg-white/5 overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary/80">help</span>
                    <span className="font-bold text-lg text-white/90">{question}</span>
                </div>
                <span className={`material-symbols-outlined transition-transform duration-300 text-white/50 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out border-t border-white/5 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 pt-4 text-slate-400 leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
}
