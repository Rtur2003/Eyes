"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Calendar,
  ChevronRight,
  Sparkles,
  Moon,
  Eye,
  Clock,
  Heart,
  X,
  Edit3,
  Trash2,
  Brain
} from "lucide-react";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { CyberButton, IconButton } from "@/app/components/ui/CyberButton";
import { SearchInput } from "@/app/components/shared/FormElements";
import { Badge, Divider, EmptyState } from "@/app/components/shared/Elements";
import { ProgressBar } from "@/app/components/shared/ProgressBar";
import { useDreamStore } from "@/app/store/dreamStore";
import { DreamEntry } from "@/app/types";
import { cn, formatDreamDate, formatRelativeTime, getDreamTypeColor, getEmotionColor, truncate, capitalize, getLucidityLevel } from "@/app/lib/utils";
import { dreamTypeOptions, emotionOptions } from "@/app/data/mockData";

export function DreamJournal() {
  const { 
    dreams, 
    searchQuery, 
    setSearchQuery, 
    getFilteredDreams,
    selectedDreamId,
    selectDream,
    toggleStarred 
  } = useDreamStore();
  
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const filteredDreams = getFilteredDreams();
  const displayDreams = filterType 
    ? filteredDreams.filter(d => d.type === filterType)
    : filteredDreams;
  
  const selectedDream = dreams.find(d => d.id === selectedDreamId);

  return (
    <div className="h-full flex">
      {/* Left Panel - Dream List */}
      <div className={cn(
        "flex-shrink-0 border-r border-gold-500/10 bg-obsidian-card/30",
        "flex flex-col transition-all duration-500",
        selectedDream ? "w-96" : "w-full max-w-2xl"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-gold-500/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif text-gold-100 mb-1">Dream Journal</h2>
              <p className="text-xs text-gold-300/50">{dreams.length} dreams recorded</p>
            </div>
            <CyberButton 
              size="sm" 
              onClick={() => setShowNewEntry(true)}
              leftIcon={<Plus size={14} />}
            >
              New Entry
            </CyberButton>
          </div>

          {/* Search & Filters */}
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search dreams, tags, symbols..."
          />

          {/* Quick Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
            <button
              onClick={() => setFilterType(null)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all",
                filterType === null
                  ? "bg-gold-500/20 text-gold-400 border border-gold-500/40"
                  : "bg-obsidian-surface/50 text-gold-300/60 border border-gold-500/10 hover:border-gold-500/30"
              )}
            >
              All Dreams
            </button>
            {dreamTypeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFilterType(filterType === option.value ? null : option.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all flex items-center gap-2",
                  filterType === option.value
                    ? "bg-gold-500/20 text-gold-400 border border-gold-500/40"
                    : "bg-obsidian-surface/50 text-gold-300/60 border border-gold-500/10 hover:border-gold-500/30"
                )}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: option.color }} />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dream List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
          <AnimatePresence>
            {displayDreams.length > 0 ? (
              displayDreams.map((dream, i) => (
                <DreamCard
                  key={dream.id}
                  dream={dream}
                  isSelected={selectedDreamId === dream.id}
                  onSelect={() => selectDream(dream.id)}
                  onToggleStar={() => toggleStarred(dream.id)}
                  delay={i * 0.05}
                  compact={!!selectedDream}
                />
              ))
            ) : (
              <EmptyState
                icon={Moon}
                title="No dreams found"
                description={searchQuery ? "Try adjusting your search query" : "Start recording your dreams to see them here"}
                action={
                  <CyberButton size="sm" onClick={() => setShowNewEntry(true)}>
                    Record First Dream
                  </CyberButton>
                }
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel - Dream Detail */}
      <AnimatePresence mode="wait">
        {selectedDream && (
          <DreamDetail
            dream={selectedDream}
            onClose={() => selectDream(null)}
            onToggleStar={() => toggleStarred(selectedDream.id)}
          />
        )}
      </AnimatePresence>

      {/* New Entry Modal */}
      <AnimatePresence>
        {showNewEntry && (
          <NewDreamModal onClose={() => setShowNewEntry(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Dream Card Component
function DreamCard({ 
  dream, 
  isSelected, 
  onSelect, 
  onToggleStar,
  delay = 0,
  compact = false
}: { 
  dream: DreamEntry;
  isSelected: boolean;
  onSelect: () => void;
  onToggleStar: () => void;
  delay?: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay }}
      onClick={onSelect}
      className={cn(
        "p-4 rounded-xl border cursor-pointer transition-all duration-300 group",
        isSelected
          ? "bg-gold-500/10 border-gold-500/30 shadow-glow-subtle"
          : "bg-obsidian-surface/30 border-gold-500/10 hover:border-gold-500/20 hover:bg-obsidian-surface/50"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span 
            className="w-3 h-3 rounded-full flex-shrink-0" 
            style={{ backgroundColor: getDreamTypeColor(dream.type) }}
          />
          <h3 className={cn(
            "font-serif text-gold-100 truncate transition-colors",
            compact ? "text-sm" : "text-base"
          )}>
            {dream.title}
          </h3>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleStar(); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Star 
            size={16} 
            className={dream.isStarred ? "text-gold-400 fill-gold-400" : "text-gold-500/40 hover:text-gold-400"} 
          />
        </button>
      </div>

      {!compact && (
        <p className="text-sm text-gold-200/50 line-clamp-2 mb-4">
          {truncate(dream.content, 120)}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gold-300/40 flex items-center gap-1">
            <Calendar size={12} />
            {formatDreamDate(dream.date)}
          </span>
          {dream.type === 'lucid' && (
            <Badge variant="lucid" size="sm">
              <Sparkles size={10} className="mr-1" />
              {dream.lucidity}%
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1">
          {dream.emotions.slice(0, 2).map(emotion => (
            <span
              key={emotion}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getEmotionColor(emotion) }}
              title={capitalize(emotion)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Dream Detail Panel
function DreamDetail({ 
  dream, 
  onClose,
  onToggleStar 
}: { 
  dream: DreamEntry;
  onClose: () => void;
  onToggleStar: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex-1 overflow-y-auto bg-obsidian-card/20"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-obsidian-card/80 backdrop-blur-md border-b border-gold-500/10 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span 
                className="px-3 py-1 rounded-full text-xs font-sans uppercase tracking-wider"
                style={{ 
                  backgroundColor: `${getDreamTypeColor(dream.type)}20`,
                  color: getDreamTypeColor(dream.type)
                }}
              >
                {dream.type} Dream
              </span>
              <button onClick={onToggleStar}>
                <Star 
                  size={18} 
                  className={dream.isStarred ? "text-gold-400 fill-gold-400" : "text-gold-500/40 hover:text-gold-400"} 
                />
              </button>
            </div>
            <h1 className="text-3xl font-serif text-gold-100 mb-2">{dream.title}</h1>
            <p className="text-sm text-gold-300/50">
              {formatDreamDate(dream.date)} • {formatRelativeTime(dream.date)}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <IconButton variant="ghost"><Edit3 size={16} /></IconButton>
            <IconButton variant="ghost"><Trash2 size={16} /></IconButton>
            <IconButton onClick={onClose}><X size={16} /></IconButton>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Dream Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-obsidian-surface/50 border border-gold-500/10 text-center">
            <Eye size={18} className="mx-auto mb-2 text-gold-400" />
            <p className="text-lg font-serif text-white">{dream.clarity}/5</p>
            <p className="text-xs text-gold-300/50">Clarity</p>
          </div>
          <div className="p-4 rounded-lg bg-obsidian-surface/50 border border-gold-500/10 text-center">
            <Sparkles size={18} className="mx-auto mb-2 text-gold-400" />
            <p className="text-lg font-serif text-white">{dream.lucidity}%</p>
            <p className="text-xs text-gold-300/50">Lucidity</p>
          </div>
          <div className="p-4 rounded-lg bg-obsidian-surface/50 border border-gold-500/10 text-center">
            <Clock size={18} className="mx-auto mb-2 text-gold-400" />
            <p className="text-lg font-serif text-white">{dream.duration}m</p>
            <p className="text-xs text-gold-300/50">Duration</p>
          </div>
          <div className="p-4 rounded-lg bg-obsidian-surface/50 border border-gold-500/10 text-center">
            <Moon size={18} className="mx-auto mb-2 text-gold-400" />
            <p className="text-lg font-serif text-white">{dream.sleepQuality}%</p>
            <p className="text-xs text-gold-300/50">Sleep</p>
          </div>
        </div>

        {/* Lucidity Progress */}
        {dream.type === 'lucid' && (
          <div className="p-4 rounded-xl bg-gold-500/5 border border-gold-500/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-gold-400" />
              <span className="text-sm font-sans uppercase tracking-wider text-gold-400">
                Lucid Awareness: {getLucidityLevel(dream.lucidity)}
              </span>
            </div>
            <ProgressBar value={dream.lucidity} variant="gradient" />
          </div>
        )}

        {/* Dream Content */}
        <div>
          <h3 className="text-sm font-sans uppercase tracking-widest text-gold-400 mb-4 flex items-center gap-2">
            <Moon size={14} /> Dream Narrative
          </h3>
          <p className="text-gold-100 leading-relaxed whitespace-pre-wrap">
            {dream.content}
          </p>
        </div>

        <Divider />

        {/* Emotions */}
        <div>
          <h3 className="text-sm font-sans uppercase tracking-widest text-gold-400 mb-4 flex items-center gap-2">
            <Heart size={14} /> Emotions Experienced
          </h3>
          <div className="flex flex-wrap gap-2">
            {dream.emotions.map(emotion => (
              <Badge 
                key={emotion} 
                className="flex items-center gap-2"
                style={{ 
                  backgroundColor: `${getEmotionColor(emotion)}15`,
                  borderColor: `${getEmotionColor(emotion)}30`,
                  color: getEmotionColor(emotion)
                }}
              >
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getEmotionColor(emotion) }}
                />
                {capitalize(emotion)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tags & Symbols */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-sans uppercase tracking-widest text-gold-400 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {dream.tags.map(tag => (
                <Badge key={tag} variant="gold">{tag}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-sans uppercase tracking-widest text-gold-400 mb-4">Symbols</h3>
            <div className="flex flex-wrap gap-2">
              {dream.symbols.map(symbol => (
                <Badge key={symbol} variant="bronze">{symbol}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Characters & Locations */}
        {(dream.characters.length > 0 || dream.locations.length > 0) && (
          <div className="grid grid-cols-2 gap-6">
            {dream.characters.length > 0 && (
              <div>
                <h3 className="text-sm font-sans uppercase tracking-widest text-gold-400 mb-4">Characters</h3>
                <ul className="space-y-2">
                  {dream.characters.map(char => (
                    <li key={char} className="text-sm text-gold-100 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {dream.locations.length > 0 && (
              <div>
                <h3 className="text-sm font-sans uppercase tracking-widest text-gold-400 mb-4">Locations</h3>
                <ul className="space-y-2">
                  {dream.locations.map(loc => (
                    <li key={loc} className="text-sm text-gold-100 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-bronze-500" />
                      {loc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* AI Analysis */}
        {dream.aiAnalysis && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-gold-500/5 to-bronze-500/5 border border-gold-500/20">
            <h3 className="text-sm font-sans uppercase tracking-widest text-gold-400 mb-4 flex items-center gap-2">
              <Brain size={14} /> Neural Analysis
            </h3>
            <p className="text-gold-200/80 text-sm leading-relaxed italic">
              &quot;{dream.aiAnalysis}&quot;
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// New Dream Modal (Simplified placeholder)
function NewDreamModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-obsidian-card border border-gold-500/20 rounded-xl shadow-2xl"
      >
        <div className="p-6 border-b border-gold-500/10 flex items-center justify-between">
          <h2 className="text-xl font-serif text-gold-100">Record New Dream</h2>
          <IconButton onClick={onClose}><X size={16} /></IconButton>
        </div>
        
        <div className="p-6">
          <p className="text-gold-200/60 text-center py-12">
            Dream entry form coming soon...
          </p>
          <div className="flex justify-end gap-3">
            <CyberButton variant="ghost" onClick={onClose}>Cancel</CyberButton>
            <CyberButton>Save Dream</CyberButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}