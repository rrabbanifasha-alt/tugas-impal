import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Sayur Ikat | Sayur Premium 100% Bebas Plastik',
  description:
    'Pesan sayur segar langsung dari petani lokal Tangerang. Dikemas higienis dengan besek bambu dan daun pisang. Bebas sampah plastik!',
  keywords: [
    'sayur organik',
    'sayur bebas plastik',
    'sayur ikat',
    'sayur segar tangerang',
    'gading serpong sayur',
    'e-grocery organik',
  ],
  authors: [{ name: 'Sayur Ikat Indonesia' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Sayur Ikat | Sayur Premium 100% Bebas Plastik',
    description:
      'Pesan sayur segar langsung dari petani lokal Tangerang. Dikemas higienis dengan besek bambu dan daun pisang. Bebas sampah plastik!',
    url: '/',
    siteName: 'Sayur Ikat',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        alt: 'Sayur Ikat - Sayur Premium 100% Bebas Plastik',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sayur Ikat | Sayur Premium 100% Bebas Plastik',
    description:
      'Pesan sayur segar langsung dari petani lokal Tangerang. Dikemas higienis dengan besek bambu dan daun pisang. Bebas sampah plastik!',
    images: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&h=630&q=85',
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#1C3F29]">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
