import { create } from 'zustand';
import { DreamEntry, DreamStats, DreamPattern, NavSection, UserProfile } from '@/app/types';
import { mockDreams, mockStats, mockPatterns, mockUser } from '@/app/data/mockData';

interface DreamStore {
  // State
  dreams: DreamEntry[];
  stats: DreamStats;
  patterns: DreamPattern[];
  user: UserProfile;
  activeSection: NavSection;
  selectedDreamId: string | null;
  isLoading: boolean;
  searchQuery: string;

  // Actions
  setActiveSection: (section: NavSection) => void;
  selectDream: (id: string | null) => void;
  addDream: (dream: DreamEntry) => void;
  updateDream: (id: string, updates: Partial<DreamEntry>) => void;
  deleteDream: (id: string) => void;
  toggleStarred: (id: string) => void;
  setSearchQuery: (query: string) => void;
  getFilteredDreams: () => DreamEntry[];
}

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
