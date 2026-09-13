'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FeedbackPage() {
  // Category ratings state
  const [freshness, setFreshness] = useState<string>('Sangat Segar');
  const [packaging, setPackaging] = useState<string>('Sangat Rapi');
  const [delivery, setDelivery] = useState<string>('Tepat Waktu');
  const [experience, setExperience] = useState<string>('Gampang banget');

  // Open text & details state
  const [criticism, setCriticism] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [orderNumber, setOrderNumber] = useState<string>('');
  
  // Photo upload state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran foto maksimal 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!criticism.trim()) {
      setErrorMessage('Mohon tuliskan kritik atau saranmu di kolom teks terbuka di bawah.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const payload = {
        freshnessRating: freshness,
        packagingRating: packaging,
        deliveryRating: delivery,
        experienceRating: experience,
        criticismNotes: criticism,
        photoUrl: photoPreview,
        customerName: customerName.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        orderNumber: orderNumber.trim() || undefined,
      };

      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Terjadi kesalahan saat mengirim feedback.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrorMessage('Gagal menghubungi server. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Direct WhatsApp report function
  const sendToWhatsApp = () => {
    const adminWA = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || '6281111090906';
    const message = `🌶️ *KRITIK & SARAN DARI PELANGGAN SAYUR IKAT*
----------------------------------------
🥬 *Kesegaran Sayur:* ${freshness}
📦 *Bungkusan Daun:* ${packaging}
🛵 *Waktu Pengiriman:* ${delivery}
📱 *Pengalaman Web & WA:* ${experience}

💬 *KRITIK PEDAS / SARAN:*
"${criticism}"

👤 *Nama Pelanggan:* ${customerName || 'Anonim'}
📱 *No. WhatsApp:* ${customerPhone || '-'}
📦 *Nomor/Tanggal Pesanan:* ${orderNumber || '-'}

Terima kasih atas masukannya untuk perbaikan Sayur Ikat! 🙏`;

    window.open(`https://wa.me/${adminWA}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar />

      <div className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Breadcrumb Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2D5A27] hover:text-[#1C3F29] bg-[#E8F0E5] px-4 py-2 rounded-full transition-colors"
          >
            <span>←</span>
            <span>Kembali ke Katalog Belanja</span>
          </Link>

          {/* 1. Header & Pesan Sambutan yang Personal */}
          <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#E5DEC9] shadow-xs space-y-4 text-center sm:text-left relative overflow-hidden">
            <div className="inline-flex items-center gap-2 bg-[#FDE8E1] text-[#D96B43] px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">
              <span>🌶️</span>
              <span>Grill Sayur Ikat • Suara Pelanggan Awal</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C3F29] leading-tight">
              Bantu Sayur Ikat Jadi Lebih Baik! 🍃
            </h1>

            <p className="text-sm sm:text-base text-[#4A5747] leading-relaxed">
              Karena kamu adalah pelanggan pertama kami, kritik sepedas apapun sangat berarti. Ceritain dong pengalaman belanjamu, apa yang kurang, atau sayur apa yang layu di jalan?
            </p>
          </div>

          {/* Form Content / Success Screen */}
          {submitted ? (
            <div className="bg-[#FFFDF9] p-8 sm:p-10 rounded-3xl border-2 border-[#2D5A27] shadow-lg text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#E8F0E5] text-[#2D5A27] text-3xl flex items-center justify-center mx-auto">
                🙏
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-[#1C3F29]">
                  Terima Kasih Sudah "Meng-Grill" Kami!
                </h2>
                <p className="text-sm text-[#5E6D5B] max-w-md mx-auto leading-relaxed">
                  Kritik dan saranmu langsung masuk ke dashboard tim dapur & kurir Sayur Ikat untuk segera dievaluasi.
                </p>
              </div>

              {customerPhone && (
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DEC9] text-xs text-[#2D5A27] font-semibold">
                  🎁 Kami sudah mencatat kontakmu ({customerPhone}). Jika ada sayur yang mengecewakan, tim kami akan segera menghubungi untuk kompensasi sayur gratis!
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={sendToWhatsApp}
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>💬 Kirim Juga Salinan ke WhatsApp Admin</span>
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto bg-[#2D5A27] text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-[#1C3F29] transition-colors text-center"
                >
                  Belanja Sayur Lagi
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#E5DEC9] shadow-sm space-y-8">
              
              {/* Error Alert */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs font-medium">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* 2. Rating Berbasis Kategori (Bukan Cuma Bintang Umum) */}
              <div className="space-y-6">
                <div className="border-b border-[#E5DEC9] pb-2">
                  <h3 className="font-serif text-lg font-bold text-[#1C3F29]">
                    1. Evaluasi Kategori Operasional
                  </h3>
                  <p className="text-xs text-[#5E6D5B]">Pilih opsi yang paling menggambarkan pesananmu hari ini.</p>
                </div>

                <div className="space-y-5">
                  {/* Kategori 1: Kesegaran Sayur */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#1C3F29]">
                      🥬 Kesegaran Sayur:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Layu', 'Biasa saja', 'Sangat Segar'].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setFreshness(opt)}
                          className={`py-2 px-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            freshness === opt
                              ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-xs'
                              : 'bg-[#FAF7F2] text-[#4A5747] border-[#E5DEC9] hover:bg-[#E8F0E5]'
                          }`}
                        >
                          {opt === 'Layu' ? '🥀 ' : opt === 'Biasa saja' ? '😐 ' : '🌿 '}
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kategori 2: Kualitas Bungkusan Daun */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#1C3F29]">
                      📦 Kualitas Bungkusan Daun Pisang & Besek:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Robek', 'Aman tapi berantakan', 'Sangat Rapi'].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setPackaging(opt)}
                          className={`py-2 px-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            packaging === opt
                              ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-xs'
                              : 'bg-[#FAF7F2] text-[#4A5747] border-[#E5DEC9] hover:bg-[#E8F0E5]'
                          }`}
                        >
                          {opt === 'Robek' ? '⚠️ ' : opt === 'Aman tapi berantakan' ? '📦 ' : '✨ '}
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kategori 3: Ketepatan Waktu Pengiriman */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#1C3F29]">
                      🛵 Ketepatan Waktu Pengiriman Kurir:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Terlambat', 'Tepat Waktu'].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setDelivery(opt)}
                          className={`py-2 px-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            delivery === opt
                              ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-xs'
                              : 'bg-[#FAF7F2] text-[#4A5747] border-[#E5DEC9] hover:bg-[#E8F0E5]'
                          }`}
                        >
                          {opt === 'Terlambat' ? '⏰ Terlambat' : '⚡ Tepat Waktu (Pagi)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kategori 4: Pengalaman Web & Pesan WA */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#1C3F29]">
                      📱 Pengalaman Memilih di Web & Pesan via WhatsApp:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Ribet', 'Gampang banget'].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setExperience(opt)}
                          className={`py-2 px-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            experience === opt
                              ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-xs'
                              : 'bg-[#FAF7F2] text-[#4A5747] border-[#E5DEC9] hover:bg-[#E8F0E5]'
                          }`}
                        >
                          {opt === 'Ribet' ? '❌ Ribet' : '✅ Gampang Banget'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Kolom "Grill Us" (Teks Terbuka) */}
              <div className="space-y-2 pt-2 border-t border-[#E5DEC9]">
                <label className="block text-sm font-serif font-bold text-[#1C3F29]">
                  2. Ada kritik pedas atau saran buat Sayur Ikat? *
                </label>
                <textarea
                  rows={4}
                  required
                  value={criticism}
                  onChange={(e) => setCriticism(e.target.value)}
                  placeholder="Misal: Daun pisangnya sobek pas sampai, atau kangkungnya kurang segar nih..."
                  className="w-full p-4 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E5DEC9] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29] placeholder-[#8A9987]"
                />
              </div>

              {/* 4. Fitur Upload Foto (Sangat Krusial!) */}
              <div className="space-y-3 pt-2 border-t border-[#E5DEC9]">
                <div>
                  <label className="block text-sm font-serif font-bold text-[#1C3F29]">
                    3. Upload Foto Bukti Kondisi Sayur / Bungkusan
                  </label>
                  <p className="text-xs text-[#5E6D5B]">
                    Sangat krusial untuk evaluasi apakah kerusakan terjadi di packing gudang atau saat kurir di jalan.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 bg-[#E8F0E5] hover:bg-[#D7E6D3] text-[#2D5A27] border border-[#D7E6D3] px-4 py-2.5 rounded-full text-xs font-bold cursor-pointer transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Pilih / Ambil Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>

                    {photoPreview && (
                      <button
                        type="button"
                        onClick={() => setPhotoPreview(null)}
                        className="text-xs text-red-600 hover:underline font-semibold"
                      >
                        Hapus Foto
                      </button>
                    )}
                  </div>

                  {/* Photo Preview Card */}
                  {photoPreview && (
                    <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-[#2D5A27] shadow-sm">
                      <img
                        src={photoPreview}
                        alt="Bukti foto kondisi sayur"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                        Foto Terlampir
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 5. Detail Pesanan (Opsional tapi Penting) */}
              <div className="space-y-4 pt-2 border-t border-[#E5DEC9]">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1C3F29]">
                    4. Data Pelanggan & Pesanan (Opsional untuk Kompensasi)
                  </h4>
                  <p className="text-xs text-[#5E6D5B]">
                    Isi data ini agar kami bisa memberikan sayur pengganti gratis di pesanan berikutnya jika pengalamanmu kurang memuaskan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C3F29] mb-1">
                      Nama Kamu
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C3F29] mb-1">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C3F29] mb-1">
                    Nomor atau Tanggal Pesanan
                  </label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Contoh: Pesanan tanggal 2 September / Paket Hijau Tumis"
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#E5DEC9]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2D5A27] hover:bg-[#1C3F29] text-white font-bold py-3.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <span>🌶️</span>
                  <span>{isSubmitting ? 'Mengirim Feedback...' : 'Kirim Kritik & Masukan'}</span>
                </button>
              </div>

            </form>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}
