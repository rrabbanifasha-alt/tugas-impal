# 2. DESKRIPSI GLOBAL PERANGKAT LUNAK

## 2.5 Batasan Perangkat Lunak / Sistem

Batasan sistem mendefinisikan faktor-faktor teknis, operasional, aturan bisnis, dan lingkungan yang membatasi kapabilitas perangkat lunak **Sayur Ikat**. Batasan ini bersifat realistis dan dapat dibuktikan secara nyata pada perilaku sistem:

### 1. Batasan Cakupan Geografis Pengiriman (*Geographical Delivery Boundary*)
* Sistem dibatasi secara ketat hanya melayani pengiriman pesanan untuk alamat tujuan di wilayah **Kota Bandung, Kota Cimahi, dan kawasan Bandung Raya (Jawa Barat)**.
* *Bukti/Alasan*: Keterbatasan jangkauan kurir harian dalam menjaga kesegaran sayur tanpa lemari pendingin (*chiller* armada), sehingga pesanan dengan alamat di luar area operasional ini tidak dapat diproses dalam pengiriman harian.

### 2. Batasan Waktu Pemesanan Harian (*Operational Cut-off Time*)
* Pemesanan dengan layanan pengiriman hari yang sama (*same-day delivery*) dibatasi hanya untuk transaksi yang diselesaikan sebelum pukul **12.00 WIB**.
* Pesanan yang masuk setelah pukul 12.00 WIB akan dijadwalkan untuk pengantaran pada pagi hari operasional berikutnya.
* *Bukti/Alasan*: Sayuran dipanen pada waktu subuh (05.00 WIB) dari petani mitra di Lembang/Ciwidey, kemudian dipilah dan dikemas menggunakan besek bambu dan daun pisang pada rentang waktu siang untuk langsung didistribusikan sore harinya.

### 3. Batasan Format dan Ukuran Unggahan Bukti (*Media Upload Constraints*)
* Berkas foto bukti kerusakan sayur pada formulir kritik dan evaluasi mutu (`/feedback`) dibatasi maksimal berukuran **5 Megabytes (MB)** per unggahan.
* Format berkas gambar yang didukung dibatasi hanya pada ekstensi standar web: `.jpg`, `.jpeg`, `.png`, dan `.webp`. Berkas selain format citra atau yang melebihi ukuran batas akan ditolak secara otomatis oleh validasi antarmuka peramban.

### 4. Batasan Ketergantungan Ekosistem WhatsApp (*External Application Constraint*)
* Penyelesaian akhir transaksi pemesanan bergantung sepenuhnya pada keberadaan aplikasi perpesanan WhatsApp (pada *smartphone*) atau WhatsApp Web (pada komputer) yang terhubung dengan nomor telepon aktif pengguna.
* Sistem tidak menyediakan mesin perpesanan SMS/email mandiri; jika perangkat pengguna tidak mendukung penanganan protokol URI Scheme (`https://wa.me/`), pesan pemesanan terstruktur tidak dapat dialihkan ke admin toko.

### 5. Batasan Penyimpanan Sesi Keranjang Belanja (*Client-Side Persistence Constraint*)
* Keranjang belanja disimpan secara lokal pada memori peramban pengguna melalui mekanisme *Web Storage API (LocalStorage)*.
* Apabila pengguna membersihkan data penjelajahan (*clear cache/cookies*), beralih ke peramban lain, atau menggunakan mode penyamaran (*incognito window*), riwayat pemilihan produk di dalam keranjang akan terhapus dan tidak dapat dipulihkan secara otomatis.

### 6. Batasan Konektivitas Jaringan Internet (*Online Connectivity Dependency*)
* Sistem tidak mendukung mode operasional luring (*offline-first mode*). Seluruh proses—mulai dari rendering katalog harga dinamis, verifikasi kuota stok fisik, hingga pengiriman pesanan ke server API—membutuhkan koneksi internet publik yang aktif dan stabil.

### 7. Batasan Kapasitas Infrastruktur Basis Data (*Embedded Database Constraint*)
* Sistem menggunakan SQLite sebagai basis data tersemat (*embedded relational database*). Sistem ini dirancang optimal untuk beban transaksi ritel UMKM hiper-lokal, sehingga tidak ditujukan untuk penanganan konkurensi data berskala jutaan *request* secara simultan tanpa migrasi ke DBMS berbasis *client-server* terpisah (seperti PostgreSQL).
