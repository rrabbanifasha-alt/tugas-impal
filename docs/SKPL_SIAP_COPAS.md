# SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK (SKPL)

**SISTEM INFORMASI PEMESANAN DAN OPERASIONAL SAYUR IKAT**  
*(Platform Belanja Sayur Organik & Bebas Plastik)*

---

### LEMBAR PENGESAHAN DOKUMEN

| Keterangan | Informasi |
| :--- | :--- |
| **Nomor Dokumen** | SKPL-SI-2026-V1.0 |
| **Nama Proyek** | Sayur Ikat Web Application |
| **Instansi / Usaha** | Sayur Ikat (Area Tangerang & Gading Serpong) |
| **Tanggal Pembuatan** | 6 Oktober 2026 |
| **Status Dokumen** | Final / Disetujui |
| **Standar Acuan** | IEEE Std 830-1998 (*Software Requirements Specifications*) |

| Peran | Nama | Jabatan | Tanda Tangan |
| :--- | :--- | :--- | :--- |
| **Disusun Oleh** | Tim Pengembang Sayur Ikat | System Analyst & Developer | [ .................... ] |
| **Diperiksa Oleh** | Lead Software Engineer | Technical Lead | [ .................... ] |
| **Disetujui Oleh** | Product Owner / Manajemen | Stakeholder Bisnis | [ .................... ] |

---

## DAFTAR ISI

1. **BAB I: PENDAHULUAN**
   - 1.1 Tujuan Penulisan Dokumen
   - 1.2 Lingkup Masalah & Produk
   - 1.3 Definisi, Istilah, dan Akronim
   - 1.4 Referensi Dokumen
   - 1.5 Gambaran Umum Dokumen
2. **BAB II: DESKRIPSI UMUM SISTEM**
   - 2.1 Perspektif Produk & Konteks Sistem
   - 2.2 Fungsi Utama Perangkat Lunak
   - 2.3 Profil dan Karakteristik Pengguna
   - 2.4 Batasan-Batasan Sistem
   - 2.5 Asumsi dan Ketergantungan
3. **BAB III: KEBUTUHAN SPESIFIK SISTEM**
   - 3.1 Kebutuhan Antarmuka Eksternal
     - 3.1.1 Antarmuka Pengguna (*User Interface*)
     - 3.1.2 Antarmuka Perangkat Keras (*Hardware Interface*)
     - 3.1.3 Antarmuka Perangkat Lunak (*Software Interface*)
     - 3.1.4 Antarmuka Komunikasi (*Communication Interface*)
   - 3.2 Kebutuhan Fungsional (Use Case & Rincian Fitur)
     - 3.2.1 Daftar Aktor Sistem
     - 3.2.2 Pemetaan Use Case Sistem
     - 3.2.3 Spesifikasi Kebutuhan Fungsional Pelanggan (Storefront)
     - 3.2.4 Spesifikasi Kebutuhan Fungsional Pengelola (Admin Dashboard)
   - 3.3 Kebutuhan Non-Fungsional
     - 3.3.1 Kinerja (*Performance*)
     - 3.3.2 Ketersediaan (*Availability*)
     - 3.3.3 Keamanan (*Security*)
     - 3.3.4 Kemudahan Penggunaan (*Usability*)
     - 3.3.5 Portabilitas (*Portability*)
4. **BAB IV: MATRIKS KETERTELUSURAN KEBUTUHAN**

---

## BAB I: PENDAHULUAN

### 1.1 Tujuan Penulisan Dokumen
Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) ini disusun untuk mengidentifikasi dan merumuskan seluruh kebutuhan fungsional, kebutuhan non-fungsional, dan batasan perancangan pada aplikasi web **Sayur Ikat**. Dokumen ini menjadi pedoman resmi bagi tim pengembang perangkat lunak, manajer proyek, penguji mutu sistem (*quality assurance*), serta pengelola operasional bisnis dalam memastikan perangkat lunak yang dibangun sesuai dengan ekspektasi bisnis.

### 1.2 Lingkup Masalah & Produk
Sayur Ikat adalah platform *e-grocery* hiper-lokal yang melayani pemesanan sayur segar organik, paket memasak harian, serta bumbu dapur ramah lingkungan dengan kemasan **100% bebas plastik (zero plastic packaging)** menggunakan besek bambu dan pembungkus daun pisang.

