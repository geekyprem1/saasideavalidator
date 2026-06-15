'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  History, 
  Settings,
  Radar, 
  LogOut,
  User,
  Coins,
  Award
} from 'lucide-react';
import { clsx } from 'clsx';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analyze Idea', href: '/dashboard/search', icon: Search },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'Search History', href: '/dashboard/history', icon: History },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="w-[280px] border-r border-[#E8DFD0] bg-[#F5EFE4] flex flex-col justify-between h-screen sticky top-0 text-[#1A1A1A] z-30">
      {/* Header / Brand */}
      <div>
        <div className="p-6 flex items-center gap-3 border-b border-[#E8DFD0]">
          <div className="p-2 rounded-lg bg-[#D4A017]/10 border border-[#D4A017]/20 text-[#C58B0F]">
            <Radar className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide text-[#1A1A1A]">
              SaaSRadar AI
            </h1>
            <p className="text-[10px] text-[#C58B0F] font-bold tracking-wider uppercase">
              Venture Intelligence
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 group relative',
                  isActive 
                    ? 'bg-white text-[#1A1A1A] border border-[#E8DFD0] shadow-[0_2px_8px_rgba(26,26,26,0.03)]' 
                    : 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-white/40 border border-transparent'
                )}
              >
                <Icon className={clsx('h-4 w-4 transition-colors', isActive ? 'text-[#C58B0F]' : 'text-[#6B6B6B] group-hover:text-[#1A1A1A]')} />
                <span>{item.name}</span>
                {isActive && (
                  <span className="absolute right-3.5 h-1.5 w-1.5 rounded-full bg-[#D4A017]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Credit status */}
      <div className="p-4 border-t border-[#E8DFD0] space-y-4 bg-white/20">
        <div className="space-y-2.5">
          {/* Credit widget */}
          <div className="p-3 bg-white/60 border border-[#E8DFD0] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#6B6B6B] uppercase tracking-wider">
              <Coins className="h-3.5 w-3.5 text-[#C58B0F]" />
              <span>Credits Left</span>
            </div>
            <span className="text-xs font-extrabold text-[#1A1A1A]">98 / 100</span>
          </div>

          {/* Plan badge */}
          <div className="p-3 bg-white/60 border border-[#E8DFD0] rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#6B6B6B] uppercase tracking-wider">
              <Award className="h-3.5 w-3.5 text-[#C58B0F]" />
              <span>Membership</span>
            </div>
            <span className="px-2 py-0.5 rounded border border-[#D4A017]/30 bg-[#D4A017]/5 text-[9px] font-extrabold text-[#C58B0F] uppercase tracking-wider">
              Pro Member
            </span>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD0]/60">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-8 w-8 rounded-full bg-[#FAF7F2] border border-[#E8DFD0] flex items-center justify-center text-[#1A1A1A] font-semibold text-xs shadow-sm">
              <User className="h-4.5 w-4.5 text-[#6B6B6B]" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#1A1A1A] truncate">Demo Founder</p>
              <p className="text-[10px] text-[#6B6B6B] truncate">demo@saasradar.ai</p>
            </div>
          </div>
          
          <Link 
            href="/login" 
            className="p-1.5 rounded-lg text-[#6B6B6B] hover:text-[#B44C4C] hover:bg-[#B44C4C]/5 border border-transparent hover:border-[#B44C4C]/10 transition-all"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
