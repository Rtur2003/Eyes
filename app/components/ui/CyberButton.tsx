"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";

/**
 * Props for the CyberButton component
 * @interface CyberButtonProps
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 */
interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Show loading spinner and disable interaction */
  isLoading?: boolean;
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
}

/**
 * Style variants for CyberButton component
 * Maps variant names to Tailwind CSS classes
 */
const variants = {
  primary: "bg-gold-500/10 text-gold-400 border-gold-500/50 hover:bg-gold-500/20 hover:text-gold-200 hover:border-gold-400 hover:shadow-glow-gold",
  secondary: "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20",
  ghost: "bg-transparent text-gold-500/70 border-transparent hover:text-gold-400 hover:bg-gold-500/10",
  danger: "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50",
};

/**
 * Size variants for CyberButton component
 * Defines padding and text size for different button sizes
 */
const sizes = {
  sm: "px-4 py-2 text-[10px]",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-sm",
};

/**
 * CyberButton - A futuristic styled button component
 * 
 * Features:
 * - Multiple style variants (primary, secondary, ghost, danger, success)
 * - Three size options (sm, md, lg)
 * - Loading state with spinner animation
 * - Support for left and right icons
 * - Shimmer effect on hover
 * - Bottom line accent animation
 * - Disabled state handling
 * 
 * @component
 * @example
 * ```tsx
 * <CyberButton 
 *   variant="primary" 
 *   size="md"
 *   isLoading={false}
 *   leftIcon={<Save size={16} />}
 *   onClick={handleSave}
 * >
 *   Save Dream
 * </CyberButton>
 * ```
 */
export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative group border rounded-sm font-sans uppercase tracking-[0.2em] transition-all duration-300",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "flex items-center justify-center gap-2",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Loading spinner */}
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        
        {!isLoading && leftIcon}
        
        <span className="relative z-10">{children}</span>
        
        {!isLoading && rightIcon}
        
        {/* Bottom line accent */}
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
      </button>
    );
  }
);

CyberButton.displayName = "CyberButton";

/**
 * IconButton - A compact button variant for displaying icons
 * 
 * Optimized for icon-only interactions with circular styling.
 * Includes hover effects and multiple visual variants.
 * 
 * @component
 * @example
 * ```tsx
 * <IconButton variant="glow">
 *   <Heart size={20} />
 * </IconButton>
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'default' | 'ghost' | 'glow';
}>(({ className, variant = 'default', children, ...props }, ref) => {
  const iconVariants = {
    default: "bg-obsidian-surface/50 border-gold-500/20 hover:border-gold-500/40 hover:bg-obsidian-surface",
    ghost: "bg-transparent border-transparent hover:bg-gold-500/10",
    glow: "bg-gold-500/10 border-gold-500/30 hover:shadow-glow-gold",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "p-2 rounded-lg border transition-all duration-200",
        "text-gold-400 hover:text-gold-300",
        iconVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

IconButton.displayName = "IconButton";
