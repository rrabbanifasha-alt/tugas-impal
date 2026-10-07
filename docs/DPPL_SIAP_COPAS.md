# DESKRIPSI PERANCANGAN PERANGKAT LUNAK (DPPL)

**SISTEM INFORMASI PEMESANAN DAN OPERASIONAL SAYUR IKAT**  
*(Platform Belanja Sayur Organik & Bebas Plastik)*

---

### LEMBAR PENGESAHAN DOKUMEN

| Keterangan | Informasi |
| :--- | :--- |
| **Nomor Dokumen** | DPPL-SI-2026-V1.0 |
| **Nama Proyek** | Sayur Ikat Web Application |
| **Instansi / Usaha** | Sayur Ikat (Area Bandung Raya) |
| **Tanggal Pembuatan** | 6 Oktober 2026 |
| **Status Dokumen** | Final / Disetujui |
| **Standar Acuan** | IEEE Std 1016-2009 (*Software Design Descriptions*) |

| Peran | Nama | Jabatan | Tanda Tangan |
| :--- | :--- | :--- | :--- |
| **Disusun Oleh** | Tim Pengembang Sayur Ikat | Software Architect & Engineer | [ .................... ] |
| **Diperiksa Oleh** | Lead Software Engineer | Technical Lead | [ .................... ] |
| **Disetujui Oleh** | Product Owner / Manajemen | Stakeholder Bisnis | [ .................... ] |

---

## DAFTAR ISI

1. **BAB I: PENDAHULUAN**
   - 1.1 Tujuan Penulisan Dokumen
   - 1.2 Ruang Lingkup Dokumen
   - 1.3 Definisi, Istilah, dan Singkatan
   - 1.4 Referensi Dokumen
2. **BAB II: ARSITEKTUR PERANGKAT LUNAK**
   - 2.1 Gambaran Umum Arsitektur Sistem
   - 2.2 Pola Perancangan Arsitektur (*Architectural Patterns*)
   - 2.3 Dekomposisi Lapisan Sistem (*Layered Architecture*)
3. **BAB III: PERANCANGAN DATA DAN BASIS DATA**
   - 3.1 Diagram Hubungan Antar Entitas (*Entity Relationship Diagram - ERD*)
   - 3.2 Spesifikasi dan Kamus Data Tabel Basis Data
     - 3.2.1 Tabel `users` (Data Pelanggan)
     - 3.2.2 Tabel `products` (Katalog Sayuran)
     - 3.2.3 Tabel `orders` (Data Transaksi Pesanan)
     - 3.2.4 Tabel `order_items` (Rincian Produk Pesanan)
     - 3.2.5 Tabel `feedbacks` (Data Kritik & Evaluasi Mutu)
   - 3.3 Kebijakan Integritas Relasional Basis Data
4. **BAB IV: PERANCANGAN ANTARMUKA SISTEM**
   - 4.1 Peta Situs & Struktur Navigasi Web (*Site Map*)
   - 4.2 Perancangan Tata Letak Antarmuka Pengguna (*UI Layout*)
   - 4.3 Spesifikasi Kontrak Antarmuka API (*REST API Contracts*)
   - 4.4 Perancangan Algoritma Integrasi Pesan WhatsApp
5. **BAB V: PERANCANGAN DETAIL PROSEDURAL & DIAGRAM SEKUENSI**
   - 5.1 Diagram Sekuensi: Alur Pemesanan & Checkout WhatsApp
   - 5.2 Diagram Sekuensi: Alur Pengiriman Kritik & Upload Foto Mutu
   - 5.3 Diagram Sekuensi: Alur Pembaruan Status Pesanan oleh Admin
   - 5.4 Perancangan State Management Klien (`CartContext`)
6. **BAB VI: MATRIKS KETERTELUSURAN PERANCANGAN**

---

## BAB I: PENDAHULUAN

### 1.1 Tujuan Penulisan Dokumen
Dokumen Deskripsi Perancangan Perangkat Lunak (DPPL) ini disusun untuk memberikan cetak biru (*blueprint*) teknis arsitektur perangkat lunak, rancangan skema basis data relasional, kontrak spesifikasi API, serta perancangan logika komponen pada aplikasi web **Sayur Ikat**. Dokumen ini menjadi panduan implementasi teknis, pengujian integrasi, serta pemeliharaan kode sumber bagi para perekayasa perangkat lunak (*software engineers*).

### 1.2 Ruang Lingkup Dokumen
Dokumen ini mendeskripsikan secara menyeluruh:
- Struktur sistem berbasis arsitektur *Full-Stack Monorepo* Next.js 16 (React 19 & TypeScript) dengan model *Server Components* dan *Client Components*.
- Rancangan tabel dan relasi basis data menggunakan SQLite dan Prisma ORM v6.
- Spesifikasi endpoint REST API untuk alur transaksi pesanan, produk, ringkasan bisnis, dan umpan balik pelanggan.
- Logika pemformatan teks pesanan dan integrasi deep-link WhatsApp gateway (`wa.me`).
- Siklus hidup status pesanan dan penanganan konsistensi data transaksi.

