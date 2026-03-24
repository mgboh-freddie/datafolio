import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, Database, BarChart2, FileText, ArrowRight, Zap } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const featured = [
  {
    title: 'CSV Data Cleaning Pipeline',
    description:
      'Automated data cleaning pipeline using pandas to remove duplicates, correct formats, and validate thousands of records. Reduced inconsistencies and missing values for ML-ready datasets.',
    type: 'Data Cleaning',
    accuracy: '~30%',
    accuracyLabel: 'Processing Time Saved',
    dataset: 'Large CSV files',
    tech: ['Python', 'Pandas', 'NumPy', 'Git'],
    icon: Database,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-400/10',
    iconBorder: 'border-cyan-400/20',
    accentColor: 'hsl(186 100% 60%)',
    github: 'https://github.com/mgbohfrederick',
    status: 'Completed',
    statusColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  },
  {
    title: 'Excel Workflow Automation',
    description:
      'Automated Excel cleaning workflows using Power Query and Pivot Tables to reduce manual processing time. Standardized data validation and reporting for cross-functional teams.',
    type: 'Automation',
    accuracy: 'Manual → Auto',
    accuracyLabel: 'Workflow Improvement',
    dataset: 'Excel datasets',
    tech: ['Excel', 'Power Query', 'Pivot Tables', 'Python'],
    icon: BarChart2,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10',
    iconBorder: 'border-emerald-400/20',
    accentColor: 'hsl(158 64% 52%)',
    github: 'https://github.com/mgbohfrederick',
    status: 'Completed',
    statusColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  },
  {
    title: 'SQL Data Analysis & Reporting',
    description:
      'Queried and analyzed structured datasets using SQL to generate reports and insights. Cleaned and standardized records for downstream reporting and machine learning tasks.',
    type: 'Data Analysis',
    accuracy: 'High Accuracy',
    accuracyLabel: 'Data Quality',
    dataset: 'Relational databases',
    tech: ['SQL', 'Python', 'Pandas', 'Excel'],
    icon: FileText,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
    iconBorder: 'border-purple-400/20',
    accentColor: 'hsl(270 70% 65%)',
    github: 'https://github.com/mgbohfrederick',
    status: 'Completed',
    statusColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  },
];

export default function FeaturedProjects() {
  return (
    <div className="rounded-2xl border border-zinc-800/80 p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(240 10% 6%) 0%, hsl(240 10% 5.5%) 100%)' }}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/3 rounded-full blur-3xl pointer-events-none" />
      <div className="flex items-center justify-between mb-5 relative">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Zap size={15} className="text-cyan-400" />
            Featured Projects
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">Highlighted data cleaning &amp; analytics work</p>
        </div>
        <Link
          href="/projects-portfolio"
          className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium px-3 py-1.5 rounded-lg bg-cyan-400/5 border border-cyan-400/15 hover:bg-cyan-400/10"
        >
          View all <ArrowRight size={13} />
        </Link>
      </div>
      <div className="space-y-3 relative">
        {featured?.map((project, idx) => {
          const Icon = project?.icon;
          return (
            <div
              key={project?.title}
              className="group rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4 hover:border-zinc-700/80 hover:bg-zinc-800/30 transition-all duration-250"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`w-9 h-9 rounded-xl ${project?.iconBg} border ${project?.iconBorder} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={16} className={project?.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-white truncate group-hover:text-zinc-100">{project?.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${project?.statusColor}`}>
                        {project?.status}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/60">
                        {project?.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                      {project?.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      {project?.tech?.map((t) => (
                        <span key={t} className="text-xs text-zinc-500 font-mono hover:text-zinc-300 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-base font-bold text-white tabular-nums font-mono">{project?.accuracy}</p>
                    <p className="text-xs text-zinc-500">{project?.accuracyLabel}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={project?.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-all duration-150 border border-zinc-700/60 hover:border-zinc-600"
                    >
                      <Github size={13} />
                    </a>
                    <a
                      href="#"
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-all duration-150 border border-zinc-700/60 hover:border-zinc-600"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}