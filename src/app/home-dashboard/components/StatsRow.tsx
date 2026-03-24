import React from 'react';
import { FolderKanban, Wrench, Database, GitCommit, TrendingUp, Award } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';



const stats = [
  {
    label: 'Years of Experience',
    value: '3+',
    sub: 'ICT, Telecom & Software',
    icon: FolderKanban,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    trend: 'Multi-sector',
    trendUp: true,
  },
  {
    label: 'Efficiency Improved',
    value: '30%',
    sub: 'At Afrilance via automation',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    trend: 'Quantified impact',
    trendUp: true,
  },
  {
    label: 'Datasets Cleaned',
    value: '10+',
    sub: 'Large CSV & Excel files',
    icon: Database,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
    trend: 'pandas & Excel',
    trendUp: true,
  },
  {
    label: 'Tech Roles Held',
    value: '3',
    sub: 'Software, Telecom, ICT',
    icon: Wrench,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    trend: 'Diverse background',
    trendUp: true,
  },
  {
    label: 'Core Skills',
    value: '9+',
    sub: 'Python, SQL, Excel & more',
    icon: GitCommit,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    trend: 'Actively growing',
    trendUp: true,
  },
  {
    label: 'Certification',
    value: '1',
    sub: 'NIEEE Presentation 2023',
    icon: Award,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    trend: 'IEEE recognized',
    trendUp: true,
  },
];

export default function StatsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats?.map((stat) => {
        const Icon = stat?.icon;
        return (
          <div
            key={stat?.label}
            className="relative rounded-xl p-4 border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg bg-zinc-900 border-zinc-800 hover:border-zinc-700"
          >
            <div className={`w-8 h-8 rounded-lg ${stat?.bg} flex items-center justify-center mb-3`}>
              <Icon size={16} className={stat?.color} />
            </div>
            <div className="space-y-0.5">
              <p className="text-xl font-bold text-white tabular-nums">{stat?.value}</p>
              <p className="text-xs font-medium text-zinc-400 leading-tight">{stat?.label}</p>
              <p className="text-xs text-zinc-600 leading-tight">{stat?.sub}</p>
            </div>
            <div className="mt-2 pt-2 border-t border-zinc-800">
              <span className="text-xs font-medium text-emerald-400">
                {stat?.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}