### 1.3 Definisi, Istilah, dan Singkatan

| Istilah / Singkatan | Definisi Teknis |
| :--- | :--- |
| **DPPL** | Deskripsi Perancangan Perangkat Lunak (standar IEEE 1016 *Software Design Description*). |
| **Next.js App Router** | Paradigma arsitektur web modern yang mendukung pemisahan rendering server dan interaksi klien secara terpadu. |
| **RSC** | *React Server Component* (komponen yang dieksekusi murni di sisi server untuk keamanan kueri data). |
| **RCC** | *React Client Component* (komponen antarmuka yang memiliki interaktivitas, state, dan event listener di browser). |
| **Prisma ORM** | Pustaka pemetaan objek-relasional bertipe aman (*type-safe ORM*) untuk Node.js dan TypeScript. |
| **CUID** | *Collision-resistant Unique Identifier* (identitas string acak 25-30 karakter yang aman terhadap tabrakan data). |
| **State Machine** | Model matematis yang mendeskripsikan transisi kondisi status pada keranjang belanja dan siklus pesanan. |

### 1.4 Referensi Dokumen
1. IEEE Std 1016-2009, *IEEE Standard for Information Technology — Systems Design — Software Design Descriptions*.
2. Dokumen Spesifikasi Kebutuhan Perangkat Lunak Sayur Ikat (`SKPL-SI-2026-V1.0`).
3. Dokumentasi Resmi Prisma Client & Schema Reference (`https://www.prisma.io/docs`).
4. Dokumentasi Resmi Next.js Architecture (`https://nextjs.org/docs/app/building-your-application`).

---

## BAB II: ARSITEKTUR PERANGKAT LUNAK

### 2.1 Gambaran Umum Arsitektur Sistem
Sistem Sayur Ikat menerapkan pola arsitektur **Three-Tier Architecture** yang diintegrasikan dalam monorepo full-stack. Sistem terdiri dari tiga tingkatan utama: Tingkat Presentasi (*Presentation Tier*), Tingkat Logika Aplikasi (*Application Tier*), dan Tingkat Persistensi Data (*Data Tier*), ditambah integrasi layanan komunikasi eksternal (WhatsApp Gateway).

**Bagan Arsitektur Sistem:**
```text
+-----------------------------------------------------------------------------------+
|                            1. PRESENTATION TIER (CLIENT)                         |
|  [Browser Pelanggan: Mobile / Desktop]         [Browser Admin: Portal Dashboard]  |
|  - Katalog Sayur (ProductCatalog.tsx)          - Ringkasan Harian (page.tsx)     |
|  - Slide-Over Drawer (CartDrawer.tsx)          - Kelola Pesanan (orders/page.tsx)|
|  - Form Evaluasi & Foto (feedback/page.tsx)    - Kelola Produk & Stok (products) |
+------------------------------------------┬----------------------------------------+
                                           │ Permintaan HTTP/HTTPS
                                           ▼
+-----------------------------------------------------------------------------------+
|                         2. APPLICATION TIER (NEXT.JS SERVER)                      |
|  [React Server Components (RSC)]              [REST Route Handlers (/api)]       |
|  - Server-side prefetching katalog sayur      - POST /api/orders (Buat Pesanan)  |
|  - Dynamic metadata generation                - POST/GET /api/feedback (QC)      |
|  - Fallback dataset handler                   - GET /api/admin/stats (Metrik)    |
|                                               - GET/PATCH /api/admin/orders      |
|                                               - CRUD /api/admin/products         |
|                                                                                   |
|  [Business Logic Helpers]                                                         |
|  - Algoritma Formatting Teks WhatsApp & Deep Link Generator (src/lib/whatsapp.ts) |
|  - Aturan Gratis Ongkir (Subtotal >= 50.000) & Soft-Delete Proteksi Produk       |
+------------------------------------------┬----------------------------------------+
                                           │ Kueri Type-Safe Prisma
                                           ▼
+-----------------------------------------------------------------------------------+
|                        3. DATA TIER (PRISMA ORM & SQLITE)                         |
|  - Prisma Client Engine (src/lib/db.ts Singleton)                                |
|  - Basis Data SQLite Fisik (prisma/dev.db)                                        |
|  - Tabel: users, products, orders, order_items, feedbacks                         |
+-----------------------------------------------------------------------------------+
                                           │
                                           │ Buka Chat WA Otomatis
                                           ▼
+-----------------------------------------------------------------------------------+
|                          4. EXTERNAL INTEGRATION LAYER                            |
|  - WhatsApp Web / Mobile Gateway (wa.me DeepLink URI Scheme)                      |
|  - Nomor Hotline Admin Resmi: +62 811-1109-0906                                   |
+-----------------------------------------------------------------------------------+
```

