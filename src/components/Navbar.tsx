'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF7F2]/90 border-b border-[#E5DEC9] transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#1C3F29] text-[#FAF7F2] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#82C47C] animate-pulse"></span>
        <span>Pengiriman Setiap Hari Khusus Area <strong>Kota Bandung & Cimahi</strong> (Pesan Sebelum 12.00)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Brand Name (Good Eggs Serif Style) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-[#2D5A27] text-[#FAF7F2] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 8C8 10 59 16.17 3.82 21.34L5.23 22.75C10.4 17.58 16.58 14.41 17 8M17 8V3H22V8H17Z" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C3F29] block leading-none">
              Sayur Ikat
            </span>
            <span className="text-[11px] font-sans font-medium text-[#5E6D5B] tracking-wider uppercase">
              100% Organik & Bebas Plastik
            </span>
          </div>
        </Link>

        {/* Location Indicator Badge */}
        <div className="hidden lg:flex items-center gap-2 bg-[#E8F0E5] px-3.5 py-1.5 rounded-full border border-[#D7E6D3] text-xs text-[#2D5A27] font-medium">
          <svg className="w-4 h-4 text-[#2D5A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Bandung Raya</span>
        </div>

        {/* Right Actions: Keranjang & Kritik/Saran Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Cart Button (Misfits Pill Rounded Style) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#2D5A27] hover:bg-[#1C3F29] text-[#FAF7F2] px-3.5 sm:px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 group cursor-pointer"
          >
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D96B43] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF7F2] animate-bounce">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="font-semibold text-xs sm:text-sm hidden sm:inline">Keranjang</span>
            {subtotal > 0 && (
              <span className="text-[11px] font-normal bg-[#1C3F29]/60 px-2 py-0.5 rounded-full border border-[#82C47C]/30 hidden md:inline">
                Rp {subtotal.toLocaleString('id-ID')}
              </span>
            )}
          </button>

          {/* Kritik & Saran Button (Right side of Keranjang as requested) */}
          <Link
            href="/feedback"
            className="flex items-center gap-1.5 sm:gap-2 bg-[#FFFDF9] hover:bg-[#E8F0E5] text-[#1C3F29] border border-[#E5DEC9] hover:border-[#2D5A27] px-3.5 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-2xs hover:shadow-sm transition-all active:scale-95 group"
            title="Beri Kritik & Saran (Grill Us!)"
          >
            <span className="text-base group-hover:scale-110 transition-transform">🌶️</span>
            <span className="text-[#1C3F29] font-bold">Kritik & Saran</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
