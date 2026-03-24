'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  FolderKanban,
  Cpu,
  FileCode2,
  UserCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
  Github,
  Brain,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const navItems = [
  {
    label: 'Home',
    href: '/home-dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Projects',
    href: '/projects-portfolio',
    icon: FolderKanban,
    badge: '9',
  },
  {
    label: 'Skills',
    href: '/skills-technologies',
    icon: Cpu,
  },
  {
    label: 'Work Samples',
    href: '/work-samples',
    icon: FileCode2,
  },
  {
    label: 'Data Science',
    href: '/data-science',
    icon: Brain,
    badge: 'NEW',
  },
  {
    label: 'About',
    href: '/about-experience',
    icon: UserCircle,
  },
  {
    label: 'Contact',
    href: '/contact-resume',
    icon: Mail,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`
        relative flex flex-col h-screen border-r border-zinc-800/80
        transition-all duration-300 ease-in-out flex-shrink-0
        ${collapsed ? 'w-16' : 'w-60'}
      `}
      style={{
        background: 'linear-gradient(180deg, hsl(240 10% 5.5%) 0%, hsl(240 10% 4.5%) 100%)',
      }}
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 py-5 border-b border-zinc-800/60 ${
          collapsed ? 'justify-center px-0' : ''
        }`}
      >
        <AppLogo size={32} />
        {!collapsed && (
          <div>
            <span className="font-bold text-base text-white tracking-tight truncate block">
              DataFolio
            </span>
            <span className="text-xs text-zinc-500 font-mono">v2.0</span>
          </div>
        )}
      </div>
      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems?.map((item) => {
          const Icon = item?.icon;
          const isActive = pathname === item?.href || pathname?.startsWith(item?.href + '/');
          const isDS = item?.href === '/data-science';
          return (
            <Link
              key={item?.href}
              href={item?.href}
              className={`
                group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                text-sm font-medium transition-colors duration-200
                ${
                  isActive
                    ? isDS ? 'text-purple-400' : 'text-cyan-400'
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100'
                }
                ${collapsed ? 'justify-center px-0 w-10 mx-auto' : ''}
              `}
              title={collapsed ? item?.label : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-bg"
                  className={`absolute inset-0 rounded-xl border ${
                    isDS 
                      ? 'bg-purple-400/10 border-purple-400/20' 
                      : 'bg-cyan-400/10 border-cyan-400/20'
                  }`}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {isActive && !collapsed && (
                <motion.span 
                  layoutId="active-nav-indicator"
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full ${isDS ? 'bg-purple-400' : 'bg-cyan-400'}`} 
                />
              )}
              <div className="relative z-10 flex items-center gap-3">
                <Icon
                  size={17}
                  className={`flex-shrink-0 transition-colors ${
                    isActive
                      ? isDS ? 'text-purple-400' : 'text-cyan-400' :'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                {!collapsed && (
                  <>
                    <span className="truncate">{item?.label}</span>
                    {item?.badge && (
                      <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full font-mono ${item?.href === '/data-science' ? 'bg-purple-400/15 text-purple-400' : 'bg-cyan-400/15 text-cyan-400'}`}>
                        {item?.badge}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Tooltip for collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-zinc-800 text-zinc-100 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-zinc-700">
                  {item?.label}
                  {item?.badge && (
                    <span className="ml-1 text-cyan-400">({item?.badge})</span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
      {/* Bottom user hint */}
      {!collapsed && (
        <div className="px-3 py-3 border-t border-zinc-800/60">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-zinc-800/40 border border-zinc-700/40">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-cyan-400">M</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-zinc-200 truncate">Mgboh Fredrick</p>
              <p className="text-xs text-zinc-500 truncate">Data Analyst</p>
            </div>
          </div>
        </div>
      )}
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-10 w-6 h-6 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-all duration-150 shadow-lg"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}