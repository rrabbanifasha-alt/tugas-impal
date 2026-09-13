'use client';

import React from 'react';

interface AdminHeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}

export default function AdminHeader({ onMenuClick, title, subtitle }: AdminHeaderProps) {
  const todayFormatted = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5DEC9] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl bg-[#FFFDF9] border border-[#E5DEC9] text-[#1C3F29] hover:bg-[#E8F0E5]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1C3F29] leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#5E6D5B] font-normal">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Current Date Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-[#FFFDF9] border border-[#E5DEC9] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#1C3F29] shadow-xs">
          <span>📅</span>
          <span>{todayFormatted}</span>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 bg-[#E8F0E5] text-[#2D5A27] px-3 py-1.5 rounded-full text-xs font-semibold border border-[#D7E6D3]">
          <span className="w-2 h-2 rounded-full bg-[#2D5A27] animate-pulse"></span>
          <span>Sistem Online</span>
        </div>
      </div>
    </header>
  );
}
