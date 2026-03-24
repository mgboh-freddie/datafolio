'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Download, Sparkles, Terminal, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const codeLines = [
  { tokens: [
    { type: 'keyword', text: 'import' },
    { type: 'normal', text: ' pandas ' },
    { type: 'keyword', text: 'as' },
    { type: 'normal', text: ' pd' },
  ]},
  { tokens: [
    { type: 'comment', text: '# Load and clean dataset' },
  ]},
  { tokens: [
    { type: 'variable', text: 'df' },
    { type: 'normal', text: ' = pd.' },
    { type: 'function', text: 'read_csv' },
    { type: 'normal', text: '(' },
    { type: 'string', text: '"raw_data.csv"' },
    { type: 'normal', text: ')' },
  ]},
  { tokens: [
    { type: 'variable', text: 'df' },
    { type: 'normal', text: ' = df.' },
    { type: 'function', text: 'drop_duplicates' },
    { type: 'normal', text: '()' },
  ]},
  { tokens: [
    { type: 'variable', text: 'df' },
    { type: 'normal', text: ' = df.' },
    { type: 'function', text: 'dropna' },
    { type: 'normal', text: '(subset=[' },
    { type: 'string', text: '"id"' },
    { type: 'normal', text: ', ' },
    { type: 'string', text: '"value"' },
    { type: 'normal', text: '])' },
  ]},
  { tokens: [
    { type: 'variable', text: 'efficiency_gain' },
    { type: 'normal', text: ' = ' },
    { type: 'number', text: '0.30' },
    { type: 'comment', text: '  # 30% processing time saved' },
  ]},
];

function CodeToken({ type, text }: { type: string; text: string }) {
  const colorMap: Record<string, string> = {
    keyword: 'text-purple-400',
    string: 'text-emerald-400',
    comment: 'text-zinc-500 italic',
    function: 'text-cyan-400',
    number: 'text-amber-400',
    variable: 'text-blue-300',
    normal: 'text-zinc-300',
  };
  return <span className={colorMap[type] || 'text-zinc-300'}>{text}</span>;
}

export default function HeroBanner() {
  const [typedLine, setTypedLine] = useState(0);
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    if (typedLine < codeLines.length) {
      const timer = setTimeout(() => setTypedLine((prev) => prev + 1), 350);
      return () => clearTimeout(timer);
    }
  }, [typedLine]);

  useEffect(() => {
    // Generate particles only on client-side to avoid hydration mismatch
    const newParticles = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 p-8 lg:p-10 animate-fade-in"
      style={{
        background: 'linear-gradient(135deg, hsl(240 10% 6%) 0%, hsl(240 10% 5%) 50%, hsl(240 10% 6.5%) 100%)',
        boxShadow: '0 1px 0 0 hsl(240 6% 18%), 0 20px 60px hsl(0 0% 0% / 0.4)',
      }}
    >
      {/* Layered background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/4 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-400/3 rounded-full blur-[60px] pointer-events-none" />

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/20 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Text */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-slow" />
              Open to Opportunities
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-3 py-1 rounded-full">
              <Sparkles size={11} />
              Data &amp; Engineering
            </span>
          </div>

          <div>
            <p className="text-xs font-mono text-zinc-500 mb-2 tracking-widest uppercase">
              &gt; Hello, World!
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Hi, I&apos;m{' '}
              <span className="text-gradient-cyan">Mgboh Ejiofor Fredrick</span>
            </h1>
            <p className="mt-2 text-lg text-zinc-400 font-medium">
              Data Analyst &amp; Software Engineer
            </p>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
            Electronic and Computer Engineering graduate with hands-on experience in data cleaning,
            preprocessing, and analytics using Python, pandas, Excel, and SQL. Proven ability to
            streamline workflows and ensure high data accuracy across multiple sectors.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects-portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150"
              style={{
                background: 'linear-gradient(135deg, hsl(186 100% 55%), hsl(186 100% 45%))',
                color: 'hsl(240 10% 3.9%)',
                boxShadow: '0 4px 16px hsl(186 100% 60% / 0.3)',
              }}
            >
              View Projects
              <ArrowRight size={15} />
            </Link>
            <a
              href="https://github.com/mgboh-freddie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-xl text-sm font-semibold hover:bg-zinc-700 hover:border-zinc-600 active:scale-95 transition-all duration-150"
            >
              <Github size={15} />
              GitHub Profile
            </a>
            <Link
              href="/contact-resume"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-zinc-400 border border-zinc-700/60 rounded-xl text-sm font-medium hover:text-zinc-200 hover:border-zinc-600 active:scale-95 transition-all duration-150"
            >
              <Download size={15} />
              Resume
            </Link>
          </div>

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            {[
              { label: 'Python', color: 'bg-yellow-400/15 text-yellow-400 border-yellow-400/20' },
              { label: 'Pandas', color: 'bg-blue-400/15 text-blue-400 border-blue-400/20' },
              { label: 'SQL', color: 'bg-cyan-400/15 text-cyan-400 border-cyan-400/20' },
              { label: 'Excel', color: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20' },
              { label: 'Git', color: 'bg-purple-400/15 text-purple-400 border-purple-400/20' },
            ].map((tag) => (
              <span
                key={tag.label}
                className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${tag.color}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Code Preview */}
        <div className="code-block p-5 rounded-2xl animate-fade-in-delay-1"
          style={{ boxShadow: '0 8px 32px hsl(0 0% 0% / 0.4), inset 0 1px 0 hsl(240 6% 18%)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/70" />
              <span className="w-3 h-3 rounded-full bg-amber-500/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <Terminal size={12} className="text-zinc-500" />
              <span className="text-xs text-zinc-500 font-mono">data_cleaning.py</span>
            </div>
            <div className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              <span className="text-xs text-emerald-400 font-mono">running</span>
            </div>
          </div>
          <div className="space-y-1.5 font-mono text-sm">
            {codeLines.slice(0, typedLine).map((line, i) => (
              <div key={i} className="flex group hover:bg-zinc-800/30 rounded px-1 -mx-1 transition-colors">
                <span className="text-zinc-600 text-xs w-6 text-right mr-4 select-none tabular-nums mt-0.5">
                  {i + 1}
                </span>
                <span>
                  {line.tokens.map((token, j) => (
                    <CodeToken key={j} type={token.type} text={token.text} />
                  ))}
                </span>
              </div>
            ))}
            {typedLine < codeLines.length && (
              <div className="flex">
                <span className="text-zinc-600 text-xs w-6 text-right mr-4 select-none">
                  {typedLine + 1}
                </span>
                <span className="w-2 h-4 bg-cyan-400 animate-pulse rounded-sm" />
              </div>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center gap-2">
            <span className="text-xs text-zinc-500 font-mono">Output:</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
              ✓ processing_time ↓ 30%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}