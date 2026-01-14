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
export interface DreamStats {
  totalDreams: number;
  lucidDreams: number;
  lucidPercentage: number;
  avgClarity: number;
  avgSleepQuality: number;
  streakDays: number;
  mostCommonEmotions: { emotion: EmotionType; count: number }[];
  mostCommonTags: { tag: string; count: number }[];
  weeklyActivity: { day: string; count: number }[];
  monthlyTrend: { month: string; lucid: number; normal: number }[];
}

// Pattern Recognition
export interface DreamPattern {
  id: string;
  type: 'symbol' | 'theme' | 'emotion' | 'character' | 'location';
  name: string;
  frequency: number;
  associatedDreams: string[];
  interpretation?: string;
}

// Consciousness Map Node
export interface ConsciousnessNode {
  id: string;
  label: string;
  type: 'dream' | 'symbol' | 'theme' | 'emotion';
  x?: number;
  y?: number;
  connections: string[];
  weight: number;
}

// User State
export interface UserProfile {
  id: string;
  name: string;
  rank: 'Dreamer' | 'Lucid Walker' | 'Dream Architect' | 'Consciousness Explorer';
  totalDreams: number;
  lucidMastery: number; // 0-100
  joinedAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'dark' | 'gold';
  notifications: boolean;
  reminderTime?: string;
  autoAnalysis: boolean;
}

// Navigation
export type NavSection = 'dashboard' | 'journal' | 'analytics' | 'consciousness' | 'timeline' | 'settings';

// Component Props
export interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}
