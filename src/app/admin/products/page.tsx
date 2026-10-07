'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

export default function AdminProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Paket',
    stock: '',
    imageUrl: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: 'Sayur segar organik dipanen subuh dari petani Lembang & Bandung.',
      price: '',
      category: 'Paket',
      stock: '25',
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      imageUrl: product.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleToggleStock = async (product: Product) => {
    const newStock = product.stock > 0 ? 0 : 30;
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          stock: newStock,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, stock: newStock } : p))
        );
        setToastMessage(
          newStock === 0
            ? `⚠️ Produk "${product.name}" dinonaktifkan (stok 0)`
            : `✓ Produk "${product.name}" diaktifkan kembali (stok 30)`
        );
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (error) {
      console.error('Error toggling product stock:', error);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      alert('Nama, harga, dan kategori wajib diisi');
      return;
    }

    try {
      setFormLoading(true);
      const isEdit = !!editingProduct;
      const url = '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';
      const payload = isEdit
        ? { id: editingProduct.id, ...formData }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setIsModalOpen(false);
        fetchProducts();
        setToastMessage(isEdit ? '✓ Produk berhasil diperbarui' : '✓ Produk baru berhasil ditambahkan');
        setTimeout(() => setToastMessage(null), 3000);
      } else {
        alert('Gagal menyimpan produk: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryFilter === 'ALL' ||
      product.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <AdminHeader
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        title="Katalog Produk Sayur"
        subtitle="Kelola ketersediaan stok, harga, dan paket sayur ramah lingkungan"
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

        {/* Action Header & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFFDF9] p-4 rounded-3xl border border-[#E5DEC9] shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {['ALL', 'Paket', 'Satuan'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#2D5A27] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#5E6D5B] hover:bg-[#E8F0E5] hover:text-[#1C3F29] border border-[#E5DEC9]'
                }`}
              >
                {cat === 'ALL' ? 'Semua Kategori' : cat === 'Paket' ? '📦 Paket Sayur' : '🥬 Sayur Satuan'}
              </button>
            ))}
          </div>

          {/* Search & Add Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
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
                placeholder="Cari produk sayur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#E5DEC9] rounded-full focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
              />
            </div>

            <button
              onClick={openAddModal}
              className="bg-[#2D5A27] hover:bg-[#1C3F29] text-[#FAF7F2] px-4 py-2 rounded-full text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>+ Tambah Produk</span>
            </button>
          </div>

        </div>

        {/* Products Data Table */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#E5DEC9] shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-xs text-[#5E6D5B]">Memuat daftar produk...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <div className="text-4xl">🥬</div>
              <h3 className="font-serif text-lg font-bold text-[#1C3F29]">Tidak Ada Produk Ditemukan</h3>
              <p className="text-xs text-[#5E6D5B]">Mulai dengan menambahkan produk baru ke katalog.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E5DEC9] text-[#8A9987] uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">Produk Sayur</th>
                    <th className="py-4 px-6">Kategori</th>
                    <th className="py-4 px-6">Harga (IDR)</th>
                    <th className="py-4 px-6">Stok Tersedia</th>
                    <th className="py-4 px-6">Status Penyuplai</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DEC9]/60">
                  {filteredProducts.map((product) => {
                    const isActive = product.stock > 0;
                    return (
                      <tr
                        key={product.id}
                        className={`hover:bg-[#FAF7F2]/80 transition-colors ${
                          !isActive ? 'opacity-60 bg-gray-50/50' : ''
                        }`}
                      >
                        {/* Image & Name */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-12 h-12 rounded-2xl object-cover border border-[#E5DEC9]"
                            />
                            <div>
                              <p className="font-bold text-sm text-[#1C3F29]">{product.name}</p>
                              <p className="text-[11px] text-[#5E6D5B] truncate max-w-xs">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                              product.category.includes('Paket')
                                ? 'bg-[#E8F0E5] text-[#2D5A27] border-[#D7E6D3]'
                                : 'bg-[#FAF7F2] text-[#5E6D5B] border-[#E5DEC9]'
                            }`}
                          >
                            {product.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-6 font-bold text-sm text-[#1C3F29]">
                          Rp {product.price.toLocaleString('id-ID')}
                        </td>

                        {/* Stock */}
                        <td className="py-4 px-6">
                          <span
                            className={`font-bold ${
                              product.stock === 0
                                ? 'text-red-600'
                                : product.stock <= 10
                                ? 'text-[#D96B43]'
                                : 'text-[#2D5A27]'
                            }`}
                          >
                            {product.stock} unit
                          </span>
                        </td>

                        {/* Deactivate / Activate Toggle (CRITICAL FEATURE) */}
                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleToggleStock(product)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              isActive ? 'bg-[#2D5A27]' : 'bg-gray-300'
                            }`}
                            title={isActive ? 'Klik untuk nonaktifkan produk' : 'Klik untuk aktifkan produk'}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                isActive ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                          <span className="text-[11px] font-medium ml-2 text-[#5E6D5B]">
                            {isActive ? 'Aktif' : 'Habis'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="bg-[#FAF7F2] hover:bg-[#E8F0E5] text-[#2D5A27] px-3 py-1.5 rounded-full font-bold border border-[#E5DEC9] transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ADD / EDIT PRODUCT MODAL FORM */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#FAF7F2] rounded-3xl border border-[#E5DEC9] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="bg-[#1C3F29] text-[#FAF7F2] p-5 flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold">
                  {editingProduct ? 'Edit Data Produk Sayur' : 'Tambah Produk Sayur Baru'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/80 hover:text-white bg-[#2D5A27] p-1.5 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmitForm} className="p-6 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C3F29] mb-1">Nama Produk Sayur *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Paket Hijau Tumis Organik"
                    className="w-full px-3.5 py-2 text-xs bg-[#FFFDF9] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C3F29] mb-1">Kategori *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FFFDF9] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
                    >
                      <option value="Paket">📦 Paket Sayur</option>
                      <option value="Satuan">🥬 Sayur Satuan</option>
                      <option value="Buah & Bumbu">🍎 Buah & Bumbu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C3F29] mb-1">Harga (IDR) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="18500"
                      className="w-full px-3.5 py-2 text-xs bg-[#FFFDF9] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C3F29] mb-1">Stok Tersedia *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="30"
                      className="w-full px-3.5 py-2 text-xs bg-[#FFFDF9] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C3F29] mb-1">URL Gambar Produk</label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2 text-xs bg-[#FFFDF9] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C3F29] mb-1">Deskripsi Sayur</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Rincian jenis sayur, berat, dan anjuran memasak..."
                    className="w-full px-3.5 py-2 text-xs bg-[#FFFDF9] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-[#1C3F29]"
                  />
                </div>

                <div className="pt-4 border-t border-[#E5DEC9] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-[#5E6D5B] hover:bg-[#E8F0E5] cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="bg-[#2D5A27] hover:bg-[#1C3F29] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {formLoading ? 'Menyimpan...' : editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </main>
    </>
  );
}
