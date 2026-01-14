import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
    delay?: number;
}

export function GlassCard({ children, className, hoverEffect = true, delay = 0 }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className={cn(
                "relative overflow-hidden rounded-xl border border-white/5 bg-obsidian-card/40 backdrop-blur-md p-6",
                "shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]",
                hoverEffect && "transition-all duration-300 hover:border-gold-500/30 hover:shadow-glow-subtle hover:-translate-y-1",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none" />
            {children}
        </motion.div>
    );
}