Ruang lingkup sistem mencakup:
1. **Modul Storefront (Pelanggan)**:
   - Menampilkan katalog produk sayur (paket masakan harian, sayuran satuan, bumbu dan buah).
   - Menyediakan fitur keranjang belanja interaktif (*slide-over drawer*) dengan kalkulator subtotal dan ongkos kirim flat/gratis otomatis.
   - Menyediakan formulir checkout cepat (*guest checkout*) dengan pencatatan data ke basis data server dan integrasi pesan instan WhatsApp resmi toko.
   - Menyediakan formulir evaluasi mutu (*Grill Us / Feedback*) berbasis 4 pilar kualitas, catatan saran terbuka, dan unggah foto bukti kondisi sayur.
2. **Modul Dashboard (Admin Toko)**:
   - Menyajikan ringkasan metrik harian (total pesanan, estimasi pendapatan harian, produk stok kritis, daftar 5 pesanan terbaru).
   - Manajemen status siklus hidup pesanan (*PENDING*, *DIPROSES*, *DIKIRIM*, *SELESAI*).
   - Pengelolaan katalog produk (penambahan produk, pengubahan harga/stok/kategori, dan penonaktifan produk berelasi).
   - Peninjauan umpan balik pelanggan beserta fitur *direct follow-up* WhatsApp untuk pemberian sayur kompensasi.

Ruang lingkup di luar sistem:
- Sistem tidak menyediakan integrasi pembayaran kartu kredit otomatis (*payment gateway autodebit*); verifikasi pembayaran dilakukan via transfer manual / QRIS / COD.
- Sistem tidak menyediakan pelacakan GPS kurir secara *real-time*; konfirmasi pengantaran dilakukan melalui kurir internal.

### 1.3 Definisi, Istilah, dan Akronim

| Istilah / Akronim | Penjelasan Definisi |
| :--- | :--- |
| **SKPL** | Spesifikasi Kebutuhan Perangkat Lunak (padanan resmi IEEE 830 *Software Requirements Specification*). |
| **Zero-Waste** | Model operasional tanpa sampah kemasan plastik sekali pakai, menggunakan daun pisang dan besek. |
| **Storefront** | Bagian antarmuka web publik yang diakses oleh pelanggan umum untuk berbelanja. |
| **Drawer Cart** | Panel keranjang belanja geser dari sisi kanan layar tanpa berpindah halaman. |
| **Deep Link** | Tautan taut langsung ke aplikasi obrolan WhatsApp (`wa.me`) dengan pesan otomatis terisi. |
| **COD** | *Cash on Delivery* (metode pembayaran tunai saat pesanan diterima). |
| **QRIS** | *Quick Response Code Indonesian Standard* (pembayaran via dompet digital nasional). |

### 1.4 Referensi Dokumen
1. IEEE Std 830-1998, *IEEE Recommended Practice for Software Requirements Specifications*.
2. Pressman, R. S. *Software Engineering: A Practitioner's Approach*. McGraw-Hill Education.
3. Panduan Pengguna (*User Guide*) Aplikasi Web Sayur Ikat 2026.

### 1.5 Gambaran Umum Dokumen
Dokumen ini disusun ke dalam empat bab utama. Bab I menjabarkan pengantar, tujuan, dan batasan lingkup. Bab II memberikan gambaran umum sistem dan pengguna. Bab III menjelaskan kebutuhan spesifik fungsional dan non-fungsional. Bab IV memuat matriks ketertelusuran kebutuhan terhadap modul aplikasi.

---

## BAB II: DESKRIPSI UMUM SISTEM

### 2.1 Perspektif Produk & Konteks Sistem
Aplikasi Sayur Ikat dirancang sebagai sistem web responsif terintegrasi. Sistem menghubungkan pelanggan di wilayah hunian perumahan dengan tim operasional toko dan armada kurir lokal.

