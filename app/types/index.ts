// ==============================================
// AURUM NEXUS - Type Definitions
// Neural Dream Journal & Consciousness Analytics
// ==============================================

// Dream Types
export type DreamType = 'normal' | 'lucid' | 'nightmare' | 'recurring' | 'prophetic' | 'shared';
export type EmotionType = 'joy' | 'fear' | 'peace' | 'confusion' | 'love' | 'anxiety' | 'wonder' | 'neutral';
export type ClarityLevel = 1 | 2 | 3 | 4 | 5;

export interface DreamTag {
  id: string;
  name: string;
  color: string;
  frequency: number;
}

export interface DreamEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  type: DreamType;
  emotions: EmotionType[];
  clarity: ClarityLevel;
  lucidity: number; // 0-100 percentage
  tags: string[];
  symbols: string[];
  characters: string[];
  locations: string[];
  sleepQuality: number; // 0-100
  duration: number; // estimated minutes in REM
  isStarred: boolean;
  aiAnalysis?: string;
  connections?: string[]; // IDs of related dreams
}

// Analytics Types
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
