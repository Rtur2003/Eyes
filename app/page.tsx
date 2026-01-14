"use client";

import { motion } from "framer-motion";
import { Shield, Activity, Globe, Cpu, Lock, TrendingUp, Zap } from "lucide-react";
import GoldenParticles from "@/components/GoldenParticles";

const DashboardCard = ({ title, value, subtext, icon: Icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className="glass-panel glass-panel-hover p-6 rounded-xl flex flex-col justify-between h-[200px] group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
      <Icon size={64} className="text-gold-400" />
    </div>
    
    <div>
      <h3 className="text-gold-200 text-sm font-sans tracking-widest uppercase mb-2 flex items-center gap-2">
        <Icon size={14} /> {title}
      </h3>
      <div className="text-4xl font-serif text-white font-bold tracking-tight mt-2">
        {value}
      </div>
    </div>
    
    <div className="flex items-center gap-2 text-xs text-gold-400/80 font-mono mt-4">
      <Activity size={12} className="animate-pulse" />
      {subtext}
    </div>
    
    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
  </motion.div>
);

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start p-8 md:p-12 overflow-hidden">
      {/* 3D Background */}
      <GoldenParticles />
      
      {/* Header Section */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-end border-b border-gold-400/20 pb-8 mb-12 z-10"
      >
        <div>
          <h2 className="text-gold-400 font-sans text-xs tracking-[0.3em] mb-2 uppercase">System Status: Optimal</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">
            AUREUS <span className="text-gold-500">.</span>
          </h1>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <p className="text-gold-200/60 font-mono text-sm">Wed 14 Jan 2026</p>
          <p className="text-gold-100 font-sans text-lg tracking-widest">SOVEREIGN MODE</p>
        </div>
      </motion.header>

      {/* Main Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-10">
        <DashboardCard 
          title="Total Net Worth" 
          value="$84,230,000" 
          subtext="+2.4% in last 24h"
          icon={TrendingUp}
          delay={0.2}
        />
        <DashboardCard 
          title="Reputation Score" 
          value="98.4 / 100" 
          subtext="Tier 1: Untouchable"
          icon={Globe}
          delay={0.3}
        />
        <DashboardCard 
          title="Active Sentinels" 
          value="12 Units" 
          subtext="Perimeter Secure"
          icon={Shield}
          delay={0.4}
        />
        <DashboardCard 
          title="Neural Link" 
          value="Connected" 
          subtext="Latency: 4ms"
          icon={Cpu}
          delay={0.5}
        />
      </div>

      {/* Central Command Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-full max-w-7xl mt-8 flex-1 glass-panel rounded-2xl p-8 relative z-10 min-h-[400px] flex items-center justify-center border border-gold-500/20"
      >
        <div className="absolute top-4 left-6 flex gap-4">
            <div className="flex items-center gap-2 text-xs text-gold-300 font-sans uppercase tracking-widest">
                <Zap size={12} /> Live Feed
            </div>
            <div className="flex items-center gap-2 text-xs text-red-400 font-sans uppercase tracking-widest animate-pulse">
                <Lock size={12} /> Encrypted
            </div>
        </div>
        
        <div className="text-center">
            <h3 className="text-2xl font-serif text-gold-100 mb-4">Awaiting Command Override</h3>
            <p className="text-gold-200/50 font-mono text-sm max-w-md mx-auto">
                Neural interface is in standby mode. Please authorize biometrically to access the Deep Storage Vaults.
            </p>
            <button className="mt-8 px-8 py-3 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/50 hover:border-gold-400 text-gold-300 hover:text-white uppercase tracking-[0.2em] font-sans text-xs transition-all duration-300 rounded">
                Initiate Handshake
            </button>
        </div>
      </motion.div>

    </div>
  );
}
