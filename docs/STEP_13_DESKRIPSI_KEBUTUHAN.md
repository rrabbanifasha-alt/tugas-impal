# 3. DESKRIPSI RINCI PERANGKAT LUNAK

## 3.1 Deskripsi Kebutuhan

Dokumen spesifikasi kebutuhan perangkat lunak ini merangkum kebutuhan fungsional dan kebutuhan non-fungsional dari sistem aplikasi **Sayur Ikat**, disusun berdasarkan implementasi nyata sistem serta mengadaptasi format tabel standar Program Studi S1 Informatika Universitas Telkom:

---

### 3.1.1 Kebutuhan Fungsional

| No. | Kode Kebutuhan | Deskripsi | Nama Kebutuhan |
| :-: | :--- | :--- | :--- |
| **1.** | **FR-CAT-01** | Sistem harus menampilkan seluruh produk dari basis data pada halaman utama lengkap dengan nama, harga, stok fisik, asal petani lokal (Bandung Raya), dan gambar produk. | Menampilkan Katalog Produk |
| **2.** | **FR-CAT-02** | Sistem harus memungkinkan pengguna memfilter katalog berdasarkan kategori (*Paket Sayur*, *Sayur Satuan*, *Buah & Bumbu*) serta melakukan pencarian produk berdasarkan nama (*case-insensitive*). | Filter & Pencarian Produk |
| **3.** | **FR-CART-01** | Sistem harus mendukung penambahan produk ke keranjang, pengubahan kuantitas (+/-), penghapusan item, dan penyimpanan data keranjang secara otomatis di *LocalStorage* peramban pengguna. | Pengelolaan Keranjang Belanja |
| **4.** | **FR-CART-02** | Sistem harus menghitung subtotal belanja dan menetapkan biaya kirim secara otomatis: Rp10.000 untuk subtotal di bawah Rp50.000, dan gratis (Rp0) untuk subtotal Rp50.000 ke atas di wilayah operasional Bandung Raya. | Kalkulasi Biaya Kirim Otomatis |
| **5.** | **FR-ORDR-01** | Sistem harus memvalidasi kelengkapan data pemesan (Nama Lengkap, Nomor WhatsApp, dan Alamat Pengiriman) sebelum pesanan dapat diproses dan disimpan ke sistem. | Validasi Data Pemesan |
| **6.** | **FR-ORDR-02** | Sistem harus menyediakan pilihan metode pembayaran yang meliputi Cash on Delivery (COD), QRIS, Transfer Bank BCA, dan Transfer Bank Mandiri, dengan COD sebagai pilihan *default*. | Pemilihan Metode Pembayaran |
| **7.** | **FR-ORDR-03** | Setelah pesanan tersimpan di basis data dengan status `PENDING`, sistem harus memformat ringkasan pesanan dan membuka tautan pesan konfirmasi langsung ke nomor WhatsApp Admin Toko. | Integrasi Pesanan ke WhatsApp |
| **8.** | **FR-ORDR-04** | Sistem harus menyediakan tombol aksi sekunder untuk menyimpan transaksi langsung ke database tanpa membuka tautan WhatsApp, menampilkan konfirmasi sukses, dan mengosongkan keranjang belanja. | Simpan Pesanan Alternatif |
| **9.** | **FR-FEED-01** | Sistem harus menyediakan formulir ulasan purna jual yang mencakup rating 4 kategori mutu (kesegaran, kemasan daun pisang, pengiriman, dan pengalaman belanja) serta kolom kritik/saran. | Evaluasi Mutu & Ulasan |
| **10.** | **FR-FEED-02** | Sistem harus mendukung pengunggahan foto bukti produk rusak/cacat untuk garansi mutu dengan pembatasan ukuran berkas maksimal 5 MB. | Validasi Unggahan Bukti Foto |
| **11.** | **FR-ADM-01** | Sistem harus menampilkan metrik ringkasan pada panel pengelola toko yang meliputi total pesanan masuk, total omset, jumlah komoditas aktif, daftar produk dengan stok kritis ($\le$ 10), dan 5 transaksi terbaru. | Dasbor Ringkasan Operasional |
| **12.** | **FR-ADM-02** | Sistem harus menampilkan daftar seluruh pesanan masuk secara urut dari yang terbaru, memungkinkan filter status (`PENDING`, `DIPROSES`, `DIKIRIM`, `SELESAI`), pencarian pesanan, dan pembaruan status transaksi. | Manajemen & Status Pesanan |
| **13.** | **FR-ADM-03** | Sistem harus memungkinkan pengelola toko untuk menambah komoditas baru, mengubah informasi produk (nama, harga, kategori, foto), dan melakukan pembaruan kuota stok (termasuk tombol *toggle* cepat stok 0 atau 30). | Manajemen Produk & Stok |
| **14.** | **FR-ADM-04** | Sistem harus menampilkan seluruh rekapitulasi ulasan masuk dengan penandaan visual warna merah pada keluhan mutu negatif, serta menyediakan tautan langsung WhatsApp ke pelanggan untuk proses tindak lanjut kompensasi. | Rekapitulasi & Kompensasi Mutu |

---

### 3.1.2 Kebutuhan Non-Fungsional

| No. | Quality Criteria | Kode Kebutuhan | Deskripsi |
| :-: | :--- | :---: | :--- |
| **1.** | **Usability** | **NFR-USB-01** | Skor SUS minimal 75 dari minimal 20 responden, dan $\ge$ 90% responden dapat menyelesaikan pemesanan tanpa bantuan dalam $\le$ 3 menit. |
| **2.** | **Performance** | **NFR-PRF-01** | Halaman katalog termuat penuh (*Largest Contentful Paint*) $\le$ 2,5 detik pada koneksi $\ge$ 10 Mbps; penyimpanan pesanan $\le$ 1,0 detik, diuji hingga 50 pengguna bersamaan. |
| **3.** | **Security** | **NFR-SEC-01** | Seluruh komunikasi klien–server menggunakan HTTPS (TLS 1.2/1.3). |
| **4.** | **Security** | **NFR-SEC-02** | Sistem menolak 100% unggahan berformat selain `.jpg`/`.jpeg`/`.png`/`.webp` atau berukuran > 5 MB, baik di sisi klien maupun server. |
| **5.** | **Security** | **NFR-SEC-03** | Akses ke halaman dan API admin hanya dapat dilakukan setelah autentikasi; permintaan tanpa kredensial ditolak dengan status 401. |
| **6.** | **Reliability** | **NFR-REL-01** | Penyimpanan pesanan bersifat atomik: bila ada langkah yang gagal, tidak ada data pesanan parsial tersimpan (diuji pada 50 percobaan gagal, 0 data yatim). |
| **7.** | **Availability** | **NFR-AVL-01** | Sistem tersedia minimal 99% per bulan pada jam operasional. |

