'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Overview',
      href: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      exact: true,
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      exact: false,
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      exact: false,
    },
    {
      name: 'Kritik & Saran',
      href: '/admin/feedback',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      exact: false,
    },
  ];

  const isActive = (itemHref: string, exact: boolean) => {
    if (exact) {
      return pathname === itemHref;
    }
    return pathname.startsWith(itemHref);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#FAF7F2] border-r border-[#E5DEC9] transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Logo & Portal Header */}
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#2D5A27] text-[#FAF7F2] flex items-center justify-center font-bold shadow-sm">
                🌱
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#1C3F29] block leading-none">
                  Sayur Ikat
                </span>
                <span className="text-[10px] font-sans font-bold text-[#2D5A27] tracking-wider uppercase bg-[#E8F0E5] px-1.5 py-0.5 rounded-md mt-1 inline-block">
                  Admin Portal
                </span>
              </div>
            </Link>

            {/* Close button for mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-[#5E6D5B] hover:text-[#1C3F29] p-1.5 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-4 border-t border-[#E5DEC9]">
            <p className="px-3 text-[11px] font-bold text-[#8A9987] uppercase tracking-wider mb-2">
              Menu Utama
            </p>
            {navigation.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-[#2D5A27] text-white shadow-sm'
                      : 'text-[#4A5747] hover:bg-[#E8F0E5] hover:text-[#1C3F29]'
                  }`}
                >
                  <span className={active ? 'text-[#FAF7F2]' : 'text-[#2D5A27]'}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Customer Storefront Link & Admin Profile */}
        <div className="p-4 border-t border-[#E5DEC9] bg-[#FFFDF9] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#E8F0E5] text-xs font-semibold text-[#1C3F29] border border-[#E5DEC9] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span>🛒</span>
              <span>Lihat Toko Pelanggan</span>
            </div>
            <svg className="w-4 h-4 text-[#5E6D5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="w-8 h-8 rounded-full bg-[#1C3F29] text-[#FAF7F2] flex items-center justify-center text-xs font-bold">
              ADM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1C3F29] truncate">Admin Sayur Ikat</p>
              <p className="text-[10px] text-[#5E6D5B] truncate">Gading Serpong Hub</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
