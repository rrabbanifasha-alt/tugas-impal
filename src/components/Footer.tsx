'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1C3F29] text-[#FAF7F2] pt-16 pb-12 border-t border-[#2D5A27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#2D5A27] text-[#FAF7F2] flex items-center justify-center font-bold">
                🌱
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Sayur Ikat</span>
            </div>
            <p className="text-xs text-[#A8BBA5] leading-relaxed">
              Layanan pesan antar sayur segar organik 100% bebas plastik di Kota Bandung dan Cimahi. Panen langsung dari petani lokal Lembang & Ciwidey.
            </p>
          </div>

          {/* Area Layanan */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Area Layanan Utama</h4>
            <ul className="text-xs text-[#A8BBA5] space-y-1.5">
              <li>📍 Dago & Coblong</li>
              <li>📍 Sukajadi & Pasteur</li>
              <li>📍 Lembang & Bandung Utara</li>
              <li>📍 Buah Batu & Bandung Selatan</li>
              <li>📍 Cimahi & Bandung Barat</li>
            </ul>
          </div>

          {/* Jaminan Kualitas */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Jaminan Sayur Ikat</h4>
            <ul className="text-xs text-[#A8BBA5] space-y-1.5">
              <li>🌿 100% Bebas Plastik Sekali Pakai</li>
              <li>🧺 Wadah Besek Bambu & Daun Pisang</li>
              <li>🚜 Transparansi Asal Petani Lokal</li>
              <li>⚡ Pengiriman Sameday (Sebelum 12.00)</li>
            </ul>
          </div>

          {/* Kontak Admin */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Hubungi Admin</h4>
            <p className="text-xs text-[#A8BBA5]">
              Ada pertanyaan seputar paket sayur atau pesanan khusus?
            </p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Sayur%20Ikat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
            >
              <span>Chat Admin WhatsApp</span>
            </a>
          </div>

        </div>

        <div className="border-t border-[#2D5A27] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#82C47C]">
          <p>© 2026 Sayur Ikat Indonesia. Inspirasi Riset Good Eggs, Misfits Market, Riverford, & Kecipir.</p>
          <p className="mt-2 sm:mt-0">Dibuat dengan ❤️ untuk Kebun & Keluarga Bandung.</p>
        </div>
      </div>
    </footer>
  );
}
