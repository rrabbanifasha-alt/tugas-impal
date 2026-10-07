# 4. KEBUTUHAN LAIN-LAIN

## 4.1 Antarmuka Pengguna (*User Interface*)

Kebutuhan antarmuka pengguna mendefinisikan seluruh layar, halaman, dan komponen interaksi visual yang disediakan oleh sistem aplikasi **Sayur Ikat**. Seluruh antarmuka dirancang responsif (*mobile-first* hingga *desktop*), mengusung palet warna organik (*earthy green*), serta dipetakan secara ketat untuk mendukung eksekusi 8 *Use Case* yang telah didefinisikan sebelumnya tanpa memuat antarmuka yang tidak memiliki fungsi operasional.

---

### A. Tabel Pemetaan Halaman Antarmuka Pengguna terhadap Use Case

| No. | Nama Halaman / Komponen UI | Rute URL / Tipe Akses | Aktor Pengguna | Use Case yang Didukung | Fungsi Utama Antarmuka |
| :-: | :--- | :--- | :--- | :---: | :--- |
| **1.** | **Halaman Utama & Katalog Produk** | `/` (Halaman Publik) | Pelanggan | `UC-01` | Menampilkan etalase komoditas sayur organik, filter kategori, pencarian produk, dan tombol tambah ke keranjang. |
| **2.** | **Panel Drawer Keranjang & Pemesanan** | `/` (Komponen *Slide-Over Drawer*) | Pelanggan | `UC-02`, `UC-03` | Mengelola kuantitas belanja, menampilkan kalkulasi ongkir otomatis, formulir data pemesan (*guest checkout*), pemilihan metode pembayaran, serta konfirmasi pesanan ke WhatsApp/database. |
| **3.** | **Halaman Formulir Evaluasi Mutu** | `/feedback` (Halaman Publik) | Pelanggan | `UC-04` | Menyediakan formulir penilaian 4 aspek mutu, unggahan foto bukti sayur rusak ($\le$ 5 MB), input kritik/saran, dan penerusan komplain. |
| **4.** | **Halaman Dasbor Ringkasan Operasional** | `/admin` (Portal Pengelola) | Admin Toko | `UC-05` | Menyajikan metrik statistik bisnis (omset harian, total transaksi, peringatan stok kritis $\le$ 10), navigasi cepat, dan rekap 5 pesanan terbaru. |
| **5.** | **Halaman Manajemen Pesanan Masuk** | `/admin/orders` (Portal Pengelola) | Admin Toko | `UC-06` | Menampilkan tabel transaksi masuk, filter status pesanan, pencarian pemesan, pengubahan status (`PENDING` $\rightarrow$ `SELESAI`), dan tombol kontak WhatsApp pelanggan. |
| **6.** | **Halaman Manajemen Produk & Stok** | `/admin/products` (Portal Pengelola) | Admin Toko | `UC-07` | Mengelola katalog internal, formulir penambahan sayur baru, modal edit informasi produk, dan tombol *toggle* instan kuota stok (0 atau 30). |
| **7.** | **Halaman Rekapitulasi & Kompensasi Ulasan** | `/admin/feedback` (Portal Pengelola) | Admin Toko | `UC-08` | Menampilkan seluruh ulasan kepuasan, sorotan visual merah pada keluhan mutu negatif, pratinjau foto bukti kerusakan sayur, dan tombol tindak lanjut kompensasi via WhatsApp. |

---

### B. Deskripsi Rinci Kebutuhan Antarmuka Pengguna

#### 1. Halaman Utama & Katalog Produk (`/`)
* **Pengguna:** Pelanggan
* **Karakteristik Visual & Tata Letak:**
  * Bagian atas memuat bilah navigasi (*Navbar*) dengan logo Sayur Ikat, indikator pengiriman lokal Bandung Raya, dan tombol keranjang belanja disertai lencana jumlah item (*badge counter*).
  * Bagian *Hero Section* mengedukasi nilai tambah produk: 100% organik, kemasan daun pisang tanpa plastik, dipanen langsung dari petani Lembang, Ciwidey, dan Pangalengan.
  * Bilah kontrol interaktif memuat kolom pencarian teks (*search bar*) dan tombol tab filter kategori (*Semua*, *Paket Sayur*, *Sayur Satuan*, *Buah & Bumbu*).
  * Bagian *Grid* Katalog menyajikan kartu produk responsif yang memuat citra sayur, label kategori, nama produk, harga satuan per ikat, informasi asal petani, kuota stok fisik, dan tombol aksi "Tambah ke Keranjang".