**Bagan Alur Konteks Sistem:**
```text
[ PELANGGAN ] 
      │ 
      ├─► (1. Akses Katalog Sayur di Web Browser)
      ├─► (2. Pilih Produk & Isi Data Pengiriman di Drawer Keranjang)
      ├─► (3. Transaksi Tersimpan ke Database Server)
      ├─► (4. Terhubung ke WhatsApp Admin Toko via Tautan Pesanan Otomatis)
      └─► (5. Mengisi Evaluasi Kualitas & Upload Foto di Halaman Feedback)
            │
            ▼
[ SERVER APLIKASI SAYUR IKAT ] ◄──► [ BASIS DATA SQLITE ]
            ▲
            │
[ ADMIN OPERASIONAL / DAPUR ]
      ├─► (1. Memantau Metrik Pesanan & Omset di Dashboard)
      ├─► (2. Memperbarui Status Pesanan: Pending -> Diproses -> Dikirim -> Selesai)
      ├─► (3. Mengelola Stok & Katalog Produk)
      └─► (4. Meninjau Feedback & Menghubungi Pelanggan via WhatsApp)
```

### 2.2 Fungsi Utama Perangkat Lunak
1. **Katalog Sayuran Organik**: Menampilkan informasi transparan mengenai nama sayur, porsi saji masakan, deskripsi manfaat, harga satuan, dan kelompok tani asal panen.
2. **Pemesanan Cepat Tanpa Akun (*Guest Order*)**: Pelanggan dapat berbelanja secara cepat hanya dengan memasukkan nama, nomor WhatsApp, dan alamat kirim tanpa harus melalui proses registrasi akun yang berbelit.
3. **Penyimpanan Pesanan Terstruktur**: Pesanan tercatat ke basis data server secara permanen dengan identitas ID pesanan unik.
4. **Checkout Terpadu WhatsApp**: Mengonversi keranjang belanja menjadi format faktur ringkas siap kirim ke nomor WhatsApp resmi toko.
5. **Quality Control & Complaint Channel**: Formulir evaluasi kualitas berkala dengan opsi unggah foto bukti kerusakan fisik untuk investigasi tim dapur.
6. **Panel Manajemen Operasional**: Halaman kontrol bagi admin toko untuk memantau pendapatan, memperbarui ketersediaan stok sayur, dan merubah status pengantaran kurir.

### 2.3 Profil dan Karakteristik Pengguna

| Kategori Pengguna | Karakteristik & Kebutuhan Pengguna | Hak Akses Sistem |
| :--- | :--- | :--- |
| **Pelanggan (Customer)** | Ibu rumah tangga, pekerja profesional, atau konsumen gaya hidup sehat di area Tangerang dan Gading Serpong yang menginginkan sayuran segar tanpa plastik. Memerlukan antarmuka yang simpel, cepat, dan mudah diakses dari ponsel cerdas. | - Akses halaman publik (`/`, `/feedback`).<br>- Menambah produk ke keranjang.<br>- Mengirim pesanan.<br>- Mengirim evaluasi/kritik. |
| **Admin Toko (Operator)** | Staf operasional dapur penyiapan sayur, staf logistik kurir, dan admin layanan pelanggan Sayur Ikat. Memerlukan tabel data yang ringkas, responsif, dan mudah diedit statusnya. | - Akses portal admin (`/admin`, `/admin/orders`, `/admin/products`, `/admin/feedback`).<br>- Mengubah status pesanan.<br>- Menambah/mengedit produk.<br>- Meninjau feedback. |

### 2.4 Batasan-Batasan Sistem
1. **Wilayah Pengantaran Terbatas**: Sistem difokuskan untuk pesanan dengan alamat di wilayah Kota Tangerang, Kabupaten Tangerang, Tangerang Selatan, dan kawasan Gading Serpong.
2. **Ambang Batas Jadwal Masak (*Cut-Off Time*)**: Pemesanan sebelum pukul 12.00 WIB dikirim pada hari yang sama (*same-day delivery*); pesanan setelah jam tersebut berpotensi dikirim keesokan paginya.
3. **Kebijakan Biaya Kirim**: Biaya kirim flat sebesar Rp 10.000 untuk total belanja sayur di bawah Rp 50.000. Belanja $\ge$ Rp 50.000 mendapatkan fasilitas Bebas Ongkir (Rp 0).
4. **Batasan Ukuran File Foto**: Bukti foto kerusakan sayur pada form feedback dibatasi maksimal sebesar 5 MB.
5. **Basis Data**: Menggunakan SQLite yang dihubungkan melalui Prisma ORM untuk menjamin kestabilan dan kemudahan pemeliharaan data.

### 2.5 Asumsi dan Ketergantungan
- Perangkat pelanggan diasumsikan memiliki koneksi internet aktif dan peramban web modern yang mendukung JavaScript dan Web Storage API (*LocalStorage*).
- Pelanggan diasumsikan memiliki aplikasi WhatsApp atau peramban yang dapat mengakses tautan obrolan WhatsApp Web.

