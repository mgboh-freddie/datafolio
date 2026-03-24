'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  LayoutDashboard,
  FolderKanban,
  Cpu,
  FileCode2,
  UserCircle,
  Mail,
  Github,
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { Toaster } from 'sonner';
import Icon from '@/components/ui/AppIcon';


const mobileNavItems = [
  { label: 'Home', href: '/home-dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects-portfolio', icon: FolderKanban },
  { label: 'Skills', href: '/skills-technologies', icon: Cpu },
  { label: 'Samples', href: '/work-samples', icon: FileCode2 },
  { label: 'About', href: '/about-experience', icon: UserCircle },
  { label: 'Contact', href: '/contact-resume', icon: Mail },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-800
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ background: 'linear-gradient(180deg, hsl(240 10% 5.5%) 0%, hsl(240 10% 4.5%) 100%)' }}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-zinc-800/60">
          <div className="flex items-center gap-2">
            <AppLogo size={28} />
            <div>
              <span className="font-bold text-white block text-sm">DataFolio</span>
              <span className="text-xs text-zinc-500 font-mono">v2.0</span>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-zinc-400 hover:text-zinc-100 transition-colors p-1 rounded-lg hover:bg-zinc-800"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="py-4 px-2 space-y-0.5">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20' :'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100 border border-transparent'
                  }
                `}
              >
                <Icon size={17} className={isActive ? 'text-cyan-400' : 'text-zinc-500'} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-zinc-800/60"
          style={{ background: 'linear-gradient(180deg, hsl(240 10% 5.5%) 0%, hsl(240 10% 4.5%) 100%)' }}
        >
          <button
            onClick={() => setMobileOpen(true)}
            className="text-zinc-400 hover:text-zinc-100 transition-colors p-1 rounded-lg hover:bg-zinc-800"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <AppLogo size={22} />
            <span className="font-bold text-white text-sm">DataFolio</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'hsl(240 10% 8%)',
            border: '1px solid hsl(240 6% 18%)',
            color: 'hsl(0 0% 95%)',
            fontFamily: 'DM Sans, sans-serif',
          },
        }}
      />
    </div>
  );
}