"use client";

import { motion } from "framer-motion";
import { Shield, Activity, Globe, Cpu, Lock, TrendingUp, Zap, Radio } from "lucide-react";
import GoldenParticles from "@/app/components/layout/GoldenParticles";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { CyberButton } from "@/app/components/ui/CyberButton";
import { formatCurrency } from "@/app/lib/utils";

const stats = [
  { label: "Net Liquid Assets", value: 84230000, icon: TrendingUp, status: "optimal" },
  { label: "Social Credit", value: "98.4 / 100", icon: Globe, status: "optimal" },
  { label: "Defense Matrix", value: "Active", icon: Shield, status: "warning" },
  { label: "Neural Uptime", value: "99.9%", icon: Cpu, status: "optimal" },
];

export default function Dashboard() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-obsidian text-gold-50 selection:bg-gold-500/30">
      
      {/* 1. Ambient Background Layer */}
      <GoldenParticles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-900/10 via-obsidian/80 to-obsidian pointer-events-none z-[1]" />

      {/* 2. Content Layer */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col gap-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.3em] text-gold-500 mb-2 uppercase">
              <Radio size={12} className="animate-pulse" /> System Online
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-600 tracking-tighter">
              AUREUS
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-right mt-6 md:mt-0"
          >
            <div className="font-mono text-gold-300/50 text-sm mb-1">ID: XJ-90-ALPHA</div>
            <div className="font-sans text-xl tracking-widest text-gold-100">SOVEREIGN INDIVIDUAL</div>
          </motion.div>
        </header>

        {/* Dashboard Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <GlassCard key={stat.label} delay={i * 0.1} className="h-48 flex flex-col justify-between group">
              <div className="flex justify-between items-start">
                <stat.icon className="text-gold-500/50 group-hover:text-gold-400 transition-colors" size={24} />
                {stat.status === 'warning' && <Activity size={16} className="text-orange-400 animate-pulse" />}
              </div>
              
              <div>
                <div className="text-xs font-sans uppercase tracking-widest text-gold-300/60 mb-2">{stat.label}</div>
                <div className="text-3xl font-serif font-medium text-white">
                    {typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value}
                </div>
              </div>
            </GlassCard>
          ))}
        </section>

        {/* Interactive Main Module */}
        <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[400px]"
        >
            {/* Main Command Center */}
            <GlassCard className="lg:col-span-2 flex flex-col items-center justify-center text-center p-12 border-gold-500/20 bg-obsidian-surface/50">
                <Lock size={48} className="text-gold-500/30 mb-6" />
                <h2 className="text-3xl font-serif text-gold-100 mb-4">Secure Vault Access</h2>
                <p className="text-gold-200/60 font-mono text-sm max-w-md mb-8 leading-relaxed">
                    Biometric authentication required for Level 5 asset management. 
                    Neural handshake protocol is ready to initiate.
                </p>
                <div className="flex gap-4">
                    <CyberButton>Initialize Handshake</CyberButton>
                    <CyberButton variant="ghost">View Protocols</CyberButton>
                </div>
            </GlassCard>

            {/* Side Module: System Logs */}
            <GlassCard className="flex flex-col" delay={0.8}>
                <h3 className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-gold-500 mb-6">
                    <Zap size={12} /> Recent Activity
                </h3>
                <div className="space-y-4 font-mono text-xs">
                    {[1,2,3,4].map((_, k) => (
                        <div key={k} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                            <span className="text-gray-500">14:0{k}:23</span>
                            <span className="text-gold-200/80">Asset Transfer #99{k}8</span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </motion.section>

      </div>
    </main>
  );
}