---

## BAB III: KEBUTUHAN SPESIFIK SISTEM

### 3.1 Kebutuhan Antarmuka Eksternal

#### 3.1.1 Antarmuka Pengguna (*User Interface*)
- **Palet Warna Tematik**: Menggunakan warna alami tanah dan sayuran (Warna dasar latar belakang: `#FAF7F2` krem lembut; Warna utama tombol & teks penting: `#2D5A27` hijau daun gelap; Warna aksen: `#D96B43` terakota hangat).
- **Tipografi**: Menggunakan kombinasi huruf sans-serif modern yang terbaca jelas pada layar sentuh ponsel dan font serif elegan pada judul katalog.
- **Responsivitas**: Desain antarmuka fleksibel mengikuti ukuran layar perangkat (*Mobile First* untuk ponsel cerdas layar 360px hingga layar desktop lebar 1920px).
- **Komponen Keranjang**: Keranjang belanja berformat *slide-over drawer* yang muncul dari kanan tanpa memicu *refresh* halaman.

#### 3.1.2 Antarmuka Perangkat Keras (*Hardware Interface*)
- Perangkat klien: Komputer, laptop, tablet, atau ponsel cerdas (Android/iOS) dengan RAM minimal 2 GB dan layar berwarna.
- Perangkat server: Lingkungan hosting/server virtual dengan spesifikasi minimal CPU 1 Core, RAM 512 MB, dan ruang penyimpanan 1 GB.

#### 3.1.3 Antarmuka Perangkat Lunak (*Software Interface*)
- Sistem Operasi Server: Linux (Ubuntu/Debian) atau Windows Server yang terpasang runtime Node.js v18+.
- Web Framework: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS.
- Database & ORM: SQLite dengan Prisma ORM v6.
- Peramban Klien: Google Chrome, Safari, Mozilla Firefox, Microsoft Edge (versi rilisan 2 tahun terakhir).

#### 3.1.4 Antarmuka Komunikasi (*Communication Interface*)
- Protokol Web: HTTP dan HTTPS dengan enkripsi data TLS 1.3.
- Format Pertukaran Data: JSON (*JavaScript Object Notation*) melalui antarmuka REST API.
- Integrasi WhatsApp: Menggunakan protokol deep-linking URL `https://wa.me/{nomor_admin}?text={pesan_url_encoded}`.

---

### 3.2 Kebutuhan Fungsional

#### 3.2.1 Daftar Aktor Sistem
1. **Pelanggan**: Pihak eksternal yang mencari sayuran, memasukkan produk ke keranjang, menyelesaikan transaksi pemesanan, dan memberikan evaluasi kualitas.
2. **Admin Toko**: Pihak internal toko yang mengelola pemrosesan pesanan, persediaan stok sayur, dan menindaklanjuti masukan kritik dari pelanggan.

#### 3.2.2 Pemetaan Use Case Sistem

| ID Use Case | Nama Use Case | Aktor Terlibat | Deskripsi Singkat |
| :--- | :--- | :--- | :--- |
| **UC-01** | Melihat & Menyaring Katalog Sayur | Pelanggan | Menjelajahi katalog sayur berdasarkan kategori paket, satuan, bumbu. |
| **UC-02** | Mengelola Keranjang Belanja | Pelanggan | Menambah, merubah jumlah kuantitas, dan menghapus item dari keranjang. |
| **UC-03** | Melakukan Pemesanan & Checkout | Pelanggan | Mengisi alamat & kontak, menyimpan pesanan ke server, lalu membuka WhatsApp. |
| **UC-04** | Mengirim Evaluasi Kritik & Saran | Pelanggan | Mengisi 4 pilar rating, teks saran, dan mengunggah foto bukti sayur layu/rusak. |
| **UC-05** | Memantau Ringkasan Operasional | Admin Toko | Melihat rekap omset harian, jumlah order hari ini, dan stok yang menipis. |
| **UC-06** | Mengelola Status Pesanan | Admin Toko | Melihat daftar pesanan pelanggan dan merubah status pengerjaan kurir. |
| **UC-07** | Mengelola Katalog Produk & Stok | Admin Toko | Menambah produk baru, mengedit harga/stok, dan mengaktifkan/menonaktifkan sayur. |
| **UC-08** | Meninjau & Menindaklanjuti Feedback | Admin Toko | Membaca kritik pelanggan, melihat foto bukti, dan menghubungi pelanggan via WA. |

