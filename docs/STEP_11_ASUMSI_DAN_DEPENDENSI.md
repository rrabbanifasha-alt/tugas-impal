# 2. DESKRIPSI GLOBAL PERANGKAT LUNAK

## 2.6 Asumsi dan Dependensi

Dalam perancangan dan implementasi sistem aplikasi **Sayur Ikat**, didefinisikan beberapa asumsi dan dependensi yang memengaruhi berjalannya sistem. Asumsi merujuk pada kondisi-kondisi lingkungan dan pengguna yang dianggap telah benar dan terpenuhi, sedangkan dependensi merujuk pada komponen perangkat lunak, infrastruktur, atau layanan pihak ketiga yang dibutuhkan oleh sistem untuk dapat menjalankan fungsinya secara optimal.

### A. Asumsi (*Assumptions*)
Hal-hal yang dianggap benar dan diasumsikan telah terpenuhi dalam operasional sistem:

1. **Kepemilikan Perangkat dan Peramban Kompatibel**:  
   Pengguna (baik pelanggan maupun admin) diasumsikan memiliki perangkat (*smartphone*, tablet, laptop, atau PC) yang terpasang peramban web modern dengan dukungan JavaScript dan *Web Storage API* yang aktif.
2. **Kepemilikan Akun WhatsApp yang Valid**:  
   Pelanggan diasumsikan memiliki nomor telepon aktif yang terdaftar pada aplikasi WhatsApp resmi, serta memahami alur pengiriman pesan instan untuk konfirmasi pesanan.
3. **Kebenaran dan Akurasi Data Pemesan**:  
   Pelanggan diasumsikan memasukkan data identitas diri (nama lengkap, nomor kontak aktif, dan alamat pengiriman di kawasan Bandung Raya) secara benar, lengkap, dan dapat diakses oleh kurir.
4. **Ketersediaan Akses Jaringan Internet**:  
   Pelanggan dan pengelola toko diasumsikan memiliki koneksi jaringan internet yang memadai dan stabil selama proses pemilihan produk, pengiriman formulir pesanan, serta pembaruan data stok.
5. **Kontinuitas Pasokan Sayur Petani Lokal**:  
   Mitra kelompok tani di sentra pertanian Bandung Raya (Lembang, Parongpong, Pangalengan, dan Ciwidey) diasumsikan dapat memasok sayuran segar organik hasil panen subuh setiap hari secara konsisten sesuai kuota stok yang dikelola pada sistem.
6. **Iktikad Baik Penyelesaian Pembayaran**:  
   Pelanggan diasumsikan menyelesaikan kewajiban pembayaran belanjaan (baik dengan menyediakan uang tunai pas untuk COD, maupun melakukan transfer/scan QRIS) setelah pesanan dikonfirmasi oleh admin toko via WhatsApp.

### B. Dependensi (*Dependencies*)
Komponen eksternal, modul teknologi, dan infrastruktur pihak ketiga yang wajib tersedia dan dibutuhkan oleh sistem untuk dapat beroperasi:

1. **Layanan Protokol WhatsApp URI Scheme (*Deep Link Linking*)**:  
   Sistem bergantung pada ketersediaan dan kestabilan protokol tautan universal `https://wa.me/` dari WhatsApp untuk mengalihkan payload draf pesanan dari antarmuka web ke ruang obrolan admin toko.
2. **Infrastruktur Basis Data SQLite dan Prisma ORM**:  
   Sistem bergantung pada integritas berkas basis data SQLite (`dev.db`) dan keandalan pustaka *Prisma Client* untuk mengeksekusi operasi transaksi penyimpanan, pembacaan, dan pembaruan data (*CRUD*) secara konsisten dan *type-safe*.
3. **Runtime Engine Node.js dan Web Server Next.js**:  
   Sistem bergantung pada lingkungan eksekusi *Node.js Runtime* (versi LTS 18.x/20.x+) serta framework *Next.js 16 App Router* untuk menjalankan proses kompilasi *Server-Side Rendering* (SSR), *React Server Components* (RSC), dan eksekusi *Route Handlers* (REST API).
4. **Penyedia Layanan Hosting dan Domain Publik**:  
   Aksesibilitas dan kinerja sistem bergantung pada tingkat ketersediaan (*uptime* server minimal 99%), kapasitas *bandwidth*, sertifikat enkripsi SSL/TLS (HTTPS), serta kestabilan *Domain Name System* (DNS) dari penyedia hosting.
5. **Dukungan Web Storage API (LocalStorage) pada Peramban Klien**:  
   Fungsionalitas keranjang belanja interaktif bergantung pada ketersediaan dan izin penyimpanan lokal (*LocalStorage*) pada peramban perangkat klien agar data pilihan produk tidak hilang saat halaman diperbarui (*page refresh*).
