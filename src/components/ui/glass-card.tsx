import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glowColor?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'default';
}

export function GlassCard({
  children,
  className,
  hoverEffect = false,
  glowColor = 'default',
  ...props
}: GlassCardProps) {
  
  const accentBorders = {
    default: 'border-[#E8DFD0]',
    indigo: 'border-[#D4A017]/30 shadow-[0_4px_20px_rgba(212,160,23,0.02)]', // gold accent
    emerald: 'border-[#4C8C4A]/30 shadow-[0_4px_20px_rgba(76,140,74,0.02)]', // success green
    amber: 'border-[#C58B0F]/30 shadow-[0_4px_20px_rgba(197,139,15,0.02)]', // warning gold
    rose: 'border-[#B44C4C]/30 shadow-[0_4px_20px_rgba(180,76,76,0.02)]' // danger red
  };

  return (
    <div
      className={twMerge(
        clsx(
          'relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 shadow-[0_2px_8px_rgba(26,26,26,0.02)]',
          hoverEffect && 'hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,26,26,0.04)] hover:border-[#D4A017]/20',
          accentBorders[glowColor],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