---

#### 3.2.3 Spesifikasi Kebutuhan Fungsional Pelanggan (Storefront)

| Kode Kebutuhan | Nama Kebutuhan | Deskripsi Spesifikasi Fungsional | Tingkat Prioritas |
| :--- | :--- | :--- | :--- |
| **SKPL-F-01** | Tampilan Katalog Lengkap | Sistem harus menampilkan daftar sayuran aktif yang memuat foto produk, nama, deskripsi, kategori, harga rupiah, ketersediaan stok, info porsi makan, lencana kualitas (*100% Bebas Plastik* / *Panen Subuh*), dan transparansi kelompok tani asal. | **Tinggi (Must Have)** |
| **SKPL-F-02** | Penyaringan Kategori Sayur | Sistem harus menyediakan tombol filter kategori: Semua Produk, Paket Sayur, Sayur Satuan, serta Buah & Bumbu. | **Tinggi (Must Have)** |
| **SKPL-F-03** | Interaksi Keranjang Belanja | Sistem harus memungkinkan penambahan item ke keranjang, penambahan/pengurangan kuantitas dengan tombol stepper (`-` / `+`), dan penghapusan item. | **Tinggi (Must Have)** |
| **SKPL-F-04** | Penyimpanan Keranjang Lokal | Sistem harus menyimpan daftar keranjang secara lokal di *LocalStorage* browser agar isi belanjaan tidak terhapus saat halaman direfresh atau browser ditutup sementara. | **Sedang (Should Have)** |
| **SKPL-F-05** | Kalkulasi Otomatis Biaya & Ongkir | Sistem harus menghitung subtotal belanjaan secara otomatis dan menentukan tarif ongkir: Gratis (Rp 0) jika belanjaan $\ge$ Rp 50.000; atau Rp 10.000 jika $<$ Rp 50.000. | **Tinggi (Must Have)** |
| **SKPL-F-06** | Formulir Pengiriman & Pembayaran | Sistem harus memvalidasi data pembeli di dalam drawer keranjang belanja: Nama Lengkap (wajib), Nomor WhatsApp (wajib), Alamat Pengiriman Tangerang/Serpong (wajib), Catatan Khusus (opsional), dan Metode Pembayaran (COD / QRIS / Transfer BCA / Transfer Mandiri). | **Tinggi (Must Have)** |
| **SKPL-F-07** | Pencatatan Pesanan ke Server | Sistem harus menyimpan transaksi baru yang terverifikasi ke tabel `orders` dan `order_items` di basis data server dengan status awal `PENDING`. | **Tinggi (Must Have)** |
| **SKPL-F-08** | Pembuatan Invoice Teks WhatsApp | Sistem harus mengonversi rincian pesanan yang berhasil disimpan menjadi format pesan WhatsApp terstruktur dan membuka aplikasi WhatsApp ke nomor admin resmi Sayur Ikat. | **Tinggi (Must Have)** |
| **SKPL-F-09** | Formulir Evaluasi Kualitas Mutu | Sistem harus menyediakan halaman khusus (`/feedback`) berisi evaluasi 4 dimensi: Kesegaran Sayur (Layu/Biasa/Segar), Bungkusan Daun (Robek/Berantakan/Rapi), Ketepatan Kurir (Terlambat/Tepat), dan Pengalaman Pesan (Ribet/Gampang). | **Tinggi (Must Have)** |
| **SKPL-F-10** | Unggah Foto Bukti Fisik Sayur | Sistem harus mengizinkan pelanggan melampirkan foto bukti kondisi fisik sayur/kemasan langsung dari kamera smartphone atau galeri (maksimal 5 MB). | **Tinggi (Must Have)** |
| **SKPL-F-11** | Kolom Kompensasi Pelanggan | Sistem harus menyediakan input data nama, nomor telepon, dan nomor pesanan pelanggan pada formulir umpan balik untuk memudahkan admin memberikan voucher/sayur ganti rugi. | **Sedang (Should Have)** |
| **SKPL-F-12** | Salinan Kritik ke WhatsApp | Sistem harus menyediakan tombol opsional bagi pembeli untuk meneruskan salinan kritik/saran langsung ke WhatsApp Admin Sayur Ikat setelah form tersimpan di server. | **Rendah (Could Have)** |

