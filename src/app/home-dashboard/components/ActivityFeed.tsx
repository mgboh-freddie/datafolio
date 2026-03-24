import React from 'react';
import { GitCommit, Trophy, BookOpen, Wrench, Star } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';



const activities = [
  {
    icon: GitCommit,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    text: 'Automated data workflows using Python and SQL at Afrilance',
    time: 'Recent',
  },
  {
    icon: Wrench,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    text: 'Standardized data validation processes, reducing processing time by ~30%',
    time: 'Afrilance',
  },
  {
    icon: Trophy,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    text: 'Improved broadcast system reliability at Nigerian Television Authority',
    time: 'NTA',
  },
  {
    icon: BookOpen,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    text: 'Received Certificate of Presentation from NIEEE (2023)',
    time: '2023',
  },
  {
    icon: Star,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    text: 'Volunteer work at WORFAF — Women and Orphans Rights to Family Assets Foundation',
    time: '2024',
  },
  {
    icon: GitCommit,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    text: 'Cleaned and standardized large CSV datasets using pandas for ML-ready outputs',
    time: 'Ongoing',
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
      <h2 className="text-sm font-semibold text-white mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {activities?.map((item, i) => {
          const Icon = item?.icon;
          return (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-lg ${item?.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon size={13} className={item?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-300 leading-relaxed">{item?.text}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{item?.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}