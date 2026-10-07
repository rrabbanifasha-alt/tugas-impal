# 4. KEBUTUHAN LAIN-LAIN

## 4.4 Antarmuka Komunikasi (*Communication Interface*)

Kebutuhan antarmuka komunikasi mendefinisikan standar protokol jaringan, format pertukaran data, dan mekanisme transfer informasi yang menghubungkan komponen antarmuka peramban pengguna (*frontend*), peladen aplikasi (*backend Route Handlers*), serta integrasi layanan eksternal pada sistem **Sayur Ikat**.

---

### A. Protokol Komunikasi Jaringan Klien–Peladen

| Elemen Komunikasi | Spesifikasi Protokol / Standar | Deskripsi Implementasi dalam Sistem |
| :--- | :--- | :--- |
| **Protokol Transmisi Data** | HTTPS (*Hypertext Transfer Protocol Secure*) | Seluruh lalu lintas data antara peramban web klien dan peladen Next.js ditransmisikan melalui port 443 dengan enkripsi TLS (*Transport Layer Security*) versi 1.2 atau 1.3 untuk melindungi kerahasiaan data identitas pemesan (nama, nomor kontak, dan alamat). |
| **Gaya Arsitektur Komunikasi** | RESTful API (*Representational State Transfer*) | Komunikasi data antarkomponen aplikasi menggunakan antarmuka *Route Handlers* Next.js (`src/app/api/**/route.ts`) dengan memanfaatkan kata kerja metode HTTP standar (`GET`, `POST`, `PATCH`). |
| **Format Pertukaran Pesan** | JSON (*JavaScript Object Notation*) | Seluruh muatan data (*payload request* dan *response*) dikirim dalam format JSON terstruktur dengan *header* `Content-Type: application/json`. |
| **Kebijakan Caching Header** | HTTP Header `Cache-Control` | Peladen mengirimkan *header* `Cache-Control: no-store, no-cache, must-revalidate` (dikonfigurasi pada `next.config.ts`) untuk memastikan data dinamis inventaris stok dan status pesanan selalu menyajikan kondisi mutakhir tanpa pembacaan *cache* basi peramban. |

---

### B. Spesifikasi Metode HTTP pada Endpoint REST API

Komunikasi internal antara komponen antarmuka web dan modul peladen dikelompokkan ke dalam beberapa *endpoint* utama:

1. **Modul Pemesanan (`/api/orders`)**:
   * `POST /api/orders`: Mengirimkan *payload* data transaksi berupa objek JSON pemesan, array item belanja, metode pembayaran, dan ongkir untuk diverifikasi dan dicatat ke basis data.
2. **Modul Ulasan Mutu (`/api/feedback`)**:
   * `POST /api/feedback`: Mengirimkan *payload* evaluasi mutu (rating 4 kategori, catatan teks kritik/saran, dan string Base64 bukti foto) ke peladen.
3. **Modul Operasional Admin (`/api/admin/**`)**:
   * `GET /api/admin/stats`: Mengambil data agregasi metrik omset dan ringkasan transaksi harian.
   * `GET /api/admin/orders`: Mengambil daftar seluruh riwayat pesanan pelanggan.
   * `PATCH /api/admin/orders/[id]`: Memperbarui status pemrosesan transaksi (`PENDING`, `DIPROSES`, `DIKIRIM`, `SELESAI`).
   * `GET /api/admin/products` & `POST /api/admin/products`: Mengambil dan menambahkan komoditas sayur baru.
   * `PATCH /api/admin/products/[id]`: Memperbarui atribut produk atau mengubah kuota stok fisik secara instan.
   * `GET /api/admin/feedback`: Mengambil seluruh rekapitulasi data ulasan pelanggan.

---

### C. Antarmuka Komunikasi Aplikasi Eksternal (WhatsApp Deep-Link Protocol)

Sistem memanfaatkan protokol skema URI (*Uniform Resource Identifier*) WhatsApp standar tanpa dependensi pustaka pihak ketiga:

$$\text{https://wa.me/}\langle\text{nomor\_tujuan}\rangle\text{?text=}\langle\text{pesan\_url\_encoded}\rangle$$

* **Mekanisme Eksekusi:** Antarmuka dipicu dari sisi klien menggunakan instruksi peramban `window.open(url, '_blank')`.
* **Pengkodean Karakter (*Encoding*):** Teks pesan dikonversi menggunakan fungsi standar `encodeURIComponent()` guna memastikan karakter spasi, baris baru (`\n`), tanda baca, serta simbol emotikon diterjemahkan dengan aman ke dalam representasi URL.
* **Peran Komunikasi:**
  1. Pelanggan $\rightarrow$ Admin Toko: Meneruskan rekapitulasi pesanan belanja dan bukti checkout.
  2. Pelanggan $\rightarrow$ Admin Toko: Meneruskan pesan formulir evaluasi mutu dan komplain sayur rusak.
  3. Admin Toko $\rightarrow$ Pelanggan: Membuka komunikasi dua arah langsung ke nomor WhatsApp pembeli untuk konfirmasi pengantaran atau koordinasi garansi sayur pengganti.

---

### D. Penegasan Saluran Komunikasi yang Tidak Digunakan (*Communication Out-of-Scope*)

Untuk menjaga kesederhanaan arsitektur dan menghindari klaim fungsi yang tidak terdapat pada kode sumber:
1. **Tidak Menggunakan WebSocket / Server-Sent Events (SSE):** Sistem tidak menerapkan koneksi *duplex real-time persistent*; pembaruan data tampilan di dasbor admin dilakukan melalui pemanggilan API saat halaman dimuat atau setelah aksi manipulasi data dilakukan (*request-response* standar).
2. **Tidak Menggunakan Protokol Email (SMTP):** Konfirmasi pemesanan tidak dikirimkan melalui surel/email, melainkan difokuskan melalui kanal WhatsApp.
3. **Tidak Menggunakan Layanan Web Push Notification:** Sistem tidak menggunakan *Firebase Cloud Messaging* (FCM) atau *Web Push API*; notifikasi aktivitas pesanan mengandalkan notifikasi bawaan dari aplikasi WhatsApp pengguna.
4. **Tidak Menggunakan Webhook Payment Gateway:** Verifikasi pembayaran non-tunai (QRIS statis / transfer) tidak terhubung ke API agregator pembayaran eksternal, melainkan dikonfirmasi secara manual oleh admin.
