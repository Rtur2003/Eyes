"use client";

import dynamic from 'next/dynamic';
import { Sidebar, Header } from "@/app/components/layout/Navigation";
import { Dashboard } from "@/app/components/features/dashboard/Dashboard";
import { DreamJournal } from "@/app/components/features/journal/DreamJournal";
import { Analytics } from "@/app/components/features/analytics/Analytics";
import { useDreamStore } from "@/app/store/dreamStore";
import { cn } from "@/app/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Clock, Settings, Construction } from "lucide-react";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { CyberButton } from "@/app/components/ui/CyberButton";
import { ErrorBoundary } from "@/app/components/shared/ErrorBoundary";

// Dynamic import for 3D particles to avoid SSR issues
const GoldenParticles = dynamic(
  () => import("@/app/components/layout/GoldenParticles"),
  { ssr: false }
);

// Placeholder for sections not yet implemented
function ComingSoon({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  const { setActiveSection } = useDreamStore();
  
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <GlassCard className="max-w-md text-center p-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
          <Icon size={40} className="text-gold-400" />
        </div>
        <h2 className="text-2xl font-serif text-gold-100 mb-3">{title}</h2>
        <p className="text-gold-200/60 mb-6">
          This neural pathway is being constructed. Advanced features coming soon.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-gold-500/50 mb-6">
          <Construction size={14} aria-hidden="true" />
          <span>Under Development</span>
        </div>
        <CyberButton variant="ghost" onClick={() => setActiveSection('dashboard')}>
          Return to Dashboard
        </CyberButton>
      </GlassCard>
    </div>
  );
}

// Section renderer
function ActiveSection() {
  const { activeSection } = useDreamStore();

  const sections = {
    dashboard: <Dashboard />,
    journal: <DreamJournal />,
    analytics: <Analytics />,
    consciousness: <ComingSoon title="Consciousness Map" icon={Brain} />,
    timeline: <ComingSoon title="Dream Timeline" icon={Clock} />,
    settings: <ComingSoon title="Settings" icon={Settings} />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-hidden"
      >
        <ErrorBoundary>
          {sections[activeSection]}
        </ErrorBoundary>
      </motion.div>
    </AnimatePresence>
  );
}

export default function AurumNexus() {
  return (
    <main 
      id="main-content"
      className="relative min-h-screen w-full flex overflow-hidden bg-obsidian"
      aria-label="Aurum Nexus Dream Journal Application"
    >
      {/* 3D Particle Background */}
      <GoldenParticles />
      
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Header */}
        <Header />
        
        {/* Active Section Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <ActiveSection />
        </div>
      </div>
    </main>
  );
}