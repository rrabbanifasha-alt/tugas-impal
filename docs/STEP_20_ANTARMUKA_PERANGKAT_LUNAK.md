# 4. KEBUTUHAN LAIN-LAIN

## 4.3 Antarmuka Perangkat Lunak (*Software Interface*)

Kebutuhan antarmuka perangkat lunak mendefinisikan seluruh perangkat lunak eksternal, sistem operasi, basis data, *runtime engine*, serta antarmuka layanan pihak ketiga yang dibutuhkan oleh sistem **Sayur Ikat** agar dapat beroperasi secara penuh. Seluruh peranti lunak yang dijabarkan di bawah ini konsisten dengan lingkungan operasi yang telah ditetapkan pada Subbab 2.4.

---

### A. Tabel Spesifikasi Perangkat Lunak Eksternal

| Kategori Perangkat Lunak | Nama Perangkat Lunak / Layanan | Versi Minimal / Acuan | Peran dan Fungsi dalam Sistem |
| :--- | :--- | :--- | :--- |
| **Sistem Operasi Klien** | Android, iOS, Windows, macOS, Linux | Versi OS modern dengan peramban mutakhir | Menyediakan *platform host* untuk menjalankan peramban web dan aplikasi perpesanan WhatsApp. |
| **Sistem Operasi Server** | Sistem Operasi berbasis Linux atau Windows | OS yang mendukung Node.js 20.9+ (LTS) | Menjadi lingkungan *host* peladen untuk menjalankan proses *service* Node.js dan mengelola berkas database pada disk persisten. |
| **Peramban Web Klien** | Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge | Versi modern (standar HTML5 & ES6+) | Merender antarmuka web, mengeksekusi JavaScript sisi klien, dan menyediakan penyimpanan lokal *LocalStorage* HTML5. |
| **Runtime Lingkungan Server** | Node.js | Versi 20.9.0 atau lebih baru (LTS) | *JavaScript runtime environment* sisi server untuk menjalankan aplikasi Next.js 16 dan menangani *Route Handlers* (REST API). |
| **Mesin Basis Data (DBMS)** | SQLite Database Engine | Versi 3.x (tersemat / *embedded*) | Menyimpan seluruh entitas data sistem secara relasional (`users`, `products`, `orders`, `order_items`, `feedbacks`) dalam berkas tunggal `dev.db` (disediakan pula `schema.postgresql.sql` jika diarahkan ke database eksternal). |
| **Object-Relational Mapping** | Prisma ORM Client | Versi 6.19.x | Mengelola skema data dan mengeksekusi kueri basis data berparameter yang bersifat *type-safe*. |
| **Layanan Pesan Eksternal** | WhatsApp Click-to-Chat / URI Scheme | Protokol Web/App URI Scheme | Menjembatani komunikasi pemesanan, pengiriman umpan balik, dan tindak lanjut layanan pelanggan antara pengguna dan Admin Toko melalui `https://wa.me/`. |
| **Penyedia Aset Citra Produk** | Aset Gambar Lokal (`public/images/`) & Unsplash CDN | Berkas Web Statis & Protokol HTTPS | Menyajikan aset citra fotografi komoditas sayur segar untuk etalase katalog, banner Hero, metadata media sosial, dan gambar *default* produk. |

---

### B. Deskripsi Hubungan Antarmuka Perangkat Lunak

#### 1. Antarmuka Sistem Operasi (OS Interface)
* **Sisi Klien:** Sistem antarmuka Sayur Ikat berjalan di atas lapisan peramban web (*browser-based*), sehingga bersifat independen terhadap sistem operasi klien (*cross-platform*). Pengguna dapat mengakses toko dari *smartphone* Android, iPhone (iOS), maupun PC/Laptop Windows/Mac.
* **Sisi Peladen:** Sistem operasi server bertindak sebagai penyedia manajemen proses komputasi, alokasi memori RAM, akses sistem berkas (*file system I/O*) untuk berkas database SQLite, serta manajemen port jaringan untuk trafik HTTP/HTTPS. Karena basis data bawaan berbasis berkas lokal (`dev.db`), peladen memerlukan media penyimpanan yang persisten (*persistent disk*), atau dialihkan ke layanan basis data terkelola seperti PostgreSQL (`schema.postgresql.sql`) bila diterapkan pada infrastruktur *serverless*.

