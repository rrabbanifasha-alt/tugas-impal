# 1. PENDAHULUAN

## 1.2 Ruang Lingkup / Cakupan Dokumen

Tingginya timbulan sampah plastik sekali pakai (*single-use plastics*) pada rantai distribusi belanja kebutuhan pokok harian (*e-grocery*) telah menjadi isu lingkungan yang mendesak di kawasan perkotaan. Di sisi lain, masyarakat perkotaan khususnya ibu rumah tangga dan keluarga muda sering menghadapi hambatan proses belanja digital yang rumit karena diharuskan mengunduh aplikasi berukuran besar serta melalui tahapan registrasi akun yang panjang hanya untuk memesan sayur harian. Pada sisi operasional toko, ketergantungan pada pencatatan transaksi manual lewat obrolan instan bebas sering menimbulkan kendala pesanan tercecer, kesalahan pencatatan stok, dan lambatnya penanganan keluhan kualitas sayur yang layu atau rusak selama perjalanan.

Aplikasi **Sayur Ikat** dikembangkan sebagai solusi perangkat lunak berbasis web (*responsive web application*) hiper-lokal yang memadukan konsep belanja sayur organik ramah lingkungan (*zero-waste packaging* menggunakan besek bambu dan bungkus daun pisang) dengan efisiensi pemesanan langsung (*frictionless checkout*) yang terintegrasi ke ekosistem WhatsApp.

Untuk menjaga keterarahan proses rekayasa perangkat lunak, ruang lingkup pengembangan sistem didefinisikan secara tegas ke dalam apa yang **dilakukan oleh sistem (*in-scope*)** dan apa yang **tidak dilakukan oleh sistem (*out-of-scope*)**:

### 1. Apa yang Dilakukan oleh Sistem (*In-Scope*)
Sistem bertanggung jawab dalam menyediakan kapabilitas-kapabilitas fungsional berikut:
1. **Penyajian Katalog Produk Sayur**: Menampilkan daftar sayuran segar organik dan paket masakan siap masak yang dikelompokkan ke dalam kategori (*Paket Sayur*, *Sayur Satuan*, *Buah & Bumbu*), dilengkapi transparansi harga, ketersediaan stok riil, porsi sajian, dan asal kelompok tani lokal.
2. **Pengelolaan Keranjang Belanja (*Slide-over Cart Drawer*)**: Memungkinkan pengguna menambah produk, mengubah kuantitas pesanan, menghapus item belanja tanpa memuat ulang (*reload*) halaman, serta menghitung subtotal belanja dan biaya pengiriman secara otomatis.
3. **Pemesanan dan Checkout Terbimbing (*WhatsApp-Assisted Checkout*)**: Memfasilitasi pemesanan langsung (*guest checkout*) dengan mencatat data pemesan (nama, nomor kontak, alamat pengiriman area Tangerang/Gading Serpong, catatan khusus) ke database server secara terstruktur, lalu secara otomatis mengalihkan pengguna ke tautan obrolan WhatsApp admin toko (`wa.me`) dengan format pesan pesanan yang siap dikirim.
4. **Pusat Evaluasi Mutu dan Klaim Garansi (*Quality Control Feedback*)**: Menyediakan formulir evaluasi kepuasan pelanggan berbasis rating 4 kriteria (Kesegaran Sayur, Kualitas Bungkus Daun, Ketepatan Kurir, Pengalaman Web & WA), kolom kritik terbuka, serta fasilitas unggah berkas foto bukti kerusakan sayur (maksimal 5 MB) untuk kompensasi.
5. **Dasbor Ringkasan Operasional Toko (*Admin Overview*)**: Menyajikan ringkasan metrik harian bagi pengelola toko, meliputi total pesanan masuk, total pendapatan/omset harian, produk aktif, dan indikator deteksi dini stok sayur yang kritis.
6. **Manajemen Siklus Pesanan (*Order Management*)**: Menyediakan fasilitas pencarian, pemfilteran status (*PENDING*, *DIPROSES*, *DIKIRIM*, *SELESAI*), pengubahan status pemrosesan pesanan, serta tautan cepat menghubungi pelanggan via WhatsApp.
7. **Pengelolaan Master Produk dan Inventori (*Product Management*)**: Memfasilitasi admin dalam menambah produk baru, memperbarui harga, mengubah stok fisik, mengunggah foto produk, dan menonaktifkan visibilitas produk di katalog publik (*soft toggle*).
8. **Pengawasan dan Tindak Lanjut Ulasan (*Feedback Follow-up*)**: Menampilkan daftar rekap ulasan pelanggan beserta visualisasi foto komplain, serta menyediakan tombol akses cepat (*Follow-up WA*) untuk merespons pelanggan dan memberikan kompensasi garansi.

### 2. Apa yang Tidak Dilakukan oleh Sistem (*Out-of-Scope*)
Sistem secara eksplisit **tidak menangani** fungsi-fungsi di luar batasan berikut:
1. **Tidak Memproses Pembayaran Otomatis Pihak Ketiga (*Payment Gateway*)**: Sistem tidak mengintegrasikan sistem gerbang pembayaran otomatis (seperti Midtrans, Xendit, atau Stripe). Transaksi pembayaran diselesaikan secara manual/semi-otomatis (Transfer Bank, scan QRIS, atau COD) dengan verifikasi akhir melalui interaksi obrolan WhatsApp Admin.
2. **Tidak Menyediakan Sistem Login dan Akun Pelanggan**: Sistem tidak menyediakan modul registrasi akun, login pengguna, manajemen profil, atau reset password bagi pelanggan guna menjamin proses pemesanan yang cepat tanpa friksi (*frictionless guest mode*).
3. **Tidak Menyediakan Pelacakan GPS Kurir Secara Real-Time**: Sistem tidak menyediakan peta interaktif untuk melacak posisi geografis kurir secara langsung (*live map tracking* layaknya aplikasi ride-hailing). Pelacakan dilakukan murni melalui pembaruan status bertahap (*PENDING* $\rightarrow$ *DIPROSES* $\rightarrow$ *DIKIRIM* $\rightarrow$ *SELESAI*).
4. **Tidak Mengelola Manajemen SDM dan Penggajian (*HRM / Payroll*)**: Sistem tidak menangani absensi kurir/staf toko, penjadwalan shift kerja, perhitungan komisi pengiriman, maupun penggajian internal.
5. **Tidak Mencakup Modul Pengadaan Rantai Pasok Petani (*Farmer Procurement ERP*)**: Sistem tidak mengelola kontrak kerja sama bagi hasil tani, distribusi bibit/pupuk, maupun pencatatan logistik panen di tingkat perkebunan.
6. **Tidak Menggunakan Layanan Bot Pesan Berbayar (*WhatsApp Business Cloud API*)**: Sistem tidak menggunakan bot otomatis berbayar atau webhook server pihak ketiga; integrasi pesan memanfaatkan protokol Deep-Link URI Scheme (`https://wa.me`) pada peramban pengguna.
7. **Tidak Melayani Pengiriman di Luar Jangkauan Operasional**: Sistem tidak mendukung layanan pengiriman ke luar wilayah operasional yang telah ditetapkan, yaitu **Kabupaten/Kota Tangerang dan Gading Serpong, Banten**.
