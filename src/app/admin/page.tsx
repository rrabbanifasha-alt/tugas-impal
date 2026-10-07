'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';

interface Stats {
  ordersToday: number;
  revenueToday: number;
  totalProducts: number;
  lowStockProducts: number;
  totalOrdersAllTime: number;
  revenueAllTime: number;
}

interface RecentOrder {
  id: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  user: {
    name: string;
    whatsapp: string;
    address: string;
  };
  items: Array<{
    id: string;
    quantity: number;
    unitPrice: number;
    product: {
      name: string;
    };
  }>;
}

export default function AdminOverviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRecentOrders(data.recentOrders || []);
      }
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'DIPROSES':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'DIKIRIM':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'SELESAI':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <>
      <AdminHeader
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        title="Ringkasan Operasional"
        subtitle="Pantau pesanan, pendapatan, dan stok sayur hari ini"
      />

      <main className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8 py-8 space-y-8 max-w-7xl w-full mx-auto">
        
        {/* 1. THREE MINIMALIST SUMMARY METRIC CARDS (Shopify/Stripe Pattern) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          {/* Card 1: Total Pesanan Hari Ini */}
          <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#E5DEC9] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5E6D5B] uppercase tracking-wider">
                Total Pesanan Hari Ini
              </span>
              <span className="p-2.5 rounded-2xl bg-[#E8F0E5] text-[#2D5A27]">
                📦
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1C3F29]">
                {loading ? '...' : stats?.ordersToday ?? 0}
              </span>
              <span className="text-xs font-medium text-[#2D5A27]">pesanan masuk</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E5DEC9]/50 flex items-center justify-between text-xs text-[#5E6D5B]">
              <span>Total Semua Pesanan:</span>
              <span className="font-bold text-[#1C3F29]">{stats?.totalOrdersAllTime ?? 0}</span>
            </div>
          </div>

          {/* Card 2: Pendapatan Hari Ini */}
          <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#E5DEC9] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5E6D5B] uppercase tracking-wider">
                Pendapatan Hari Ini
              </span>
              <span className="p-2.5 rounded-2xl bg-[#E8F0E5] text-[#2D5A27]">
                💰
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1C3F29]">
                {loading
                  ? '...'
                  : `Rp ${(stats?.revenueToday ?? 0).toLocaleString('id-ID')}`}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E5DEC9]/50 flex items-center justify-between text-xs text-[#5E6D5B]">
              <span>Akumulasi Pendapatan:</span>
              <span className="font-bold text-[#1C3F29]">
                Rp {(stats?.revenueAllTime ?? 0).toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Card 3: Total Produk Aktif */}
          <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#E5DEC9] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5E6D5B] uppercase tracking-wider">
                Total Produk Aktif
              </span>
              <span className="p-2.5 rounded-2xl bg-[#E8F0E5] text-[#2D5A27]">
                🥦
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1C3F29]">
                {loading ? '...' : stats?.totalProducts ?? 0}
              </span>
              <span className="text-xs font-medium text-[#2D5A27]">item terdaftar</span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#E5DEC9]/50 flex items-center justify-between text-xs">
              <span className="text-[#5E6D5B]">Stok Menipis (≤10):</span>
              <span className={`font-bold ${stats?.lowStockProducts ? 'text-[#D96B43]' : 'text-[#2D5A27]'}`}>
                {stats?.lowStockProducts ?? 0} produk
              </span>
            </div>
          </div>

        </div>

        {/* 2. QUICK ACTIONS & RECENT ORDERS TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Orders (2 Columns) */}
          <div className="lg:col-span-2 bg-[#FFFDF9] p-6 rounded-3xl border border-[#E5DEC9] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5DEC9]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1C3F29]">Pesanan Masuk Terbaru</h3>
                <p className="text-xs text-[#5E6D5B]">Daftar 5 transaksi terakhir dari pelanggan</p>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs font-bold text-[#2D5A27] hover:text-[#1C3F29] flex items-center gap-1 bg-[#E8F0E5] px-3 py-1.5 rounded-full"
              >
                <span>Lihat Semua</span>
                <span>→</span>
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-[#5E6D5B]">Memuat data pesanan...</div>
            ) : recentOrders.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#5E6D5B]">Belum ada pesanan masuk.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E5DEC9] text-[#8A9987] uppercase tracking-wider font-semibold">
                      <th className="pb-3">ID</th>
                      <th className="pb-3">Pelanggan</th>
                      <th className="pb-3">Total</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Rincian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DEC9]/60">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAF7F2] transition-colors">
                        <td className="py-3 font-mono font-bold text-[#1C3F29]">
                          #{order.id.slice(-6).toUpperCase()}
                        </td>
                        <td className="py-3">
                          <p className="font-bold text-[#1C3F29]">{order.user.name}</p>
                          <p className="text-[11px] text-[#5E6D5B]">{order.user.whatsapp}</p>
                        </td>
                        <td className="py-3 font-bold text-[#1C3F29]">
                          Rp {order.totalAmount.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <Link
                            href="/admin/orders"
                            className="text-[#2D5A27] hover:underline font-semibold text-xs"
                          >
                            Kelola
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Shortcuts & Operational Summary (1 Column) */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-[#1C3F29] text-[#FAF7F2] p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold">Aksi Cepat Admin</h3>
              <p className="text-xs text-[#A8BBA5]">
                Kelola pasokan sayur atau pantau status kirim kurir di area Kota Bandung & Cimahi.
              </p>
              <div className="space-y-2 pt-2">
                <Link
                  href="/admin/products"
                  className="w-full bg-[#2D5A27] hover:bg-[#3D7A35] text-white text-xs font-bold py-2.5 px-4 rounded-full flex items-center justify-between transition-colors"
                >
                  <span>+ Tambah / Edit Produk</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/admin/orders"
                  className="w-full bg-[#FAF7F2] hover:bg-white text-[#1C3F29] text-xs font-bold py-2.5 px-4 rounded-full flex items-center justify-between transition-colors"
                >
                  <span>📦 Update Status Pesanan</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Farm Supply Status Widget */}
            <div className="bg-[#FFFDF9] p-5 rounded-3xl border border-[#E5DEC9] space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🚜</span>
                <h4 className="font-serif text-sm font-bold text-[#1C3F29]">Mitra Petani Bandung & Lembang</h4>
              </div>
              <p className="text-xs text-[#5E6D5B] leading-relaxed">
                Panen subuh dari Lembang, Parongpong, dan Ciwidey telah diterima di Hub Bandung.
              </p>
              <div className="text-[11px] font-bold text-[#2D5A27] bg-[#E8F0E5] px-3 py-1.5 rounded-xl">
                ✓ Besek Bambu Siap Digunakan
              </div>
            </div>
          </div>

        </div>

      </main>
    </>
  );
}