#### 2. Antarmuka Peramban Web (Web Browser & Web Storage API)
* Peramban web klien berinteraksi dengan aplikasi melalui standar W3C HTML5 dan ECMAScript modern.
* **HTML5 LocalStorage API:** Digunakan pada sisi klien untuk dua fungsi persistensi data:
  1. Kunci `sayurikat_cart` pada `src/context/CartContext.tsx` untuk mempertahankan daftar belanja di keranjang saat halaman ditutup atau dimuat ulang.
  2. Kunci `sayurikat_customer_data` pada `src/components/CartDrawer.tsx` untuk mengingat data identitas pelanggan (nama, nomor telepon, alamat, dan catatan) agar pelanggan tidak perlu mengisi ulang formulir saat berbelanja kembali.
* **HTML5 FileReader API:** Digunakan pada modul evaluasi mutu (`src/app/feedback/page.tsx`) untuk membaca berkas gambar bukti fisik yang dipilih pengguna dan mengonversinya menjadi teks *Base64 Data URL* secara instan di peramban.

#### 3. Antarmuka Sistem Manajemen Basis Data (Database Interface via Prisma ORM)
* Sistem menggunakan SQLite tersemat (*embedded*) dalam berkas `dev.db` untuk efisiensi penerapan operasional dan lingkungan pengujian.
* Interaksi antara logika bisnis Next.js dan basis data dijembatani oleh **Prisma Client (`@prisma/client`)**. Seluruh operasi pembacaan dan penulisan data dilakukan melalui kueri berparameter (*parameterized queries*) bawaan Prisma yang membantu melindungi aplikasi dari risiko *SQL Injection* secara *default*.

#### 4. Antarmuka Layanan Pesan WhatsApp (WhatsApp Click-to-Chat Protocol)
Aplikasi memanfaatkan protokol tautan dalam (*deep-link URL scheme*) WhatsApp standar:
$$\text{https://wa.me/}\langle\text{nomor\_tujuan}\rangle\text{?text=}\langle\text{pesan\_url\_encoded}\rangle$$
Nomor kontak pengelola toko dikonfigurasi melalui variabel lingkungan (`NEXT_PUBLIC_ADMIN_WHATSAPP`), dan antarmuka WhatsApp ini digunakan untuk 3 (tiga) kebutuhan alur kerja:
1. **Checkout Pemesanan:** Pelanggan meneruskan rincian pesanan belanja (nomor transaksi, daftar item sayur, metode bayar, alamat) ke nomor WhatsApp admin toko (`src/lib/whatsapp.ts`).
2. **Penerusan Ulasan Pelanggan:** Pelanggan mengirimkan ringkasan penilaian mutu beserta catatan keluhan ke WhatsApp admin (`src/app/feedback/page.tsx`).
3. **Komunikasi Tindak Lanjut Admin:** Admin toko membuka percakapan langsung ke nomor WhatsApp pelanggan dari halaman manajemen pesanan (`/admin/orders`) dan halaman ulasan (`/admin/feedback`).

#### 5. Antarmuka Penyedia Aset Citra
Penyajian visual aplikasi memanfaatkan kombinasi dua sumber aset:
* **Berkas Citra Lokal:** Disimpan dalam direktori `public/images/` untuk komoditas sayuran lokal utama.
* **Unsplash CDN:** Dimanfaatkan melalui koneksi aman HTTPS untuk gambar visual pada *Hero Banner* (`Hero.tsx`), gambar pratinjau media sosial / OpenGraph (`layout.tsx`), komoditas pelengkap (`src/lib/products.ts`), serta gambar standar (*default placeholder*) saat admin menambahkan produk baru (`src/app/api/admin/products/route.ts`).