### 2.2 Pola Perancangan Arsitektur (*Architectural Patterns*)
1. **Component-Based Hierarchy**: Pemisahan antarmuka menjadi komponen mandiri dan reusable (`ProductCard`, `ProductCatalog`, `CartDrawer`, `Navbar`, `Footer`, `AdminHeader`).
2. **Context & Provider Pattern**: Pengelolaan state keranjang belanja global menggunakan `CartContext` yang tersinkronisasi secara otomatis ke `window.localStorage`.
3. **Singleton Database Connection**: Menggunakan pola singleton pada inisialisasi Prisma Client (`src/lib/db.ts`) untuk mencegah *connection limit exhaustion* akibat *hot module reloading* pada server pengembangan.
4. **Adapter / Gateway Pattern**: Pembuatan pesan WhatsApp diisolasi dalam modul khusus `src/lib/whatsapp.ts` agar perubahan format pesan atau nomor telepon pengelola tidak mengubah logika komponen antarmuka.

### 2.3 Dekomposisi Lapisan Sistem (*Layered Architecture*)

| Lapisan | Direktori / Berkas Sumber | Tanggung Jawab & Fungsi |
| :--- | :--- | :--- |
| **Presentation Layer** | `src/app/**/page.tsx`<br>`src/components/**/*.tsx` | Merender antarmuka pengguna berbasis Tailwind CSS, menangani interaksi pengguna, menangkap event form, dan menampilkan toast notifikasi. |
| **State Management Layer** | `src/context/CartContext.tsx` | Menyimpan array item belanja, mengontrol buka-tutup drawer, dan menghitung subtotal serta biaya pengiriman. |
| **Controller / API Layer** | `src/app/api/**/*.ts` | Menerima payload JSON, memvalidasi masukan parameter, dan mengembalikan respon berformat HTTP standar (200, 400, 500). |
| **Business Logic Layer** | `src/lib/whatsapp.ts`<br>`src/lib/products.ts` | Mengatur formula ongkir, pemetaan kategori sayur, format teks pesanan WA, dan tautan deep link obrolan. |
| **Data Access Layer** | `src/lib/db.ts`<br>`prisma/schema.prisma` | Berkomunikasi secara langsung dengan SQLite melalui Prisma ORM dengan kueri tipe aman. |
| **Database Storage** | SQLite (`dev.db`) | Media penyimpanan berkas data relasional permanen. |

---

## BAB III: PERANCANGAN DATA DAN BASIS DATA

### 3.1 Diagram Hubungan Antar Entitas (*Entity Relationship Diagram - ERD*)

**Bagan Hubungan Antar Tabel Basis Data:**
```text
  +------------------+                    +--------------------+
  |      USERS       | 1                N |       ORDERS       |
  |------------------|--------------------|--------------------|
  | * id (PK)        |                    | * id (PK)          |
  |   name           |                    | * userId (FK)      |
  |   whatsapp       |                    |   orderDate        |
  |   address        |                    |   status           |
  |   latitude       |                    |   totalAmount      |
  |   longitude      |                    |   deliveryFee      |
  |   createdAt      |                    |   paymentMethod    |
  |   updatedAt      |                    |   notes            |
  +------------------+                    |   createdAt        |
                                          |   updatedAt        |
                                          +---------┬----------+
                                                    | 1
                                                    |
                                                    | ON DELETE CASCADE
                                                    |
                                                    | N
  +------------------+                    +---------┴----------+
  |     PRODUCTS     | 1                N |    ORDER_ITEMS     |
  |------------------|--------------------|--------------------|
  | * id (PK)        |                    | * id (PK)          |
  |   name           |                    | * orderId (FK)     |
  |   description    |                    | * productId (FK)   |
  |   price          |                    |   quantity         |
  |   category       |                    |   unitPrice        |
  |   stock          |                    +--------------------+
  |   imageUrl       |
  |   createdAt      |
  |   updatedAt      |
  +------------------+

  +-----------------------+
  |       FEEDBACKS       |
  |-----------------------|
  | * id (PK)             |
  |   freshnessRating     |
  |   packagingRating     |
  |   deliveryRating      |
  |   experienceRating    |
  |   criticismNotes      |
  |   photoUrl            |
  |   customerName        |
  |   customerPhone       |
  |   orderNumber         |
  |   createdAt           |
  +-----------------------+
```

---

### 3.2 Spesifikasi dan Kamus Data Tabel Basis Data

#### 3.2.1 Tabel `users` (Data Pelanggan)
- **Fungsi**: Menyimpan profil pelanggan yang pernah melakukan pemesanan.
- **Nama Fisik**: `users` | **Primary Key**: `id`

| Nama Atribut | Tipe Data | Nullable | Nilai Default | Keterangan & Batasan |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | NOT NULL | `cuid()` | Kunci primer identitas pelanggan unik. |
| `name` | VARCHAR(100)| NOT NULL | - | Nama lengkap penerima pesanan. |
| `whatsapp` | VARCHAR(20) | NOT NULL | - | Nomor WhatsApp aktif (kunci pencarian riwayat). |
| `address` | TEXT | NOT NULL | - | Alamat rumah pengantaran (Bandung Raya). |
| `latitude` | FLOAT | NULL | NULL | Koordinat lintang lokasi pelanggan (opsional). |
| `longitude`| FLOAT | NULL | NULL | Koordinat bujur lokasi pelanggan (opsional). |
| `createdAt`| DATETIME | NOT NULL | `now()` | Waktu pembuatan akun/profil pertama kali. |
| `updatedAt`| DATETIME | NOT NULL | `now()` | Waktu pembaruan data nama atau alamat terakhir. |

