'use client';

import React, { useState } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Code2, Wrench, BarChart2, Database, ArrowRight, CheckCircle, Clock, Target } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';



type ProficiencyLevel = 'Learning' | 'Comfortable' | 'Proficient';

interface Tool {
  name: string;
  months: number;
  proficiency: ProficiencyLevel;
  note: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  iconBg: string;
  accentColor: string;
  overall: number;
  tools: Tool[];
}

const proficiencyConfig: Record<ProficiencyLevel, { label: string; color: string; bg: string; border: string }> = {
  Proficient: { label: 'Proficient', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
  Comfortable: { label: 'Comfortable', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
  Learning: { label: 'Learning', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
};

const skillCategories: SkillCategory[] = [
  {
    id: 'python',
    label: 'Python & Data',
    icon: Code2,
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-400/10',
    accentColor: 'hsl(48 96% 60%)',
    overall: 75,
    tools: [
      { name: 'Python 3.x', months: 18, proficiency: 'Comfortable', note: 'Core language, scripting, automation, OOP basics' },
      { name: 'Pandas', months: 16, proficiency: 'Proficient', note: 'DataFrame ops, groupby, merge, data cleaning pipelines' },
      { name: 'NumPy', months: 14, proficiency: 'Comfortable', note: 'Array operations, numerical computing' },
      { name: 'Git / GitHub', months: 12, proficiency: 'Comfortable', note: 'Branches, commits, pull requests, GitHub workflow' },
      { name: 'Data Cleaning', months: 18, proficiency: 'Proficient', note: 'Removing duplicates, correcting formats, validating records' },
      { name: 'Data Validation', months: 16, proficiency: 'Proficient', note: 'Standardized validation processes, accuracy checks' },
    ],
  },
  {
    id: 'sql',
    label: 'SQL & Databases',
    icon: Database,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-400/10',
    accentColor: 'hsl(186 100% 60%)',
    overall: 65,
    tools: [
      { name: 'SQL', months: 12, proficiency: 'Comfortable', note: 'SELECT, JOIN, GROUP BY, subqueries, data extraction' },
      { name: 'Data Entry Accuracy', months: 18, proficiency: 'Proficient', note: 'High accuracy data entry and record management' },
      { name: 'Database Management', months: 10, proficiency: 'Comfortable', note: 'Managing digital system records, routine validation' },
    ],
  },
  {
    id: 'excel',
    label: 'Excel & Reporting',
    icon: BarChart2,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10',
    accentColor: 'hsl(158 64% 52%)',
    overall: 80,
    tools: [
      { name: 'Microsoft Excel', months: 24, proficiency: 'Proficient', note: 'Advanced formulas, data analysis, reporting' },
      { name: 'Power Query', months: 18, proficiency: 'Proficient', note: 'Automated data transformation and cleaning workflows' },
      { name: 'Pivot Tables', months: 20, proficiency: 'Proficient', note: 'Summarizing and analyzing large datasets' },
      { name: 'Data Preprocessing', months: 18, proficiency: 'Comfortable', note: 'Preparing analysis-ready datasets for ML and reporting' },
    ],
  },
  {
    id: 'ict',
    label: 'ICT & Engineering',
    icon: Wrench,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
    accentColor: 'hsl(270 60% 65%)',
    overall: 82,
    tools: [
      { name: 'System Troubleshooting', months: 36, proficiency: 'Proficient', note: 'Diagnosing and resolving hardware/software faults' },
      { name: 'Networking', months: 30, proficiency: 'Proficient', note: 'Network configuration, maintenance, and diagnostics' },
      { name: 'Hardware Support', months: 36, proficiency: 'Proficient', note: 'Installation, configuration, and maintenance of hardware' },
      { name: 'Telecommunications', months: 24, proficiency: 'Comfortable', note: 'Broadcast systems, infrastructure maintenance, NTA' },
      { name: 'Cross-functional Collaboration', months: 36, proficiency: 'Proficient', note: 'Working with developers, engineers, and stakeholders' },
    ],
  },
];

const radarData = [
  { skill: 'Python', score: 75 },
  { skill: 'Pandas', score: 78 },
  { skill: 'Excel', score: 80 },
  { skill: 'SQL', score: 65 },
  { skill: 'Git', score: 70 },
  { skill: 'Networking', score: 72 },
  { skill: 'Data Cleaning', score: 82 },
  { skill: 'Troubleshooting', score: 85 },
];

const learningRoadmap = [
  { item: 'Advanced SQL — window functions & optimization', status: 'in-progress', eta: 'Apr 2026' },
  { item: 'Machine Learning with scikit-learn', status: 'in-progress', eta: 'May 2026' },
  { item: 'Data visualization with Matplotlib & Seaborn', status: 'planned', eta: 'Jun 2026' },
  { item: 'Cloud data tools (BigQuery, AWS S3)', status: 'planned', eta: 'Jul 2026' },
  { item: 'Power BI / Tableau dashboards', status: 'planned', eta: 'Aug 2026' },
];

const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs font-semibold text-white">{payload[0].payload.skill}</p>
        <p className="text-xs text-cyan-400 font-mono">{payload[0].value}/100</p>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-zinc-400">{label}</p>
        <p className="text-xs text-emerald-400 font-mono">{payload[0].value} months experience</p>
      </div>
    );
  }
  return null;
};

