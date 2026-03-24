'use client';

import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const skillData = [
  { skill: 'Python', score: 75 },
  { skill: 'Pandas', score: 78 },
  { skill: 'Excel', score: 80 },
  { skill: 'SQL', score: 65 },
  { skill: 'Git', score: 70 },
  { skill: 'Networking', score: 72 },
  { skill: 'Data Cleaning', score: 82 },
  { skill: 'Troubleshooting', score: 85 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs font-semibold text-white">{payload[0].payload.skill}</p>
        <p className="text-xs text-cyan-400 font-mono mt-0.5">{payload[0].value}/100</p>
      </div>
    );
  }
  return null;
};

export default function SkillsRadarSection() {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Skill Coverage</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Self-assessed proficiency</p>
        </div>
        <Link
          href="/skills-technologies"
          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
        >
          Details <ArrowRight size={12} />
        </Link>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={skillData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
          <PolarGrid stroke="hsl(240 6% 18%)" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: 'hsl(240 5% 55%)', fontSize: 11, fontFamily: 'DM Sans' }}
          />
          <Radar
            name="Skill"
            dataKey="score"
            stroke="hsl(186 100% 60%)"
            fill="hsl(186 100% 60%)"
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {[
          { label: 'Strongest', value: 'Troubleshooting (85)', color: 'text-cyan-400' },
          { label: 'Growing', value: 'SQL (65)', color: 'text-amber-400' },
        ].map((item) => (
          <div key={item.label} className="bg-zinc-950/50 rounded-lg p-2.5 border border-zinc-800">
            <p className="text-xs text-zinc-500">{item.label}</p>
            <p className={`text-xs font-semibold font-mono mt-0.5 ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}