---

#### 3.2.2 Tabel `products` (Katalog Sayuran)
- **Fungsi**: Menyimpan inventaris katalog produk sayuran, paket masak, dan bumbu dapur.
- **Nama Fisik**: `products` | **Primary Key**: `id`

| Nama Atribut | Tipe Data | Nullable | Nilai Default | Keterangan & Batasan |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | NOT NULL | `cuid()` | Kunci primer identitas unik produk sayur. |
| `name` | VARCHAR(150)| NOT NULL | - | Nama item sayur / paket masakan. |
| `description`| TEXT | NOT NULL | - | Deskripsi komposisi, saran masak, dan manfaat. |
| `price` | REAL/FLOAT | NOT NULL | - | Harga jual satuan produk dalam Rupiah (IDR). |
| `category` | VARCHAR(50) | NOT NULL | - | Kategori: `'Paket'`, `'Satuan'`, `'Buah & Bumbu'`. |
| `stock` | INTEGER | NOT NULL | `0` | Kuantitas stok fisik tersedia. |
| `imageUrl` | TEXT | NOT NULL | - | Tautan URL atau berkas foto produk. |
| `createdAt`| DATETIME | NOT NULL | `now()` | Waktu item produk ditambahkan ke katalog. |
| `updatedAt`| DATETIME | NOT NULL | `now()` | Waktu terakhir penyesuaian harga atau stok. |

---

#### 3.2.3 Tabel `orders` (Data Transaksi Pesanan)
- **Fungsi**: Menyimpan data induk pesanan belanja pelanggan.
- **Nama Fisik**: `orders` | **Primary Key**: `id` | **Foreign Key**: `userId` mereferensi `users(id)`

| Nama Atribut | Tipe Data | Nullable | Nilai Default | Keterangan & Batasan |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | NOT NULL | `cuid()` | Nomor unik identitas transaksi pesanan. |
| `userId` | VARCHAR(30) | NOT NULL | - | Referensi ID pelanggan pemesan (`users.id`). |
| `orderDate` | DATETIME | NOT NULL | `now()` | Tanggal dan jam pembuatan pesanan. |
| `status` | VARCHAR(20) | NOT NULL | `'PENDING'` | Status: `'PENDING'`, `'DIPROSES'`, `'DIKIRIM'`, `'SELESAI'`. |
| `totalAmount`| REAL/FLOAT | NOT NULL | - | Total bayar (Subtotal belanja + Biaya kirim). |
| `deliveryFee`| REAL/FLOAT | NOT NULL | `10000` | Ongkir (Rp 0 jika $\ge$ Rp 50.000, Rp 10.000 jika $<$ Rp 50.000). |
| `paymentMethod`| VARCHAR(30)| NOT NULL | `'COD'` | Pilihan: `'COD'`, `'QRIS'`, `'TRANSFER_BCA'`, `'TRANSFER_MANDIRI'`. |
| `notes` | TEXT | NULL | NULL | Catatan instruksi khusus pengantaran kurir. |
| `createdAt`| DATETIME | NOT NULL | `now()` | Waktu transaksi direkam di server. |
| `updatedAt`| DATETIME | NOT NULL | `now()` | Waktu pembaruan status pengerjaan pesanan. |

---

#### 3.2.4 Tabel `order_items` (Rincian Produk Pesanan)
- **Fungsi**: Menyimpan baris rincian item sayur yang dibeli pada setiap nomor pesanan.
- **Nama Fisik**: `order_items` | **Primary Key**: `id`  
- **Foreign Keys**: `orderId` $\rightarrow$ `orders(id)` (ON DELETE CASCADE), `productId` $\rightarrow$ `products(id)`

| Nama Atribut | Tipe Data | Nullable | Nilai Default | Keterangan & Batasan |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | NOT NULL | `cuid()` | Kunci primer identitas baris item transaksi. |
| `orderId` | VARCHAR(30) | NOT NULL | - | Referensi ID pesanan induk. |
| `productId`| VARCHAR(30) | NOT NULL | - | Referensi ID sayuran yang dibeli. |
| `quantity` | INTEGER | NOT NULL | `1` | Jumlah kuantitas produk yang dipesan. |
| `unitPrice`| REAL/FLOAT | NOT NULL | - | *Snapshot* harga satuan saat transaksi dilakukan. |

---

#### 3.2.5 Tabel `feedbacks` (Data Kritik & Evaluasi Mutu)
- **Fungsi**: Menyimpan data evaluasi, rating mutu sayur, keluhan kemasan, dan foto bukti.
- **Nama Fisik**: `feedbacks` | **Primary Key**: `id`

