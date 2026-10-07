import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductCatalog from '@/components/ProductCatalog';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { INITIAL_PRODUCTS } from '@/lib/products';
import { db } from '@/lib/db';
import { Product } from '@/types';

export const revalidate = 0; // Dynamic rendering

async function getProducts(): Promise<Product[]> {
  try {
    const dbProducts = await db.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (dbProducts && dbProducts.length > 0) {
      // Map DB products to rich UI Product format, incorporating initial items & attributes
      return dbProducts.map((p) => {
        const initialMatch = INITIAL_PRODUCTS.find(
          (init) => init.id === p.id || init.name.toLowerCase() === p.name.toLowerCase()
        );
        return {
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          stock: p.stock,
          imageUrl: p.imageUrl || initialMatch?.imageUrl || '/images/kangkung.jpg',
          farmerOrigin: initialMatch?.farmerOrigin || '👨‍🌾 Kelompok Tani Organik Bandung',
          badgeLabel: initialMatch?.badgeLabel || (p.category.includes('Paket') ? '100% Bebas Plastik' : 'Panen Subuh'),
          badgeColor: initialMatch?.badgeColor || 'green',
          packageItems: initialMatch?.packageItems || (p.category.includes('Paket') ? ['Sayur Utama', 'Bumbu Racik', 'Pelengkap'] : undefined),
          portionInfo: initialMatch?.portionInfo || (p.category.includes('Paket') ? '🍽️ 3-4 Porsi' : undefined),
          isFeatured: p.category.includes('Paket'),
        };
      });
    }
  } catch (error) {
    console.error('Failed to fetch from DB, using fallback dataset:', error);
  }

  return INITIAL_PRODUCTS;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Editorial Hero Section (Good Eggs Style) */}
      <Hero />

      {/* 3. Product Catalog Grid (Riverford, Misfits, Kecipir Features) */}
      <ProductCatalog products={products} />

      {/* 4. Slide-Over Cart Drawer & WhatsApp Checkout */}
      <CartDrawer />

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}
