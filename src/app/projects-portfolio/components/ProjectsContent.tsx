'use client';

import React, { useState, useMemo } from 'react';
import { Github, ExternalLink, Database, BarChart2, FileText, Search, Filter, SortAsc, Wrench, Rocket, BookOpen, Sparkles, TrendingUp, Star, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ProjectStatus = 'Completed' | 'In Progress' | 'Featured';
type ProjectDomain = 'Data Cleaning' | 'Data Analysis' | 'Automation' | 'ICT & Engineering';
type SortOption = 'date' | 'accuracy' | 'techstack';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  domain: ProjectDomain;
  type: string;
  metric: string;
  metricLabel: string;
  metricSort: number;
  dataset: string;
  datasetRows: string;
  tech: string[];
  status: ProjectStatus;
  icon: React.ComponentType<any>;
  iconColor: string;
  iconBg: string;
  github: string;
  featured: boolean;
  completedDate: string;
  dateSort: number;
}

const projects: Project[] = [
  {
    title: 'CSV Data Cleaning Pipeline',
    description: 'Automated data cleaning pipeline using pandas to remove duplicates, correct formats, and validate thousands of records for ML-ready outputs.',
    longDescription: 'Built a comprehensive data cleaning pipeline using Python and pandas. Removed duplicates, corrected data formats, validated thousands of records, and handled missing values. Standardized column names, fixed inconsistent entries, and prepared analysis-ready datasets for reporting and machine learning tasks. Reduced data inconsistencies significantly.',
    domain: 'Data Cleaning',
    type: 'Data Cleaning',
    metric: 'High Accuracy',
    metricLabel: 'Data Quality',
    metricSort: 95,
    dataset: 'Large CSV files',
    datasetRows: 'Thousands of rows',
    tech: ['Python', 'Pandas', 'NumPy', 'Git'],
    status: 'Featured',
    icon: Database,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-400/10',
    github: 'https://github.com/mgboh-freddie',
    featured: true,
    completedDate: '2025',
    dateSort: 2025,
  },
  {
    title: 'Excel Workflow Automation',
    description: 'Automated Excel cleaning workflows using Power Query and Pivot Tables to reduce manual processing time and standardize data validation.',
    longDescription: 'Designed and implemented automated Excel workflows to replace manual data processing tasks. Used Power Query for data transformation, Pivot Tables for summarization, and advanced formulas for validation. Standardized data entry processes and created reusable templates for cross-functional reporting. Significantly reduced time spent on repetitive data tasks.',
    domain: 'Automation',
    type: 'Automation',
    metric: '~30%',
    metricLabel: 'Processing Time Saved',
    metricSort: 70,
    dataset: 'Excel datasets',
    datasetRows: 'Multiple files',
    tech: ['Excel', 'Power Query', 'Pivot Tables', 'Python'],
    status: 'Featured',
    icon: BarChart2,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10',
    github: 'https://github.com/mgboh-freddie',
    featured: true,
    completedDate: 'Afrilance',
    dateSort: 2024,
  },
  {
    title: 'SQL Data Analysis & Reporting',
    description: 'Queried and analyzed structured datasets using SQL to generate reports and insights. Cleaned and standardized records for downstream reporting.',
    longDescription: 'Used SQL to query relational databases, extract meaningful insights, and generate structured reports. Automated data workflows by combining Python and SQL for end-to-end data processing. Implemented standardized data validation processes and ensured high data accuracy across all outputs. Supported cross-functional teams with data-driven reporting.',
    domain: 'Data Analysis',
    type: 'Data Analysis',
    metric: 'High Accuracy',
    metricLabel: 'Data Quality',
    metricSort: 92,
    dataset: 'Relational databases',
    datasetRows: 'Multiple tables',
    tech: ['SQL', 'Python', 'Pandas', 'Excel'],
    status: 'Featured',
    icon: FileText,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
    github: 'https://github.com/mgboh-freddie',
    featured: true,
    completedDate: 'Afrilance',
    dateSort: 2024,
  },
  {
    title: 'Broadcast System Reliability Improvement',
    description: 'Improved broadcast system reliability and reduced network downtime at Nigerian Television Authority through proactive maintenance and troubleshooting.',
    longDescription: 'At the Nigerian Television Authority, performed scheduled maintenance and proactive troubleshooting on telecommunications infrastructure. Diagnosed and resolved technical faults to ensure continuous broadcasting operations. Coordinated with engineering teams during infrastructure project deployments. Significantly improved system uptime and reduced unplanned outages.',
    domain: 'ICT & Engineering',
    type: 'Telecommunications',
    metric: 'Reduced',
    metricLabel: 'Network Downtime',
    metricSort: 80,
    dataset: 'NTA Infrastructure',
    datasetRows: 'Broadcast systems',
    tech: ['Telecommunications', 'Networking', 'Hardware', 'Troubleshooting'],
    status: 'Completed',
    icon: Wrench,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-400/10',
    github: 'https://github.com/mgboh-freddie',
    featured: false,
    completedDate: 'NTA',
    dateSort: 2023,
  },
  {
    title: 'Election Technology Systems Setup',
    description: 'Installed and configured hardware and software across multiple polling centers for the National Electoral Commission, ensuring operational readiness.',
    longDescription: 'At the National Electoral Commission, installed and configured hardware and software across multiple polling centers. Reduced technical disruptions during election operations by troubleshooting system failures rapidly. Provided on-site technical support to polling staff, maintained high data accuracy and compliance, and performed routine system validation checks.',
    domain: 'ICT & Engineering',
    type: 'ICT Support',
    metric: 'Zero',
    metricLabel: 'Critical Failures',
    metricSort: 100,
    dataset: 'Multiple polling centers',
    datasetRows: 'Election systems',
    tech: ['Hardware', 'Software', 'ICT Support', 'Data Accuracy'],
    status: 'Completed',
    icon: Wrench,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/10',
    github: 'https://github.com/mgboh-freddie',
    featured: false,
    completedDate: 'INEC',
    dateSort: 2023,
  },
  {
    title: 'Data Preprocessing for ML Tasks',
    description: 'Cleaned and standardized large datasets for machine learning tasks — removing duplicates, correcting formats, and preparing analysis-ready data.',
    longDescription: 'Cleaned and standardized large CSV datasets using pandas, reducing inconsistencies and missing values. Automated Excel cleaning workflows to reduce manual processing time. Removed duplicates, corrected formats, and validated thousands of records. Prepared analysis-ready datasets for reporting and machine learning tasks, ensuring high data quality throughout the pipeline.',
    domain: 'Data Cleaning',
    type: 'Data Preprocessing',
    metric: 'ML-Ready',
    metricLabel: 'Output Quality',
    metricSort: 88,
    dataset: 'CSV & Excel files',
    datasetRows: 'Large datasets',
    tech: ['Python', 'Pandas', 'Excel', 'NumPy'],
    status: 'Completed',
    icon: Database,
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-400/10',
    github: 'https://github.com/mgboh-freddie',
    featured: false,
    completedDate: '2025',
    dateSort: 2025,
  },
];

