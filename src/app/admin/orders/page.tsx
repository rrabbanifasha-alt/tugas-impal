'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  product: {
    name: string;
    imageUrl: string;
    category: string;
  };
}

interface Order {
  id: string;
  orderDate: string;
  status: 'PENDING' | 'DIPROSES' | 'DIKIRIM' | 'SELESAI';
  totalAmount: number;
  deliveryFee?: number;
  paymentMethod?: string;
  notes?: string | null;
  user: {
    name: string;
    whatsapp: string;
    address: string;
  };
  items: OrderItem[];
}

export default function AdminOrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingId(orderId);
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();

      if (data.success) {
        // Update local state instantly
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }

        setToastMessage(`✓ Status pesanan #${orderId.slice(-6).toUpperCase()} berhasil diubah ke ${newStatus}`);
        setTimeout(() => setToastMessage(null), 3000);
      } else {
        alert('Gagal mengupdate status: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getPaymentMethodBadge = (method?: string) => {
    switch (method) {
      case 'QRIS':
        return {
          label: '📱 QRIS / E-Wallet',
          className: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        };
      case 'TRANSFER_BCA':
        return {
          label: '🏦 Transfer BCA',
          className: 'bg-blue-50 text-blue-800 border-blue-200',
        };
      case 'TRANSFER_MANDIRI':
        return {
          label: '🏛️ Transfer Mandiri',
          className: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case 'COD':
      default:
        return {
          label: '💵 COD (Bayar di Tempat)',
          className: 'bg-stone-100 text-stone-800 border-stone-300',
        };
    }
  };

  const getStatusColor = (status: string) => {
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

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.whatsapp.includes(searchQuery) ||
      order.user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Boolean(order.notes && order.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
      Boolean(order.paymentMethod && order.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <AdminHeader
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        title="Daftar Pesanan Masuk"
        subtitle="Kelola dan perbarui status pesanan pelanggan secara real-time"
      />

      <main className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8 py-8 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="bg-[#2D5A27] text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between text-xs font-bold animate-fadeIn">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Filter & Search Bar (Shopify Index Table Pattern) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFFDF9] p-4 rounded-3xl border border-[#E5DEC9] shadow-xs">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {['ALL', 'PENDING', 'DIPROSES', 'DIKIRIM', 'SELESAI'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-[#2D5A27] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#5E6D5B] hover:bg-[#E8F0E5] hover:text-[#1C3F29] border border-[#E5DEC9]'
                }`}
              >
                {status === 'ALL' ? 'Semua Status' : status}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
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
              placeholder="Cari ID, nama, alamat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#E5DEC9] rounded-full focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
            />
          </div>

        </div>

        {/* Orders Data Table (Stripe/Shopify Pattern) */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#E5DEC9] shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-xs text-[#5E6D5B]">Memuat daftar pesanan...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <div className="text-4xl">📦</div>
              <h3 className="font-serif text-lg font-bold text-[#1C3F29]">Tidak Ada Pesanan Ditemukan</h3>
              <p className="text-xs text-[#5E6D5B]">Belum ada pesanan dengan filter yang dipilih.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E5DEC9] text-[#8A9987] uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">ID Pesanan</th>
                    <th className="py-4 px-6">Nama & Kontak User</th>
                    <th className="py-4 px-6">Tanggal Pesanan</th>
                    <th className="py-4 px-6">Total Harga</th>
                    <th className="py-4 px-6">Status Pesanan (Selector)</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DEC9]/60">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-[#FAF7F2]/80 transition-colors group"
                    >
                      {/* ID */}
                      <td className="py-4 px-6 font-mono font-bold text-[#1C3F29]">
                        <span className="bg-[#FAF7F2] px-2 py-1 rounded-md border border-[#E5DEC9]">
                          #{order.id.slice(-6).toUpperCase()}
                        </span>
                      </td>

                      {/* User Info */}
                      <td className="py-4 px-6">
                        <p className="font-bold text-sm text-[#1C3F29]">{order.user.name}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <a
                            href={`https://wa.me/${order.user.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold text-xs"
                          >
                            <span>💬 WA: {order.user.whatsapp}</span>
                          </a>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              getPaymentMethodBadge(order.paymentMethod).className
                            }`}
                          >
                            {getPaymentMethodBadge(order.paymentMethod).label}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5E6D5B] truncate max-w-xs mt-1" title={order.user.address}>
                          📍 {order.user.address}
                        </p>
                        {order.notes && (
                          <div
                            className="mt-1.5 bg-[#FFF8E7] border border-[#F0D597] text-[#8A5800] px-2.5 py-1 rounded-lg text-[10px] font-medium flex items-center gap-1.5 max-w-xs truncate"
                            title={order.notes}
                          >
                            <span>📝</span>
                            <span className="font-bold">Catatan:</span>
                            <span className="truncate">{order.notes}</span>
                          </div>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-[#5E6D5B]">
                        {new Date(order.orderDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 font-bold text-[#1C3F29] text-sm">
                        Rp {order.totalAmount.toLocaleString('id-ID')}
                        <span className="block text-[10px] font-normal text-[#5E6D5B]">
                          ({order.items.length} jenis sayur)
                        </span>
                      </td>

                      {/* Status Selector (CRITICAL FEATURE) */}
                      <td className="py-4 px-6">
                        <div className="relative inline-block">
                          <select
                            value={order.status}
                            disabled={updatingId === order.id}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`appearance-none cursor-pointer pl-3 pr-8 py-1.5 rounded-full text-xs font-bold border transition-all focus:outline-none focus:ring-2 focus:ring-[#2D5A27] ${getStatusColor(
                              order.status
                            )}`}
                          >
                            <option value="PENDING">🟡 PENDING</option>
                            <option value="DIPROSES">🔵 DIPROSES</option>
                            <option value="DIKIRIM">🟣 DIKIRIM</option>
                            <option value="SELESAI">🟢 SELESAI</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#1C3F29]">
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-[#FAF7F2] hover:bg-[#E8F0E5] text-[#2D5A27] px-3.5 py-1.5 rounded-full font-bold border border-[#E5DEC9] transition-colors cursor-pointer"
                        >
                          Lihat Rincian
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ORDER DETAIL POPUP MODAL */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#FAF7F2] rounded-3xl border border-[#E5DEC9] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="bg-[#1C3F29] text-[#FAF7F2] p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold">
                    Rincian Pesanan #{selectedOrder.id.slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-xs text-[#A8BBA5]">
                    {new Date(selectedOrder.orderDate).toLocaleString('id-ID')}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-white/80 hover:text-white bg-[#2D5A27] p-1.5 rounded-full cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5">
                {/* Customer Card */}
                <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E5DEC9] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#5E6D5B] uppercase tracking-wider block">
                      Informasi Pelanggan
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        getPaymentMethodBadge(selectedOrder.paymentMethod).className
                      }`}
                    >
                      {getPaymentMethodBadge(selectedOrder.paymentMethod).label}
                    </span>
                  </div>
                  <p className="font-bold text-[#1C3F29] text-sm">{selectedOrder.user.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#5E6D5B]">📱 WhatsApp:</span>
                    <a
                      href={`https://wa.me/${selectedOrder.user.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#25D366] hover:underline"
                    >
                      {selectedOrder.user.whatsapp} (Hubungi via WA →)
                    </a>
                  </div>
                  <p className="text-xs text-[#5E6D5B]">📍 Alamat: {selectedOrder.user.address}</p>
                </div>

                {/* Catatan Pelanggan (jika ada) */}
                {selectedOrder.notes && (
                  <div className="bg-[#FFF8E7] p-4 rounded-2xl border border-[#F0D597] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#8A5800]">
                      <span>📝</span> Catatan Tambahan Pembeli:
                    </div>
                    <p className="text-xs text-[#684100] italic pl-5 bg-white/50 p-2 rounded-xl mt-1">
                      "{selectedOrder.notes}"
                    </p>
                  </div>
                )}

                {/* Items List */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-[#5E6D5B] uppercase tracking-wider block">
                    Daftar Sayur Yang Dipesan
                  </span>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-[#FFFDF9] p-3 rounded-2xl border border-[#E5DEC9]"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#E5DEC9]"
                          />
                          <div>
                            <h4 className="font-bold text-xs text-[#1C3F29]">{item.product.name}</h4>
                            <p className="text-[11px] text-[#5E6D5B]">
                              {item.quantity} unit x Rp {item.unitPrice.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-xs text-[#1C3F29]">
                          Rp {(item.quantity * item.unitPrice).toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Update from Modal */}
                <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E5DEC9] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1C3F29]">Status Pesanan Saat Ini:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    className={`pl-3 pr-6 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    <option value="PENDING">🟡 PENDING</option>
                    <option value="DIPROSES">🔵 DIPROSES</option>
                    <option value="DIKIRIM">🟣 DIKIRIM</option>
                    <option value="SELESAI">🟢 SELESAI</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-5 bg-[#FFFDF9] border-t border-[#E5DEC9] space-y-3">
                <div className="space-y-1 text-xs text-[#5E6D5B]">
                  <div className="flex justify-between">
                    <span>Biaya Ongkir:</span>
                    <span className="font-bold text-[#2D5A27]">
                      {selectedOrder.deliveryFee === 0
                        ? 'GRATIS'
                        : `Rp ${(selectedOrder.deliveryFee ?? 10000).toLocaleString('id-ID')}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#E5DEC9]/50 pt-1 text-sm font-bold text-[#1C3F29]">
                    <span>Total Transaksi:</span>
                    <span className="font-serif text-lg font-bold text-[#1C3F29]">
                      Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`https://wa.me/${selectedOrder.user.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `Halo ${selectedOrder.user.name}, ini dari Admin Sayur Ikat mengenai pesanan #${selectedOrder.id.slice(
                        -6
                      ).toUpperCase()}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2 px-4 rounded-full text-xs font-bold text-center flex items-center justify-center gap-1.5"
                  >
                    <span>💬 Chat WhatsApp Pelanggan</span>
                  </a>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="bg-[#FAF7F2] hover:bg-[#E8F0E5] text-[#1C3F29] border border-[#E5DEC9] px-4 py-2 rounded-full text-xs font-bold"
                  >
                    Tutup
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </>
  );
}
