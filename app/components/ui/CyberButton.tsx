import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/app/lib/utils";

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
    ({ className, variant = 'primary', ...props }, ref) => {
        const variants = {
            primary: "bg-gold-500/10 text-gold-400 border-gold-500/50 hover:bg-gold-500/20 hover:text-gold-200 hover:border-gold-400 hover:shadow-glow-gold",
            secondary: "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white",
            ghost: "bg-transparent text-gold-500/70 hover:text-gold-400"
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "relative px-6 py-3 border rounded-sm font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    variants[variant],
                    className
                )}
                {...props}
            >
                {props.children}
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </button>
        );
    }
);

CyberButton.displayName = "CyberButton";
