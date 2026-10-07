# 2. DESKRIPSI GLOBAL PERANGKAT LUNAK

## 2.2 Perspektif dan Goal Perangkat Lunak

### 1. Perspektif Perangkat Lunak (*Product Perspective*)
Aplikasi **Sayur Ikat** diposisikan sebagai platform belanja daring hiper-lokal mandiri (*standalone web-based e-grocery application*) yang beroperasi dalam lingkungan ritel pangan segar di wilayah Bandung Raya. Sistem ini memadukan antarmuka peramban web modern yang responsif di sisi pengguna dengan kanal komunikasi WhatsApp yang merupakan media pesan instan paling lazim digunakan oleh konsumen rumah tangga Indonesia.

Dalam lingkungan operasionalnya, sistem ini digunakan untuk:
1. **Bagi Konsumen Rumah Tangga (Sisi Publik / *Storefront*)**: Berfungsi sebagai etalase digital interaktif untuk memilih paket masakan sayur segar organik, mengelola keranjang belanja, melakukan pemesanan langsung tanpa registrasi akun (*guest checkout*), serta menyampaikan evaluasi mutu produk.
2. **Bagi Pengelola Toko (Sisi Internal / *Backoffice*)**: Berfungsi sebagai sistem informasi manajemen operasional harian terpusat untuk memantau akumulasi omset dan pesanan masuk, mengontrol ketersediaan stok fisik sayur, memperbarui tahapan pengiriman pesanan kurir, serta menindaklanjuti keluhan dan kompensasi pelanggan.

### 2. Goal Sistem (*System Goals*)
Pembangunan perangkat lunak Sayur Ikat ditujukan untuk mencapai hasil-hasil nyata (*outcomes*) yang secara langsung mendukung *Statement of Objective* sistem:

* **Meniadakan Timbulan Sampah Plastik Ritel**: Mewujudkan sistem pemenuhan pesanan sayur segar yang 100% bebas dari kantong kresek dan pembungkus plastik sekali pakai dengan mengadopsi wadah besek bambu dan daun pisang alami.
* **Mempermudah dan Mempercepat Alur Pemesanan Pelanggan**: Menghilangkan hambatan birokrasi pendaftaran akun dengan menyediakan alur belanja *guest checkout* yang dapat diselesaikan hanya dalam beberapa langkah interaktif.
* **Meningkatkan Keteraturan dan Akurasi Pencatatan Transaksi**: Menggantikan rekapitulasi obrolan manual dengan penyimpanan transaksi yang terstruktur secara otomatis ke dalam basis data server guna mencegah pesanan tercecer atau data alamat yang hilang.
* **Mempercepat Pembuatan Rincian Pesanan WhatsApp**: Mengotomatisasi penyusunan draf format pesan pemesanan yang rapi beserta kode unik transaksi untuk diteruskan secara langsung ke WhatsApp Admin toko melalui skema *deep link*.
* **Mempermudah Pengawasan Stok dan Deteksi Dini Komoditas Kritis**: Menyediakan visibilitas inventori secara *real-time* bagi pengelola toko agar dapat mengantisipasi kehabisan stok sayur segar yang dipanen harian.
* **Mempercepat Resolusi Penanganan Komplain Konsumen**: Memfasilitasi saluran evaluasi berfoto autentik yang memungkinkan pengelola toko melakukan verifikasi cepat dan memberikan kompensasi garansi kesegaran langsung via WhatsApp.
