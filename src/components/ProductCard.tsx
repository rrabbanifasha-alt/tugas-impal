'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = '/images/paket-hijau-tumis.jpg';

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.imageUrl || FALLBACK_IMAGE);

  React.useEffect(() => {
    setImgSrc(product.imageUrl || FALLBACK_IMAGE);
  }, [product.imageUrl]);

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const isPaket = product.category === 'Paket Sayur' || product.category === 'Paket';

  // Badge Color Styles (Misfits Style)
  const getBadgeStyle = (color?: string) => {
    switch (color) {
      case 'terracotta':
        return 'bg-[#D96B43] text-white';
      case 'yellow':
        return 'bg-[#E5A73C] text-[#1C3F29]';
      case 'sage':
        return 'bg-[#5E8C56] text-white';
      case 'green':
      default:
        return 'bg-[#2D5A27] text-white';
    }
  };

  if (isPaket) {
    // RIVERFORD ADAPTATION: Prominent, Featured Layout for Paket Sayur Cards
    return (
      <div className="group relative bg-[#FFFDF9] rounded-3xl border-2 border-[#2D5A27]/20 hover:border-[#2D5A27] transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between">
        {/* Top Highlight Tag */}
        <div className="bg-[#E8F0E5] text-[#2D5A27] text-xs font-bold px-4 py-1.5 flex items-center justify-between border-b border-[#D7E6D3]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2D5A27]"></span>
            PAKET BESEK SPESIAL RIVERFORD
          </span>
          <span>{product.portionInfo || '4 Porsi'}</span>
        </div>

        <div>
          {/* Image Container with Misfits Sticker Badge */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#FAF7F2]">
            <img
              src={imgSrc}
              alt={product.name}
              onError={() => setImgSrc(FALLBACK_IMAGE)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.badgeLabel && (
              <div
                className={`absolute top-3 left-3 text-xs font-extrabold px-3 py-1 rounded-full shadow-md transform -rotate-3 ${getBadgeStyle(
                  product.badgeColor
                )}`}
              >
                {product.badgeLabel}
              </div>
            )}
            <div className="absolute bottom-3 right-3 bg-[#FAF7F2]/90 backdrop-blur-sm text-[#1C3F29] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#E5DEC9]">
              Stok: {product.stock} paket
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-6 space-y-3">
            {/* Kecipir Origin Badge */}
            {product.farmerOrigin && (
              <div className="text-xs font-medium text-[#2D5A27] bg-[#E8F0E5]/70 w-fit px-2.5 py-1 rounded-md flex items-center gap-1">
                <span>{product.farmerOrigin}</span>
              </div>
            )}

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C3F29] group-hover:text-[#2D5A27] transition-colors leading-tight">
              {product.name}
            </h3>

            <p className="text-xs sm:text-sm text-[#5E6D5B] line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Riverford Package Contents Breakdown */}
            {product.packageItems && product.packageItems.length > 0 && (
              <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E5DEC9] space-y-1">
                <p className="text-[11px] font-bold text-[#1C3F29] uppercase tracking-wider">
                  📦 Isi Dalam Besek Bambu:
                </p>
                <ul className="text-xs text-[#4A5747] grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-0.5">
                  {product.packageItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1">
                      <span className="text-[#2D5A27]">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer: Price & Misfits Pill Button */}
        <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-[#E5DEC9]/50 mt-4">
          <div>
            <span className="text-xs text-[#5E6D5B] block">Harga Paket:</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#1C3F29]">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer ${
              added
                ? 'bg-[#82C47C] text-[#1C3F29]'
                : 'bg-[#2D5A27] hover:bg-[#1C3F29] text-[#FAF7F2] hover:shadow-md'
            }`}
          >
            {added ? (
              <>
                <span>✓ Ditambahkan</span>
              </>
            ) : (
              <>
                <span>+ Keranjang</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // STANDARD CARD FOR SAYUR SATUAN / BUAH
  return (
    <div className="group bg-[#FFFDF9] rounded-2xl border border-[#E5DEC9] hover:border-[#2D5A27] transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden flex flex-col justify-between">
      <div>
        {/* Image Container with Misfits Sticker Badge */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#FAF7F2]">
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badgeLabel && (
            <div
              className={`absolute top-2.5 left-2.5 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm transform -rotate-2 ${getBadgeStyle(
                product.badgeColor
              )}`}
            >
              {product.badgeLabel}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4 space-y-2">
          {/* Kecipir Origin Badge */}
          {product.farmerOrigin && (
            <div className="text-[11px] font-medium text-[#2D5A27] truncate">
              {product.farmerOrigin}
            </div>
          )}

          <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C3F29] group-hover:text-[#2D5A27] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#5E6D5B] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 pt-0 flex items-center justify-between mt-2">
        <span className="font-serif text-lg font-bold text-[#1C3F29]">
          Rp {product.price.toLocaleString('id-ID')}
        </span>

        <button
          onClick={handleAdd}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer ${
            added
              ? 'bg-[#82C47C] text-[#1C3F29]'
              : 'bg-[#2D5A27] hover:bg-[#1C3F29] text-[#FAF7F2]'
          }`}
        >
          {added ? '✓ Terpakai' : '+ Keranjang'}
        </button>
      </div>
    </div>
  );
}
