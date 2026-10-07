# STEP 1: RUANG LINGKUP SISTEM (SYSTEM SCOPE)
## Dokumen Pra-SKPL — Sayur Ikat

**Kode Dokumen:** `SKPL-SI-STEP-1`  
**Versi:** 1.0  
**Tanggal:** 7 Oktober 2026  
**Status:** Disetujui sebagai Acuan Kebutuhan Fungsional & Pemodelan Diagram  

---

## 1. Prinsip Dasar Ruang Lingkup (*Scope Boundary Rule*)

> 🚨 **Aturan Penting Rekayasa Perangkat Lunak:**  
> Seluruh fungsionalitas yang dirumuskan pada:
> 1. Spesifikasi Kebutuhan Fungsional (SKPL)
> 2. Use Case Diagram & Skenario Use Case
> 3. Activity Diagram
> 4. Class Diagram & Skema Database  
> **HARUS 100% berada di dalam ruang lingkup (*In-Scope*) ini.** Tidak boleh ada fungsi utama baru yang tiba-tiba muncul di Use Case atau Class Diagram jika fungsi tersebut tidak dideklarasikan pada bagian ini.

---

## 2. Termasuk ke Dalam Sistem (*In-Scope*)

Berikut adalah modul, fitur, dan kapabilitas yang menjadi tanggung jawab aplikasi web **Sayur Ikat**:

### A. Sisi Pelanggan (*Storefront Facing*)
1. **Penjelajahan Katalog & Detail Produk Sayur**:
   * Menampilkan katalog produk sayur organik dan paket masakan dengan pemfilteran kategori (*Paket Sayur*, *Sayur Satuan*, *Buah & Bumbu*).
   * Menampilkan detail transparan: harga, ketersediaan stok fisik, unit/satuan, deskripsi kemasan ramah lingkungan (daun pisang/besek), porsi sajian, dan nama mitra kelompok tani lokal.
2. **Pengelolaan Keranjang Belanja (*Slide-over Cart Drawer*)**:
   * Penambahan produk ke keranjang, pengubahan kuantitas (+ / -), dan penghapusan item keranjang secara instan tanpa memuat ulang (*reload*) halaman.
   * Perhitungan otomatis subtotal belanja dan biaya pengiriman flat (dengan logika gratis ongkir sesuai ketentuan).
   * Penyimpanan sementara keranjang di *local storage* peramban pengguna agar tidak hilang saat halaman diperbarui (*page refresh*).
3. **Pemesanan Terpadu & Checkout WhatsApp (*WhatsApp-Assisted Checkout*)**:
   * Formulir data pengiriman: Nama lengkap, Nomor WhatsApp aktif, Alamat pengiriman lengkap (khusus wilayah Bandung Raya), serta Catatan pesanan khusus.
   * Penyimpanan data transaksi ke database server (tabel `Order` dan `OrderItem`) dan pembentukan kode unik pesanan.
   * Pembuatan format pesan pemesanan terstruktur otomatis dan pengalihan (*deep-link redirect*) ke WhatsApp resmi admin toko (`wa.me`).
4. **Formulir Evaluasi Kualitas & Jaminan Garansi (*Feedback & Quality Control*)**:
   * Formulir evaluasi kepuasan pelanggan dengan rating bintang 4 pilar (Kesegaran Sayur, Kualitas Bungkus Daun, Ketepatan Waktu Kurir, Pengalaman Web & WA).
   * Input kritik/saran terbuka serta formulir unggah berkas foto bukti kerusakan sayur (maksimal 5 MB).
   * Input data nomor pesanan & nomor kontak (opsional) untuk kebutuhan klaim kompensasi/garansi.

### B. Sisi Pengelola Toko (*Admin Dashboard Facing*)
1. **Dasbor Ringkasan Operasional (*Dashboard Overview*)**:
   * Menampilkan kartu metrik performa harian: Total pesanan hari ini, total omset/pendapatan hari ini, dan total produk aktif.
   * Pemantauan dan peringatan dini produk yang memiliki stok menipis/kritis.
   * Tabel daftar pesanan terbaru yang masuk hari ini.
2. **Manajemen Siklus Pesanan (*Order Management*)**:
   * Menampilkan daftar tabel seluruh pesanan masuk dengan informasi lengkap (kode pesanan, waktu, pemesan, alamat, total harga, status).
   * Fitur pencarian pesanan berdasarkan ID, nama pelanggan, atau alamat.
   * Fitur filter pesanan berdasarkan status: *Semua*, *PENDING*, *DIPROSES*, *DIKIRIM*, *SELESAI*.
   * Pengubahan status pesanan secara langsung melalui antarmuka admin.
   * Akses pintas (*direct WhatsApp link*) untuk menghubungi pelanggan terkait konfirmasi pesanan dan pembayaran.
3. **Manajemen Master Produk & Inventori (*Product & Inventory Management*)**:
   * Penambahan produk sayur baru (nama, kategori, deskripsi, harga, stok, satuan, gambar, asal tani).
   * Pengubahan data produk yang sudah ada (edit nama, harga, stok fisik, foto).
   * Pengaturan status ketersediaan produk (*toggle* aktif/nonaktif) untuk menyembunyikan produk dari katalog publik tanpa merusak riwayat relasi pesanan lampau (*soft availability toggle*).
