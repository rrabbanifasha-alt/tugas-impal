# 4. KEBUTUHAN LAIN-LAIN

## 4.2 Antarmuka Perangkat Keras (*Hardware Interface*)

Kebutuhan antarmuka perangkat keras mendeskripsikan spesifikasi dan peranti keras fisik riil yang berinteraksi langsung dengan sistem aplikasi **Sayur Ikat**, baik di sisi pengguna (*client-side*) maupun di sisi peladen (*server-side*). Sistem ini merupakan aplikasi web murni yang tidak membutuhkan peranti keras khusus (*specialized proprietary hardware*) di luar perangkat komputasi umum yang telah dimiliki oleh konsumen dan pengelola toko.

---

### A. Perangkat Keras Sisi Pengguna (*Client-Side Hardware*)

#### 1. Perangkat Pelanggan (*Customer Device*)
* **Jenis Perangkat:** Telepon pintar (*smartphone* berbasis Android/iOS), tablet, atau laptop/komputer desktop.
* **Spesifikasi Layar Tampilan:** Layar dengan resolusi lebar minimal **360 piksel** (*mobile viewport*) hingga monitor beresolusi **1920 $\times$ 1080 piksel** (*Full HD desktop*) dengan kedalaman warna minimal 24-bit untuk menampilkan katalog sayuran secara jelas.
* **Kamera & Media Penyimpanan:** Kamera ponsel terintegrasi (resolusi minimal 2 MP) atau akses penyimpanan galeri foto pada perangkat, yang digunakan pelanggan saat mengambil foto fisik bukti sayur rusak/cacat untuk diunggah pada formulir evaluasi mutu (`/feedback`).
* **Konektivitas Jaringan:** Kartu jaringan nirkabel (*Wi-Fi*) atau modul modem seluler (4G / 5G) yang mendukung komunikasi data protokol TCP/IP.

#### 2. Perangkat Pengelola Toko (*Admin Device*)
* **Jenis Perangkat:** Komputer PC, laptop, atau tablet kerja yang digunakan oleh Admin Toko untuk operasional harian.
* **Spesifikasi Minimal:** 
  * Prosesor setara *Dual-Core* 1.8 GHz ke atas.
  * Memori RAM minimal 2 GB.
  * Layar dengan resolusi minimal **1024 $\times$ 768 piksel** agar dasbor ringkasan, tabel pesanan, dan tabel stok sayur dapat dipantau secara optimal tanpa pemotongan kolom data.
* **Peranti Masukan:** Papan ketik (*keyboard*) dan tetikus (*mouse*) atau layar sentuh untuk input pengubahan stok dan pengisian form produk baru.

---

### B. Perangkat Keras Sisi Peladen (*Server-Side Hardware*)

Sistem aplikasi **Sayur Ikat** dijalankan pada lingkungan komputasi peladen (*Cloud Server* / *Virtual Private Server* / Komputer Host Lokal) dengan spesifikasi minimal sebagai berikut:

| Komponen Perangkat Keras | Spesifikasi Minimal | Rekomendasi Operasional | Fungsi dalam Sistem |
| :--- | :--- | :--- | :--- |
| **Unit Pemroses (CPU)** | 1 Core vCPU (Arsitektur x86_64 atau ARM64) | 2 Core vCPU atau lebih tinggi | Menjalankan *runtime* Node.js, merender komponen *Server-Side Rendering* (SSR) Next.js 16, dan memproses kueri Prisma ORM. |
| **Memori Utama (RAM)** | 1 GB RAM | 2 GB s.d. 4 GB RAM | Menampung proses komputasi aplikasi Next.js, penanganan berkas unggahan sementara di memori, dan *caching* basis data. |
| **Media Penyimpanan (Disk)** | 5 GB SSD (*Solid State Drive*) | 20 GB SSD NVMe | Menyimpan berkas biner aplikasi, basis data relasional SQLite (`dev.db`), serta berkas citra bukti mutu yang diunggah konsumen. |
| **Antarmuka Jaringan (NIC)** | *Network Interface Card* 100 Mbps | Port Ethernet / Bandwidth $\ge$ 1 Gbps | Menerima dan merespons trafik HTTP/HTTPS dari peramban klien secara stabil dan berlatensi rendah. |

---

### C. Penegasan Perangkat Keras yang Tidak Diperlukan (*Hardware Out-of-Scope*)

Untuk memastikan kepatuhan terhadap batasan sistem dan tidak mengada-adakan kebutuhan peranti yang tidak relevan:
1. **Tidak Membutuhkan Mesin EDC / Card Reader Fisik**: Sistem tidak memerlukan terminal gesek kartu perbankan fisik karena proses pembayaran non-tunai mengandalkan QRIS dinamis di layar dan transfer bank *online*.
2. **Tidak Membutuhkan Printer Thermal Kasir Khusus**: Sistem tidak mencetak struk fisik kertas karena seluruh ringkasan bukti pemesanan diteruskan secara digital dan *paperless* melalui WhatsApp Web/App.
3. **Tidak Membutuhkan Alat Pemindai Barcode / RFID Khusus**: Manajemen inventaris stok dilakukan secara langsung oleh admin melalui tombol *toggle* dan input angka pada antarmuka web.
4. **Tidak Membutuhkan Perangkat Pelacak GPS Khusus pada Kendaraan**: Pelacakan kurir tidak menggunakan modul GPS fisik eksternal, melainkan berbasis tahapan status logistik yang diperbarui secara manual oleh pengelola toko.