#### 2. Panel Drawer Keranjang & Formulir Pemesanan (`/` - Slide-over Drawer)
* **Pengguna:** Pelanggan
* **Karakteristik Visual & Tata Letak:**
  * Muncul dari sisi kanan layar (*slide-over drawer*) saat ikon keranjang belanja pada *navbar* atau tombol pada kartu produk ditekan.
  * Area daftar belanja menampilkan baris item produk, tombol manipulasi kuantitas (`-` / `+`), tombol hapus item, dan subtotal harga.
  * Baris kalkulasi ongkos kirim menampilkan tarif Rp10.000 atau label hijau "Gratis Ongkir" secara dinamis jika akumulasi subtotal mencapai minimal Rp50.000.
  * Formulir *Checkout* sederhana (*guest checkout*) memuat input Nama Lengkap, Nomor WhatsApp aktif, Alamat Pengantaran lengkap, dan Catatan Opsional.
  * Opsi metode pembayaran berupa pilihan radio yang rapi: COD (awal/default), QRIS, Transfer Bank BCA, dan Transfer Bank Mandiri.
  * Tombol aksi ganda: Tombol utama "Pesan via WhatsApp" (berwarna hijau mencolok) dan tombol alternatif "Simpan Pesanan ke Sistem".

#### 3. Halaman Formulir Evaluasi Mutu (`/feedback`)
* **Pengguna:** Pelanggan
* **Karakteristik Visual & Tata Letak:**
  * Halaman berpusat tunggal (*single-column container*) dengan tata letak bersih dan ramah pengguna.
  * Komponen pilihan penilaian mutu 4 kategori: Kesegaran Sayur, Kerapian Kemasan Daun, Ketepatan Pengiriman, dan Pengalaman Belanja.
  * Kolom unggah berkas citra bukti mutu dengan indikator batas ukuran 5 MB dan pratinjau gambar instan (*image preview*).
  * Area teks masukan untuk kritik, komplain, atau saran konstruktif.
  * Tombol kirim ulasan dengan konfirmasi visual dialog sukses pengiriman ulasan.

#### 4. Halaman Dasbor Ringkasan Operasional (`/admin`)
* **Pengguna:** Admin Toko
* **Karakteristik Visual & Tata Letak:**
  * Dilengkapi bilah navigasi samping (*Sidebar*) atau bilah atas untuk perpindahan cepat antar modul internal.
  * Kartu indikator metrik utama (*Stat Cards*): Total Pesanan Hari Ini, Total Omset/Pendapatan, Jumlah Produk Terdaftar, dan Jumlah Produk Berstok Kritis ($\le$ 10).
  * Tabel ringkas 5 pesanan terbaru yang masuk beserta status terkini dan tombol pintas navigasi ke halaman kelola pesanan penuh.

#### 5. Halaman Manajemen Pesanan Masuk (`/admin/orders`)
* **Pengguna:** Admin Toko
* **Karakteristik Visual & Tata Letak:**
  * Bilah alat (*toolbar*) atas memuat filter status bertab (*Semua*, *PENDING*, *DIPROSES*, *DIKIRIM*, *SELESAI*) dan kotak pencarian pemesan (nama, WA, alamat).
  * Tabel data pesanan lengkap yang menyajikan ID pesanan, tanggal/waktu transaksi, identitas pemesan, daftar item belanja, total tagihan, metode bayar, dan status transaksi.
  * Menu tarik-turun (*dropdown*) status pesanan yang memungkinkan admin mengubah tahapan pemrosesan secara langsung.
  * Tombol aksi rincian pesanan dan tombol hijau berlogo WhatsApp untuk membuka tautan chat langsung ke pelanggan yang bersangkutan.

#### 6. Halaman Manajemen Produk & Stok Fisik (`/admin/products`)
* **Pengguna:** Admin Toko
* **Karakteristik Visual & Tata Letak:**
  * Tombol utama "Tambah Produk Baru" yang memicu jendela modal formulir pengisian data komoditas (nama, harga, kategori, deskripsi, URL gambar, stok awal).
  * Tabel daftar komoditas internal yang menampilkan foto mini sayur, nama produk, kategori, harga satuan, dan kuantitas stok saat ini.
  * Tombol aksi cepat *toggle* stok: satu kali klik untuk mengosongkan stok (0 / nonaktif) atau mengisi ulang stok cepat (30 / aktif).
  * Tombol aksi ubah (*edit*) untuk memperbarui rincian spesifikasi produk.

#### 7. Halaman Rekapitulasi & Kompensasi Ulasan (`/admin/feedback`)
* **Pengguna:** Admin Toko
* **Karakteristik Visual & Tata Letak:**
  * Kartu-kartu ulasan pelanggan yang diurutkan secara kronologis berdasarkan waktu kirim.
  * Penandaan visual dengan warna merah (*danger badge*) otomatis pada kartu ulasan yang memberikan rating mutu buruk (contoh: sayur layu atau kemasan robek).
  * Tampilan foto bukti sayur rusak yang dapat diperbesar untuk kebutuhan inspeksi mutu.
  * Tombol tindak lanjut "Hubungi via WhatsApp" yang otomatis membuka percakapan ke nomor WhatsApp pelanggan terkait pemberian garansi atau kompensasi sayur pengganti.
