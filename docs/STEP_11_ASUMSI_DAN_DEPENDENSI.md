# 2. DESKRIPSI GLOBAL PERANGKAT LUNAK

## 2.6 Asumsi dan Dependensi

Dalam perancangan dan implementasi sistem aplikasi **Sayur Ikat**, didefinisikan beberapa asumsi dan dependensi yang memengaruhi berjalannya sistem. Asumsi merujuk pada kondisi-kondisi lingkungan dan pengguna yang dianggap telah benar dan terpenuhi, sedangkan dependensi merujuk pada komponen perangkat lunak, infrastruktur, atau layanan pihak ketiga yang dibutuhkan oleh sistem untuk dapat menjalankan fungsinya secara optimal.

---

### A. Asumsi (*Assumptions*)
Hal-hal yang dianggap benar dan diasumsikan telah terpenuhi dalam operasional sistem:

1. **Kepemilikan Perangkat dan Peramban Kompatibel**:  
   Pengguna (baik pelanggan maupun admin) diasumsikan memiliki perangkat (*smartphone*, tablet, laptop, atau PC) yang terpasang peramban web modern dengan dukungan JavaScript dan *Web Storage API* (*LocalStorage* untuk penyimpanan sesi keranjang dengan kunci `sayurikat_cart`).
2. **Kepemilikan Akun WhatsApp yang Valid**:  
   Pelanggan diasumsikan memiliki nomor telepon aktif yang terdaftar pada aplikasi WhatsApp resmi, serta memahami alur pengiriman pesan instan untuk konfirmasi pesanan (`https://wa.me/`).
3. **Kebenaran Data Pemesan dan Verifikasi Alamat Manual**:  
   Pelanggan diasumsikan memasukkan data identitas diri (nama lengkap, nomor kontak aktif, dan alamat pengiriman di kawasan Bandung Raya) secara benar dan dapat dijangkau oleh kurir. Admin diasumsikan mengonfirmasi dan memastikan bahwa alamat pengiriman pelanggan benar-benar berada dalam radius wilayah layanan Bandung Raya secara manual saat percakapan WhatsApp berlangsung, karena sistem belum dilengkapi API *geocoding* validasi wilayah otomatis.
4. **Ketersediaan Akses Jaringan Internet dan Komunikasi API**:  
   Pelanggan dan pengelola toko diasumsikan memiliki koneksi jaringan internet yang memadai dan stabil selama proses pemilihan produk, pengiriman formulir pesanan, serta pembaruan data stok melalui antarmuka API server.
5. **Kontinuitas Pasokan Sayur Petani Lokal Bandung**:  
   Mitra kelompok tani di sentra pertanian Bandung Raya (Lembang, Parongpong, Pangalengan, dan Ciwidey) diasumsikan dapat memasok sayuran segar organik hasil panen subuh setiap hari secara konsisten sesuai kuota stok yang dikelola pada sistem.
6. **Iktikad Baik Penyelesaian Pembayaran Manual**:  
   Pelanggan diasumsikan menyelesaikan kewajiban pembayaran belanjaan sesuai opsi yang dipilih (menyiapkan uang pas untuk *Cash on Delivery / COD*, atau melakukan transfer Bank BCA / Mandiri / scan QRIS) setelah pesanan dikonfirmasi oleh admin toko via WhatsApp.
7. **Lingkungan Akses Admin Tepercaya (*Single Trusted Administrator*)**:  
   Admin diasumsikan sebagai pengelola tunggal atau tim operasional terpercaya yang mengakses portal `/admin` dari lingkungan jaringan dan perangkat yang aman, mengingat sistem pada tahap ini belum mengimplementasikan modul autentikasi login berkredensial.
8. **Pengelolaan dan Sinkronisasi Stok Manual (*Manual Stock Synchronization*)**:  
   Admin diasumsikan memperbarui kuota stok fisik sayur secara berkala dan manual melalui panel produk (`/api/admin/products`), karena sistem saat ini belum menerapkan mekanisme pengurangan kuota stok secara otomatis saat draf pesanan masuk.

---

### B. Dependensi (*Dependencies*)
Komponen eksternal, modul teknologi, dan infrastruktur pihak ketiga yang wajib tersedia dan dibutuhkan oleh sistem untuk dapat beroperasi:

1. **Layanan Protokol WhatsApp URI Scheme (*Deep Link Linking*)**:  
   Sistem bergantung pada ketersediaan dan kestabilan protokol tautan universal `https://wa.me/` dari WhatsApp (diimplementasikan pada `src/lib/whatsapp.ts` dan dieksekusi via `window.open` di antarmuka `CartDrawer.tsx`) untuk mengalihkan draf pesanan ke ruang obrolan admin toko.
2. **Infrastruktur Basis Data SQLite dan Prisma ORM**:  
   Sistem bergantung pada integritas berkas basis data SQLite lokal (`dev.db` yang dikonfigurasi melalui `provider = "sqlite"` pada `prisma/schema.prisma`) dan pustaka `@prisma/client` (versi 6.19.3) untuk mengeksekusi operasi transaksi data produk, pesanan, dan kritik pelanggan secara konsisten dan *type-safe*.
3. **Runtime Node.js dan Framework Next.js**:  
   Sistem bergantung pada Node.js (versi 20.9 atau lebih baru / LTS) dan framework Next.js 16 (App Router) untuk merender antarmuka halaman web dan menjalankan *Route Handlers* (REST API), serta pada React 19 untuk komponen antarmuka pengguna.
4. **Penyedia Layanan Hosting dan Persistensi Berkas Basis Data**:  
   Kelancaran operasional sistem bergantung pada penyedia hosting yang wajib mendukung sistem berkas persisten (*persistent volume/filesystem*, seperti VPS atau platform container) agar berkas basis data SQLite (`dev.db`) tidak terhapus saat terjadi proses *restart* atau *redeploy*. Jika dideploy ke platform *serverless* (seperti Vercel), sistem memiliki dependensi untuk memigrasikan penyimpanan data ke basis data eksternal (seperti PostgreSQL menggunakan skema rujukan `schema.postgresql.sql`). Target ketersediaan (*service level target*) hosting dirancang minimal 99% *uptime*.
5. **Dukungan Web Storage API (LocalStorage) pada Peramban Klien**:  
   Fungsionalitas keranjang belanja interaktif bergantung pada ketersediaan dan izin penyimpanan lokal (*LocalStorage* pada kunci `sayurikat_cart` di `CartContext.tsx`) agar data pilihan belanjaan tidak hilang saat halaman dimuat ulang (*page refresh*).
