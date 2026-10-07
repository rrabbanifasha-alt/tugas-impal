# 3. DESKRIPSI RINCI PERANGKAT LUNAK

## 3.1 Deskripsi Kebutuhan

Berikut adalah deskripsi kebutuhan perangkat lunak yang mencakup **Kebutuhan Fungsional** dan **Kebutuhan Non-Fungsional** sesuai dengan format standar spesifikasi kebutuhan perangkat lunak:

---

### 3.1.1 Kebutuhan Fungsional

| No. | Kode Kebutuhan | Deskripsi | Nama Kebutuhan |
| :-: | :--- | :--- | :--- |
| **1.** | **FR-AUTH-01** | Sistem memungkinkan pengguna baru untuk melakukan registrasi dengan mengisi email/no. hp, nama, password. | Registrasi Akun |
| **2.** | **FR-AUTH-02** | Sistem harus mendukung proses login dengan validasi email atau nomor telepon dan password. Jika pengguna memiliki lebih dari satu role (pembeli, penjual, atau kurir), sistem menampilkan opsi untuk memilih role yang akan digunakan sebelum login. Setelah login berhasil, sistem menampilkan halaman sesuai role yang dipilih. | Login Akun |
| **3.** | **FR-PROD-01** | Sistem harus memungkinkan penjual untuk menambahkan, mengedit, dan menghapus produk, termasuk detail seperti nama, harga, dan foto produk. | Manajemen Produk |
| **4.** | **FR-PROD-02** | Sistem harus mendukung proses pengupdatean stok produk secara manual. | Update Stok |
| **5.** | **FR-ORDR-01** | Sistem harus mendukung proses pemesanan produk dengan dua mode: keranjang dan langsung beli, serta menampilkan total harga dan jumlah produk yang dipesan. | Pemesanan Produk |
| **6.** | **FR-ORDR-02** | Sistem harus menampilkan riwayat transaksi untuk penjualan dan pembelian yang dilakukan oleh pengguna. | Riwayat Transaksi |
| **7.** | **FR-PAY-01** | Sistem harus menyediakan beberapa metode pembayaran, termasuk E-Money, transfer bank, dan Cash on Delivery (COD). | Pembayaran |
| **8.** | **FR-RATE-01** | Sistem harus menyediakan proses rating dan ulasan kepada penjual dan kurir setelah transaksi selesai berupa bintang (1-5) dan komentar opsional. | Rating dan Ulasan |
| **9.** | **FR-REC-01** | Sistem dapat menampilkan rekomendasi produk berdasarkan riwayat pembelian pengguna. | Rekomendasi |
| **10.** | **FR-ADDR-01** | Sistem harus memungkinkan secara otomatis mendeteksi lokasi pengguna dan dapat juga secara manual menambah, mengedit dan menghapus alamat pengiriman. | Lokasi Pengguna |
| **11.** | **FR-COM-01** | Sistem harus memungkinkan pembeli dapat berkomunikasi kepada penjual dan kurir selama proses transaksi pengiriman. | Komunikasi |
| **12.** | **FR-LOCT-01** | Sistem harus memungkinkan pembeli untuk melihat status pesanan secara real-time (misalnya: diproses, dikirim, sedang diantar, selesai). | Pelacakan Pengiriman |
| **13.** | **FR-NOTF-01** | Sistem harus menyediakan fitur notifikasi kepada pengguna (pembeli, penjual, dan kurir) terkait aktivitas penting seperti status pesanan, pembayaran, dan pesan baru. Notifikasi dapat ditampilkan melalui *push notification* dan notifikasi dalam aplikasi. | Sistem Notifikasi |

---

### 3.1.2 Kebutuhan Non-Fungsional

| No. | Quality Criteria | Kode Kebutuhan | Deskripsi |
| :-: | :--- | :---: | :--- |
| **1.** | **Usability** | **NFR-USB-01** | Aspek sejauh mana aplikasi mudah dan efektif digunakan. Diukur berdasarkan kuesioner *System Usability Scale* (SUS). |
| **2.** | **Performance** | **NFR-PRF-01** | Waktu respon aplikasi tidak boleh lebih dari 3 detik untuk proses utama seperti menampilkan daftar produk dan memuat halaman transaksi. |
| **3.** | **Security** | **NFR-SEC-01** | Data pengguna termasuk informasi pribadi, transaksi, dan pembayaran harus disimpan secara terenkripsi menggunakan standar keamanan yang berlaku. Sistem harus memiliki mekanisme autentikasi pengguna. |
