'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Brain, Database, Sparkles, BookOpen, Zap, Target, FlaskConical, ArrowRight, Star, Rocket, Activity, ChevronRight } from 'lucide-react';
import AppLayout from '@/components/AppLayout';

/* ── Animated Counter ── */
function AnimatedCounter({ end, suffix = '' }: {end: number;suffix?: string;}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1200;
          const step = Math.ceil(end / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>);

}

/* ── Animated Progress Bar ── */
function ProgressBar({ value, color }: {value: number;color: string;}) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(value), 200);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="h-2 bg-zinc-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
        style={{ width: `${width}%` }} />
      
    </div>);

}

/* ── Floating Emoji Particle ── */
function FloatingEmoji({ emoji, style }: {emoji: string;style: React.CSSProperties;}) {
  return (
    <span
      className="absolute text-2xl pointer-events-none select-none animate-float"
      style={style}>
      
      {emoji}
    </span>);

}

/* ── Data ── */
const learningRoadmap = [
{
  phase: '01',
  title: 'Excel & Spreadsheets',
  status: 'mastered',
  emoji: '📊',
  desc: 'Data cleaning, pivot tables, Power Query, VLOOKUP, conditional formatting',
  color: 'emerald',
  tools: ['Excel', 'Power Query', 'Pivot Tables']
},
{
  phase: '02',
  title: 'Python Fundamentals',
  status: 'mastered',
  emoji: '🐍',
  desc: 'Variables, loops, functions, file I/O, OOP basics — the foundation of everything',
  color: 'yellow',
  tools: ['Python 3', 'VS Code', 'Jupyter']
},
{
  phase: '03',
  title: 'Pandas & NumPy',
  status: 'mastered',
  emoji: '🐼',
  desc: 'DataFrames, Series, merging, groupby, vectorized operations, data wrangling',
  color: 'blue',
  tools: ['Pandas', 'NumPy', 'CSV/JSON']
},
{
  phase: '04',
  title: 'SQL & Databases',
  status: 'mastered',
  emoji: '🗄️',
  desc: 'SELECT, JOIN, GROUP BY, subqueries, window functions, query optimization',
  color: 'cyan',
  tools: ['SQL', 'SQLite', 'PostgreSQL']
},
{
  phase: '05',
  title: 'Data Visualization',
  status: 'learning',
  emoji: '📈',
  desc: 'Matplotlib, Seaborn, Plotly — turning raw numbers into compelling visual stories',
  color: 'purple',
  tools: ['Matplotlib', 'Seaborn', 'Plotly']
},
{
  phase: '06',
  title: 'Machine Learning',
  status: 'exploring',
  emoji: '🤖',
  desc: 'Scikit-learn, regression, classification, clustering — teaching machines to learn',
  color: 'rose',
  tools: ['Scikit-learn', 'Regression', 'Clustering']
}];


const concepts = [
{ name: 'Data Cleaning', level: 88, emoji: '🧹', color: 'bg-emerald-400' },
{ name: 'Python / Pandas', level: 78, emoji: '🐍', color: 'bg-yellow-400' },
{ name: 'SQL Queries', level: 75, emoji: '🗄️', color: 'bg-cyan-400' },
{ name: 'Data Visualization', level: 55, emoji: '📊', color: 'bg-purple-400' },
{ name: 'Statistical Analysis', level: 50, emoji: '📐', color: 'bg-blue-400' },
{ name: 'Machine Learning', level: 30, emoji: '🤖', color: 'bg-rose-400' }];


const dsTools = [
{ name: 'Python', icon: '🐍', category: 'Language', color: 'from-yellow-400/20 to-yellow-400/5 border-yellow-400/30', textColor: 'text-yellow-400' },
{ name: 'Pandas', icon: '🐼', category: 'Data Wrangling', color: 'from-blue-400/20 to-blue-400/5 border-blue-400/30', textColor: 'text-blue-400' },
{ name: 'NumPy', icon: '🔢', category: 'Computation', color: 'from-cyan-400/20 to-cyan-400/5 border-cyan-400/30', textColor: 'text-cyan-400' },
{ name: 'Matplotlib', icon: '📈', category: 'Visualization', color: 'from-purple-400/20 to-purple-400/5 border-purple-400/30', textColor: 'text-purple-400' },
{ name: 'Seaborn', icon: '🎨', category: 'Visualization', color: 'from-pink-400/20 to-pink-400/5 border-pink-400/30', textColor: 'text-pink-400' },
{ name: 'SQL', icon: '🗄️', category: 'Database', color: 'from-emerald-400/20 to-emerald-400/5 border-emerald-400/30', textColor: 'text-emerald-400' },
{ name: 'Jupyter', icon: '📓', category: 'Environment', color: 'from-orange-400/20 to-orange-400/5 border-orange-400/30', textColor: 'text-orange-400' },
{ name: 'Scikit-learn', icon: '🤖', category: 'ML', color: 'from-rose-400/20 to-rose-400/5 border-rose-400/30', textColor: 'text-rose-400' },
{ name: 'Git', icon: '🌿', category: 'Version Control', color: 'from-zinc-400/20 to-zinc-400/5 border-zinc-400/30', textColor: 'text-zinc-300' }];