4. **Pusat Evaluasi & Tindak Lanjut Pelanggan (*Feedback Management & Follow-up*)**:
   * Rekapitulasi kartu masukan pelanggan beserta tampilan rating 4 pilar dan pratinjau foto bukti kerusakan.
   * Tombol pintas *Follow-up WA* untuk langsung memulai obrolan dengan pelanggan guna verifikasi komplain dan pengiriman voucher/produk kompensasi.

---

## 3. Tidak Termasuk ke Dalam Sistem (*Out-of-Scope*)

Untuk menjaga fokus pengembangan, batas waktu, dan kompleksitas arsitektur, aspek-aspek berikut **TIDAK DIBANGUN** di dalam sistem Sayur Ikat:

1. **Integrasi Payment Gateway Otomatis Pihak Ketiga**:
   * Sistem **tidak mengintegrasikan** gateway pembayaran otomatis (seperti Midtrans, Xendit, Doku, atau Stripe).
   * *Alur Pembayaran*: Menggunakan metode pembayaran manual (Transfer Bank, scan QRIS statis, atau Bayar di Tempat/COD) yang dikonfirmasi langsung oleh admin melalui komunikasi WhatsApp.
2. **Sistem Autentikasi Akun Pelanggan (*Customer Authentication / Login*)**:
   * Sistem **tidak menyediakan** registrasi akun, login, reset password, atau profil member untuk pelanggan.
   * Seluruh pemesanan pelanggan menggunakan mode **Guest Checkout** guna meminimalkan hambatan belanja (*frictionless*).
3. **Pelacakan Posisi Kurir Berbasis GPS Real-Time (*Live GPS Courier Tracking*)**:
   * Sistem **tidak menyediakan** peta interaktif pelacak posisi kurir (seperti halnya GrabExpress atau GoSend).
   * Pelacakan pesanan murni direpresentasikan melalui perubahan status operasional bertahap (*PENDING* $\rightarrow$ *DIPROSES* $\rightarrow$ *DIKIRIM* $\rightarrow$ *SELESAI*).
4. **Modul Penggajian, Absensi, dan Manajemen SDM Kurir (*HRM / Payroll*)**:
   * Sistem tidak mengelola absensi fingerprint/mobile kurir, perhitungan gaji, komisi kurir, maupun shift kerja staf.
5. **Modul Pengadaan dan Kontrak Petani (*Supply Chain & Farmer Procurement ERP*)**:
   * Sistem mencatat nama kelompok tani hanya sebagai atribut transparansi pada produk, bukan sebagai modul ERP pengadaan benih, manajemen lahan, atau kontrak bagi hasil tani.
6. **Integrasi Bot WhatsApp Berbayar (*WhatsApp Business Cloud API / Twilio*)**:
   * Pengiriman pesan tidak menggunakan bot webhook otomatis pihak ketiga berbayar, melainkan memanfaatkan mekanisme **WhatsApp URI Scheme / Deep Link (`https://wa.me`)** yang membuka aplikasi WhatsApp pada perangkat pengguna.

---

## 4. Matriks Konsistensi Scope terhadap Diagram Desain

Tabel ini menjadi panduan kontrol kepatuhan agar pemodelan diagram selanjutnya tidak melanggar batasan lingkup:

| Elemen Scope | Kebutuhan Fungsional Terkait | Representasi Use Case | Representasi Class Diagram | Keterangan Status |
| :--- | :--- | :--- | :--- | :--- |
| **Katalog & Detail Produk** | SKPL-F-01 | `UC-01: Melihat Katalog & Detail Produk` | Class `Product` | **IN-SCOPE** |
| **Keranjang Belanja** | SKPL-F-02 | `UC-02: Mengelola Keranjang Belanja` | State `CartItem` (Client-side) | **IN-SCOPE** |
| **Checkout Pesanan** | SKPL-F-03 | `UC-03: Melakukan Checkout Pesanan` | Class `Order`, Class `OrderItem` | **IN-SCOPE** |
| **Kritik, Saran & Foto Bukti** | SKPL-F-04 | `UC-04: Mengirim Kritik & Saran` | Class `Feedback` | **IN-SCOPE** |
| **Dasbor Statistik Operasional** | SKPL-F-05 | `UC-05: Memantau Statistik Ringkasan Operasional` | Agregasi data `Order` & `Product` | **IN-SCOPE** |
| **Kelola Status Pesanan** | SKPL-F-06 | `UC-06: Mengelola Status Pesanan` | Operasi update pada Class `Order` | **IN-SCOPE** |
| **Kelola Produk & Stok** | SKPL-F-07 | `UC-07: Mengelola Produk & Stok Sayur` | CRUD pada Class `Product` | **IN-SCOPE** |
| **Review & Follow-up Feedback** | SKPL-F-08 | `UC-08: Meninjau & Menindaklanjuti Feedback` | Query pada Class `Feedback` | **IN-SCOPE** |
| *Payment Gateway Otomatis* | - | *(DILARANG MUNCUL)* | *(DILARANG MUNCUL)* | **OUT-OF-SCOPE** |
| *Live Tracking GPS Kurir* | - | *(DILARANG MUNCUL)* | *(DILARANG MUNCUL)* | **OUT-OF-SCOPE** |
| *Login / Registrasi Pelanggan* | - | *(DILARANG MUNCUL)* | *(DILARANG MUNCUL)* | **OUT-OF-SCOPE** |
| *Payroll & Absensi Kurir* | - | *(DILARANG MUNCUL)* | *(DILARANG MUNCUL)* | **OUT-OF-SCOPE** |