| Nama Atribut | Tipe Data | Nullable | Nilai Default | Keterangan & Batasan |
| :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(30) | NOT NULL | `cuid()` | Kunci primer identitas kritik pelanggan. |
| `freshnessRating` | VARCHAR(30) | NOT NULL | - | Nilai: `'Layu'`, `'Biasa saja'`, `'Sangat Segar'`. |
| `packagingRating` | VARCHAR(30) | NOT NULL | - | Nilai: `'Robek'`, `'Aman tapi berantakan'`, `'Sangat Rapi'`. |
| `deliveryRating` | VARCHAR(30) | NOT NULL | - | Nilai: `'Terlambat'`, `'Tepat Waktu'`. |
| `experienceRating`| VARCHAR(30) | NOT NULL | - | Nilai: `'Ribet'`, `'Gampang banget'`. |
| `criticismNotes` | TEXT | NOT NULL | - | Masukan terbuka dan kritik tajam dari pelanggan. |
| `photoUrl` | TEXT | NULL | NULL | Berkas gambar terenkode *Base64 Data URI* / URL. |
| `customerName` | VARCHAR(100)| NULL | NULL | Nama pelanggan untuk klaim kompensasi. |
| `customerPhone` | VARCHAR(20) | NULL | NULL | Nomor WhatsApp pelanggan untuk kompensasi. |
| `orderNumber` | VARCHAR(50) | NULL | NULL | Nomor atau tanggal pesanan terkait keluhan. |
| `createdAt` | DATETIME | NOT NULL | `now()` | Waktu masukan kritik terkirim ke sistem. |

---

### 3.3 Kebijakan Integritas Relasional Basis Data
1. **Penghapusan Berantai (*Cascade Delete*)**: Pada relasi `Order` ke `OrderItem`, penghapusan satu transaksi pesanan secara otomatis menghapus seluruh baris rincian item terkait demi mencegah data yatim (*orphan records*).
2. **Pencegahan Penghapusan Produk Aktif (*Referential Soft-Check*)**: Sebelum menghapus produk dari tabel `products`, sistem memeriksa keterkaitan produk di `order_items`. Jika produk pernah dipesan, operasi `DELETE` ditolak dan sistem otomatis mengubah `stock = 0` sehingga integritas laporan transaksi historis tetap terjaga.
3. **Sinkronisasi Pengguna Otomatis (*Customer Upsert*)**: Sistem mencocokkan nomor WhatsApp pada saat checkout. Jika nomor sudah ada, data nama dan alamat diperbarui; jika nomor baru, pengguna baru otomatis didaftarkan.

---

## BAB IV: PERANCANGAN ANTARMUKA SISTEM

### 4.1 Peta Situs & Struktur Navigasi Web (*Site Map*)

**Struktur Navigasi Halaman:**
```text
[ ROOT: https://sayurikat.com ]
  │
  ├──► [ / ] Halaman Beranda (Storefront)
  │      ├── Header & Pengumuman Operasional (Area Bandung Raya)
  │      ├── Editorial Hero Section (Filosofi Bebas Plastik & Besek Bambu)
  │      ├── Katalog Produk dengan Filter Kategori (Paket / Satuan / Bumbu)
  │      └── [ DRAWER ] Keranjang Belanja & Form WhatsApp Checkout
  │
  ├──► [ /feedback ] Halaman Kritik & Saran ("Grill Us")
  │      ├── Form Evaluasi 4 Pilar Kualitas (Segar, Bungkusan, Kurir, Web)
  │      ├── Area Teks Kritik Terbuka
  │      ├── Fitur Upload & Preview Foto Bukti Sayur Rusak
  │      └── Tombol Penerusan Otomatis ke WhatsApp Admin
  │
  └──► [ /admin ] Portal Pengelola Toko
         ├── [ /admin ] Overview Dashboard Ringkasan Omset & Pesanan Hari Ini
         ├── [ /admin/orders ] Manajemen Pesanan & Pembaruan Status Kurir
         ├── [ /admin/products ] Manajemen Katalog Produk & Inventaris Stok
         └── [ /admin/feedback ] Laporan Evaluasi Mutu & Follow-Up Kompensasi WA
```

---

### 4.2 Perancangan Tata Letak Antarmuka Pengguna (*UI Layout*)

1. **Tata Letak Halaman Utama (`/`)**:
   - Bagian Atas: Banner notifikasi jadwal pengiriman batas jam 12.00 WIB.
   - Header: Logo Sayur Ikat, tautan menuju halaman `/feedback`, dan tombol keranjang belanja dengan indikator jumlah item.
   - Hero Section: Ajakan belanja sayur segar organik tanpa plastik dengan tombol scroll cepat ke katalog.
   - Katalog Grid: Tata letak kartu produk (*responsive grid 1-4 kolom*) yang menampilkan gambar sayur, badge kualitas organik, asal kelompok tani, porsi makan, harga, dan tombol `+ Keranjang`.
