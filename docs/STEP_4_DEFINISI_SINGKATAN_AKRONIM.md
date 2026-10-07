# 1. PENDAHULUAN

## 1.3 Definisi, Singkatan, dan Akronim

Pada bagian ini disajikan daftar definisi, singkatan, dan akronim yang digunakan secara konsisten di seluruh bagian dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) ini. Daftar ini bertujuan untuk menyamakan persepsi dan mempermudah pemahaman konteks teknis maupun domain operasional sistem **Sayur Ikat**.

### A. Definisi Terminologi Sistem & Domain Bisnis
* **Sayur Ikat** : Nama sistem perangkat lunak aplikasi web pemesanan sayuran organik segar dan pengelolaan operasional toko berbasis ramah lingkungan.
* **Pelanggan (*Customer*)** : Pengguna publik yang mengakses antarmuka toko web untuk menjelajahi katalog produk, mengelola keranjang belanja, melakukan pemesanan via WhatsApp, serta mengirimkan ulasan kualitas sayur.
* **Admin Toko (*Store Administrator*)** : Pengelola operasional internal Sayur Ikat yang memiliki hak akses ke portal dasbor untuk memantau pendapatan harian, memperbarui status pesanan, mengelola stok produk, dan menindaklanjuti keluhan konsumen.
* **Produk (*Product*)** : Komoditas pangan segar yang ditawarkan pada sistem, mencakup kategori *Paket Sayur* (porsi siap masak), *Sayur Satuan*, serta *Buah & Bumbu*.
* **Paket Sayur (*Veg Box*)** : Kombinasi beberapa jenis sayuran dan bumbu dapur yang dikemas dalam satu paket praktis untuk kebutuhan 2–4 porsi makan keluarga.
* **Bebas Plastik (*Zero-Waste Packaging*)** : Konsep operasional pengemasan sayur yang 100% meniadakan plastik sekali pakai, menggunakan wadah anyaman besek bambu dan alas daun pisang alami.
* **Keranjang Belanja (*Slide-over Cart Drawer*)** : Komponen antarmuka berupa panel geser dari sisi kanan layar yang digunakan untuk menampung produk pilihan pengguna serta formulir pengiriman tanpa memuat ulang (*reload*) halaman web.
* **Pemesanan Mandiri (*Guest Checkout*)** : Mekanisme pembuatan pesanan yang tidak mewajibkan pengguna untuk melakukan registrasi atau login akun terlebih dahulu.
* **Status Pesanan (*Order Status*)** : Tahapan siklus hidup pemrosesan pesanan pada sistem, terdiri atas *PENDING* (pesanan masuk baru), *DIPROSES* (sedang disiapkan dan dikemas), *DIKIRIM* (sedang diantar kurir), dan *SELESAI* (barang telah diterima pelanggan).
* **Evaluasi Mutu (*Quality Control / Grill Us Feedback*)** : Fitur penilaian kepuasan pelanggan terhadap 4 pilar layanan (kesegaran sayur, kerapian bungkus daun, ketepatan kurir, dan kemudahan web/WA) yang dilengkapi opsi unggah foto bukti kerusakan produk untuk perolehan kompensasi.

### B. Singkatan dan Akronim
* **SKPL** : Spesifikasi Kebutuhan Perangkat Lunak (istilah baku bahasa Indonesia untuk *Software Requirements Specification* / SRS berdasarkan standar IEEE Std 830-1998).
* **DPPL** : Deskripsi Perancangan Perangkat Lunak (istilah baku bahasa Indonesia untuk *Software Design Description* / SDD berdasarkan standar IEEE Std 1016-2009).
* **FR** : *Functional Requirement* (Kebutuhan Fungsional yang mendefinisikan layanan atau kapabilitas yang harus disediakan oleh sistem).
* **NFR** : *Non-Functional Requirement* (Kebutuhan Non-Fungsional yang mendefinisikan batasan kualitas sistem seperti kecepatan, keandalan, dan kegunaan).
* **UI** : *User Interface* (Antarmuka Pengguna grafis yang menghubungkan pengguna dengan sistem).
* **UX** : *User Experience* (Pengalaman dan kenyamanan pengguna secara keseluruhan dalam mengoperasikan sistem).
* **COD** : *Cash on Delivery* (Metode transaksi pembayaran tunai yang diserahkan langsung oleh pembeli kepada kurir pada saat produk tiba di lokasi tujuan).
* **QRIS** : *Quick Response Code Indonesian Standard* (Standar kode QR pembayaran digital yang difasilitasi oleh Bank Indonesia).
* **URI / URL** : *Uniform Resource Identifier* / *Uniform Resource Locator* (Format pengalamatan standar rute sumber daya web).
* **Deep Link** : Tautan protokol web khusus (skema `wa.me`) yang secara langsung membuka aplikasi pesan instan WhatsApp pada perangkat pengguna dengan pesan terstruktur yang telah terisi otomatis (*pre-filled*).
* **SUS** : *System Usability Scale* (Skala metrik kuesioner terstandar internasional yang digunakan untuk mengukur tingkat kebergunaan dan kemudahan antarmuka sistem).
