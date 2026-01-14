"use client";

import { cn } from "@/app/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Brain, 
  Clock, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sparkles
} from "lucide-react";
import { NavSection } from "@/app/types";
import { useDreamStore } from "@/app/store/dreamStore";
import { useState } from "react";

interface NavItem {
  id: NavSection;
  label: string;
  icon: React.ElementType;
  description: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & insights' },
  { id: 'journal', label: 'Dream Journal', icon: BookOpen, description: 'Record & explore' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Patterns & trends' },
  { id: 'consciousness', label: 'Mind Map', icon: Brain, description: 'Neural connections' },
  { id: 'timeline', label: 'Timeline', icon: Clock, description: 'Dream history' },
  { id: 'settings', label: 'Settings', icon: Settings, description: 'Preferences' },
];

export function Sidebar() {
  const { activeSection, setActiveSection, user, stats } = useDreamStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "relative h-screen bg-obsidian-card/50 backdrop-blur-xl",
        "border-r border-gold-500/10 flex flex-col",
        "transition-all duration-500 ease-out",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo & Brand */}
      <div className="p-6 border-b border-gold-500/10">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-bronze-500 flex items-center justify-center shadow-glow-gold">
              <Moon className="text-obsidian w-5 h-5" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-gold-400 animate-pulse" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-serif font-bold text-gradient-gold-vertical tracking-tight">
                  AURUM
                </h1>
                <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold-500/50">
                  Nexus
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto no-scrollbar">
        <div className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "relative w-full flex items-center gap-3 px-3 py-3 rounded-lg",
                  "transition-all duration-300 group",
                  isActive
                    ? "bg-gold-500/10 text-gold-400"
                    : "text-gold-200/60 hover:bg-gold-500/5 hover:text-gold-200"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <Icon 
                  size={20} 
                  className={cn(
                    "flex-shrink-0 transition-transform duration-300",
                    isActive && "scale-110"
                  )} 
                />

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-col items-start"
                    >
                      <span className="text-sm font-sans font-medium">{item.label}</span>
                      <span className="text-[10px] text-gold-300/40 group-hover:text-gold-300/60 transition-colors">
                        {item.description}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glow effect on hover */}
                <div className={cn(
                  "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300",
                  "bg-gradient-to-r from-gold-500/5 to-transparent",
                  "group-hover:opacity-100"
                )} />
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* User Stats Card */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mx-3 mb-3 p-4 rounded-xl bg-obsidian-surface/50 border border-gold-500/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-bronze-500/20 border border-gold-500/30 flex items-center justify-center">
                <span className="text-sm font-serif text-gold-400">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-sans text-gold-100 truncate">{user.name}</p>
                <p className="text-[10px] text-gold-500/60 uppercase tracking-wider">{user.rank}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gold-300/50">Lucid Mastery</span>
                <span className="text-gold-400 font-mono">{user.lucidMastery}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-obsidian overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${user.lucidMastery}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 rounded-full"
                />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gold-500/10 flex justify-between text-xs">
              <div>
                <p className="text-gold-300/50">Dreams</p>
                <p className="text-gold-100 font-mono">{stats.totalDreams}</p>
              </div>
              <div>
                <p className="text-gold-300/50">Streak</p>
                <p className="text-gold-100 font-mono">{stats.streakDays} days</p>
              </div>
              <div>
                <p className="text-gold-300/50">Lucid %</p>
                <p className="text-gold-100 font-mono">{stats.lucidPercentage}%</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute -right-3 top-1/2 -translate-y-1/2 z-50",
          "w-6 h-6 rounded-full bg-obsidian-card border border-gold-500/20",
          "flex items-center justify-center",
          "hover:border-gold-500/40 hover:bg-obsidian-surface transition-colors",
          "text-gold-500/50 hover:text-gold-400"
        )}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
}

// Top header for mobile or secondary nav
export function Header() {
  const { activeSection, stats } = useDreamStore();
  const currentNav = navItems.find(item => item.id === activeSection);

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-gold-500/10 bg-obsidian-card/30 backdrop-blur-md">
      <div>
        <h2 className="text-xl font-serif text-gold-100">{currentNav?.label}</h2>
        <p className="text-xs text-gold-300/50">{currentNav?.description}</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Quick stats */}
        <div className="hidden md:flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <Moon size={14} className="text-gold-500/50" />
            <span className="text-gold-300/60">Tonight&apos;s Goal:</span>
            <span className="text-gold-400 font-mono">Lucid</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-gold-500/50 animate-pulse" />
            <span className="text-gold-300/60">Streak:</span>
            <span className="text-gold-400 font-mono">{stats.streakDays} days</span>
          </div>
        </div>

        {/* Current time */}
        <div className="text-right">
          <p className="text-xs text-gold-300/50 font-mono">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>
    </header>
  );
}