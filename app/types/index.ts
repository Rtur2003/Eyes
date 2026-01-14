// ==============================================
// AURUM NEXUS - Type Definitions
// Neural Dream Journal & Consciousness Analytics
// ==============================================

/**
 * Dream type classifications
 * @typedef {('normal' | 'lucid' | 'nightmare' | 'recurring' | 'prophetic' | 'shared')} DreamType
 */
export type DreamType = 'normal' | 'lucid' | 'nightmare' | 'recurring' | 'prophetic' | 'shared';

/**
 * Emotion classifications for dreams
 * @typedef {('joy' | 'fear' | 'peace' | 'confusion' | 'love' | 'anxiety' | 'wonder' | 'neutral')} EmotionType
 */
export type EmotionType = 'joy' | 'fear' | 'peace' | 'confusion' | 'love' | 'anxiety' | 'wonder' | 'neutral';

/**
 * Dream clarity rating scale (1-5)
 * @typedef {(1 | 2 | 3 | 4 | 5)} ClarityLevel
 */
export type ClarityLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Tag metadata with frequency tracking
 * @interface DreamTag
 */
export interface DreamTag {
  /** Unique identifier for the tag */
  id: string;
  /** Tag name/label */
  name: string;
  /** Visual color for the tag */
  color: string;
  /** Number of times this tag is used */
  frequency: number;
}

/**
 * Complete dream journal entry
 * @interface DreamEntry
 */
/**
 * Complete dream journal entry
 * @interface DreamEntry
 */
export interface DreamEntry {
  /** Unique identifier */
  id: string;
  /** Dream title */
  title: string;
  /** Full dream narrative */
  content: string;
  /** Date the dream occurred */
  date: Date;
  /** Classification of dream type */
  type: DreamType;
  /** Emotions experienced in the dream */
  emotions: EmotionType[];
  /** Dream clarity rating (1-5) */
  clarity: ClarityLevel;
  /** Lucidity level percentage (0-100) */
  lucidity: number;
  /** User-defined tags for categorization */
  tags: string[];
  /** Notable symbols appearing in the dream */
  symbols: string[];
  /** Characters present in the dream */
  characters: string[];
  /** Locations/settings of the dream */
  locations: string[];
  /** Sleep quality rating (0-100) */
  sleepQuality: number;
  /** Estimated REM duration in minutes */
  duration: number;
  /** Whether the dream is marked as favorite */
  isStarred: boolean;
  /** Optional AI-generated interpretation */
  aiAnalysis?: string;
  /** IDs of related/connected dreams */
  connections?: string[];
}

/**
 * Aggregated dream statistics
 * @interface DreamStats
 */
/**
 * Aggregated dream statistics
 * @interface DreamStats
 */
export interface DreamStats {
  /** Total number of dreams recorded */
  totalDreams: number;
  /** Number of lucid dreams */
  lucidDreams: number;
  /** Percentage of lucid dreams */
  lucidPercentage: number;
  /** Average clarity rating across all dreams */
  avgClarity: number;
  /** Average sleep quality score */
  avgSleepQuality: number;
  /** Current dream recording streak in days */
  streakDays: number;
  /** Most frequently experienced emotions */
  mostCommonEmotions: { emotion: EmotionType; count: number }[];
  /** Most frequently used tags */
  mostCommonTags: { tag: string; count: number }[];
  /** Dream frequency by day of week */
  weeklyActivity: { day: string; count: number }[];
  /** Monthly trend showing lucid vs normal dreams */
  monthlyTrend: { month: string; lucid: number; normal: number }[];
}

/**
 * Identified pattern in dream content
 * @interface DreamPattern
 */
/**
 * Identified pattern in dream content
 * @interface DreamPattern
 */
export interface DreamPattern {
  /** Unique identifier */
  id: string;
  /** Pattern category */
  type: 'symbol' | 'theme' | 'emotion' | 'character' | 'location';
  /** Pattern name/description */
  name: string;
  /** Frequency of occurrence */
  frequency: number;
  /** IDs of dreams containing this pattern */
  associatedDreams: string[];
  /** Optional interpretation of the pattern */
  interpretation?: string;
}

/**
 * Node in the consciousness mapping visualization
 * @interface ConsciousnessNode
 */
export interface ConsciousnessNode {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Node category */
  type: 'dream' | 'symbol' | 'theme' | 'emotion';
  /** X coordinate for visualization */
  x?: number;
  /** Y coordinate for visualization */
  y?: number;
  /** IDs of connected nodes */
  connections: string[];
  /** Node importance/size weight */
  weight: number;
}

/**
 * User profile and preferences
 * @interface UserProfile
 */
/**
 * User profile and preferences
 * @interface UserProfile
 */
export interface UserProfile {
  /** Unique user identifier */
  id: string;
  /** User display name */
  name: string;
  /** Achievement rank based on dream mastery */
  rank: 'Dreamer' | 'Lucid Walker' | 'Dream Architect' | 'Consciousness Explorer';
  /** Total dreams recorded */
  totalDreams: number;
  /** Lucid dreaming skill level (0-100) */
  lucidMastery: number;
  /** Account creation date */
  joinedAt: Date;
  /** User preferences and settings */
  preferences: UserPreferences;
}

/**
 * User preferences and settings
 * @interface UserPreferences
 */
export interface UserPreferences {
  /** UI theme preference */
  theme: 'dark' | 'gold';
  /** Enable push notifications */
  notifications: boolean;
  /** Time for daily dream journal reminder */
  reminderTime?: string;
  /** Enable automatic AI dream analysis */
  autoAnalysis: boolean;
}

/**
 * Navigation section identifiers
 * @typedef {('dashboard' | 'journal' | 'analytics' | 'consciousness' | 'timeline' | 'settings')} NavSection
 */
export type NavSection = 'dashboard' | 'journal' | 'analytics' | 'consciousness' | 'timeline' | 'settings';

/**
 * Props for animated card components
 * @interface AnimatedCardProps
 */
/**
 * Props for animated card components
 * @interface AnimatedCardProps
 */
export interface AnimatedCardProps {
  /** Card content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Enable hover scale effect */
  hoverEffect?: boolean;
}

/**
 * Data point for chart visualizations
 * @interface ChartDataPoint
 */
export interface ChartDataPoint {
  /** Label/category name */
  name: string;
  /** Numeric value */
  value: number;
  /** Optional color override */
  fill?: string;
}
