"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieIcon, 
  Activity,
  Calendar,
  Sparkles,
  Moon,
  Brain,
  Flame
} from "lucide-react";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { Badge, Divider } from "@/app/components/shared/Elements";
import { ProgressBar, CircularProgress } from "@/app/components/shared/ProgressBar";
import { useDreamStore } from "@/app/store/dreamStore";
import { cn, getEmotionColor, capitalize } from "@/app/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend
} from 'recharts';

// Custom tooltip styling
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-obsidian-card border border-gold-500/20 rounded-lg p-3 shadow-lg">
        <p className="text-xs text-gold-300/60 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-mono">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function Analytics() {
  const { stats, patterns, dreams } = useDreamStore();

  // Data for emotion distribution pie chart
  const emotionData = stats.mostCommonEmotions.map(item => ({
    name: capitalize(item.emotion),
    value: item.count,
    fill: getEmotionColor(item.emotion)
  }));

  // Data for dream type distribution
  const dreamTypeData = [
    { name: 'Normal', value: dreams.filter(d => d.type === 'normal').length, fill: '#D4AF37' },
    { name: 'Lucid', value: dreams.filter(d => d.type === 'lucid').length, fill: '#FFD700' },
    { name: 'Nightmare', value: dreams.filter(d => d.type === 'nightmare').length, fill: '#B22222' },
    { name: 'Recurring', value: dreams.filter(d => d.type === 'recurring').length, fill: '#6B8E23' },
    { name: 'Shared', value: dreams.filter(d => d.type === 'shared').length, fill: '#4682B4' },
  ].filter(d => d.value > 0);

  // Radar data for dream qualities
  const qualityRadarData = [
    { quality: 'Clarity', value: stats.avgClarity * 20 },
    { quality: 'Sleep', value: stats.avgSleepQuality },
    { quality: 'Lucidity', value: stats.lucidPercentage },
    { quality: 'Recall', value: 75 },
    { quality: 'Vividness', value: 82 },
    { quality: 'Control', value: 58 },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gradient-gold-vertical tracking-tight mb-2">
          Dream Analytics
        </h1>
        <p className="text-gold-200/60 text-sm">
          Insights from {stats.totalDreams} recorded dreams
        </p>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard delay={0.1} className="text-center">
          <CircularProgress value={stats.lucidPercentage} size={80} showValue={false} className="mx-auto mb-3" />
          <p className="text-2xl font-serif text-white">{stats.lucidPercentage}%</p>
          <p className="text-xs text-gold-300/60 uppercase tracking-wider">Lucid Rate</p>
        </GlassCard>
        
        <GlassCard delay={0.2} className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-gold-500/20 to-bronze-500/20 border border-gold-500/30 flex items-center justify-center">
            <Flame size={32} className="text-gold-400" />
          </div>
          <p className="text-2xl font-serif text-white">{stats.streakDays}</p>
          <p className="text-xs text-gold-300/60 uppercase tracking-wider">Day Streak</p>
        </GlassCard>

        <GlassCard delay={0.3} className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-gold-500/20 to-bronze-500/20 border border-gold-500/30 flex items-center justify-center">
            <Brain size={32} className="text-gold-400" />
          </div>
          <p className="text-2xl font-serif text-white">{stats.avgClarity.toFixed(1)}</p>
          <p className="text-xs text-gold-300/60 uppercase tracking-wider">Avg Clarity</p>
        </GlassCard>

        <GlassCard delay={0.4} className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-gold-500/20 to-bronze-500/20 border border-gold-500/30 flex items-center justify-center">
            <Moon size={32} className="text-gold-400" />
          </div>
          <p className="text-2xl font-serif text-white">{stats.avgSleepQuality}%</p>
          <p className="text-xs text-gold-300/60 uppercase tracking-wider">Sleep Quality</p>
        </GlassCard>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <GlassCard delay={0.5}>
          <h3 className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gold-400 mb-6">
            <TrendingUp size={16} /> Monthly Dream Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlyTrend}>
                <defs>
                  <linearGradient id="colorLucid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  stroke="#D4AF3750"
                  tick={{ fill: '#D4AF3780', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#D4AF3750"
                  tick={{ fill: '#D4AF3780', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="normal" 
                  name="Normal"
                  stroke="#D4AF37" 
                  fillOpacity={1} 
                  fill="url(#colorNormal)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="lucid" 
                  name="Lucid"
                  stroke="#FFD700" 
                  fillOpacity={1} 
                  fill="url(#colorLucid)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Weekly Activity */}
        <GlassCard delay={0.6}>
          <h3 className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gold-400 mb-6">
            <BarChart3 size={16} /> Weekly Activity
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyActivity}>
                <XAxis 
                  dataKey="day" 
                  stroke="#D4AF3750"
                  tick={{ fill: '#D4AF3780', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#D4AF3750"
                  tick={{ fill: '#D4AF3780', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  name="Dreams"
                  fill="url(#barGradient)" 
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emotion Distribution */}
        <GlassCard delay={0.7}>
          <h3 className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gold-400 mb-6">
            <PieIcon size={16} /> Emotion Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {emotionData.slice(0, 4).map((item) => (
              <Badge 
                key={item.name} 
                size="sm"
                style={{ 
                  backgroundColor: `${item.fill}20`,
                  borderColor: `${item.fill}40`,
                  color: item.fill
                }}
              >
                {item.name}
              </Badge>
            ))}
          </div>
        </GlassCard>

        {/* Dream Type Distribution */}
        <GlassCard delay={0.8}>
          <h3 className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gold-400 mb-6">
            <Moon size={16} /> Dream Types
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dreamTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {dreamTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {dreamTypeData.map((item) => (
              <Badge 
                key={item.name} 
                size="sm"
                style={{ 
                  backgroundColor: `${item.fill}20`,
                  borderColor: `${item.fill}40`,
                  color: item.fill
                }}
              >
                {item.name}: {item.value}
              </Badge>
            ))}
          </div>
        </GlassCard>

        {/* Quality Radar */}
        <GlassCard delay={0.9}>
          <h3 className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gold-400 mb-6">
            <Activity size={16} /> Dream Quality
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={qualityRadarData}>
                <PolarGrid stroke="#D4AF3720" />
                <PolarAngleAxis 
                  dataKey="quality" 
                  tick={{ fill: '#D4AF3780', fontSize: 10 }}
                />
                <Radar
                  name="Quality"
                  dataKey="value"
                  stroke="#D4AF37"
                  fill="#D4AF37"
                  fillOpacity={0.3}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Pattern Recognition */}
      <GlassCard delay={1}>
        <h3 className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gold-400 mb-6">
          <Brain size={16} /> Pattern Recognition
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patterns.map((pattern, i) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="p-4 rounded-lg bg-obsidian-surface/50 border border-gold-500/10 hover:border-gold-500/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge variant="gold" size="sm">{pattern.type}</Badge>
                <span className="text-xs font-mono text-gold-400">{pattern.frequency}x</span>
              </div>
              <h4 className="text-gold-100 font-serif mb-2">{pattern.name}</h4>
              <p className="text-xs text-gold-200/50 line-clamp-2">
                {pattern.interpretation}
              </p>
              <div className="mt-3">
                <ProgressBar 
                  value={pattern.frequency} 
                  max={60} 
                  size="sm" 
                  variant="bronze"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Top Tags */}
      <GlassCard delay={1.1}>
        <h3 className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gold-400 mb-6">
          <Sparkles size={16} /> Most Common Dream Elements
        </h3>
        <div className="space-y-4">
          {stats.mostCommonTags.map((item, i) => (
            <div key={item.tag} className="flex items-center gap-4">
              <span className="w-8 text-right text-xs font-mono text-gold-300/60">#{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gold-100">{item.tag}</span>
                  <span className="text-xs font-mono text-gold-400">{item.count} dreams</span>
                </div>
                <ProgressBar 
                  value={item.count} 
                  max={stats.mostCommonTags[0].count} 
                  size="sm"
                  animated={false}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}