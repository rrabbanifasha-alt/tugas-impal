# 4. KEBUTUHAN LAIN-LAIN

## 4.3 Antarmuka Perangkat Lunak (*Software Interface*)

Kebutuhan antarmuka perangkat lunak mendefinisikan seluruh perangkat lunak eksternal, sistem operasi, basis data, *runtime engine*, serta antarmuka layanan pihak ketiga yang dibutuhkan oleh sistem **Sayur Ikat** agar dapat beroperasi secara penuh. Seluruh peranti lunak yang dijabarkan di bawah ini konsisten dengan lingkungan operasi yang telah ditetapkan pada Subbab 2.4.

---

### A. Tabel Spesifikasi Perangkat Lunak Eksternal

| Kategori Perangkat Lunak | Nama Perangkat Lunak / Layanan | Versi Minimal | Peran dan Fungsi dalam Sistem |
| :--- | :--- | :--- | :--- |
| **Sistem Operasi Klien** | Android, iOS, Windows, macOS, Linux | OS modern (Android 8+, iOS 13+, Win 10+) | Menyediakan *platform host* untuk menjalankan peramban web dan aplikasi perpesanan WhatsApp. |
| **Sistem Operasi Server** | Linux (Ubuntu Server LTS, Debian, Alpine) atau Windows Server | Ubuntu 20.04+ LTS / Windows Server 2019+ | Menjadi lingkungan dasar *host* peladen untuk menjalankan proses *service* Node.js dan menyimpan file database. |
| **Peramban Web Klien** | Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ | Merender antarmuka web, mengeksekusi JavaScript sisi klien, dan menyediakan penyimpanan lokal *LocalStorage* HTML5. |
| **Runtime Lingkungan Server** | Node.js | Versi 20.9.0 atau lebih baru (LTS) | *JavaScript runtime environment* sisi server untuk menjalankan aplikasi Next.js 16 dan menangani *Route Handlers* (REST API). |
| **Mesin Basis Data (DBMS)** | SQLite Database Engine | Versi 3.x (tersemat / *embedded*) | Menyimpan seluruh entitas data sistem secara relasional (`users`, `products`, `orders`, `order_items`, `feedbacks`) dalam berkas tunggal `dev.db`. |
| **Object-Relational Mapping** | Prisma ORM Client | Versi 6.19.x | Mengelola skema data dan mengeksekusi kueri basis data yang bersifat *type-safe*. |
| **Layanan Pesan Eksternal** | WhatsApp Click-to-Chat / URI Scheme | Protokol Web/App URI Scheme | Mentransfer format teks draf pemesanan dan koordinasi kompensasi ulasan secara otomatis ke kontak Admin Toko melalui `https://wa.me/`. |
| **Penyedia Aset Citra Produk** | Aset Lokal (`public/images/`) & Unsplash CDN | Protokol HTTPS / File Statis Web | Menyediakan dan menyajikan aset citra fotografi komoditas sayur segar untuk etalase katalog produk, baik dari folder statis lokal maupun repositori eksternal Unsplash CDN. |

---

### B. Deskripsi Hubungan Antarmuka Perangkat Lunak

#### 1. Antarmuka Sistem Operasi (OS Interface)
* **Sisi Klien:** Sistem antarmuka Sayur Ikat berjalan di atas lapisan peramban web (*browser-based*), sehingga bersifat independen terhadap sistem operasi klien (*cross-platform*). Pengguna dapat mengakses toko dari *smartphone* Android, iPhone (iOS), maupun PC/Laptop Windows/Mac.
* **Sisi Peladen:** Sistem operasi server bertindak sebagai penyedia manajemen proses komputasi, alokasi memori RAM, akses sistem berkas (*file system I/O*) untuk berkas database SQLite, serta manajemen port jaringan (Port 3000 / 3001) untuk trafik HTTP/HTTPS.

#### 2. Antarmuka Peramban Web (Web Browser & Web Storage API)
* Peramban web klien berinteraksi dengan aplikasi melalui standar W3C HTML5 dan ECMAScript modern.
* **HTML5 LocalStorage API:** Digunakan secara khusus oleh modul keranjang belanja (`src/context/CartContext.tsx`) dengan kunci penyimpanan `sayurikat_cart` untuk mempertahankan isi keranjang pelanggan agar tidak hilang saat halaman ditutup atau dimuat ulang (*refresh*).
* **HTML5 FileReader API:** Digunakan pada modul evaluasi mutu (`src/app/feedback/page.tsx`) untuk membaca berkas gambar bukti sayur rusak yang dipilih pengguna dan mengonversinya menjadi teks *Base64 Data URL* secara instan di peramban.

#### 3. Antarmuka Sistem Manajemen Basis Data (Database Interface via Prisma ORM)
* Sistem tidak memerlukan instalasi server basis data terpisah (seperti MySQL Daemon atau PostgreSQL Server) karena menggunakan SQLite tersemat (*embedded*).
* Interaksi antara logika bisnis Next.js dan SQLite dijembatani oleh **Prisma Client (`@prisma/client`)**. Seluruh operasi pembacaan dan penulisan data dilakukan melalui metode *type-safe* (seperti `prisma.order.create()`, `prisma.product.update()`), menjamin struktur data yang valid dan terproteksi dari *SQL Injection*.

#### 4. Antarmuka Layanan Eksternal dan Penyedia Citra (External Service & Asset Interface)
* **WhatsApp Deep-Link Protocol (`wa.me` URI Scheme):**  
  Aplikasi berinteraksi dengan aplikasi WhatsApp melalui pembuatan tautan standar berspesifikasi:
  $$\text{https://wa.me/}\langle\text{nomor\_admin}\rangle\text{?text=}\langle\text{teks\_pesanan\_url\_encoded}\rangle$$
  Antarmuka ini tidak memerlukan dependensi pustaka pihak ketiga yang kompleks atau biaya langganan API berbayar (*WhatsApp Business Cloud API*), sehingga menjaga kesederhanaan, keandalan, dan efisiensi biaya operasional toko.
* **Penyajian Aset Citra Produk:**  
  Aplikasi memuat gambar katalog komoditas sayur organik melalui kombinasi berkas statis lokal yang disimpan di direktori proyek (`public/images/`) serta tautan citra publik dari Unsplash CDN melalui koneksi aman HTTPS.
