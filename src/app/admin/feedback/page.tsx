'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';

interface FeedbackItem {
  id: string;
  freshnessRating: string;
  packagingRating: string;
  deliveryRating: string;
  experienceRating: string;
  criticismNotes: string;
  photoUrl: string | null;
  customerName: string | null;
  customerPhone: string | null;
  orderNumber: string | null;
  createdAt: string;
}

export default function AdminFeedbackPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/feedback');
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.feedbacks || []);
      }
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <>
      <AdminHeader
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        title="Suara & Kritik Pelanggan (Grill Us)"
        subtitle="Evaluasi mutu kemasan, kesegaran daun pisang, dan feedback operasional"
      />

      <main className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8 py-8 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Header Summary */}
        <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#E5DEC9] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#D96B43] bg-[#FDE8E1] px-3 py-1 rounded-full uppercase tracking-wider">
              🌶️ Quality Control & Customer Feedback
            </span>
            <h3 className="font-serif text-xl font-bold text-[#1C3F29] mt-2">
              Laporan Evaluasi Pelanggan
            </h3>
            <p className="text-xs text-[#5E6D5B]">
              Total Masukan Diterima: <strong>{feedbacks.length} masukan</strong>
            </p>
          </div>

          <button
            onClick={fetchFeedbacks}
            className="bg-[#FAF7F2] hover:bg-[#E8F0E5] text-[#2D5A27] px-4 py-2 rounded-full text-xs font-bold border border-[#E5DEC9] transition-colors cursor-pointer"
          >
            🔄 Refresh Data
          </button>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-16 text-center text-xs text-[#5E6D5B] bg-[#FFFDF9] rounded-3xl border border-[#E5DEC9]">
              Memuat data kritik dan masukan...
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="py-16 text-center space-y-2 bg-[#FFFDF9] rounded-3xl border border-[#E5DEC9]">
              <div className="text-4xl">🍃</div>
              <h3 className="font-serif text-lg font-bold text-[#1C3F29]">Belum Ada Kritik Masuk</h3>
              <p className="text-xs text-[#5E6D5B]">Feedback dari form "Kritik & Saran" akan otomatis tampil di sini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {feedbacks.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#E5DEC9] shadow-xs space-y-4 flex flex-col justify-between hover:border-[#2D5A27] transition-all"
                >
                  <div className="space-y-3">
                    {/* Top Row: Date & Customer */}
                    <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-3">
                      <div>
                        <p className="font-bold text-sm text-[#1C3F29]">
                          {item.customerName || 'Pelanggan Anonim'}
                        </p>
                        {item.customerPhone && (
                          <p className="text-xs text-[#25D366] font-medium">
                            💬 WA: {item.customerPhone}
                          </p>
                        )}
                      </div>
                      <span className="text-[11px] text-[#5E6D5B]">
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    {/* Operational Rating Pills */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#E5DEC9]">
                        <span className="text-[#5E6D5B] block">🥬 Kesegaran:</span>
                        <span className={`font-bold ${item.freshnessRating === 'Layu' ? 'text-red-600' : 'text-[#2D5A27]'}`}>
                          {item.freshnessRating}
                        </span>
                      </div>

                      <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#E5DEC9]">
                        <span className="text-[#5E6D5B] block">📦 Bungkusan Daun:</span>
                        <span className={`font-bold ${item.packagingRating === 'Robek' ? 'text-red-600' : 'text-[#2D5A27]'}`}>
                          {item.packagingRating}
                        </span>
                      </div>

                      <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#E5DEC9]">
                        <span className="text-[#5E6D5B] block">🛵 Pengiriman:</span>
                        <span className="font-bold text-[#1C3F29]">{item.deliveryRating}</span>
                      </div>

                      <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#E5DEC9]">
                        <span className="text-[#5E6D5B] block">📱 Pengalaman Web/WA:</span>
                        <span className="font-bold text-[#1C3F29]">{item.experienceRating}</span>
                      </div>
                    </div>

                    {/* Criticism Notes */}
                    <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E5DEC9] space-y-1">
                      <p className="text-[10px] font-bold text-[#D96B43] uppercase tracking-wider">
                        💬 Catatan Kritik / Saran:
                      </p>
                      <p className="text-xs text-[#1C3F29] leading-relaxed italic">
                        "{item.criticismNotes}"
                      </p>
                    </div>

                    {/* Photo Proof thumbnail */}
                    {item.photoUrl && (
                      <div className="pt-1">
                        <button
                          onClick={() => setSelectedFeedback(item)}
                          className="flex items-center gap-2 text-xs font-bold text-[#2D5A27] bg-[#E8F0E5] px-3 py-1.5 rounded-xl border border-[#D7E6D3] hover:bg-[#D7E6D3] cursor-pointer"
                        >
                          <span>📸 Lihat Foto Bukti Kerusakan</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Footer Follow-up */}
                  {item.customerPhone && (
                    <div className="pt-3 border-t border-[#E5DEC9] flex items-center justify-between">
                      <span className="text-[11px] text-[#5E6D5B]">
                        {item.orderNumber ? `Ref: ${item.orderNumber}` : 'Tanpa nomor pesanan'}
                      </span>

                      <a
                        href={`https://wa.me/${item.customerPhone.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(
                          item.customerName || 'Kak'
                        )},%20terima%20kasih%20atas%20kritik%20dan%20masukannya%20untuk%20Sayur%20Ikat.%20Kami%20ingin%20memberikan%20kompensasi%20sayur%20segar%20gratis%20di%20pesanan%20berikutnya.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <span>💬 Follow-up WA</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PHOTO PROOF MODAL */}
        {selectedFeedback && selectedFeedback.photoUrl && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#FAF7F2] rounded-3xl border border-[#E5DEC9] shadow-2xl max-w-md w-full overflow-hidden">
              <div className="bg-[#1C3F29] text-white p-4 flex items-center justify-between">
                <h4 className="font-serif text-sm font-bold">Foto Bukti dari {selectedFeedback.customerName || 'Pelanggan'}</h4>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="p-1 text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <img
                  src={selectedFeedback.photoUrl}
                  alt="Bukti foto kerusakan"
                  className="w-full h-72 object-contain rounded-2xl bg-black/5 border border-[#E5DEC9]"
                />
                <p className="text-xs text-[#5E6D5B] mt-3 italic">
                  "{selectedFeedback.criticismNotes}"
                </p>
              </div>
              <div className="p-4 bg-[#FFFDF9] border-t border-[#E5DEC9] text-right">
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="bg-[#2D5A27] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#1C3F29]"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
