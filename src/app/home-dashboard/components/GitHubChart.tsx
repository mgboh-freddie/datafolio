'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Github, TrendingUp } from 'lucide-react';

const contributionData = [
  { week: 'Mar W1 \'25', commits: 4 },
  { week: 'Mar W3', commits: 8 },
  { week: 'Apr W1', commits: 12 },
  { week: 'Apr W3', commits: 6 },
  { week: 'May W1', commits: 15 },
  { week: 'May W3', commits: 9 },
  { week: 'Jun W1', commits: 18 },
  { week: 'Jun W3', commits: 7 },
  { week: 'Jul W1', commits: 22 },
  { week: 'Jul W3', commits: 11 },
  { week: 'Aug W1', commits: 5 },
  { week: 'Aug W3', commits: 14 },
  { week: 'Sep W1', commits: 19 },
  { week: 'Sep W3', commits: 8 },
  { week: 'Oct W1', commits: 25 },
  { week: 'Oct W3', commits: 16 },
  { week: 'Nov W1', commits: 10 },
  { week: 'Nov W3', commits: 28 },
  { week: 'Dec W1', commits: 13 },
  { week: 'Dec W3', commits: 20 },
  { week: 'Jan W1 \'26', commits: 9 },
  { week: 'Jan W3', commits: 31 },
  { week: 'Feb W1', commits: 17 },
  { week: 'Feb W3', commits: 24 },
  { week: 'Mar W1 \'26', commits: 18 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 shadow-2xl">
        <p className="text-xs text-zinc-400 mb-1">{label}</p>
        <p className="text-sm font-bold text-cyan-400 font-mono">{payload[0].value} commits</p>
      </div>
    );
  }
  return null;
};

export default function GitHubChart() {
  return (
    <div className="rounded-2xl border border-zinc-800/80 p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(240 10% 6%) 0%, hsl(240 10% 5.5%) 100%)' }}
    >
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-400/3 rounded-full blur-3xl pointer-events-none" />
      <div className="flex items-center justify-between mb-5 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <Github size={15} className="text-zinc-300" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">GitHub Activity</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Commits over the last 12 months</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xl font-bold text-white tabular-nums font-mono flex items-center gap-1">
              312
              <TrendingUp size={14} className="text-emerald-400" />
            </p>
            <p className="text-xs text-zinc-500">Total commits</p>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={contributionData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(186 100% 60%)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="hsl(186 100% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(240 6% 12%)" strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            tick={{ fill: 'hsl(240 5% 40%)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            tickLine={false}
            axisLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fill: 'hsl(240 5% 40%)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="commits"
            stroke="hsl(186 100% 60%)"
            strokeWidth={2}
            fill="url(#commitGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}