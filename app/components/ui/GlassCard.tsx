"use client";

import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  delay?: number;
  variant?: 'default' | 'bordered' | 'glow' | 'neural';
}

const variants = {
  default: "border-white/5 bg-obsidian-card/40",
  bordered: "border-gold-500/20 bg-obsidian-card/30",
  glow: "border-gold-500/30 bg-obsidian-card/50 shadow-glow-subtle",
  neural: "border-gold-500/10 bg-obsidian-card/20 backdrop-blur-lg",
};

export function GlassCard({ 
  children, 
  className, 
  hoverEffect = true, 
  glowEffect = false,
  delay = 0,
  variant = 'default',
  ...props 
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={cn(
        "relative overflow-hidden rounded-xl border backdrop-blur-md p-6",
        "shadow-card",
        variants[variant],
        hoverEffect && "transition-all duration-300 hover:border-gold-500/30 hover:shadow-glow-subtle hover:-translate-y-1",
        glowEffect && "animate-glow-pulse",
        className
      )}
      {...props}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none" />
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold-500/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Stat Card variant
export function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  delay = 0,
  className 
}: { 
  label: string;
  value: string | number;
  icon?: React.ElementType;
  trend?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <GlassCard delay={delay} className={cn("h-36 flex flex-col justify-between group", className)}>
      <div className="flex justify-between items-start">
        {Icon && <Icon className="text-gold-500/50 group-hover:text-gold-400 transition-colors" size={20} />}
        {trend !== undefined && (
          <span className={cn(
            "text-xs font-mono",
            trend >= 0 ? "text-green-400" : "text-red-400"
          )}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      
      <div>
        <div className="text-xs font-sans uppercase tracking-widest text-gold-300/60 mb-1">{label}</div>
        <div className="text-2xl font-serif font-medium text-white">{value}</div>
      </div>
    </GlassCard>
  );
}

// Feature Card variant
export function FeatureCard({
  title,
  description,
  icon: Icon,
  delay = 0,
  onClick,
  className,
}: {
  title: string;
  description: string;
  icon?: React.ElementType;
  delay?: number;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <GlassCard 
      delay={delay} 
      onClick={onClick}
      className={cn(
        "cursor-pointer group",
        onClick && "hover:scale-[1.02]",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="p-3 rounded-lg bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500/20 transition-colors">
            <Icon className="text-gold-400" size={24} />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-serif text-gold-100 mb-2 group-hover:text-gold-50 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gold-200/60 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
