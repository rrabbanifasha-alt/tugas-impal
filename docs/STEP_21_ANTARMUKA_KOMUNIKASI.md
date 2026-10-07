# 4. KEBUTUHAN LAIN-LAIN

## 4.4 Antarmuka Komunikasi (*Communication Interface*)

Kebutuhan antarmuka komunikasi mendefinisikan standar protokol jaringan, format pertukaran data, dan mekanisme transfer informasi yang menghubungkan komponen antarmuka peramban pengguna (*frontend*), peladen aplikasi (*backend Route Handlers*), serta integrasi layanan eksternal pada sistem **Sayur Ikat**.

---

### A. Protokol Komunikasi Jaringan Klien–Peladen

| Elemen Komunikasi | Spesifikasi Protokol / Standar | Deskripsi Implementasi dalam Sistem |
| :--- | :--- | :--- |
| **Protokol Transmisi Data** | HTTP / HTTPS | Komunikasi antara peramban web klien dan peladen Next.js berjalan di atas protokol HTTP (pada lingkungan pengembangan lokal) dan membutuhkan pengamanan HTTPS melalui *reverse proxy* (seperti Nginx, Caddy, atau Cloudflare) pada lingkungan *deployment* produksi guna melindungi kerahasiaan data pribadi pelanggan saat transmisi. |
| **Gaya Arsitektur Komunikasi** | RESTful API (*Representational State Transfer*) | Komunikasi data antarkomponen aplikasi menggunakan antarmuka *Route Handlers* Next.js (`src/app/api/**/route.ts`) dengan memanfaatkan metode HTTP standar: `GET`, `POST`, `PUT`, `PATCH`, dan `DELETE`. |
| **Format Pertukaran Pesan** | JSON (*JavaScript Object Notation*) | Seluruh muatan data (*payload request* dan *response*) dikirim dalam format JSON terstruktur dengan *header* `Content-Type: application/json`. |
| **Kebijakan Caching Header** | HTTP Header `Cache-Control` | Peladen mengirimkan *header* `Cache-Control: no-store, no-cache, must-revalidate` (dikonfigurasi pada `next.config.ts`) untuk memastikan data dinamis inventaris stok dan status pesanan selalu menyajikan kondisi mutakhir tanpa pembacaan *cache* basi peramban. |

---

### B. Spesifikasi Lengkap Endpoint REST API

Komunikasi internal antara komponen antarmuka web dan modul peladen Next.js diimplementasikan pada *endpoint-endpoint* riil berikut:

#### 1. Modul Pemesanan (`/api/orders`)
* `POST /api/orders`: Menerima *payload* JSON data transaksi (`customer` { nama, nomor WhatsApp, alamat, catatan }, `items` [ array ID produk, kuantitas, harga ], `paymentMethod`, `shippingCost`, dan `totalPrice`) untuk divalidasi dan disimpan secara relasional ke basis data.

#### 2. Modul Evaluasi Mutu (`/api/feedback`)
* `GET /api/feedback`: Mengambil seluruh daftar umpan balik pelanggan dari basis data, digunakan baik oleh sistem umum maupun panel admin `/admin/feedback`.
* `POST /api/feedback`: Mengirimkan *payload* evaluasi mutu (rating kesegaran, kemasan, pengiriman, pengalaman belanja, teks kritik/saran, string Base64 bukti foto rusak, nama pemesan opsional, nomor kontak opsional, dan nomor pesanan opsional) ke peladen.

#### 3. Modul Operasional Admin (`/api/admin/**`)
* `GET /api/admin/stats`: Mengambil data agregasi statistik harian dan total bisnis (total omset, jumlah pesanan, total produk, jumlah produk berstok kritis $\le$ 10, dan 5 transaksi terbaru).
* `GET /api/admin/orders`: Mengambil seluruh riwayat transaksi pesanan yang terurut dari yang terbaru beserta relasi data pengguna dan item belanja.
* `PATCH /api/admin/orders`: Memperbarui status pemrosesan pesanan melalui muatan JSON `{ orderId, status }` dengan validasi nilai status resmi (`PENDING`, `DIPROSES`, `DIKIRIM`, `SELESAI`).
* `GET /api/admin/products`: Mengambil seluruh daftar katalog produk internal untuk panel pengelolaan.
* `POST /api/admin/products`: Menambahkan varian komoditas sayur baru ke basis data dengan menerima atribut `name`, `description`, `price`, `category`, `stock`, dan `imageUrl`.
* `PUT /api/admin/products`: Memperbarui data komoditas atau mengubah stok fisik melalui muatan JSON dengan kewajiban menyertakan `id` produk beserta field yang diubah.
* `DELETE /api/admin/products?id=...`: Menghapus data produk dari basis data berdasarkan parameter *query string* `id`. Jika produk telah memiliki riwayat transaksi pesanan, sistem secara otomatis menonaktifkan produk (mengubah stok menjadi 0) untuk menjaga integritas referensial data.

