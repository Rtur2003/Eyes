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

/**
 * Format a number as percentage
 * 
 * @param value - Number to format (0-100)
 * @returns Percentage string with % symbol
 * 
 * @example
 * ```tsx
 * formatPercentage(72.5) // Returns: "73%"
 * ```
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Format a number with thousands separators
 * 
 * @param value - Number to format
 * @returns Formatted number string
 * 
 * @example
 * ```tsx
 * formatNumber(1234567) // Returns: "1,234,567"
 * ```
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Generate a unique ID using timestamp and random string
 * 
 * @returns Unique identifier string
 * 
 * @example
 * ```tsx
 * generateId() // Returns: "lh3j9k2-a8b9c0d"
 * ```
 */
export const generateId = (): string => {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Get color for a dream type
 * 
 * @param type - Dream type identifier
 * @returns Hex color code
 * 
 * @example
 * ```tsx
 * getDreamTypeColor('lucid') // Returns: "#FFD700"
 * ```
 */
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

/**
 * Get color for an emotion type
 * 
 * @param emotion - Emotion identifier
 * @returns Hex color code
 * 
 * @example
 * ```tsx
 * getEmotionColor('joy') // Returns: "#FFD700"
 * ```
 */
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

/**
 * Truncate text to a maximum length with ellipsis
 * 
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with "..." if needed
 * 
 * @example
 * ```tsx
 * truncate('Long dream description here', 10) // Returns: "Long dream..."
 * ```
 */
export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
};

/**
 * Capitalize the first letter of a string
 * 
 * @param str - String to capitalize
 * @returns String with first letter capitalized
 * 
 * @example
 * ```tsx
 * capitalize('lucid dream') // Returns: "Lucid dream"
 * ```
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Get descriptive label for lucidity level
 * 
 * @param lucidity - Lucidity percentage (0-100)
 * @returns Descriptive label for the lucidity level
 * 
 * @example
 * ```tsx
 * getLucidityLevel(85) // Returns: "High Awareness"
 * ```
 */
export const getLucidityLevel = (lucidity: number): string => {
  if (lucidity >= 90) return 'Full Control';
  if (lucidity >= 70) return 'High Awareness';
  if (lucidity >= 50) return 'Moderate';
  if (lucidity >= 30) return 'Glimpses';
  return 'Non-Lucid';
};

/**
 * Get descriptive label for sleep quality score
 * 
 * @param quality - Sleep quality score (0-100)
 * @returns Descriptive label for the quality level
 * 
 * @example
 * ```tsx
 * getSleepQualityLabel(88) // Returns: "Good"
 * ```
 */
export const getSleepQualityLabel = (quality: number): string => {
  if (quality >= 90) return 'Excellent';
  if (quality >= 70) return 'Good';
  if (quality >= 50) return 'Fair';
  if (quality >= 30) return 'Poor';
  return 'Very Poor';
};
