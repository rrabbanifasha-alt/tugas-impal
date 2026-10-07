# STEP 0: IDENTITAS SISTEM (SYSTEM IDENTITY)
## Dokumen Pra-SKPL — Sayur Ikat

**Kode Dokumen:** `SKPL-SI-STEP-0`  
**Versi:** 1.0  
**Tanggal:** 7 Oktober 2026  
**Status:** Disetujui sebagai Acuan Penyusunan SKPL  

---

## 1. Nama Sistem

* **Nama Resmi**: Sistem Informasi Pemesanan & Operasional Sayur Ikat (*Sayur Ikat Web Ordering & Operations System*)
* **Nama Singkat / Brand**: **Sayur Ikat**
* **Kode Rujukan Sistem**: `SKPL-SI`
* **Arsitektur Dasar**: Fullstack Web Application (Next.js 16 App Router, React 19, Prisma ORM, SQLite)

---

## 2. Tujuan Sistem

Tujuan utama pengembangan sistem Sayur Ikat adalah:

1. **Platform E-Grocery Berkelanjutan (*Zero-Waste Grocery*)**:  
   Menyediakan platform belanja sayuran organik segar yang 100% bebas dari kemasan plastik sekali pakai (*single-use plastics*), menggantinya dengan kemasan alami ramah lingkungan (besek bambu dan bungkus daun pisang).
2. **Efisiensi Pemesanan Konsumen (*Frictionless Ordering*)**:  
   Memfasilitasi pemesanan sayur harian yang cepat tanpa membebani pelanggan dengan kewajiban unduh aplikasi native atau registrasi akun yang panjang (*guest checkout*).
3. **Otomatisasi Operasional & Manajemen Inventori**:  
   Mengeliminasi pencatatan manual pesanan yang sering tercecer pada percakapan WhatsApp dengan menyimpan data pesanan terstruktur langsung ke basis data server sebelum diarahkan ke chat WhatsApp pengelola.
4. **Pusat Pengawasan Mutu & Transparansi Layanan (*Quality Assurance*)**:  
   Menyediakan saluran umpan balik langsung dari pelanggan (*customer voice*) dengan multi-kriteria evaluasi dan unggah foto bukti kerusakan untuk mempercepat pemberian kompensasi dan garansi kesegaran.

---

## 3. Pengguna Sistem (Aktor & Karakteristik)

Sistem Sayur Ikat dirancang untuk melayani **2 (dua) aktor utama**:

| Aktor | Peran Utama | Hak Akses Rute | Karakteristik / Tingkat Keahlian |
| :--- | :--- | :--- | :--- |
| **Pelanggan (*Customer*)** | Mengakses katalog produk, mengelola keranjang belanja, mengirimkan pesanan via WhatsApp, serta mengirim ulasan dan komplain kualitas sayur. | - Halaman Toko (`/`)<br>- Formulir Ulasan (`/feedback`) | Konsumen rumah tangga, keluarga muda, dan individu umum di wilayah suburban; terbiasa mengoperasikan smartphone dan aplikasi WhatsApp; membutuhkan alur belanja yang ringkas. |
| **Pengelola Toko (*Admin*)** | Memantau ringkasan omset harian, memperbarui status siklus pesanan, mengelola stok & katalog produk, serta menindaklanjuti keluhan konsumen langsung ke WhatsApp. | - Dashboard Overview (`/admin`)<br>- Kelola Pesanan (`/admin/orders`)<br>- Kelola Produk (`/admin/products`)<br>- Kelola Kritik/Saran (`/admin/feedback`) | Tim operasional toko dan pengelola dapur/gudang; memiliki literasi komputer dan web browser tingkat menengah. |

---

## 4. Masalah yang Ingin Diselesaikan

```
+------------------------------------+       +------------------------------------+
|          MASALAH EKSISTING         |  ==>  |          SOLUSI SAYUR IKAT         |
+------------------------------------+       +------------------------------------+
| 1. Sampah plastik belanja sayur    |  -->  | Kemasan besek bambu & daun pisang  |
| 2. Pendaftaran akun toko rumit     |  -->  | Checkout langsung terhubung WA     |
| 3. Rekap orderan di chat tercecer  |  -->  | Simpan database otomatis + status  |
| 4. Komplain sayur rusak diabaikan  |  -->  | Form QC berfoto & follow-up instan |
+------------------------------------+       +------------------------------------+
```

1. **Limbah Plastik Kemasan Belanja Sayur**:  
   *Kondisi*: E-grocery konvensional menggunakan plastik pembungkus berlapis per komoditas sayur.  
   *Solusi Sayur Ikat*: Mengusung kemasan 100% bebas plastik menggunakan besek bambu, daun pisang, dan tali serat alami.
2. **Friksi Checkout yang Tinggi (*Friction-heavy Checkout*)**:  
   *Kondisi*: Pelanggan enggan mengunduh aplikasi berukuran besar atau mengisi registrasi akun panjang hanya untuk kebutuhan sayur harian.  
   *Solusi Sayur Ikat*: Menggunakan web responsif (*mobile-first*) dengan alur pemesanan langsung (*guest mode*) yang secara mulus tersambung ke WhatsApp.
