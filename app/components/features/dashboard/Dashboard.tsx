"use client";

import { motion } from "framer-motion";
import { 
  Moon, 
  Sparkles, 
  TrendingUp, 
  Brain, 
  Flame, 
  Eye, 
  BookOpen,
  Zap,
  Star,
  ChevronRight
} from "lucide-react";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { CyberButton } from "@/app/components/ui/CyberButton";
import { ProgressBar, CircularProgress } from "@/app/components/shared/ProgressBar";
import { Badge, Divider } from "@/app/components/shared/Elements";
import { useDreamStore } from "@/app/store/dreamStore";
import { cn, formatDreamDate, getDreamTypeColor, truncate } from "@/app/lib/utils";

export function Dashboard() {
  const { stats, dreams, user, setActiveSection, selectDream } = useDreamStore();
  const recentDreams = dreams.slice(0, 4);
  const starredDreams = dreams.filter(d => d.isStarred).slice(0, 3);

  const statCards = [
    { label: "Total Dreams", value: stats.totalDreams, icon: Moon, trend: 12 },
    { label: "Lucid Dreams", value: stats.lucidDreams, icon: Sparkles, trend: 24 },
    { label: "Current Streak", value: `${stats.streakDays} days`, icon: Flame, trend: 8 },
    { label: "Avg Clarity", value: `${stats.avgClarity}/5`, icon: Eye, trend: 5 },
  ];

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-sans tracking-[0.3em] text-gold-500 mb-2 uppercase">
            <Zap size={12} className="animate-pulse" /> Neural Link Active
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gradient-gold-vertical tracking-tight mb-2">
            Welcome back, Dreamer
          </h1>
          <p className="text-gold-200/60 font-mono text-sm">
            {stats.streakDays} day streak • {stats.lucidPercentage}% lucid rate this month
          </p>
        </div>

        <div className="flex gap-3">
          <CyberButton 
            onClick={() => setActiveSection('journal')}
            leftIcon={<BookOpen size={14} />}
          >
            New Dream Entry
          </CyberButton>
          <CyberButton variant="ghost" onClick={() => setActiveSection('analytics')}>
            View Analytics
          </CyberButton>
        </div>
      </motion.div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statCards.map((stat, i) => (
          <GlassCard key={stat.label} delay={i * 0.1} className="group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500/20 transition-colors">
                <stat.icon size={18} className="text-gold-400" />
              </div>
              <span className={cn(
                "text-xs font-mono px-2 py-0.5 rounded-full",
                stat.trend >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              )}>
                {stat.trend >= 0 ? '+' : ''}{stat.trend}%
              </span>
            </div>
            <div className="text-xs font-sans uppercase tracking-widest text-gold-300/60 mb-1">
              {stat.label}
            </div>
            <div className="text-2xl lg:text-3xl font-serif font-medium text-white">
              {stat.value}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lucid Mastery Progress */}
        <GlassCard variant="bordered" delay={0.4} className="lg:col-span-1">
          <h3 className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gold-400 mb-6">
            <Brain size={16} /> Lucid Mastery
          </h3>
          
          <div className="flex justify-center mb-6">
            <CircularProgress 
              value={user.lucidMastery} 
              size={140} 
              label="Mastery" 
            />
          </div>

          <div className="space-y-3">
            <ProgressBar 
              value={stats.avgClarity * 20} 
              label="Dream Clarity" 
              showPercentage 
              size="sm"
            />
            <ProgressBar 
              value={stats.avgSleepQuality} 
              label="Sleep Quality" 
              showPercentage 
              variant="bronze"
              size="sm"
            />
          </div>

          <Divider className="my-4" />

          <div className="text-center">
            <p className="text-xs text-gold-300/50 mb-2">Next milestone</p>
            <p className="text-sm text-gold-100">{100 - user.lucidMastery}% to <span className="text-gold-400">Consciousness Explorer</span></p>
          </div>
        </GlassCard>

        {/* Recent Dreams */}
        <GlassCard variant="bordered" delay={0.5} className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gold-400">
              <Moon size={16} /> Recent Dreams
            </h3>
            <button 
              onClick={() => setActiveSection('journal')}
              className="text-xs text-gold-500/60 hover:text-gold-400 transition-colors flex items-center gap-1"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {recentDreams.map((dream, i) => (
              <motion.button
                key={dream.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                onClick={() => {
                  selectDream(dream.id);
                  setActiveSection('journal');
                }}
                className="w-full p-4 rounded-lg bg-obsidian-surface/30 border border-gold-500/10 hover:border-gold-500/30 hover:bg-obsidian-surface/50 transition-all text-left group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: getDreamTypeColor(dream.type) }}
                      />
                      <span className="text-sm text-gold-100 font-medium truncate group-hover:text-gold-50 transition-colors">
                        {dream.title}
                      </span>
                      {dream.isStarred && <Star size={12} className="text-gold-400 fill-gold-400" />}
                    </div>
                    <p className="text-xs text-gold-300/50 line-clamp-1">
                      {truncate(dream.content, 80)}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gold-300/40">{formatDreamDate(dream.date)}</p>
                    {dream.type === 'lucid' && (
                      <Badge variant="lucid" size="sm" className="mt-1">Lucid</Badge>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Starred Dreams */}
        <GlassCard delay={0.7}>
          <h3 className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gold-400 mb-6">
            <Star size={16} className="fill-gold-400" /> Starred Dreams
          </h3>

          {starredDreams.length > 0 ? (
            <div className="space-y-3">
              {starredDreams.map((dream) => (
                <div 
                  key={dream.id}
                  className="p-3 rounded-lg bg-obsidian-surface/30 border border-gold-500/10"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: getDreamTypeColor(dream.type) }}
                    />
                    <span className="text-sm text-gold-100">{dream.title}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {dream.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="gold" size="sm">{tag}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Star size={32} className="mx-auto mb-3 text-gold-500/30" />
              <p className="text-sm text-gold-300/50">No starred dreams yet</p>
            </div>
          )}
        </GlassCard>

        {/* Dream Insights */}
        <GlassCard delay={0.8}>
          <h3 className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gold-400 mb-6">
            <TrendingUp size={16} /> Dream Insights
          </h3>

          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-gold-500/5 border border-gold-500/10">
              <p className="text-xs text-gold-300/60 mb-1">Most Common Theme</p>
              <p className="text-gold-100">Flying & Freedom</p>
              <p className="text-xs text-gold-300/40 mt-1">Appears in 38 dreams</p>
            </div>

            <div className="p-3 rounded-lg bg-gold-500/5 border border-gold-500/10">
              <p className="text-xs text-gold-300/60 mb-1">Dominant Emotion</p>
              <p className="text-gold-100">Wonder</p>
              <p className="text-xs text-gold-300/40 mt-1">Present in 63% of dreams</p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <p className="text-xs text-emerald-300/60 mb-1">Lucid Trigger Identified</p>
              <p className="text-emerald-100">Recurring door symbols</p>
              <p className="text-xs text-emerald-300/40 mt-1">5 times led to lucidity</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}