#### 4. Modul Diagnostik & Pengujian (`/api/modul1`)
* `GET /api/modul1`: Menyediakan *endpoint* diagnostik pengujian untuk memeriksa status koneksi basis data SQLite, menghitung jumlah data entitas (`users`, `products`, `orders`), serta menampilkan sampel data uji.

---

### C. Antarmuka Komunikasi Layanan Eksternal (WhatsApp Protocol)

Sistem mengintegrasikan komunikasi langsung ke aplikasi WhatsApp dengan memanfaatkan skema URI standar:

$$\text{https://wa.me/}\langle\text{nomor\_tujuan}\rangle\text{?text=}\langle\text{pesan\_url\_encoded}\rangle$$

* **Konfigurasi Nomor Kontak:** Nomor tujuan pengelola toko dikonfigurasi melalui variabel lingkungan sistem (`NEXT_PUBLIC_ADMIN_WHATSAPP`) dengan nilai *fallback* di kode program.
* **Pengkodean Pesan (*URL Encoding*):** Seluruh pesan terformat dikonversi menggunakan fungsi standar JavaScript `encodeURIComponent()` untuk memastikan karakter spasi, pemisah baris baru (`\n`), rincian tabel harga, dan format teks dapat dibuka dengan sempurna di WhatsApp.
* **Mekanisme Pemanggilan Antarmuka:**
  1. **Sisi Pelanggan (*Customer Facing*):** Menggunakan instruksi JavaScript `window.open(url, '_blank')` saat pelanggan menyelesaikan *checkout* pemesanan pada `src/components/CartDrawer.tsx` atau setelah mengirimkan ulasan pada `src/app/feedback/page.tsx`.
  2. **Sisi Pengelola Toko (*Admin Portal*):** Menggunakan elemen tautan HTML langsung `<a href="https://wa.me/..." target="_blank" rel="noopener noreferrer">` pada tabel pesanan (`/admin/orders`) dan kartu ulasan (`/admin/feedback`) untuk menghubungi nomor telepon pembeli secara instan di tab baru.
* **Tiga Alur Komunikasi Utama:**
  1. *Pelanggan $\rightarrow$ Admin Toko:* Meneruskan rekapitulasi pesanan belanja dan rincian pemesanan.
  2. *Pelanggan $\rightarrow$ Admin Toko:* Meneruskan salinan ulasan mutu dan catatan keluhan.
  3. *Admin Toko $\rightarrow$ Pelanggan:* Membuka percakapan WhatsApp ke pembeli untuk koordinasi pengantaran pesanan atau tindak lanjut ulasan.

---

### D. Penegasan Saluran Komunikasi yang Tidak Digunakan (*Communication Out-of-Scope*)

Untuk memastikan kepatuhan teknis dan menghindari klaim fitur yang tidak didukung oleh kode sumber:
1. **Tidak Menggunakan WebSocket / Server-Sent Events (SSE):** Seluruh pembaruan data pada aplikasi bekerja menggunakan siklus permintaan-tanggapan (*request-response*) HTTP standar tanpa koneksi *duplex real-time*.
2. **Tidak Menggunakan Protokol Email (SMTP):** Sistem tidak mengirimkan pesan konfirmasi atau nota tagihan melalui surel elektronik.
3. **Tidak Menggunakan Layanan Push Notification:** Sistem tidak mengimplementasikan *Firebase Cloud Messaging* (FCM) maupun *Web Push API*; pemberitahuan bergantung pada notifikasi aplikasi WhatsApp pengguna.
4. **Tidak Menggunakan Webhook Payment Gateway Otomatis:** Sistem tidak menerima panggilan *callback webhook* dari pihak ketiga (seperti Midtrans atau Xendit); verifikasi pembayaran dilakukan secara manual oleh pengelola toko.