const domains: (ProjectDomain | 'All')[] = ['All', 'Data Cleaning', 'Data Analysis', 'Automation', 'ICT & Engineering'];

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  Featured: { label: 'Featured', color: 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20' },
  Completed: { label: 'Completed', color: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' },
  'In Progress': { label: 'In Progress', color: 'bg-amber-400/10 text-amber-400 border border-amber-400/20' },
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'date', label: 'By Date' },
  { value: 'accuracy', label: 'By Accuracy' },
  { value: 'techstack', label: 'By Tech Stack' },
];

const journeyMilestones = [
  { icon: BookOpen, color: 'text-cyan-400', bg: 'bg-cyan-400/10', label: 'Started with Excel', sub: 'Pivot tables & formulas' },
  { icon: Database, color: 'text-purple-400', bg: 'bg-purple-400/10', label: 'Learned Python & Pandas', sub: 'Data wrangling basics' },
  { icon: BarChart2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Wrote first SQL queries', sub: 'Joins, aggregations' },
  { icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-400/10', label: 'Built real pipelines', sub: 'End-to-end projects' },
  { icon: Rocket, color: 'text-pink-400', bg: 'bg-pink-400/10', label: 'Heading to ML', sub: 'The journey continues…' },
];

export default function ProjectsContent() {
  const [activeFilter, setActiveFilter] = useState<ProjectDomain | 'All'>('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = projects.filter((p) => {
      const matchesDomain = activeFilter === 'All' || p.domain === activeFilter;
      const matchesSearch =
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        p.domain.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase());
      return matchesDomain && matchesSearch;
    });

    if (sortBy === 'date') {
      result = [...result].sort((a, b) => b.dateSort - a.dateSort);
    } else if (sortBy === 'accuracy') {
      result = [...result].sort((a, b) => b.metricSort - a.metricSort);
    } else if (sortBy === 'techstack') {
      result = [...result].sort((a, b) => b.tech.length - a.tech.length);
    }

    return result;
  }, [activeFilter, search, sortBy]);

  const domainCounts: Record<string, number> = { All: projects.length };
  domains.slice(1).forEach((d) => {
    domainCounts[d] = projects.filter((p) => p.domain === d).length;
  });

  const activeSortLabel = sortOptions.find((s) => s.value === sortBy)?.label ?? 'Sort';

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-8">

      {/* ── Data Science Noob Banner ── */}
      <div className="relative mb-10 rounded-2xl overflow-hidden border border-cyan-400/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950">
        {/* Decorative glow blobs */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-emerald-400/0" />

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                <Sparkles size={22} className="text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">Data Science Noob</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 font-medium">
                    Origin Story
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">The honest, unfiltered journey of learning data science from scratch</p>
              </div>
            </div>
            <div className="sm:ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400/10 border border-emerald-400/20 w-fit">
              <Star size={12} className="text-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">Still learning. Always growing.</span>
            </div>
          </div>

          {/* Story text */}
          <div className="mb-6 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
            <p className="text-sm text-zinc-300 leading-relaxed">
              I didn&apos;t start as a data scientist. I started as a curious engineer who kept asking{' '}
              <span className="text-cyan-400 font-medium">&quot;why does this data look so messy?&quot;</span> — and then
              decided to fix it. From cleaning spreadsheets at 2am to writing my first pandas script, every project here
              represents a real step forward. No bootcamp shortcuts. No fancy degree in data science. Just{' '}
              <span className="text-emerald-400 font-medium">raw curiosity, late nights, and a lot of Stack Overflow.</span>
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed mt-2">
              If you&apos;re also a noob on this journey — you&apos;re not alone. The projects below are proof that
              you don&apos;t need to be an expert to start. You just need to{' '}
              <span className="text-amber-400 font-medium">start.</span>
            </p>
          </div>

          {/* Journey milestones */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {journeyMilestones.map((m, i) => {
              const MIcon = m.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className={`w-9 h-9 rounded-xl ${m.bg} flex items-center justify-center`}>
                    <MIcon size={16} className={m.color} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-200 leading-tight">{m.label}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{m.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Projects Portfolio</h1>
        <p className="text-sm text-zinc-400 mt-1">
          {projects.length} projects — data cleaning, analysis, automation, and ICT engineering
        </p>
      </div>

      {/* Search + Sort + Filters */}
      <div className="flex flex-col gap-3 mb-6">
        {/* Row 1: Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, tech, or domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 transition-colors min-w-[150px] justify-between"
            >
              <div className="flex items-center gap-2">
                <SortAsc size={14} className="text-zinc-500" />
                <span>{activeSortLabel}</span>
              </div>
              <ChevronDown size={13} className={`text-zinc-500 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl shadow-black/40 z-20 overflow-hidden">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sortBy === opt.value
                        ? 'bg-cyan-400/10 text-cyan-400' :'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Domain Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-zinc-500 flex-shrink-0" />
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setActiveFilter(domain)}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150
                ${activeFilter === domain
                  ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30' :'bg-zinc-900 text-zinc-400 border border-zinc-700 hover:border-zinc-600 hover:text-zinc-200'
                }
              `}
            >
              {domain}
              <span className={`font-mono text-xs px-1 rounded ${activeFilter === domain ? 'text-cyan-300' : 'text-zinc-600'}`}>
                {domainCounts[domain]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xs text-zinc-500">
          Showing <span className="text-zinc-300 font-medium">{filtered.length}</span> projects
          {activeFilter !== 'All' && ` in ${activeFilter}`}
          {search && ` matching "${search}"`}
          <span className="ml-2 text-zinc-600">· sorted {activeSortLabel.toLowerCase()}</span>
        </span>
      </div>

      {/* Project Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
            <FolderIcon />
          </div>
          <h3 className="text-base font-semibold text-zinc-300 mb-1">No projects found</h3>
          <p className="text-sm text-zinc-500 max-w-xs">
            Try adjusting your search or filter. All {projects.length} projects are shown when filters are cleared.
          </p>
          <button
            onClick={() => { setSearch(''); setActiveFilter('All'); }}
            className="mt-4 px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-lg text-sm hover:bg-zinc-700 transition-all"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
          <AnimatePresence mode='popLayout'>
          {filtered.map((project) => {
            const PIcon = project.icon;
            const isExpanded = expanded === project.title;
            const status = statusConfig[project.status];
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={project.title}
                className={`
                  group relative rounded-xl border bg-zinc-900
                  hover:border-zinc-700 hover:shadow-xl hover:shadow-black/30
                  ${project.featured ? 'border-cyan-400/20 card-glow-cyan' : 'border-zinc-800'}
                `}
              >
                {project.featured && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/50 via-cyan-400 to-cyan-400/50 rounded-t-xl" />
                )}
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${project.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <PIcon size={18} className={project.iconColor} />
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                        {status.label}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm font-semibold text-white mb-1.5">{project.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {isExpanded ? project.longDescription : project.description}
                  </p>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : project.title)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 mt-1.5 transition-colors"
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>

                  {/* Metric */}
                  <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                    <div>
                      <p className="text-xl font-bold text-white tabular-nums font-mono">{project.metric}</p>
                      <p className="text-xs text-zinc-500">{project.metricLabel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-zinc-300">{project.datasetRows}</p>
                      <p className="text-xs text-zinc-500">{project.dataset}</p>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/60 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">{project.completedDate}</span>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-all duration-150 active:scale-95"
                      >
                        <Github size={12} />
                        Code
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 text-xs font-medium border border-cyan-400/20 transition-all duration-150 active:scale-95"
                      >
                        <ExternalLink size={12} />
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function FolderIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-zinc-600">
      <path d="M3 7a2 2 0 012-2h4l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}