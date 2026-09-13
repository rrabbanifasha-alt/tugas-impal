export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Paket' | 'Satuan' | 'Buah & Bumbu' | string;
  stock: number;
  imageUrl: string;
  farmerOrigin?: string; // Kecipir adaptation (transparansi asal petani)
  badgeLabel?: string;   // Misfits adaptation (stiker/badge)
  badgeColor?: 'green' | 'terracotta' | 'yellow' | 'sage';
  packageItems?: string[]; // Riverford adaptation (isi rincian paket sayur)
  portionInfo?: string;   // Riverford adaptation (porsi piring)
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'COD' | 'QRIS' | 'TRANSFER_BCA' | 'TRANSFER_MANDIRI';

export interface OrderFormData {
  name: string;
  whatsapp: string;
  address: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  saveDataForLater?: boolean;
}