2. **Tata Letak Slide-Over Drawer Keranjang**:
   - Membuka secara halus dari sisi kanan layar tanpa menghilangkan posisi scroll halaman.
   - Menampilkan daftar produk yang dipilih beserta tombol pengubah kuantitas (`-` / `+`) dan tombol hapus.
   - Menampilkan rincian biaya transparan: Subtotal, Biaya Kirim (Rp 0 atau Rp 10.000), dan Total Bayar.
   - Formulir input: Nama Lengkap, Nomor WhatsApp, Alamat Pengiriman, Catatan, dan Pilihan Metode Pembayaran.
   - Tombol Aksi: "Pesan Sekarang via WhatsApp".
3. **Tata Letak Halaman Kritik & Saran (`/feedback`)**:
   - Judul personal: *"Bantu Sayur Ikat Jadi Lebih Baik!"*
   - Pemilihan opsi rating dengan tombol toggle interaktif (berwarna hijau jika dipilih).
   - Area unggah foto dengan tampilan pratinjau instan sebelum dikirim.
   - Tombol konfirmasi kirim dan layar apresiasi sukses kompensasi.

---

### 4.3 Spesifikasi Kontrak Antarmuka API (*REST API Contracts*)

#### 1. Endpoint: Pembuatan Pesanan Baru
- **Metode HTTP**: `POST`
- **Path URL**: `/api/orders`
- **Request Body (JSON)**:
```json
{
  "customer": {
    "name": "Ibu Ratna Dewi",
    "whatsapp": "081298765432",
    "address": "Jl. Ir. H. Juanda (Dago) No. 120, Coblong, Kota Bandung",
    "notes": "Tolong diikat di gagang pintu pagar jika belum ada orang."
  },
  "items": [
    {
      "productId": "cly1001",
      "quantity": 1,
      "unitPrice": 18000
    },
    {
      "productId": "cly1002",
      "quantity": 2,
      "unitPrice": 8000
    }
  ],
  "subtotal": 34000,
  "deliveryFee": 10000,
  "totalAmount": 44000,
  "paymentMethod": "COD"
}
```
- **Response Success (200 OK)**:
```json
{
  "success": true,
  "orderId": "clyorder998877",
  "order": {
    "id": "clyorder998877",
    "status": "PENDING",
    "totalAmount": 44000,
    "deliveryFee": 10000,
    "paymentMethod": "COD"
  },
  "message": "Pesanan #998877 berhasil disimpan ke sistem"
}
```
- **Response Error (400 Bad Request)**:
```json
{
  "success": false,
  "error": "Data nama, nomor WhatsApp, dan alamat pengiriman wajib diisi"
}
```

---

#### 2. Endpoint: Pengiriman Kritik & Saran Pelanggan
- **Metode HTTP**: `POST`
- **Path URL**: `/api/feedback`
- **Request Body (JSON)**:
```json
{
  "freshnessRating": "Sangat Segar",
  "packagingRating": "Sangat Rapi",
  "deliveryRating": "Tepat Waktu",
  "experienceRating": "Gampang banget",
  "criticismNotes": "Bungkusan daun pisangnya sangat estetik dan sayurnya masih berembun segar!",
  "photoUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "customerName": "Ibu Ratna Dewi",
  "customerPhone": "081298765432",
  "orderNumber": "Pesanan Tgl 6 Okt"
}
```
- **Response Success (200 OK)**:
```json
{
  "success": true,
  "feedback": { "id": "clyfb0123" },
  "message": "Kritik & saran kamu berhasil kami terima. Terima kasih sudah membantu Sayur Ikat!"
}
```

---

#### 3. Endpoint: Metrik Ringkasan Admin
- **Metode HTTP**: `GET`
- **Path URL**: `/api/admin/stats`
- **Response Success (200 OK)**:
```json
{
  "success": true,
  "stats": {
    "ordersToday": 12,
    "revenueToday": 540000,
    "totalProducts": 16,
    "lowStockProducts": 3,
    "totalOrdersAllTime": 142,
    "revenueAllTime": 6850000
  },
  "recentOrders": [
    {
      "id": "clyorder998877",
      "totalAmount": 44000,
      "status": "PENDING",
      "user": { "name": "Ibu Ratna Dewi" }
    }
  ]
}
```

---

#### 4. Endpoint: Pembaruan Status Pesanan
- **Metode HTTP**: `PATCH`
- **Path URL**: `/api/admin/orders`
- **Request Body (JSON)**:
```json
{
  "orderId": "clyorder998877",
  "status": "DIPROSES"
}
```
- **Response Success (200 OK)**:
```json
{
  "success": true,
  "order": {
    "id": "clyorder998877",
    "status": "DIPROSES"
  },
  "message": "Status pesanan #998877 berhasil diubah menjadi DIPROSES"
}
```

---

#### 5. Endpoint: Kelola Produk (Tambah & Edit)
- **Metode HTTP**: `POST` (Tambah) / `PUT` (Perbarui)
- **Path URL**: `/api/admin/products`
- **Request Body (JSON)**:
```json
{
  "id": "clyprod1001", // Hanya untuk PUT
  "name": "Paket Sayur Lodeh Spesial",
  "description": "Labu siam, kacang panjang, terong, melinjo, daun melinjo, dan santan kelapa murni.",
  "price": 20000,
  "category": "Paket",
  "stock": 30,
  "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999"
}
```