---

#### 3.2.4 Spesifikasi Kebutuhan Fungsional Pengelola (Admin Dashboard)

| Kode Kebutuhan | Nama Kebutuhan | Deskripsi Spesifikasi Fungsional | Tingkat Prioritas |
| :--- | :--- | :--- | :--- |
| **SKPL-F-13** | Dashboard Ringkasan Bisnis | Sistem harus menampilkan kartu indikator KPI operasional di `/admin`: Total Pesanan Hari Ini, Total Omset Hari Ini, Total Produk Aktif, Jumlah Produk Menipis (Stok $\le$ 10), dan 5 pesanan terbaru. | **Tinggi (Must Have)** |
| **SKPL-F-14** | Rekapitulasi Data Pesanan | Sistem harus menyajikan tabel seluruh pesanan masuk yang mencantumkan Nomor ID pesanan, Tanggal pesan, Nama & Kontak pelanggan, Alamat antar, Rincian item sayur, Total bayar, dan Status operasional. | **Tinggi (Must Have)** |
| **SKPL-F-15** | Pencarian & Filter Pesanan | Sistem harus menyediakan kolom pencarian pesanan (berdasarkan ID pesanan, nama pemesan, atau alamat) serta filter tab berdasarkan status (`ALL`, `PENDING`, `DIPROSES`, `DIKIRIM`, `SELESAI`). | **Tinggi (Must Have)** |
| **SKPL-F-16** | Pengubahan Status Pesanan | Sistem harus memfasilitasi admin untuk memperbarui status pesanan pelanggan secara langsung melalui *dropdown* pilihan status pada tabel orders. | **Tinggi (Must Have)** |
| **SKPL-F-17** | Modal Detail Pesanan | Sistem harus menyediakan jendela *modal pop-up* yang menampilkan detail menyeluruh item belanja, catatan instruksi pengiriman, dan tombol panggilan obrolan langsung ke WhatsApp pemesan. | **Sedang (Should Have)** |
| **SKPL-F-18** | Manajemen Inventaris Sayur | Sistem harus menampilkan tabel seluruh katalog sayur di `/admin/products` dengan informasi stok terkini, kategori, harga jual, serta tombol aksi cepat. | **Tinggi (Must Have)** |
| **SKPL-F-19** | Tambah & Edit Produk | Sistem harus menyediakan form modal untuk memasukkan produk sayur baru atau memperbarui data produk lama (nama, deskripsi, harga, kategori, stok, foto). | **Tinggi (Must Have)** |
| **SKPL-F-20** | Proteksi Hapus Data Produk | Sistem tidak boleh menghapus produk yang sudah memiliki relasi di riwayat transaksi; jika admin menghapus produk berelasi, sistem harus mengamankan integritas data dengan mengubah stok menjadi `0` (*soft deactivation*). | **Tinggi (Must Have)** |
| **SKPL-F-21** | Panel Tinjauan Kritik Pelanggan | Sistem harus menampilkan daftar masukan pelanggan di `/admin/feedback` yang dilengkapi rating per pilar, catatan kritik terbuka, serta pratinjau foto bukti kerusakan. | **Tinggi (Must Have)** |
| **SKPL-F-22** | Follow-Up WhatsApp Otomatis | Sistem harus menyediakan tombol *Follow-up WA* pada setiap kartu kritik pelanggan yang secara langsung membuka WhatsApp dengan draf permohonan maaf dan solusi kompensasi. | **Sedang (Should Have)** |

---

### 3.3 Kebutuhan Non-Fungsional

