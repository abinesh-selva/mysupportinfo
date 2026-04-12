"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerContainerProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    staggerChildren?: number;
}

export const containerVariants = {
    hidden: { opacity: 0 },
    show: (custom: { staggerChildren: number; delayChildren: number }) => ({
        opacity: 1,
        transition: {
            staggerChildren: custom.staggerChildren,
            delayChildren: custom.delayChildren,
        },
    }),
};

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20
        }
    },
};

export default function StaggerContainer({
    children,
    delay = 0,
    className = "",
    staggerChildren = 0.1,
}: StaggerContainerProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            custom={{ staggerChildren, delayChildren: delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
