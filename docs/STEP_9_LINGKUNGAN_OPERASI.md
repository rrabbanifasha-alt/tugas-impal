# 2. DESKRIPSI GLOBAL PERANGKAT LUNAK

## 2.4 Lingkungan Operasi

Sistem aplikasi web **Sayur Ikat** dirancang untuk beroperasi secara *online* melalui arsitektur terdistribusi *client-server*. Lingkungan operasi yang secara nyata digunakan dan dibutuhkan untuk menjalankan sistem ini meliputi:

### 1. Lingkungan Sisi Klien (*Client-Side Environment*)
* **Perangkat Keras (*User Devices*)**:
  * *Smartphone* berbasis Android atau iOS (prioritas utama antarmuka *mobile-responsive*).
  * Komputer jinjing (*laptop*), tablet, atau *Personal Computer* (PC desktop) dengan resolusi layar minimal 360 × 640 piksel.
* **Peramban Web (*Web Browser*)**:
  * Peramban web modern yang mendukung standar HTML5, CSS Flexbox/Grid, serta JavaScript ES6+, seperti Google Chrome (versi 90+), Mozilla Firefox (versi 88+), Apple Safari (versi 14+), atau Microsoft Edge (versi 90+).
* **Aplikasi Pendukung Eksternal**:
  * Aplikasi perpesanan WhatsApp (terpasang pada *smartphone* pengguna) atau WhatsApp Web (pada peramban komputer) dengan nomor telepon aktif untuk menerima penerusan draf pemesanan dan tindak lanjut *customer service*.

### 2. Lingkungan Sisi Server (*Server-Side Environment*)
* **Sistem Operasi Server**:
  * Sistem operasi berbasis Linux (misalnya Ubuntu Server 20.04/22.04 LTS, Debian, Alpine Linux) atau Windows Server yang mendukung eksekusi lingkungan Node.js.
* **Runtime Mesin**:
  * Node.js versi 20.9 atau lebih baru (LTS).
* **Framework Web Aplikasi**:
  * Next.js 16 (App Router) berbasis React 19 dan TypeScript, untuk rendering antarmuka halaman web dan menjalankan Route Handlers (REST API).

### 3. Lingkungan Basis Data (*Database Environment*)
* **Database Engine**:
  * SQLite Database tersemat (*embedded database file* `dev.db`), dipilih untuk menjamin portabilitas, efisiensi konsumsi memori, dan kemudahan replikasi lingkungan pengujian lokal maupun server.
* **Object-Relational Mapping (ORM)**:
  * Prisma ORM versi 6.x untuk abstraksi skema data yang aman (*type-safe data modeling*) dan eksekusi kueri transaksi terstruktur.

### 4. Lingkungan Jaringan dan Komunikasi (*Network Environment*)
* **Koneksi Jaringan**:
  * Koneksi internet publik aktif (Wi-Fi, 4G/LTE, atau 5G) baik di sisi klien maupun server untuk memuat aset gambar, memproses request API, dan mengalihkan tautan *deep link*.
* **Protokol Komunikasi**:
  * Protokol transmisi data HTTP/HTTPS dengan enkripsi TLS/SSL.
  * Pertukaran data antara antarmuka web dan server menggunakan format RESTful JSON (*JavaScript Object Notation*).
  * Protokol URI Scheme WhatsApp (`https://wa.me/`) untuk pengiriman draf teks pesanan ke nomor admin.