---

### 4.4 Perancangan Algoritma Integrasi Pesan WhatsApp
Perancangan format invoice pesan otomatis diimplementasikan pada berkas `src/lib/whatsapp.ts`.

**Algoritma Penyusunan Pesan:**
1. Masukkan nomor WhatsApp hotline pengelola: `6281111090906`.
2. Bentuk teks pembuka dengan identitas nomor pesanan: `Halo Admin Sayur Ikat! 🍃 Saya telah membuat pesanan #{ID_PESANAN}:`.
3. Buat perulangan baris untuk setiap item: `• {JUMLAH}x {NAMA_PRODUK} (Rp {SUBTOTAL_ITEM})`.
4. Tambahkan label metode pembayaran yang dipilih (COD / QRIS / Transfer Bank).
5. Tambahkan rincian subtotal, biaya kirim (GRATIS jika $\ge$ Rp 50.000 atau Rp 10.000), dan total pembayaran akhir.
6. Cantumkan rincian nama pembeli, nomor telepon pembeli, alamat lengkap wilayah Bandung Raya, dan catatan khusus pengantaran.
7. Lakukan transformasi karakter melalui fungsi `encodeURIComponent(teksPesan)`.
8. Gabungkan ke URL tujuan: `https://wa.me/6281111090906?text={pesanTerenkode}`.

---

## BAB V: PERANCANGAN DETAIL PROSEDURAL & DIAGRAM SEKUENSI

### 5.1 Diagram Sekuensi: Alur Pemesanan & Checkout WhatsApp

```text
PELANGGAN           CART DRAWER (UI)      API (/api/orders)       BASIS DATA (PRISMA)     WHATSAPP GATEWAY
   │                       │                      │                       │                       │
   │── 1. Isi Data Form ──►│                      │                       │                       │
   │   (Nama, WA, Alamat)  │                      │                       │                       │
   │                       │                      │                       │                       │
   │── 2. Klik "Pesan" ───►│                      │                       │                       │
   │                       │── 3. POST /api/orders───────►│                       │
   │                       │      (Items, Data Customer)  │                       │
   │                       │                      │── 4. Upsert User by WA ──────►│
   │                       │                      │── 5. Simpan Order & Items ───►│
   │                       │                      │                       │       │
   │                       │                      │◄─ 6. Kembalikan ID Pesanan ───│
   │                       │◄─ 7. Respon 200 OK ──│
   │                       │      (orderId)       │
   │                       │
   │                       │── 8. Buat URL Deep Link WhatsApp (Order ID & Invoice) ──────────────►│
   │                       │── 9. Kosongkan Keranjang Belanja (Clear LocalStorage)                │
   │                       │                                                                      │
   │◄─ 10. Buka Otomatis Aplikasi WhatsApp dengan Teks Faktur Pesanan Lengkap ────────────────────│
```

---

### 5.2 Diagram Sekuensi: Alur Pengiriman Kritik & Upload Foto Mutu

```text
PELANGGAN              FEEDBACK PAGE (UI)     FILEREADER API        API (/api/feedback)     BASIS DATA
   │                           │                    │                       │                   │
   │── 1. Pilih 4 Pilar Rating─►│                    │                       │                   │
   │── 2. Tulis Kritik Terbuka─►│                    │                       │                   │
   │                           │                    │                       │                   │
   │── 3. Pilih Berkas Foto ──►│                    │                       │                   │
   │                           │── 4. Baca File ───►│                       │                   │
   │                           │◄─ 5. Data Base64 ──│                       │                   │
   │                           │      (Preview Foto)                        │                   │
   │                           │                                            │                   │
   │── 6. Klik "Kirim Kritik" ─►│                                            │                   │
   │                           │── 7. POST /api/feedback (Ratings, Base64) ─►│                   │
   │                           │                                            │── 8. Simpan ─────►│
   │                           │                                            │◄─ 9. Sukses ──────│
   │                           │◄─ 10. Respon 200 OK (Tersimpan) ───────────│                   │
   │                           │                                                                │
   │◄─ 11. Tampilkan Layar Sukses Apresiasi Kompensasi Sayur Gratis ────────────────────────────│
```

---

### 5.3 Diagram Sekuensi: Alur Pembaruan Status Pesanan oleh Admin

```text
ADMIN PENGELOLA         HALAMAN ORDERS (UI)    API (/api/admin/orders)   BASIS DATA (PRISMA)
   │                           │                          │                       │
   │── 1. Pilih Status Baru ──►│                          │                       │
   │   (Dropdown: DIPROSES)    │                          │                       │
   │                           │── 2. PATCH /api/admin/orders ───────────────────►│
   │                           │      (orderId, status: "DIPROSES")               │
   │                           │                          │── 3. Update Status ──►│
   │                           │                          │   (where id: orderId) │
   │                           │                          │◄─ 4. Data Terupdate ──│
   │                           │◄─ 5. Respon 200 OK ──────│                       │
   │                           │      (Order Updated)                             │
   │                           │                                                  │
   │                           │── 6. Perbarui State Tampilan Tabel Lokal         │
   │◄─ 7. Tampilkan Notifikasi Toast Sukses Pembaruan Status ─────────────────────│
```

