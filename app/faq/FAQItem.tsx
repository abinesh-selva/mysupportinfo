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
        <div className="border-2 border-[#00473E] rounded-xl bg-white shadow-block-sm overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FAF6F0]/60 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#009E52]">help</span>
                    <span className="font-bold text-lg text-[#00473E]">{question}</span>
                </div>
                <span className={`material-symbols-outlined transition-transform duration-300 text-[#00473E]/50 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out border-t border-[#00473E]/10 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 pt-4 text-[#00473E]/80 leading-relaxed font-medium">
                    {answer}
                </div>
            </div>
        </div>
    );
}
