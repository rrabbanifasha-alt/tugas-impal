'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'Semua', label: 'Semua Produk' },
    { id: 'Paket Sayur', label: '📦 Paket Sayur (Riverford Style)' },
    { id: 'Sayur Satuan', label: '🥬 Sayur Satuan' },
    { id: 'Buah & Bumbu', label: '🍎 Buah & Bumbu' },
  ];

  const isPaket = (p: Product) => p.category.toLowerCase().includes('paket');
  const isSayurSatuan = (p: Product) => p.category.toLowerCase().includes('satuan');
  const isBuahOrBumbu = (p: Product) =>
    p.category.toLowerCase().includes('buah') || p.category.toLowerCase().includes('bumbu');

  // Filter products based on selected category & search query
  const filteredProducts = products.filter((product) => {
    let matchesCategory = true;

    if (activeCategory === 'Paket Sayur') {
      matchesCategory = isPaket(product);
    } else if (activeCategory === 'Sayur Satuan') {
      matchesCategory = isSayurSatuan(product);
    } else if (activeCategory === 'Buah & Bumbu') {
      matchesCategory = isBuahOrBumbu(product);
    }

    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Boolean(product.farmerOrigin && product.farmerOrigin.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const paketList = filteredProducts.filter((p) => isPaket(p));
  const sayurList = filteredProducts.filter((p) => isSayurSatuan(p));
  const buahBumbuList = filteredProducts.filter((p) => isBuahOrBumbu(p));

  return (
    <section id="catalog-section" className="py-12 sm:py-16 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header (Serif Style Good Eggs) */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#2D5A27] tracking-widest uppercase bg-[#E8F0E5] px-3.5 py-1 rounded-full border border-[#D7E6D3]">
            Katalog Panen Hari Ini • {products.length} Pilihan Segar
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C3F29] tracking-tight">
            Pilihan Sayur Segar & Paket Hemat
          </h2>
          <p className="text-sm sm:text-base text-[#5E6D5B]">
            Setiap produk dilengkapi transparansi asal petani lokal dan dikemas dalam wadah besek ramah lingkungan 100% bebas plastik.
          </p>
        </div>

        {/* Filters & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#FFFDF9] p-3 rounded-3xl border border-[#E5DEC9] shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  suppressHydrationWarning
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                    isActive
                      ? 'bg-[#2D5A27] text-[#FAF7F2] shadow-sm'
                      : 'bg-transparent text-[#5E6D5B] hover:bg-[#E8F0E5] hover:text-[#1C3F29]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <svg
              className="w-4 h-4 text-[#5E6D5B] absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari sayur, buah, atau petani..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E5DEC9] rounded-full focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29] placeholder-[#8A9987]"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-[#FFFDF9] rounded-3xl border border-[#E5DEC9] p-8 space-y-3">
            <div className="text-4xl">🥦</div>
            <h3 className="font-serif text-xl font-bold text-[#1C3F29]">Produk Tidak Ditemukan</h3>
            <p className="text-sm text-[#5E6D5B]">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-2 bg-[#2D5A27] hover:bg-[#1C3F29] text-[#FAF7F2] px-5 py-2 rounded-full text-xs font-bold cursor-pointer transition-colors active:scale-95"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* VIEW 1: TAB PAKET SAYUR AKTIF */}
        {activeCategory === 'Paket Sayur' && filteredProducts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#1C3F29] flex items-center gap-2">
                <span>📦</span> Paket Sayur Praktis ({filteredProducts.length} Pilihan Veg Boxes)
              </h3>
              <span className="text-xs text-[#5E6D5B] font-medium hidden sm:inline">
                Spesial racikan porsi masakan keluarga • Wadah Besek Tradisional
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: TAB SAYUR SATUAN AKTIF */}
        {activeCategory === 'Sayur Satuan' && filteredProducts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#1C3F29] flex items-center gap-2">
                <span>🥬</span> Sayuran Segar Satuan ({filteredProducts.length} Pilihan)
              </h3>
              <span className="text-xs text-[#5E6D5B] font-medium">
                Pilihan a la carte segar panen subuh
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: TAB BUAH & BUMBU AKTIF */}
        {activeCategory === 'Buah & Bumbu' && filteredProducts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-[#1C3F29] flex items-center gap-2">
                <span>🍎</span> Buah Segar & Bumbu Dapur ({filteredProducts.length} Pilihan)
              </h3>
              <span className="text-xs text-[#5E6D5B] font-medium">
                Pelengkap dapur sehat dan buah manis segar
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: TAB SEMUA PRODUK AKTIF */}
        {activeCategory === 'Semua' && (
          <div className="space-y-12">
            {/* SECTION 1: PAKET SAYUR (RIVERFORD FEATURED GRID) */}
            {paketList.length > 0 && (
              <div id="paket-section" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-[#1C3F29] flex items-center gap-2">
                    <span>📦</span> Paket Sayur Lengkap ({paketList.length} Pilihan Veg Boxes)
                  </h3>
                  <span className="text-xs text-[#5E6D5B] font-medium hidden sm:inline">
                    Spesial racikan porsi masakan keluarga
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paketList.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 2: SAYUR SATUAN */}
            {sayurList.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between border-t border-[#E5DEC9] pt-6">
                  <h3 className="font-serif text-2xl font-bold text-[#1C3F29] flex items-center gap-2">
                    <span>🥬</span> Sayuran Hijau & Satuan Segar ({sayurList.length} Pilihan)
                  </h3>
                  <span className="text-xs text-[#5E6D5B] font-medium">
                    Pilihan a la carte segar panen subuh
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {sayurList.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 3: BUAH & BUMBU DAPUR */}
            {buahBumbuList.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between border-t border-[#E5DEC9] pt-6">
                  <h3 className="font-serif text-2xl font-bold text-[#1C3F29] flex items-center gap-2">
                    <span>🍎</span> Buah Segar & Bumbu Dapur ({buahBumbuList.length} Pilihan)
                  </h3>
                  <span className="text-xs text-[#5E6D5B] font-medium">
                    Pelengkap dapur sehat dan buah manis segar
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {buahBumbuList.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
