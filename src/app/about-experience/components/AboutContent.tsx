'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Code2,
  Heart,
  Wrench,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Trophy,
  Flame,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';
import { motion } from 'framer-motion';



const timelineItems = [
  {
    date: 'Present',
    title: 'Data Cleaning & Analytics Specialist',
    subtitle: 'Afrilance — Software Engineering',
    description:
      'Improved software development efficiency by reducing processing time and manual workload by approximately 30%. Implemented standardized data validation processes, automated data workflows using Python and SQL, and enhanced cross-functional project coordination. Collaborated with developers and product stakeholders to plan and deploy scalable software solutions.',
    tags: ['Python', 'SQL', 'Data Validation', 'Automation', 'Afrilance'],
    icon: Flame,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-400/10',
    current: true,
  },
  {
    date: 'Nigerian Television Authority',
    title: 'Telecommunication Engineer',
    subtitle: 'Nigerian Television Authority (NTA)',
    description:
      'Improved broadcast system reliability and reduced network downtime. Performed scheduled maintenance and proactive troubleshooting on telecommunications infrastructure. Ensured continuous broadcasting operations, diagnosed and resolved technical faults, and coordinated with engineering teams during infrastructure project deployments.',
    tags: ['Telecommunications', 'Network Maintenance', 'Troubleshooting', 'Broadcasting'],
    icon: Wrench,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-400/10',
    current: false,
  },
  {
    date: 'National Electoral Commission',
    title: 'ICT Technician',
    subtitle: 'National Electoral Commission',
    description:
      'Improved operational readiness of election technology systems. Installed and configured hardware and software across multiple polling centers. Reduced technical disruptions during election operations, troubleshot system failures, and provided rapid on-site technical support to polling staff. Maintained high data accuracy and compliance.',
    tags: ['ICT Support', 'Hardware', 'Software', 'Data Accuracy', 'System Validation'],
    icon: Code2,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10',
    current: false,
  },
  {
    date: '2017 – 2023',
    title: 'B.Eng. Electronic and Computer Engineering',
    subtitle: 'University of Nigeria, Nsukka',
    description:
      'Studied Electronic and Computer Engineering at the University of Nigeria, Nsukka. Gained foundational knowledge in electronics, computer systems, networking, and software engineering. Developed strong analytical and problem-solving skills applicable to data analytics and ICT roles.',
    tags: ['Electronics Engineering', 'Computer Systems', 'Networking', 'UNN'],
    icon: GraduationCap,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
    current: false,
  },
];

const certifications = [
  {
    name: 'Certificate of Presentation',
    issuer: 'Nigerian Institute of Electrical and Electronics Engineers (NIEEE)',
    date: '2023',
    status: 'Completed',
    statusColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    progress: 100,
    url: '#',
  },
];