export default function SkillsContent() {
  const [activeCategory, setActiveCategory] = useState('python');

  const category = skillCategories.find((c) => c.id === activeCategory)!;

  const topToolsData = skillCategories
    .flatMap((c) => c.tools)
    .sort((a, b) => b.months - a.months)
    .slice(0, 8)
    .map((t) => ({ name: t.name, months: t.months }));

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Skills &amp; Technologies</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Honest proficiency levels with context — not inflated skill bars
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Tools Used', value: skillCategories.reduce((acc, c) => acc + c.tools.length, 0), color: 'text-cyan-400', icon: Code2 },
          { label: 'Proficient In', value: skillCategories.flatMap((c) => c.tools).filter((t) => t.proficiency === 'Proficient').length, color: 'text-emerald-400', icon: CheckCircle },
          { label: 'Comfortable With', value: skillCategories.flatMap((c) => c.tools).filter((t) => t.proficiency === 'Comfortable').length, color: 'text-cyan-400', icon: Target },
          { label: 'Currently Learning', value: skillCategories.flatMap((c) => c.tools).filter((t) => t.proficiency === 'Learning').length, color: 'text-amber-400', icon: Clock },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={15} className={s.color} />
                <span className="text-xs text-zinc-500">{s.label}</span>
              </div>
              <p className={`text-2xl font-bold tabular-nums font-mono ${s.color}`}>{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Category Tabs + Tool List */}
        <div className="xl:col-span-2 space-y-5">
          {/* Category Selector */}
          <div className="flex gap-2 flex-wrap">
            {skillCategories.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                    ${isActive
                      ? `${cat.iconBg} ${cat.iconColor} border border-current/20`
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-700 hover:border-zinc-600 hover:text-zinc-200'
                    }
                  `}
                >
                  <CatIcon size={15} />
                  {cat.label}
                  <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-white/10' : 'bg-zinc-800 text-zinc-600'}`}>
                    {cat.overall}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category Detail */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${category.iconBg} flex items-center justify-center`}>
                  <category.icon size={18} className={category.iconColor} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">{category.label}</h2>
                  <p className="text-xs text-zinc-500">{category.tools.length} tools tracked</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white font-mono tabular-nums">{category.overall}/100</p>
                <p className="text-xs text-zinc-500">Overall proficiency</p>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mb-6">
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${category.overall}%`, background: category.accentColor }}
                />
              </div>
            </div>

            {/* Tool List */}
            <div className="space-y-3">
              {category.tools.map((tool) => {
                const profConf = proficiencyConfig[tool.proficiency];
                return (
                  <div key={tool.name} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-950/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-zinc-200 font-mono">{tool.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${profConf.bg} ${profConf.color} ${profConf.border}`}>
                          {profConf.label}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">{tool.months}mo exp</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{tool.note}</p>
                    </div>
                    <div className="flex-shrink-0 w-24">
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, (tool.months / 36) * 100)}%`,
                            background: category.accentColor,
                          }}
                        />
                      </div>
                      <p className="text-xs text-zinc-600 mt-1 text-right font-mono">{tool.months}mo</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experience by Tool Chart */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h2 className="text-sm font-semibold text-white mb-4">Months of Experience — Top Tools</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topToolsData} margin={{ top: 0, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid stroke="hsl(240 6% 14%)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'hsl(240 5% 45%)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  tickLine={false}
                  axisLine={false}
                  angle={-20}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tick={{ fill: 'hsl(240 5% 45%)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="months" fill="hsl(186 100% 60%)" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Radar + Roadmap */}
        <div className="space-y-5">
          {/* Radar */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
            <h2 className="text-sm font-semibold text-white mb-1">Skill Coverage Map</h2>
            <p className="text-xs text-zinc-500 mb-3">Self-assessed, 100-point scale</p>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="hsl(240 6% 18%)" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: 'hsl(240 5% 55%)', fontSize: 10, fontFamily: 'DM Sans' }}
                />
                <Radar
                  name="Proficiency"
                  dataKey="score"
                  stroke="hsl(186 100% 60%)"
                  fill="hsl(186 100% 60%)"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Tooltip content={<CustomRadarTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-1 gap-1.5">
              {Object.entries(proficiencyConfig).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${val.bg} border ${val.border}`} />
                  <span className={`text-xs font-medium ${val.color}`}>{val.label}</span>
                  <span className="text-xs text-zinc-600 ml-auto">
                    {skillCategories.flatMap((c) => c.tools).filter((t) => t.proficiency === key as ProficiencyLevel).length} tools
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Roadmap */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight size={15} className="text-cyan-400" />
              <h2 className="text-sm font-semibold text-white">Learning Roadmap</h2>
            </div>
            <div className="space-y-2.5">
              {learningRoadmap.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-950/40 border border-zinc-800">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${item.status === 'in-progress' ? 'bg-amber-400 animate-pulse-slow' : 'bg-zinc-600'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-zinc-300">{item.item}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${item.status === 'in-progress' ? 'bg-amber-400/10 text-amber-400' : 'bg-zinc-800 text-zinc-500'}`}>
                        {item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                      </span>
                      <span className="text-xs text-zinc-600 font-mono">{item.eta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}