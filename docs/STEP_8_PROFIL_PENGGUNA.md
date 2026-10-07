# 2. DESKRIPSI GLOBAL PERANGKAT LUNAK

## 2.3 Profil dan Kelas Pengguna

Pengguna sistem **Sayur Ikat** diklasifikasikan ke dalam 2 (dua) kelas pengguna (*user class*) utama berdasarkan peran operasional, kebutuhan fungsional, dan hak akses antarmuka yang dimilikinya:

| No. | User Class / Aktor | Peran dalam Sistem | Tujuan / Kebutuhan Utama |
| :-: | :--- | :--- | :--- |
| **1** | **Pelanggan (*Customer*)** | Mengakses halaman publik toko web (`/`), menavigasi katalog berdasarkan kategori, menambahkan item ke keranjang belanja *drawer*, melakukan pemesanan langsung tanpa akun (*guest checkout*) via WhatsApp, serta mengirim evaluasi kepuasan dan foto bukti mutu (`/feedback`). | Memperoleh sayuran segar organik lokal yang higienis tanpa sampah plastik sekali pakai, serta menikmati kemudahan belanja kebutuhan dapur harian secara cepat dan terpercaya tanpa kerepotan instalasi aplikasi maupun registrasi akun. |
| **2** | **Admin Toko (*Admin*)** | Mengakses portal manajemen internal (`/admin`), memantau ringkasan omset dan pesanan masuk harian, mengubah tahapan status pemrosesan pesanan (`/admin/orders`), mengelola katalog dan stok fisik produk (`/admin/products`), serta meninjau dan menindaklanjuti ulasan mutu pelanggan (`/admin/feedback`). | Menjaga efisiensi dan akurasi pengelolaan pesanan operasional, mencegah kehabisan stok panen harian, mempercepat koordinasi pengantaran pesanan, serta mempertahankan retensi pelanggan melalui penanganan komplain yang responsif. |

### Aturan Konsistensi Penamaan Aktor (2.3 → Use Case Diagram → Use Case Scenario)

Untuk menjamin kepatuhan rekayasa perangkat lunak dan mencegah inkonsistensi diagram pada tahapan berikutnya, ditetapkan konvensi penamaan aktor sebagai berikut:

* **Aktor 1: Pelanggan**  
  Digunakan secara konsisten pada Subbab 2.3, Use Case Diagram, Skenario Use Case (`UC-01` s.d. `UC-04`), dan Activity Diagram sisi pelanggan.
* **Aktor 2: Admin Toko**  
  Digunakan secara konsisten pada Subbab 2.3, Use Case Diagram, Skenario Use Case (`UC-05` s.d. `UC-08`), dan Activity Diagram sisi backoffice pengelola.
* **Peniadaan Aktor Kurir Khusus**:  
  Sesuai dengan batasan ruang lingkup (*Out-of-Scope* pada Subbab 1.2), kurir pengantar barang tidak memiliki akun aplikasi khusus; pembaruan status pengiriman (*DIKIRIM* → *SELESAI*) sepenuhnya dijalankan oleh **Admin Toko** melalui panel manajemen pesanan.