const milestones = [
{ emoji: '🎯', text: 'Cleaned first real dataset — 10,000+ rows of NTA broadcast logs', date: 'Jan 2024' },
{ emoji: '⚡', text: 'Automated Excel reports saving 3 hours/week at Afrilance', date: 'Mar 2024' },
{ emoji: '🏆', text: 'Built first SQL pipeline analyzing INEC election data', date: 'Jun 2024' },
{ emoji: '🐍', text: 'Wrote first Python script to process CSV files end-to-end', date: 'Aug 2024' },
{ emoji: '📊', text: 'Created first data visualization dashboard for stakeholders', date: 'Oct 2024' },
{ emoji: '🚀', text: 'Started exploring ML concepts — regression & classification', date: 'Jan 2025' }];


const colorMap: Record<string, {bg: string;border: string;text: string;badge: string;}> = {
  emerald: { bg: 'bg-emerald-400/8', border: 'border-emerald-400/25', text: 'text-emerald-400', badge: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/25' },
  yellow: { bg: 'bg-yellow-400/8', border: 'border-yellow-400/25', text: 'text-yellow-400', badge: 'bg-yellow-400/15 text-yellow-400 border-yellow-400/25' },
  blue: { bg: 'bg-blue-400/8', border: 'border-blue-400/25', text: 'text-blue-400', badge: 'bg-blue-400/15 text-blue-400 border-blue-400/25' },
  cyan: { bg: 'bg-cyan-400/8', border: 'border-cyan-400/25', text: 'text-cyan-400', badge: 'bg-cyan-400/15 text-cyan-400 border-cyan-400/25' },
  purple: { bg: 'bg-purple-400/8', border: 'border-purple-400/25', text: 'text-purple-400', badge: 'bg-purple-400/15 text-purple-400 border-purple-400/25' },
  rose: { bg: 'bg-rose-400/8', border: 'border-rose-400/25', text: 'text-rose-400', badge: 'bg-rose-400/15 text-rose-400 border-rose-400/25' }
};

const statusConfig: Record<string, {label: string;color: string;dot: string;}> = {
  mastered: { label: '✓ Mastered', color: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/25', dot: 'bg-emerald-400' },
  learning: { label: '⚡ Learning', color: 'bg-yellow-400/15 text-yellow-400 border-yellow-400/25', dot: 'bg-yellow-400 animate-pulse' },
  exploring: { label: '🔭 Exploring', color: 'bg-purple-400/15 text-purple-400 border-purple-400/25', dot: 'bg-purple-400 animate-pulse-slow' }
};

export default function DataScienceContent() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <AppLayout>
      <div className="min-h-screen bg-mesh-cyan p-6 lg:p-8 space-y-8">

      {/* ── Hero Banner ── */}
      <div
        className="relative overflow-hidden rounded-2xl border border-zinc-800/80 p-8 lg:p-10 animate-fade-in"
        style={{
          background: 'linear-gradient(135deg, hsl(240 10% 6%) 0%, hsl(240 10% 5%) 50%, hsl(240 10% 6.5%) 100%)',
          boxShadow: '0 1px 0 0 hsl(240 6% 18%), 0 20px 60px hsl(0 0% 0% / 0.4)'
        }}>
        
        {/* Animated background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-400/4 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

        {/* Floating emojis */}
        <FloatingEmoji emoji="🧠" style={{ top: '12%', right: '8%', animationDelay: '0s', opacity: 0.6 }} />
        <FloatingEmoji emoji="📊" style={{ top: '60%', right: '15%', animationDelay: '1.5s', opacity: 0.5 }} />
        <FloatingEmoji emoji="🐍" style={{ top: '25%', right: '25%', animationDelay: '3s', opacity: 0.4 }} />
        <FloatingEmoji emoji="⚡" style={{ bottom: '15%', right: '5%', animationDelay: '2s', opacity: 0.5 }} />

        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left: Text (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center gap-2 flex-wrap animate-stagger-1">
              <span className="flex items-center gap-1.5 text-xs font-medium bg-purple-400/10 text-purple-400 border border-purple-400/20 px-3 py-1 rounded-full">
                <Brain size={11} />
                Data Science Journey
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-3 py-1 rounded-full">
                <Sparkles size={11} />
                Noob → Practitioner
              </span>
            </div>

            <div className="animate-stagger-2">
              <p className="text-xs font-mono text-zinc-500 mb-2 tracking-widest uppercase">
                &gt; import data_science as ds
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                My{' '}
                <span className="text-gradient-purple">Data Science</span>
                <br />
                Learning Path
              </h1>
              <p className="mt-2 text-lg text-zinc-400 font-medium">
                From Excel sheets to ML models — one commit at a time 🚀
              </p>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-lg animate-stagger-3">
              I&apos;m a self-taught data enthusiast who started with Excel pivot tables and is now
              diving deep into Python, Pandas, SQL, and machine learning. Every dataset is a puzzle,
              and I love solving them. This page documents my honest, messy, wonderful journey.
            </p>

            <div className="flex flex-wrap gap-3 animate-stagger-4">
              <Link
                href="/projects-portfolio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150"
                style={{
                  background: 'linear-gradient(135deg, hsl(270 70% 65%), hsl(300 70% 65%))',
                  color: 'white',
                  boxShadow: '0 4px 16px hsl(270 70% 65% / 0.3)'
                }}>
                
                See My Projects
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/skills-technologies"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-xl text-sm font-semibold hover:bg-zinc-700 active:scale-95 transition-all duration-150">
                
                <Zap size={15} />
                All Skills
              </Link>
            </div>
          </div>

          {/* Right: Animated Stats (2 cols) */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 animate-stagger-3">
            {[
            { label: 'Datasets Cleaned', value: 40, suffix: '+', icon: '🧹', color: 'text-emerald-400' },
            { label: 'Python Scripts', value: 25, suffix: '+', icon: '🐍', color: 'text-yellow-400' },
            { label: 'SQL Queries', value: 100, suffix: '+', icon: '🗄️', color: 'text-cyan-400' },
            { label: 'Hours Learning', value: 500, suffix: '+', icon: '📚', color: 'text-purple-400' }].
            map((stat, i) =>
            <div
              key={stat.label}
              className={`stat-card p-4 rounded-xl text-center animate-stagger-${i + 1}`}>
              
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">{stat.label}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── GIF Section: The Journey ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-stagger-2">
        {[
        {
          gif: "https://images.unsplash.com/photo-1580894912989-0bc892f4efd0",
          alt: 'Person typing code on laptop enthusiastically',
          label: 'Writing Python at 2am',
          emoji: '🌙',
          color: 'border-cyan-400/20'
        },
        {
          gif: "https://img.rocket.new/generatedImages/rocket_gen_img_1f3b47ac7-1773159947981.png",
          alt: 'Charts and graphs appearing on screen',
          label: 'When the chart finally works',
          emoji: '📊',
          color: 'border-purple-400/20'
        },
        {
          gif: "https://images.unsplash.com/photo-1712339144314-afc04fce6d20",
          alt: 'Excited celebration reaction',
          label: 'Model accuracy hits 90%',
          emoji: '🎉',
          color: 'border-emerald-400/20'
        }].
        map((item, i) =>
        <div
          key={item.label}
          className={`relative rounded-2xl border ${item.color} overflow-hidden bg-zinc-900/60 group card-glow-hover animate-stagger-${i + 1}`}>
          
            <div className="aspect-video overflow-hidden">
              <img
              src={item.gif}
              alt={item.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy" />
            
            </div>
            <div className="p-3 flex items-center gap-2">
              <span className="text-lg">{item.emoji}</span>
              <span className="text-sm text-zinc-300 font-medium">{item.label}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Learning Roadmap ── */}
      <div className="animate-stagger-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-purple-400/15 border border-purple-400/25 flex items-center justify-center">
            <Target size={16} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Learning Roadmap</h2>
            <p className="text-xs text-zinc-500">My honest progress — no gatekeeping</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {learningRoadmap.map((item, i) => {
            const c = colorMap[item.color];
            const s = statusConfig[item.status];
            return (
              <div
                key={item.phase}
                className={`relative rounded-2xl border ${c.border} ${c.bg} p-5 cursor-pointer transition-all duration-300 animate-stagger-${Math.min(i + 1, 6)} group`}
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => setActivePhase(activePhase === i ? null : i)}>
                
                {/* Phase number */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className={`text-xs font-mono font-bold ${c.text} opacity-60`}>
                      Phase {item.phase}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${s.color}`}>
                    {s.label}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm mb-1.5">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">{item.desc}</p>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tools.map((tool) =>
                  <span
                    key={tool}
                    className={`text-xs px-2 py-0.5 rounded-md border font-mono ${c.badge}`}>
                    
                      {tool}
                    </span>
                  )}
                </div>

                {/* Expand indicator */}
                <ChevronRight
                  size={14}
                  className={`absolute bottom-4 right-4 text-zinc-600 transition-transform duration-200 ${activePhase === i ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                
              </div>);

          })}
        </div>
      </div>

      {/* ── Skill Proficiency ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proficiency bars */}
        <div
          className="rounded-2xl border border-zinc-800/80 p-6 animate-stagger-2"
          style={{ background: 'linear-gradient(135deg, hsl(240 10% 6%), hsl(240 10% 5%))' }}>
          
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-cyan-400/15 border border-cyan-400/25 flex items-center justify-center">
              <Activity size={16} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Skill Proficiency</h2>
              <p className="text-xs text-zinc-500">Self-assessed, brutally honest</p>
            </div>
          </div>
          <div className="space-y-4">
            {concepts.map((c, i) =>
            <div key={c.name} className={`animate-stagger-${Math.min(i + 1, 6)}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.emoji}</span>
                    <span className="text-sm text-zinc-300 font-medium">{c.name}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">{c.level}%</span>
                </div>
                <ProgressBar value={c.level} color={c.color} />
              </div>
            )}
          </div>
        </div>

        {/* Milestones */}
        <div
          className="rounded-2xl border border-zinc-800/80 p-6 animate-stagger-3"
          style={{ background: 'linear-gradient(135deg, hsl(240 10% 6%), hsl(240 10% 5%))' }}>
          
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-emerald-400/15 border border-emerald-400/25 flex items-center justify-center">
              <Star size={16} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Key Milestones</h2>
              <p className="text-xs text-zinc-500">Real wins, real growth</p>
            </div>
          </div>
          <div className="space-y-3">
            {milestones.map((m, i) =>
            <div
              key={i}
              className={`flex items-start gap-3 p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-200 animate-stagger-${Math.min(i + 1, 6)}`}>
              
                <span className="text-xl flex-shrink-0 mt-0.5">{m.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-zinc-300 leading-relaxed">{m.text}</p>
                  <span className="text-xs text-zinc-600 font-mono mt-1 block">{m.date}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Tools Arsenal ── */}
      <div className="animate-stagger-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-yellow-400/15 border border-yellow-400/25 flex items-center justify-center">
            <FlaskConical size={16} className="text-yellow-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Tools Arsenal</h2>
            <p className="text-xs text-zinc-500">The stack I use to turn data into insights</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {dsTools.map((tool, i) =>
          <div
            key={tool.name}
            className={`relative rounded-xl border bg-gradient-to-br ${tool.color} p-4 text-center card-glow-hover animate-stagger-${Math.min(i + 1, 6)} group`}
            style={{ animationDelay: `${i * 0.06}s` }}>
            
              <div className="text-3xl mb-2 group-hover:animate-wiggle">{tool.icon}</div>
              <div className={`text-sm font-bold ${tool.textColor}`}>{tool.name}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{tool.category}</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Inspiring Quote + CTA ── */}
      <div
        className="relative rounded-2xl border border-purple-400/20 p-8 text-center overflow-hidden animate-stagger-2 animate-border-glow"
        style={{
          background: 'linear-gradient(135deg, hsl(270 70% 65% / 0.08), hsl(240 10% 5%), hsl(186 100% 60% / 0.06))'
        }}>
        
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

        <div className="text-4xl mb-4 animate-float">🌱</div>
        <blockquote className="text-xl lg:text-2xl font-bold text-white max-w-2xl mx-auto leading-tight mb-3">
          &ldquo;Every expert was once a beginner.
          <br />
          <span className="text-gradient-purple">Every dataset tells a story.</span>&rdquo;
        </blockquote>
        <p className="text-zinc-500 text-sm mb-6 max-w-md mx-auto">
          I&apos;m Mgboh Fredrick — an engineer turned data enthusiast, learning in public, building
          real things, and enjoying every step of the journey.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/projects-portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150"
            style={{
              background: 'linear-gradient(135deg, hsl(270 70% 65%), hsl(186 100% 60%))',
              color: 'white',
              boxShadow: '0 4px 20px hsl(270 70% 65% / 0.3)'
            }}>
            
            <Rocket size={15} />
            See My Work
          </Link>
          <Link
            href="/about-experience"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-xl text-sm font-semibold hover:bg-zinc-700 active:scale-95 transition-all duration-150">
            
            <BookOpen size={15} />
            My Story
          </Link>
        </div>
      </div>

      </div>
    </AppLayout>);

}