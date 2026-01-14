import { create } from 'zustand';
import { DreamEntry, DreamStats, DreamPattern, NavSection, UserProfile } from '@/app/types';
import { mockDreams, mockStats, mockPatterns, mockUser } from '@/app/data/mockData';

/**
 * Zustand store interface for dream journal state management
 * @interface DreamStore
 */
interface DreamStore {
  // State
  /** Array of all dream entries */
  dreams: DreamEntry[];
  /** Aggregated dream statistics */
  stats: DreamStats;
  /** Identified dream patterns */
  patterns: DreamPattern[];
  /** User profile and preferences */
  user: UserProfile;
  /** Currently active navigation section */
  activeSection: NavSection;
  /** ID of the currently selected dream */
  selectedDreamId: string | null;
  /** Loading state indicator */
  isLoading: boolean;
  /** Current search query string */
  searchQuery: string;

  // Actions
  /** Change the active navigation section */
  setActiveSection: (section: NavSection) => void;
  /** Select a dream by ID or clear selection */
  selectDream: (id: string | null) => void;
  /** Add a new dream entry */
  addDream: (dream: DreamEntry) => void;
  /** Update an existing dream entry */
  updateDream: (id: string, updates: Partial<DreamEntry>) => void;
  /** Delete a dream entry by ID */
  deleteDream: (id: string) => void;
  /** Toggle starred status of a dream */
  toggleStarred: (id: string) => void;
  /** Update the search query */
  setSearchQuery: (query: string) => void;
  /** Get filtered dreams based on search query */
  getFilteredDreams: () => DreamEntry[];
}

/**
 * Dream journal Zustand store
 * 
 * Manages global state for:
 * - Dream entries and CRUD operations
 * - Statistics and analytics data
 * - Pattern recognition results
 * - User profile and preferences
 * - Navigation state
 * - Search and filtering
 * 
 * @example
 * ```tsx
 * const { dreams, addDream, selectDream } = useDreamStore();
 * ```
 */
export const useDreamStore = create<DreamStore>((set, get) => ({
  // Initial state
  dreams: mockDreams,
  stats: mockStats,
  patterns: mockPatterns,
  user: mockUser,
  activeSection: 'dashboard',
  selectedDreamId: null,
  isLoading: false,
  searchQuery: '',

  // Actions
  setActiveSection: (section) => set({ activeSection: section }),
  
  selectDream: (id) => set({ selectedDreamId: id }),
  
  addDream: (dream) => set((state) => ({
    dreams: [dream, ...state.dreams],
    stats: {
      ...state.stats,
      totalDreams: state.stats.totalDreams + 1,
      lucidDreams: dream.type === 'lucid' ? state.stats.lucidDreams + 1 : state.stats.lucidDreams,
    }
  })),
  
  updateDream: (id, updates) => set((state) => ({
    dreams: state.dreams.map((dream) =>
      dream.id === id ? { ...dream, ...updates } : dream
    ),
  })),
  
  deleteDream: (id) => set((state) => ({
    dreams: state.dreams.filter((dream) => dream.id !== id),
    selectedDreamId: state.selectedDreamId === id ? null : state.selectedDreamId,
  })),
  
  toggleStarred: (id) => set((state) => ({
    dreams: state.dreams.map((dream) =>
      dream.id === id ? { ...dream, isStarred: !dream.isStarred } : dream
    ),
  })),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  getFilteredDreams: () => {
    const { dreams, searchQuery } = get();
    if (!searchQuery) return dreams;
    
    const query = searchQuery.toLowerCase();
    return dreams.filter((dream) =>
      dream.title.toLowerCase().includes(query) ||
      dream.content.toLowerCase().includes(query) ||
      dream.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      dream.symbols.some((symbol) => symbol.toLowerCase().includes(query))
    );
  },
}));
