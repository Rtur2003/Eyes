"use client";

import { cn } from "@/app/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";
import { useState } from "react";

/**
 * Props for the Badge component
 * @interface BadgeProps
 */
interface BadgeProps {
  /** Content to display inside the badge */
  children: React.ReactNode;
  /** Color variant of the badge */
  variant?: 'gold' | 'bronze' | 'neutral' | 'success' | 'warning' | 'danger' | 'lucid';
  /** Size of the badge */
  size?: 'sm' | 'md';
  /** Show remove button */
  removable?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles for custom colors */
  style?: React.CSSProperties;
}

/**
 * Color variants for badges
 * Maps variant names to Tailwind CSS classes
 */
const badgeVariants = {
  gold: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
  bronze: 'bg-bronze-500/10 text-bronze-400 border-bronze-500/20',
  neutral: 'bg-white/5 text-gray-400 border-white/10',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  danger: 'bg-red-500/10 text-red-400 border-red-500/20',
  lucid: 'bg-gradient-to-r from-gold-500/20 to-bronze-500/20 text-gold-300 border-gold-500/30',
};

/**
 * Badge - A small label component for tags and categories
 * 
 * Features:
 * - Multiple color variants
 * - Two size options (sm, md)
 * - Optional remove button
 * - Support for custom inline styles
 * - Pill-shaped design with rounded corners
 * 
 * @component
 * @example
 * ```tsx
 * <Badge variant="lucid" removable onRemove={() => removeTag('flying')}>
 *   Flying
 * </Badge>
 * ```
 */
export function Badge({
  children,
  variant = 'gold',
  size = 'md',
  removable = false,
  onRemove,
  className,
  style,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border transition-colors",
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
        !style && badgeVariants[variant],
        className
      )}
      style={style}
    >
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 hover:text-white transition-colors"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}

/**
 * Props for the Tooltip component
 * @interface TooltipProps
 */
interface TooltipProps {
  /** Element that triggers the tooltip */
  children: React.ReactNode;
  /** Tooltip text content */
  content: string;
  /** Position of the tooltip relative to trigger */
  position?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Position classes for tooltip placement
 * Uses Tailwind translate utilities for precise positioning
 */
const tooltipPositions = {
  top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full',
  bottom: '-bottom-2 left-1/2 -translate-x-1/2 translate-y-full',
  left: 'top-1/2 -left-2 -translate-x-full -translate-y-1/2',
  right: 'top-1/2 -right-2 translate-x-full -translate-y-1/2',
};

/**
 * Tooltip - A hover-triggered contextual information component
 * 
 * Features:
 * - Appears on hover
 * - Smooth fade and scale animation
 * - Four position options (top, bottom, left, right)
 * - Arrow pointer to trigger element
 * - Auto-hides when mouse leaves
 * 
 * @component
 * @example
 * ```tsx
 * <Tooltip content="Save your dream entry" position="top">
 *   <button>Save</button>
 * </Tooltip>
 * ```
 */
export function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 px-3 py-2 text-xs font-sans rounded-lg",
              "bg-obsidian-card border border-gold-500/20 text-gold-100",
              "whitespace-nowrap shadow-lg",
              tooltipPositions[position]
            )}
          >
            {content}
            <div
              className={cn(
                "absolute w-2 h-2 bg-obsidian-card border-gold-500/20 transform rotate-45",
                position === 'top' && "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-r border-b",
                position === 'bottom' && "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-l border-t",
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Alert Component
interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const alertVariants = {
  info: {
    container: 'bg-gold-500/10 border-gold-500/20 text-gold-200',
    icon: Info,
  },
  success: {
    container: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200',
    icon: CheckCircle,
  },
  warning: {
    container: 'bg-amber-500/10 border-amber-500/20 text-amber-200',
    icon: AlertTriangle,
  },
  error: {
    container: 'bg-red-500/10 border-red-500/20 text-red-200',
    icon: AlertCircle,
  },
};

export function Alert({
  title,
  children,
  variant = 'info',
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const { container, icon: Icon } = alertVariants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "relative flex gap-3 p-4 rounded-lg border",
        container,
        className
      )}
    >
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <div className="font-medium mb-1">{title}</div>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 opacity-50 hover:opacity-100 transition-opacity"
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
}

// Skeleton Loader
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gold-500/10",
        className
      )}
    />
  );
}

// Divider
export function Divider({ 
  className, 
  vertical = false,
  gradient = true 
}: { 
  className?: string; 
  vertical?: boolean;
  gradient?: boolean;
}) {
  if (vertical) {
    return (
      <div
        className={cn(
          "w-px h-full",
          gradient
            ? "bg-gradient-to-b from-transparent via-gold-500/20 to-transparent"
            : "bg-gold-500/20",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "h-px w-full",
        gradient
          ? "bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"
          : "bg-gold-500/20",
        className
      )}
    />
  );
}

// Empty State
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      {Icon && (
        <div className="p-4 rounded-full bg-gold-500/10 border border-gold-500/20 mb-4">
          <Icon size={32} className="text-gold-500/50" />
        </div>
      )}
      <h3 className="text-lg font-serif text-gold-100 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gold-200/60 max-w-md mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}