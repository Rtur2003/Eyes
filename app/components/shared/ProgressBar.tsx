"use client";

import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";

/**
 * Props for the ProgressBar component
 * @interface ProgressBarProps
 */
interface ProgressBarProps {
  /** Current progress value */
  value: number;
  /** Maximum value (defaults to 100) */
  max?: number;
  /** Optional label to display above the bar */
  label?: string;
  /** Show percentage value */
  showPercentage?: boolean;
  /** Color variant of the progress bar */
  variant?: 'gold' | 'bronze' | 'gradient';
  /** Size of the progress bar */
  size?: 'sm' | 'md' | 'lg';
  /** Enable fill animation on mount */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Size variants for the progress bar
 * Defines height for different sizes
 */
const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

/**
 * Color variants for the progress bar
 * Uses gradient backgrounds for visual appeal
 */
const variantClasses = {
  gold: 'bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600',
  bronze: 'bg-gradient-to-r from-bronze-600 via-bronze-400 to-bronze-600',
  gradient: 'bg-gradient-to-r from-gold-600 via-gold-300 to-bronze-400',
};

/**
 * ProgressBar - Linear progress indicator component
 * 
 * Features:
 * - Animated fill from 0 to target percentage
 * - Multiple color variants (gold, bronze, gradient)
 * - Three size options (sm, md, lg)
 * - Optional label and percentage display
 * - Smooth easing animation
 * 
 * @component
 * @example
 * ```tsx
 * <ProgressBar 
 *   value={72} 
 *   label="Lucid Mastery" 
 *   showPercentage 
 *   variant="gold"
 * />
 * ```
 */
export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = false,
  variant = 'gold',
  size = 'md',
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-xs font-sans uppercase tracking-widest text-gold-300/60">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-xs font-mono text-gold-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn("rounded-full bg-obsidian-surface overflow-hidden", sizeClasses[size])}>
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className={cn("h-full rounded-full", variantClasses[variant])}
        />
      </div>
    </div>
  );
}

/**
 * CircularProgress - Circular progress indicator component
 * 
 * Displays progress as a circular ring with animated fill.
 * Ideal for compact spaces and dashboard widgets.
 * 
 * Features:
 * - SVG-based circular progress ring
 * - Animated stroke dashoffset for smooth fill
 * - Gold gradient stroke color
 * - Centered percentage and label display
 * - Customizable size and stroke width
 * 
 * @component
 * @example
 * ```tsx
 * <CircularProgress 
 *   value={85} 
 *   size={120} 
 *   strokeWidth={10}
 *   label="Sleep Quality"
 *   showValue
 * />
 * ```
 */
export function CircularProgress({
  value,
  max = 100,
  size = 100,
  strokeWidth = 8,
  label,
  showValue = true,
  className,
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="rgba(212, 175, 55, 0.1)"
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="url(#goldGradient)"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            strokeDasharray: circumference,
          }}
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B5952F" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#F9E076" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span className="text-2xl font-serif text-gold-100">{Math.round(percentage)}%</span>
        )}
        {label && (
          <span className="text-xs font-sans uppercase tracking-wider text-gold-300/60 mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}