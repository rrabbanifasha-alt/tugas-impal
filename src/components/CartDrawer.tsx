'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { OrderFormData, PaymentMethod } from '@/types';
import { generateWhatsAppLink, getPaymentMethodLabel } from '@/lib/whatsapp';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
  } = useCart();

  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    whatsapp: '',
    address: '',
    notes: '',
    paymentMethod: 'COD',
    saveDataForLater: true,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState<{ id: string; total: number; paymentMethod: string } | null>(null);

  // Load saved customer data on mount if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sayurikat_customer_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          name: parsed.name || '',
          whatsapp: parsed.whatsapp || '',
          address: parsed.address || '',
          saveDataForLater: true,
        }));
      }
    } catch (e) {
      console.error('Failed to load saved customer data', e);
    }
  }, []);

  if (!isCartOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Nama lengkap wajib diisi';
    if (!formData.whatsapp.trim()) errors.whatsapp = 'Nomor WhatsApp wajib diisi';
    if (!formData.address.trim()) errors.address = 'Alamat pengiriman wajib diisi';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async (openWhatsApp: boolean = true) => {
    if (cart.length === 0) return;
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 1. Simpan data belanja pelanggan jika opsi dicentang
      if (formData.saveDataForLater) {
        try {
          localStorage.setItem(
            'sayurikat_customer_data',
            JSON.stringify({
              name: formData.name,
              whatsapp: formData.whatsapp,
              address: formData.address,
            })
          );
        } catch (err) {
          console.error('Failed to save to localStorage', err);
        }
      } else {
        try {
          localStorage.removeItem('sayurikat_customer_data');
        } catch (err) {
          console.error('Failed to remove from localStorage', err);
        }
      }

      // 2. Simpan pesanan ke Database via API /api/orders
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            whatsapp: formData.whatsapp,
            address: formData.address,
            notes: formData.notes,
          },
          items: cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            unitPrice: item.product.price,
          })),
          subtotal,
          deliveryFee,
          totalAmount: subtotal + deliveryFee,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Gagal menyimpan pesanan ke sistem');
      }

      const orderId = data.orderId || data.order?.id;
      setSuccessOrder({
        id: orderId,
        total: subtotal + deliveryFee,
        paymentMethod: formData.paymentMethod,
      });

      // 3. Jika dipilih buka WhatsApp
      if (openWhatsApp) {
        const waLink = generateWhatsAppLink(cart, formData, subtotal, deliveryFee, orderId);
        window.open(waLink, '_blank');
      }

      // 4. Reset keranjang belanja
      clearCart();
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert('Terjadi kesalahan: ' + (error.message || 'Gagal memproses pesanan'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm transition-opacity animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)}></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-[#E5DEC9]">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#1C3F29] text-[#FAF7F2] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#82C47C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="font-serif text-xl font-bold tracking-tight">Keranjang Pesanan</h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="text-[#FAF7F2]/80 hover:text-white bg-[#2D5A27] p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 divide-y divide-[#E5DEC9]">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="text-5xl">🛒</div>
                <h3 className="font-serif text-lg font-bold text-[#1C3F29]">Keranjang Anda Masih Kosong</h3>
                <p className="text-xs text-[#5E6D5B]">Pilih paket sayur atau sayur satuan favorit Anda dari katalog.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#2D5A27] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-[#1C3F29]"
                >
                  Mulai Belanja Sayur
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#5E6D5B]">Daftar Sayur Dipilih</h3>
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 bg-[#FFFDF9] p-3 rounded-2xl border border-[#E5DEC9]">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#E5DEC9]"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-[#1C3F29] truncate">{item.product.name}</h4>
                        <p className="text-xs text-[#5E6D5B]">Rp {item.product.price.toLocaleString('id-ID')} / unit</p>
                        <p className="text-xs font-bold text-[#2D5A27] mt-0.5">
                          Total: Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E5DEC9] rounded-full p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-[#E8F0E5] text-[#2D5A27] font-bold text-xs flex items-center justify-center hover:bg-[#D7E6D3]"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-[#1C3F29]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-[#2D5A27] text-white font-bold text-xs flex items-center justify-center hover:bg-[#1C3F29]"
                        >
                          +
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#D96B43] hover:text-red-700 p-1 cursor-pointer"
                        title="Hapus"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form Informasi Pengiriman Pelanggan */}
                <div className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#5E6D5B] flex items-center gap-1.5">
                      <span>📍</span> Data Alamat Pengiriman
                    </h3>
                    <span className="text-[10px] bg-[#FAF7F2] text-[#2D5A27] px-2 py-0.5 rounded-full border border-[#D7E6D3]">
                      Bandung Raya
                    </span>
                  </div>

                  <div className="space-y-3 bg-[#FFFDF9] p-4 rounded-2xl border border-[#E5DEC9]">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C3F29] mb-1">Nama Lengkap *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Contoh: Budi Santoso"
                        className={`w-full px-3 py-2 text-xs bg-[#FAF7F2] border ${
                          formErrors.name ? 'border-red-500' : 'border-[#E5DEC9]'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]`}
                      />
                      {formErrors.name && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C3F29] mb-1">Nomor WhatsApp *</label>
                      <input
                        type="text"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="Contoh: 081234567890"
                        className={`w-full px-3 py-2 text-xs bg-[#FAF7F2] border ${
                          formErrors.whatsapp ? 'border-red-500' : 'border-[#E5DEC9]'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]`}
                      />
                      {formErrors.whatsapp && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.whatsapp}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C3F29] mb-1">Alamat Lengkap Pengiriman *</label>
                      <textarea
                        name="address"
                        rows={2}
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Nama Jalan/Perumahan/Nomor Rumah, Kelurahan, Kecamatan, Kota Bandung/Cimahi"
                        className={`w-full px-3 py-2 text-xs bg-[#FAF7F2] border ${
                          formErrors.address ? 'border-red-500' : 'border-[#E5DEC9]'
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]`}
                      />
                      {formErrors.address && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C3F29] mb-1">Catatan Tambahan (Opsional)</label>
                      <input
                        type="text"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Pesan khusus untuk kurir / packing..."
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
                      />
                    </div>

                    {/* Checkbox Simpan Data Belanja */}
                    <div className="pt-2 border-t border-[#E5DEC9]/60">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="saveDataForLater"
                          checked={Boolean(formData.saveDataForLater)}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, saveDataForLater: e.target.checked }))
                          }
                          className="w-4 h-4 rounded text-[#2D5A27] focus:ring-[#2D5A27] accent-[#2D5A27] cursor-pointer"
                        />
                        <span className="text-xs font-medium text-[#1C3F29]">
                          Simpan data belanja (Nama, No WA & Alamat) untuk pesanan berikutnya
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* METODE PEMBAYARAN (ALA MARKETPLACE) */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#5E6D5B] flex items-center gap-1.5">
                      <span>💳</span> Opsi Pembayaran (Pilih Metode)
                    </h3>
                    <span className="text-[10px] bg-[#E8F0E5] text-[#2D5A27] px-2 py-0.5 rounded-full font-bold">
                      Aman & Cepat
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* COD */}
                    <label
                      onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'COD' }))}
                      className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'COD'
                          ? 'bg-[#F2F7F0] border-[#2D5A27] ring-1 ring-[#2D5A27] shadow-xs'
                          : 'bg-[#FFFDF9] border-[#E5DEC9] hover:border-[#2D5A27]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={formData.paymentMethod === 'COD'}
                        onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'COD' }))}
                        className="mt-1 text-[#2D5A27] focus:ring-[#2D5A27] accent-[#2D5A27]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1C3F29] flex items-center gap-1.5">
                            <span>💵</span> COD (Bayar di Tempat)
                          </span>
                          <span className="text-[10px] font-bold bg-[#E8F0E5] text-[#2D5A27] px-2 py-0.5 rounded-full border border-[#D7E6D3]">
                            Paling Diminati
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5E6D5B] mt-0.5">
                          Bayar tunai atau transfer langsung ke kurir saat sayur segar sampai di depan pintu.
                        </p>
                      </div>
                    </label>

                    {/* QRIS / E-Wallet */}
                    <label
                      onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'QRIS' }))}
                      className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'QRIS'
                          ? 'bg-[#F2F7F0] border-[#2D5A27] ring-1 ring-[#2D5A27] shadow-xs'
                          : 'bg-[#FFFDF9] border-[#E5DEC9] hover:border-[#2D5A27]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="QRIS"
                        checked={formData.paymentMethod === 'QRIS'}
                        onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'QRIS' }))}
                        className="mt-1 text-[#2D5A27] focus:ring-[#2D5A27] accent-[#2D5A27]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1C3F29] flex items-center gap-1.5">
                            <span>📱</span> QRIS / E-Wallet Instan
                          </span>
                          <span className="text-[10px] font-semibold text-[#5E6D5B]">
                            GoPay • OVO • DANA • ShopeePay
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5E6D5B] mt-0.5">
                          Scan barcode QRIS resmi Sayur Ikat atau bayar instan dari semua e-wallet & mobile banking.
                        </p>
                      </div>
                    </label>

                    {/* Transfer BCA */}
                    <label
                      onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'TRANSFER_BCA' }))}
                      className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'TRANSFER_BCA'
                          ? 'bg-[#F2F7F0] border-[#2D5A27] ring-1 ring-[#2D5A27] shadow-xs'
                          : 'bg-[#FFFDF9] border-[#E5DEC9] hover:border-[#2D5A27]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="TRANSFER_BCA"
                        checked={formData.paymentMethod === 'TRANSFER_BCA'}
                        onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'TRANSFER_BCA' }))}
                        className="mt-1 text-[#2D5A27] focus:ring-[#2D5A27] accent-[#2D5A27]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1C3F29] flex items-center gap-1.5">
                            <span>🏦</span> Transfer Bank BCA
                          </span>
                          <span className="text-[10px] font-bold text-[#00529C] bg-[#EBF3FB] px-2 py-0.5 rounded-full">
                            BCA
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5E6D5B] mt-0.5">
                          Transfer via m-BCA / KlikBCA / ATM dengan verifikasi otomatis.
                        </p>
                      </div>
                    </label>

                    {/* Transfer Mandiri */}
                    <label
                      onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'TRANSFER_MANDIRI' }))}
                      className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        formData.paymentMethod === 'TRANSFER_MANDIRI'
                          ? 'bg-[#F2F7F0] border-[#2D5A27] ring-1 ring-[#2D5A27] shadow-xs'
                          : 'bg-[#FFFDF9] border-[#E5DEC9] hover:border-[#2D5A27]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="TRANSFER_MANDIRI"
                        checked={formData.paymentMethod === 'TRANSFER_MANDIRI'}
                        onChange={() => setFormData((p) => ({ ...p, paymentMethod: 'TRANSFER_MANDIRI' }))}
                        className="mt-1 text-[#2D5A27] focus:ring-[#2D5A27] accent-[#2D5A27]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1C3F29] flex items-center gap-1.5">
                            <span>🏛️</span> Transfer Bank Mandiri
                          </span>
                          <span className="text-[10px] font-bold text-[#A86E00] bg-[#FFF8E7] px-2 py-0.5 rounded-full">
                            Livin'
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5E6D5B] mt-0.5">
                          Transfer via Livin' by Mandiri / ATM.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* ORDER SUCCESS NOTIFICATION MODAL INSIDE DRAWER */}
            {successOrder && (
              <div className="bg-[#FFFDF9] border-2 border-[#2D5A27] rounded-3xl p-6 text-center space-y-4 shadow-lg animate-fadeIn">
                <div className="w-16 h-16 bg-[#E8F0E5] text-[#2D5A27] rounded-full flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D5A27] bg-[#E8F0E5] px-3 py-1 rounded-full">
                    Pesanan Tersimpan di Sistem
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1C3F29] mt-2">
                    Terima Kasih, Pesanan #{successOrder.id.slice(-6).toUpperCase()} Diterima!
                  </h3>
                  <p className="text-xs text-[#5E6D5B] mt-1">
                    Pesanan Anda telah otomatis dicatat ke dalam antrean portal admin Sayur Ikat.
                  </p>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E5DEC9] text-xs space-y-1 text-left">
                  <div className="flex justify-between">
                    <span className="text-[#5E6D5B]">Metode Bayar:</span>
                    <span className="font-bold text-[#1C3F29]">{getPaymentMethodLabel(successOrder.paymentMethod)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5E6D5B]">Total Tagihan:</span>
                    <span className="font-bold text-[#2D5A27]">Rp {successOrder.total.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessOrder(null);
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-[#2D5A27] hover:bg-[#1C3F29] text-white font-bold py-3 px-4 rounded-full text-xs transition-all cursor-pointer"
                  >
                    Selesai & Tutup Keranjang
                  </button>
                  <a
                    href="/admin/orders"
                    className="block w-full bg-[#FAF7F2] hover:bg-[#E8F0E5] text-[#2D5A27] border border-[#E5DEC9] font-bold py-2.5 px-4 rounded-full text-xs transition-all text-center"
                  >
                    Lihat di Menu Order Portal Admin →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#FFFDF9] border-t border-[#E5DEC9] space-y-4">
              <div className="space-y-1.5 text-xs text-[#5E6D5B]">
                <div className="flex justify-between">
                  <span>Subtotal Sayur:</span>
                  <span className="font-bold text-[#1C3F29]">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Pengiriman (Bandung Raya):</span>
                  <span className="font-bold text-[#2D5A27]">
                    {deliveryFee === 0 ? '🎉 GRATIS' : `Rp ${deliveryFee.toLocaleString('id-ID')}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#E5DEC9] pt-2 text-sm">
                  <span className="font-bold text-[#1C3F29]">Total Bayar:</span>
                  <span className="font-serif text-lg font-extrabold text-[#1C3F29]">
                    Rp {grandTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {/* Tombol Utama: Simpan ke DB & Buka WhatsApp */}
                <button
                  type="button"
                  onClick={() => handleCheckout(true)}
                  disabled={isSubmitting}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 2c-5.514 0-9.998 4.485-9.998 10.001 0 1.763.46 3.485 1.332 5.006l-1.365 4.993 5.111-1.34c1.472.803 3.136 1.34 4.92 1.34 5.516 0 10.001-4.485 10.001-10.001 0-5.517-4.485-10.001-10.001-10.001zm5.541 14.195c-.23.649-1.344 1.258-1.859 1.312-.486.052-1.121.082-3.267-.803-2.744-1.132-4.502-3.921-4.638-4.103-.136-.182-1.109-1.474-1.109-2.81 0-1.335.705-1.99.957-2.253.252-.262.551-.328.734-.328.183 0 .367.002.527.009.172.007.404-.065.632.482.23.548.78 1.905.849 2.045.068.14.114.303.022.486-.091.183-.137.297-.274.457-.137.161-.289.36-.412.484-.137.137-.28.287-.121.56.16.273.711 1.17 1.528 1.897 1.05.934 1.936 1.224 2.21 1.36.274.137.435.114.595-.068.16-.183.687-.801.87-1.076.183-.274.367-.229.619-.137.252.091 1.597.753 1.872.89.274.137.457.206.526.32.069.115.069.664-.161 1.313z" />
                  </svg>
                  <span>
                    {isSubmitting ? 'Menyimpan & Menghubungkan WA...' : 'Pesan Sekarang (via WhatsApp)'}
                  </span>
                </button>

                {/* Tombol Sekunder: Simpan Pesanan ke Sistem Tanpa WA */}
                <button
                  type="button"
                  onClick={() => handleCheckout(false)}
                  disabled={isSubmitting}
                  className="w-full bg-[#FAF7F2] hover:bg-[#E8F0E5] text-[#2D5A27] border border-[#D7E6D3] font-bold py-2.5 px-4 rounded-full text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <span>💾 Simpan Pesanan Langsung ke Sistem</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
