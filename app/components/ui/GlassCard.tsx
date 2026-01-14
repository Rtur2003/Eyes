"use client";

import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

/**
 * Props for the GlassCard component
 * @interface GlassCardProps
 * @extends {Omit<HTMLMotionProps<"div">, 'children'>}
 */
interface GlassCardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  /** Content to be rendered inside the card */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Enable hover scale and glow effects */
  hoverEffect?: boolean;
  /** Enable pulsing glow animation */
  glowEffect?: boolean;
  /** Animation delay in seconds */
  delay?: number;
  /** Visual style variant of the card */
  variant?: 'default' | 'bordered' | 'glow' | 'neural';
}

/**
 * Visual style variants for the GlassCard component
 * Each variant provides different border, background, and shadow combinations
 */
const variants = {
  default: "border-white/5 bg-obsidian-card/40",
  bordered: "border-gold-500/20 bg-obsidian-card/30",
  glow: "border-gold-500/30 bg-obsidian-card/50 shadow-glow-subtle",
  neural: "border-gold-500/10 bg-obsidian-card/20 backdrop-blur-lg",
};

/**
 * GlassCard - A glass-morphism styled card component with animations
 * 
 * Features:
 * - Multiple visual variants (default, bordered, glow, neural)
 * - Smooth fade-in animation on mount
 * - Optional hover effects with scale and glow
 * - Gradient overlays and corner accents
 * - Backdrop blur for depth effect
 * 
 * @component
 * @example
 * ```tsx
 * <GlassCard variant="glow" hoverEffect delay={0.2}>
 *   <h2>Dream Entry</h2>
 *   <p>Your dream content...</p>
 * </GlassCard>
 * ```
 */
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

/**
 * StatCard - A specialized card for displaying statistics
 * 
 * Displays a metric with label, value, optional icon, and trend indicator.
 * Features hover effects and smooth animations.
 * 
 * @component
 * @example
 * ```tsx
 * <StatCard 
 *   label="Total Dreams" 
 *   value={247} 
 *   icon={Brain} 
 *   trend={12}
 *   delay={0.1}
 * />
 * ```
 */
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

/**
 * FeatureCard - A card component for showcasing features
 * 
 * Displays a feature with icon, title, and description.
 * Includes interactive hover effects and optional click handler.
 * 
 * @component
 * @example
 * ```tsx
 * <FeatureCard
 *   title="Dream Journal"
 *   description="Record and analyze your dreams"
 *   icon={BookOpen}
 *   onClick={() => navigate('/journal')}
 *   delay={0.3}
 * />
 * ```
 */
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