| Kode | Parameter | Spesifikasi Tolok Ukur Kebutuhan Non-Fungsional |
| :--- | :--- | :--- |
| **SKPL-NF-01** | **Kinerja (*Performance*)** | Waktu respon pemuatan halaman pertama (*First Contentful Paint*) harus di bawah 2 detik pada jaringan seluler 4G standar. Waktu eksekusi kueri API simpan pesanan dan feedback maksimal 500 milidetik. |
| **SKPL-NF-02** | **Ketersediaan (*Availability*)** | Sistem harus dapat diakses selama 24 jam sehari, 7 hari seminggu dengan target ketersediaan layanan minimal 99,5%. |
| **SKPL-NF-03** | **Keamanan (*Security*)** | Data masukan divalidasi ganda (*client-side validation* dan *server-side validation*). Ukuran muatan berkas gambar dibatasi maksimal 5 MB untuk mencegah beban memori berlebih. Nomor kontak pelanggan dilindungi dan hanya dapat dilihat oleh pengelola toko. |
| **SKPL-NF-04** | **Kemudahan (*Usability*)** | Alur belanja dirancang sangat ringkas (pembelian diselesaikan dalam 1 langkah drawer tanpa proses pendaftaran akun rumit). Desain antarmuka dilengkapi ikon visual dan status pesanan dengan pembeda warna yang jelas. |
| **SKPL-NF-05** | **Keandalan (*Reliability*)** | Apabila koneksi internet pelanggan terputus sesaat saat memilih sayur, data keranjang belanja tidak hilang karena diamankan secara lokal di peramban pengguna. |
| **SKPL-NF-06** | **Portabilitas (*Portability*)** | Antarmuka web dapat dijalankan secara konsisten pada berbagai macam peramban web modern (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge) di platform Android, iOS, Windows, dan macOS. |

---

## BAB IV: MATRIKS KETERTELUSURAN KEBUTUHAN

Berikut adalah matriks ketertelusuran yang menghubungkan setiap butir kebutuhan fungsional dengan antarmuka implementasinya:

| ID Kebutuhan | Kategori Modul | Lokasi Halaman Web | Nama Komponen / Berkas Kode Sumber |
| :--- | :--- | :--- | :--- |
| **SKPL-F-01** | Storefront | `/` | `Hero.tsx`, `ProductCatalog.tsx`, `ProductCard.tsx` |
| **SKPL-F-02** | Storefront | `/` | `ProductCatalog.tsx` (Tab Navigasi) |
| **SKPL-F-03** | Storefront | `/` (Drawer) | `CartDrawer.tsx`, `CartContext.tsx` |
| **SKPL-F-04** | Storefront | Local Storage | `CartContext.tsx` (*LocalStorage Hook*) |
| **SKPL-F-05** | Storefront | `/` (Drawer) | `CartDrawer.tsx` (Kalkulasi Fee Ongkir) |
| **SKPL-F-06** | Storefront | `/` (Drawer) | `CartDrawer.tsx` (Form Input Data) |
| **SKPL-F-07** | Backend API | `/api/orders` | `src/app/api/orders/route.ts` |
| **SKPL-F-08** | Komunikasi | WhatsApp Link | `src/lib/whatsapp.ts`, `CartDrawer.tsx` |
| **SKPL-F-09** | Quality Control | `/feedback` | `src/app/feedback/page.tsx` |
| **SKPL-F-10** | Quality Control | `/feedback` | `src/app/feedback/page.tsx` (FileReader) |
| **SKPL-F-11** | Quality Control | `/feedback` | `src/app/feedback/page.tsx` (Kolom Kontak) |
| **SKPL-F-12** | Quality Control | `/feedback` | `src/app/feedback/page.tsx` (Direct WA) |
| **SKPL-F-13** | Admin Dashboard| `/admin` | `src/app/admin/page.tsx`, `/api/admin/stats` |
| **SKPL-F-14** | Admin Pesanan | `/admin/orders` | `src/app/admin/orders/page.tsx` |
| **SKPL-F-15** | Admin Pesanan | `/admin/orders` | `src/app/admin/orders/page.tsx` (Filter Bar) |
| **SKPL-F-16** | Admin Pesanan | `/admin/orders` | `src/app/admin/orders/page.tsx`, `/api/admin/orders` |
| **SKPL-F-17** | Admin Pesanan | `/admin/orders` | `src/app/admin/orders/page.tsx` (Modal Detail) |
| **SKPL-F-18** | Admin Produk | `/admin/products`| `src/app/admin/products/page.tsx` |
| **SKPL-F-19** | Admin Produk | `/admin/products`| `src/app/admin/products/page.tsx`, `/api/admin/products` |
| **SKPL-F-20** | Admin Produk | `/admin/products`| `src/app/api/admin/products/route.ts` (Soft Check) |
| **SKPL-F-21** | Admin QC | `/admin/feedback`| `src/app/admin/feedback/page.tsx`, `/api/feedback` |
| **SKPL-F-22** | Admin QC | `/admin/feedback`| `src/app/admin/feedback/page.tsx` (Follow-up WA) |