3. **Pencatatan Pesanan Manual yang Rawan Tercecer di Chat WhatsApp**:  
   *Kondisi*: Transaksi yang hanya mengandalkan chat bebas berisiko salah catat item, kehilangan alamat, dan ketidakakuratan data stok.  
   *Solusi Sayur Ikat*: Sistem secara otomatis mencatat pesanan ke database SQLite/Prisma saat pengguna menekan tombol pesan, menghasilkan kode unik pesanan dan format chat WhatsApp terstruktur.
4. **Kurangnya Kepercayaan atas Kesegaran Sayur & Penanganan Komplain**:  
   *Kondisi*: Produk sayur rentan layu selama perjalanan dan konsumen kesulitan meminta garansi penggantian.  
   *Solusi Sayur Ikat*: Disediakan form *Grill Us Feedback* berating multidimensi dan unggah bukti foto sayur rusak, yang dapat langsung ditindaklanjuti admin melalui tautan WhatsApp ke nomor pelanggan.

---

## 5. Batasan Sistem (*System Scope & Constraints*)

1. **Cakupan Wilayah Operasional**:  
   Pengiriman produk dibatasi secara ketat hanya melayani area **Kota Bandung, Kota Cimahi, dan sekitarnya (Bandung Raya, Jawa Barat)**.
2. **Ketentuan Jam Pemesanan (*Cut-off Time*)**:  
   Pemesanan yang masuk sebelum pukul **12.00 WIB** akan dikirim pada hari yang sama (*same-day delivery*). Pesanan setelah pukul 12.00 WIB dijadwalkan pada hari pengantaran berikutnya.
3. **Mekanisme Pembayaran**:  
   Sistem **tidak menggunakan payment gateway otomatis pihak ketiga**. Pembayaran dilakukan melalui Transfer Bank, QRIS, atau Bayar di Tempat (*Cash on Delivery / COD*) dengan verifikasi final melalui percakapan WhatsApp Admin.
4. **Pelacakan Posisi Kurir**:  
   Sistem tidak menyediakan pelacakan GPS kurir secara *real-time* berbasis peta interaktif. Pelacakan pesanan berbasis status tahapan operasional (*PENDING*, *DIPROSES*, *DIKIRIM*, *SELESAI*).
5. **Batasan Berkas Bukti Foto**:  
   Unggahan foto bukti kerusakan sayur pada formulir kritik & saran dibatasi maksimal berukuran **5 MB** per berkas gambar.

---

## 6. Fitur Utama (*Core Features*)

### A. Fitur Sisi Pelanggan (*Customer Facing*)
1. **Katalog Produk & Kategori**:  
   Navigasi katalog sayur interaktif berdasarkan kategori (*Paket Sayur*, *Sayur Satuan*, *Buah & Bumbu*), dilengkapi informasi harga, stok riil, asal petani lokal, dan porsi saji.
2. **Keranjang Belanja (*Slide-over Cart Drawer*)**:  
   Manajemen item belanja (tambah, kurangi, hapus item) secara instan tanpa memuat ulang (*reload*) halaman, perhitungan otomatis subtotal serta ongkos kirim.
3. **WhatsApp Assisted Checkout**:  
   Formulir data penerima pesanan (nama, nomor WA, alamat lengkap, dan catatan khusus) yang otomatis terekam ke sistem dan mengarahkan pengguna ke obrolan WhatsApp toko dengan pesan pemesanan yang siap dikirim.
4. **Formulir Evaluasi & Kompensasi Mutu (*Feedback / QC*)**:  
   Penilaian 4 dimensi kepuasan (Kesegaran, Kemasan Daun, Ketepatan Kurir, Pengalaman Web), formulir catatan terbuka, dan unggah foto bukti sayur rusak.

### B. Fitur Sisi Pengelola (*Admin Facing*)
1. **Dasbor Ringkasan Operasional (*Dashboard Overview*)**:  
   Panel monitoring performa harian yang mencakup total pesanan hari ini, total omset/pendapatan, dan deteksi dini stok sayur yang menipis.
2. **Manajemen Siklus Pesanan (*Order Management*)**:  
   Daftar seluruh pesanan masuk dengan kemampuan pencarian ID/nama, filter status, pengubahan status pesanan (*PENDING*, *DIPROSES*, *DIKIRIM*, *SELESAI*), dan tombol langsung hubungi pelanggan via WhatsApp.
3. **Manajemen Katalog & Inventori (*Product Management*)**:  
   Operasi tambah produk baru, peremajaan data harga/stok, pemilihan foto, penentuan kategori, dan switch aktivasi/penonaktifan ketersediaan produk di toko publik.
4. **Pusat Ulasan Pelanggan (*Feedback Center*)**:  
   Daftar kartu masukan pelanggan beserta visualisasi rating, foto komplain, dan tombol *Follow-up WA* sekali klik untuk memberikan voucher kompensasi.