const interests = [
  { label: 'Data Analytics', icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-400/10', note: 'Cleaning and analyzing datasets for insights' },
  { label: 'Open Source', icon: Code2, color: 'text-cyan-400', bg: 'bg-cyan-400/10', note: 'Contributing to Python data utilities' },
  { label: 'Telecommunications', icon: Wrench, color: 'text-purple-400', bg: 'bg-purple-400/10', note: 'Broadcast systems and network infrastructure' },
  { label: 'Volunteer Work', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-400/10', note: 'WORFAF — Women and Orphans Rights to Family Assets Foundation (2024)' },
  { label: 'Continuous Learning', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-400/10', note: 'Expanding skills in Python, SQL, and data science' },
  { label: 'System Troubleshooting', icon: Flame, color: 'text-rose-400', bg: 'bg-rose-400/10', note: 'Diagnosing and resolving technical faults efficiently' },
];

const profileStats = [
  { label: 'Roles Held', value: '3', note: 'Tech positions' },
  { label: 'Efficiency Gain', value: '30%', note: 'At Afrilance' },
  { label: 'Degree', value: 'B.Eng', note: 'UNN 2023' },
  { label: 'Certification', value: '1', note: 'NIEEE 2023' },
];

export default function AboutContent() {
  const [expandedItem, setExpandedItem] = useState<number | null>(0);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">About &amp; Experience</h1>
        <p className="text-sm text-zinc-400 mt-1">My background, education, and professional journey</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left: Bio + Stats + Interests */}
        <div className="space-y-6">
          {/* Bio Card */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-emerald-400/20 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-cyan-400">
                ME
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">Mgboh Ejiofor Fredrick</h2>
                <p className="text-sm text-zinc-400">Data Analyst &amp; Software Engineer</p>
                <p className="text-xs text-zinc-500 font-mono">Electronic &amp; Computer Engineering</p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <MapPin size={13} className="text-zinc-500" />
                Enugu, Nigeria — open to opportunities
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Calendar size={13} className="text-zinc-500" />
                Experience in ICT, Telecom &amp; Software Engineering
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <GraduationCap size={13} className="text-zinc-500" />
                B.Eng. Electronics Engineering, UNN 2023
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-950/50 border border-zinc-800 mb-4">
              <p className="text-xs text-zinc-300 leading-relaxed">
                Electronic and Computer Engineering graduate with hands-on experience in ICT support,
                telecommunications maintenance, and software engineering. Currently specializing in
                data cleaning, preprocessing, and analytics using Python, pandas, Excel, and SQL.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-950/50 border border-zinc-800">
              <p className="text-xs text-zinc-300 leading-relaxed">
                Proven ability to troubleshoot systems, streamline workflows, improve operational
                efficiency, and ensure high data accuracy. Looking for roles where I can contribute
                real analytical work and grow with experienced teams.
              </p>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-md bg-cyan-400/10 flex items-center justify-center">
                <Trophy size={13} className="text-cyan-400" />
              </div>
              <h2 className="text-sm font-semibold text-white">Career Highlights</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {profileStats?.map((stat) => (
                <div key={stat?.label} className="p-3 rounded-lg bg-zinc-950/40 border border-zinc-800 text-center">
                  <p className="text-lg font-bold text-white tabular-nums font-mono">{stat?.value}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{stat?.label}</p>
                  <p className="text-xs text-zinc-600">{stat?.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Interests &amp; Activities</h2>
            <div className="space-y-2.5">
              {interests?.map((item) => {
                const Icon = item?.icon;
                return (
                  <div key={item?.label} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-zinc-800/40 transition-colors">
                    <div className={`w-7 h-7 rounded-lg ${item?.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={13} className={item?.color} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-200">{item?.label}</p>
                      <p className="text-xs text-zinc-500 leading-relaxed">{item?.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Timeline + Certifications */}
        <div className="xl:col-span-2 space-y-6">
          {/* Experience & Education Timeline */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h2 className="text-base font-semibold text-white mb-6">Experience &amp; Education</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-zinc-800" />

              <div className="space-y-2">
                {timelineItems?.map((item, i) => {
                  const Icon = item?.icon;
                  const isExpanded = expandedItem === i;
                  return (
                    <motion.div 
                      key={i} 
                      className="relative pl-14"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {/* Icon bubble */}
                      <div className={`absolute left-2.5 -translate-x-1/2 w-9 h-9 rounded-xl ${item?.iconBg} border border-zinc-800 flex items-center justify-center z-10`}>
                        <Icon size={15} className={item?.iconColor} />
                      </div>
                      <div
                        className={`
                          rounded-xl border p-4 cursor-pointer transition-all duration-150
                          ${isExpanded ? 'bg-zinc-800/60 border-zinc-700' : 'bg-zinc-950/40 border-zinc-800 hover:border-zinc-700'}
                        `}
                        onClick={() => setExpandedItem(isExpanded ? null : i)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-semibold text-white">{item?.title}</h3>
                              {item?.current && (
                                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-slow" />
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-400 mt-0.5">{item?.subtitle}</p>
                            <p className="text-xs text-zinc-600 font-mono mt-1">{item?.date}</p>
                          </div>
                          {isExpanded ? (
                            <ChevronUp size={15} className="text-zinc-500 flex-shrink-0 mt-1" />
                          ) : (
                            <ChevronDown size={15} className="text-zinc-500 flex-shrink-0 mt-1" />
                          )}
                        </div>

                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-zinc-700/50">
                            <p className="text-xs text-zinc-300 leading-relaxed mb-3">{item?.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {item?.tags?.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white">Certifications</h2>
              <span className="text-xs text-zinc-500 font-mono">
                {certifications?.filter((c) => c?.status === 'Completed')?.length}/{certifications?.length} completed
              </span>
            </div>
            <div className="space-y-3">
              {certifications?.map((cert) => (
                <div
                  key={cert?.name}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800 hover:border-zinc-700 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Award size={16} className="text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-zinc-200">{cert?.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cert?.statusColor}`}>
                        {cert?.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">{cert?.issuer}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-zinc-600 font-mono">{cert?.date}</span>
                    {cert?.status === 'Completed' && (
                      <a
                        href={cert?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-all"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
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