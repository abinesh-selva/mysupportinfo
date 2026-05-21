import type { CSSProperties, ReactNode } from "react";

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    fullWidth?: boolean;
}

export default function FadeIn({
    children,
    delay = 0,
    className = "",
    direction = "up",
    fullWidth = false,
}: FadeInProps) {
    const style = {
        "--fade-delay": `${delay}s`,
        width: fullWidth ? "100%" : "auto",
    } as CSSProperties;

    return (
        <div className={`${className} fade-in fade-in-${direction}`} style={style}>
            {children}
        </div>
    );
}
