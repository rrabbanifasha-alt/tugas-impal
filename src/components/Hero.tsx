'use client';

import React from 'react';

export default function Hero() {
  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#FAF7F2] pt-8 pb-16 md:py-20 overflow-hidden border-b border-[#E5DEC9]">
      {/* Decorative Warm Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E8F0E5]/60 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#F5EAD9]/60 blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Editorial Branding (Good Eggs Aesthetic) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#E8F0E5] text-[#2D5A27] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border border-[#D7E6D3]">
              <span className="w-2 h-2 rounded-full bg-[#2D5A27]"></span>
              Panen Subuh • Langsung Ditolong Petani Tangerang
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1C3F29] leading-[1.15] tracking-tight">
              Sayur Premium <br className="hidden sm:inline" />
              <span className="text-[#2D5A27] underline decoration-[#D96B43]/40 decoration-wavy decoration-2">
                100% Bebas Plastik
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#4A5747] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Dikemas higienis menggunakan besek bambu tradisional dan alas daun pisang alami. Sayur dipetik langsung dari kebun lokal Tangerang setiap jam 05.00 WIB.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="w-full sm:w-auto bg-[#2D5A27] hover:bg-[#1C3F29] text-[#FAF7F2] font-semibold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Pilih Paket Sayur</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <a
                href="#paket-section"
                className="w-full sm:w-auto bg-[#FFFDF9] hover:bg-[#E8F0E5] text-[#1C3F29] font-medium px-6 py-3.5 rounded-full border border-[#D7E6D3] transition-all text-center"
              >
                Lihat Sayur Satuan
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E5DEC9] max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-xl font-bold font-serif text-[#1C3F29]">0%</div>
                <div className="text-xs text-[#5E6D5B]">Plastik Sekali Pakai</div>
              </div>
              <div>
                <div className="text-xl font-bold font-serif text-[#1C3F29]">100%</div>
                <div className="text-xs text-[#5E6D5B]">Organik & Segar</div>
              </div>
              <div>
                <div className="text-xl font-bold font-serif text-[#1C3F29]">Sameday</div>
                <div className="text-xs text-[#5E6D5B]">Tangerang & Gading Serpong</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFDF9] transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80"
                alt="Sayur Ikat Paket Segar Organik"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3F29]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="bg-[#D96B43] text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2 shadow-sm">
                  🌱 Pilihan Utama Ibu-Ibu Serpong
                </span>
                <h3 className="font-serif text-2xl font-bold">Paket Hijau Tumis Organik</h3>
                <p className="text-xs text-white/90 font-light mt-1">
                  Besek Bambu + Kangkung, Bayam, Cabai Rawit & Bumbu Lengkap (Rp 18.500)
                </p>
              </div>
            </div>

            {/* Sticker Badge Over Hero (Misfits Style) */}
            <div className="absolute -bottom-5 -left-5 bg-[#FFFDF9] p-4 rounded-2xl shadow-xl border border-[#E5DEC9] flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-[#E8F0E5] text-[#2D5A27] flex items-center justify-center font-bold text-lg">
                🚜
              </div>
              <div>
                <p className="text-xs font-bold text-[#1C3F29]">Dari Kebun Cisauk</p>
                <p className="text-[11px] text-[#5E6D5B]">Dipetik 3 Jam Yang Lalu</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