---

### 5.4 Perancangan State Management Klien (`CartContext`)

Keranjang belanja dikelola melalui antarmuka state terpadu `CartProvider` yang mengatur 4 aksi utama:

| Operasi State | Fungsi Pemicu | Logika Pemrosesan | Efek ke `LocalStorage` |
| :--- | :--- | :--- | :--- |
| **Inisialisasi** | `useEffect(..., [])` | Membaca string kunci `'sayurikat_cart'` saat halaman pertama kali dimuat di browser. | Jika ada data, state `cart` diisi array item; jika kosong, diset array kosong `[]`. |
| **Tambah Item** | `addToCart(product, qty)` | Mencari apakah produk sudah ada di keranjang. Jika sudah ada, kuantitas ditambahkan; jika baru, objek baru ditambahkan ke array. Membuka drawer secara otomatis (`isCartOpen = true`). | Array baru diubah ke JSON string dan disimpan ke `'sayurikat_cart'`. |
| **Ubah Kuantitas** | `updateQuantity(id, qty)` | Jika `qty <= 0`, item dihapus dari array (`removeFromCart`). Jika `qty > 0`, nilai properti `quantity` produk diperbarui. | Array terupdate disimpan ke `'sayurikat_cart'`. |
| **Kosongkan** | `clearCart()` | Mengubah nilai state `cart` menjadi array kosong `[]`. Dijalankan otomatis setelah *checkout* berhasil. | Kunci `'sayurikat_cart'` diperbarui menjadi `[]`. |

---

## BAB VI: MATRIKS KETERTELUSURAN PERANCANGAN

Matriks ketertelusuran berikut memetakan keterkaitan langsung antara seluruh butir kebutuhan fungsional dalam dokumen SKPL dengan modul perancangan pada dokumen DPPL ini:

| ID Kebutuhan SKPL | Entitas Basis Data Terkait | Endpoint API / Jalur Data | Komponen Antarmuka & Modul Kode Sumber |
| :--- | :--- | :--- | :--- |
| **SKPL-F-01** | `products` | Server-Side Fetching Prisma | `ProductCatalog.tsx`, `ProductCard.tsx` |
| **SKPL-F-02** | - (Filter State) | - | `ProductCatalog.tsx` (State `selectedCategory`) |
| **SKPL-F-03** | - (Cart State) | - | `CartContext.tsx`, `CartDrawer.tsx` |
| **SKPL-F-04** | Web Storage Browser | - | `CartContext.tsx` (`localStorage.setItem`) |
| **SKPL-F-05** | Formula Bisnis Ongkir | - | `CartContext.tsx` (`subtotal >= 50000 ? 0 : 10000`) |
| **SKPL-F-06** | `users`, `orders` | - | `CartDrawer.tsx` (Form Validasi Input) |
| **SKPL-F-07** | `orders`, `order_items`, `users`| `POST /api/orders` | `src/app/api/orders/route.ts` |
| **SKPL-F-08** | - | - | `src/lib/whatsapp.ts` (`generateWhatsAppLink`) |
| **SKPL-F-09** | `feedbacks` | `POST /api/feedback` | `src/app/feedback/page.tsx` |
| **SKPL-F-10** | `feedbacks.photoUrl` | `POST /api/feedback` | `src/app/feedback/page.tsx` (FileReader Base64) |
| **SKPL-F-11** | `feedbacks.customerPhone` | `POST /api/feedback` | `src/app/feedback/page.tsx` (Data Kompensasi) |
| **SKPL-F-12** | - | - | `src/app/feedback/page.tsx` (`sendToWhatsApp`) |
| **SKPL-F-13** | `orders`, `products` | `GET /api/admin/stats` | `src/app/admin/page.tsx` |
| **SKPL-F-14** | `orders`, `users`, `order_items`| `GET /api/admin/orders` | `src/app/admin/orders/page.tsx` |
| **SKPL-F-15** | - (Filter State) | - | `src/app/admin/orders/page.tsx` (Search Bar) |
| **SKPL-F-16** | `orders.status` | `PATCH /api/admin/orders` | `src/app/admin/orders/page.tsx` (Status Dropdown)|
| **SKPL-F-17** | `orders`, `order_items` | - | `src/app/admin/orders/page.tsx` (Modal Detail) |
| **SKPL-F-18** | `products` | `GET /api/admin/products` | `src/app/admin/products/page.tsx` |
| **SKPL-F-19** | `products` | `POST` / `PUT /api/admin/products`| `src/app/admin/products/page.tsx` (Form Modal) |
| **SKPL-F-20** | `products`, `order_items` | `DELETE /api/admin/products` | `src/app/api/admin/products/route.ts` (Soft Check) |
| **SKPL-F-21** | `feedbacks` | `GET /api/feedback` | `src/app/admin/feedback/page.tsx` |
| **SKPL-F-22** | - | - | `src/app/admin/feedback/page.tsx` (Follow-Up WA) |
