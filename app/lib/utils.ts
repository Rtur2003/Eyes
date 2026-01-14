import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, parseISO, isToday, isYesterday, isThisWeek } from "date-fns";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for conflict-free class names
 * 
 * @param inputs - Array of class values to merge
 * @returns Merged class string with Tailwind conflicts resolved
 * 
 * @example
 * ```tsx
 * cn('px-4 py-2', 'px-6', 'bg-gold-500') // Returns: 'px-6 py-2 bg-gold-500'
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as USD currency
 * Legacy function kept for compatibility
 * 
 * @param value - Number to format
 * @returns Formatted currency string (e.g., "$1,234")
 * 
 * @example
 * ```tsx
 * formatCurrency(1234.56) // Returns: "$1,235"
 * ```
 */
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format a date for dream entries with contextual labels
 * Shows "Today", "Yesterday", day name for this week, or full date
 * 
 * @param date - Date to format (Date object or ISO string)
 * @returns User-friendly date string
 * 
 * @example
 * ```tsx
 * formatDreamDate(new Date()) // Returns: "Today"
 * formatDreamDate('2025-01-10') // Returns: "Jan 10, 2025"
 * ```
 */
export const formatDreamDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  if (isThisWeek(d)) return format(d, 'EEEE');
  
  return format(d, 'MMM d, yyyy');
};

/**
 * Format a date as relative time from now
 * 
 * @param date - Date to format (Date object or ISO string)
 * @returns Relative time string (e.g., "2 hours ago", "in 3 days")
 * 
 * @example
 * ```tsx
 * formatRelativeTime(yesterday) // Returns: "1 day ago"
 * ```
 */
export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
};

/**
 * Format a date as time string (HH:mm format)
 * 
 * @param date - Date to format (Date object or ISO string)
 * @returns Time string in 24-hour format
 * 
 * @example
 * ```tsx
 * formatTime(new Date()) // Returns: "14:30"
 * ```
 */
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'HH:mm');
};

// Number utilities
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

// Random ID generator
export const generateId = (): string => {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
};

// Color utilities for dream types
export const getDreamTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    normal: '#D4AF37',
    lucid: '#FFD700',
    nightmare: '#B22222',
    recurring: '#6B8E23',
    prophetic: '#9370DB',
    shared: '#4682B4',
  };
  return colors[type] || colors.normal;
};

// Emotion to color mapping
export const getEmotionColor = (emotion: string): string => {
  const colors: Record<string, string> = {
    joy: '#FFD700',
    fear: '#8B0000',
    peace: '#87CEEB',
    confusion: '#9370DB',
    love: '#FF69B4',
    anxiety: '#FF6347',
    wonder: '#DAA520',
    neutral: '#A0A0A0',
  };
  return colors[emotion] || colors.neutral;
};

// Truncate text
export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Calculate lucidity level description
export const getLucidityLevel = (lucidity: number): string => {
  if (lucidity >= 90) return 'Full Control';
  if (lucidity >= 70) return 'High Awareness';
  if (lucidity >= 50) return 'Moderate';
  if (lucidity >= 30) return 'Glimpses';
  return 'Non-Lucid';
};

// Sleep quality description
export const getSleepQualityLabel = (quality: number): string => {
  if (quality >= 90) return 'Excellent';
  if (quality >= 70) return 'Good';
  if (quality >= 50) return 'Fair';
  if (quality >= 30) return 'Poor';
  return 'Very Poor';
};
