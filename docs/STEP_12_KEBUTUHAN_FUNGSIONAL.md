# 3. DESKRIPSI RINCI PERANGKAT LUNAK

## 3.1 Deskripsi Kebutuhan

### 3.1.1 Kebutuhan Fungsional (*Functional Requirements*)

Kebutuhan fungsional mendefinisikan kapabilitas, proses, dan perilaku sistem yang harus disediakan oleh perangkat lunak **Sayur Ikat**. Kebutuhan fungsional ini disusun berdasarkan analisis aktor, alur bisnis pemesanan bebas plastik, serta kode implementasi riil sistem, yang dipetakan langsung ke *Use Case* (UC-01 s.d. UC-08) dan dilengkapi dengan kriteria uji penerimaan (*acceptance test criteria*):

#### A. Kebutuhan Fungsional Sisi Pelanggan (*Customer Facing*)

| ID | Use Case | Deskripsi Kebutuhan Fungsional | Kriteria Uji / Penerimaan (*Acceptance Criteria*) |
| :---: | :---: | :--- | :--- |
| **FR-01** | `UC-01` | Sistem harus menampilkan seluruh produk dari basis data di halaman `/` lengkap dengan nama, harga, stok, dan gambar. | Produk yang ada di basis data tampil di katalog storefront dengan data nama, harga, stok, dan gambar yang identik. |
| **FR-02** | `UC-01` | Sistem harus memfilter katalog menurut kategori: Semua Produk, Paket Sayur, Sayur Satuan, Buah & Bumbu. | Memilih tab "Paket Sayur" hanya menampilkan produk yang memiliki kategori paket sayur. |
| **FR-03** | `UC-01` | Sistem harus mencari produk berdasarkan nama, deskripsi, atau asal petani, tanpa membedakan huruf besar/kecil (*case-insensitive*). | Kata kunci "kangkung" atau "KANGKUNG" memunculkan produk kangkung. Jika kata kunci tidak ditemukan, sistem menampilkan pesan data kosong. |
| **FR-04** | `UC-02` | Sistem harus menambahkan produk ke keranjang. Jika produk sudah ada di keranjang, jumlah kuantitasnya bertambah. | Menekan tombol "Tambah ke Keranjang" dua kali pada produk yang sama menghasilkan 1 baris item dengan kuantitas 2. |
| **FR-05** | `UC-02` | Sistem harus mengubah jumlah kuantitas (`-` / `+`) dan menghapus item di keranjang belanja. | Mengubah kuantitas item secara otomatis memperbarui subtotal harga; menekan tombol hapus mengeluarkan item dari keranjang. |
| **FR-06** | `UC-02` | Sistem harus menghitung subtotal dan biaya kirim secara otomatis: Rp10.000 jika subtotal < Rp50.000, atau gratis (Rp0) jika subtotal $\ge$ Rp50.000. | Subtotal Rp49.000 menghasilkan ongkir Rp10.000; Subtotal Rp50.000 menghasilkan ongkir Rp0 (Gratis Ongkir). |
| **FR-07** | `UC-02` | Sistem harus menyimpan isi keranjang di memori peramban (*LocalStorage*) agar tidak hilang saat halaman dimuat ulang (*refresh*). | Setelah halaman peramban dimuat ulang (*F5/refresh*), drawer keranjang tetap memuat daftar produk belanjaan yang sama. |
| **FR-08** | `UC-03` | Sistem harus memvalidasi kewajiban pengisian Nama Lengkap, Nomor WhatsApp, dan Alamat Pengiriman sebelum pesanan disimpan. Catatan khusus bersifat opsional. | Jika salah satu dari ketiga kolom wajib tersebut kosong, penyimpanan pesanan ditolak dan sistem menampilkan pesan kesalahan validasi. |
| **FR-09** | `UC-03` | Sistem harus menyediakan empat metode pembayaran (COD, QRIS, Transfer BCA, Transfer Mandiri), dengan COD sebagai pilihan awal (*default*). | Formulir pemesanan menampilkan 4 opsi pembayaran, dengan radio button COD dalam kondisi terpilih saat drawer dibuka pertama kali. |
| **FR-10** | `UC-03` | Sistem harus menyimpan pesanan berstatus `PENDING` beserta item, harga satuan, ongkir, total, dan metode bayar. Data pelanggan dengan nomor WhatsApp yang sudah ada diperbarui, bukan diduplikasi. | Pesanan baru tercatat di tabel `orders` server dengan status `PENDING`. Dua pesanan berbeda dengan nomor WA sama tetap merujuk pada satu baris data pelanggan unik di tabel `users`. |
| **FR-11** | `UC-03` | Sistem harus membuka WhatsApp admin dengan pesan berisi nomor pesanan, daftar item, metode bayar, rincian biaya, dan data pengiriman setelah pesanan tersimpan di server. | Tombol WhatsApp membuka tautan protokol `https://wa.me/` dengan isi pesan terformat lengkap sesuai pesanan yang baru saja dibuat. |
| **FR-12** | `UC-03` | Sistem harus menyediakan pilihan sekunder untuk menyimpan pesanan langsung ke server tanpa membuka tautan WhatsApp. | Menekan tombol "Simpan Pesanan Langsung ke Sistem" menyimpan data transaksi ke basis data tanpa memicu pembukaan jendela/tab WhatsApp. |
| **FR-13** | `UC-03` | Sistem harus menampilkan dialog konfirmasi ringkasan sukses (nomor pesanan, total, metode bayar) dan mengosongkan isi keranjang belanja setelah pesanan berhasil disimpan. | Notifikasi transaksi sukses tampil di layar dan keranjang belanja otomatis kembali dalam keadaan kosong (0 item). |
| **FR-14** | `UC-04` | Sistem harus mewajibkan pemilihan rating 4 kategori mutu (kesegaran, kemasan, pengiriman, pengalaman) dan kolom teks kritik/saran. Nama, nomor WA, dan nomor pesanan bersifat opsional. | Pengiriman formulir feedback tanpa mengisi kolom teks kritik/saran ditolak oleh validasi sistem. |
| **FR-15** | `UC-04` | Sistem harus menolak unggahan foto bukti sayur rusak yang berukuran lebih dari 5 MB dan menampilkan pemberitahuan kesalahan. | Berkas gambar berukuran 6 MB ditolak dengan pesan error; berkas berukuran $\le$ 5 MB diterima dan memunculkan pratinjau (*preview*) citra. |
| **FR-16** | `UC-04` | Sistem harus menyimpan data umpan balik ke basis data dan menyediakan opsi meneruskan isi ulasan yang sama ke WhatsApp admin toko. | Data ulasan tersimpan di tabel `feedbacks`, dan tombol WhatsApp opsional membuka `wa.me` dengan teks keluhan yang sudah terisi. |

---

#### B. Kebutuhan Fungsional Sisi Pengelola Toko (*Admin Dashboard Facing*)

| ID | Use Case | Deskripsi Kebutuhan Fungsional | Kriteria Uji / Penerimaan (*Acceptance Criteria*) |
| :---: | :---: | :--- | :--- |
| **FR-17** | `UC-05` | Sistem harus menampilkan ringkasan operasional: jumlah pesanan, total omset/pendapatan, jumlah produk, jumlah produk berstok kritis ($\le$ 10), dan 5 pesanan terbaru. Jika belum ada pesanan hari ini, angka metrik menampilkan akumulasi keseluruhan. | Nilai angka statistik pada dasbor `/admin` terbukti identik dengan hasil agregasi kueri basis data riil. |
| **FR-18** | `UC-06` | Sistem harus menampilkan seluruh daftar pesanan pelanggan yang diurutkan dari yang terbaru, lengkap dengan data pelanggan, daftar item, dan metode bayar. | Halaman `/admin/orders` menampilkan seluruh pesanan masuk dengan urutan waktu pembuatan transaksi terbaru berada paling atas (*descending*). |
| **FR-19** | `UC-06` | Sistem harus memfilter pesanan menurut status (`PENDING`, `DIPROSES`, `DIKIRIM`, `SELESAI`) dan mencari berdasarkan nomor pesanan, nama, nomor WhatsApp, alamat, catatan, atau metode bayar. | Memilih filter status "DIKIRIM" hanya memunculkan pesanan berstatus tersebut; pencarian kata kunci nama menyaring daftar baris secara instan. |
| **FR-20** | `UC-06` | Sistem harus mengubah status pemrosesan pesanan ke salah satu nilai valid (`PENDING`, `DIPROSES`, `DIKIRIM`, `SELESAI`) dan menolak input nilai status lain. | Perubahan status ke "DIKIRIM" tersimpan permanen di database setelah halaman dimuat ulang. Permintaan mutasi dengan nilai status tidak sah ditolak dengan kode respon HTTP 400 Bad Request. |
| **FR-21** | `UC-06` | Sistem harus menampilkan rincian detail pesanan dan menyediakan tautan pintas WhatsApp langsung ke nomor telepon pemesan. | Menekan tombol "Lihat Rincian" membuka modal detail pesanan; menekan tautan nomor telepon membuka ruang obrolan WhatsApp ke pelanggan. |
| **FR-22** | `UC-07` | Sistem harus menampilkan daftar katalog produk internal, memfilter menurut kategori, dan mencari produk berdasarkan nama atau deskripsi. | Memasukkan kata kunci pencarian "jamur" pada panel `/admin/products` hanya memunculkan baris komoditas jamur. |
| **FR-23** | `UC-07` | Sistem harus memvalidasi penambahan produk baru dengan mewajibkan nama, harga, dan kategori. Nilai input stok yang dikosongkan dianggap bernilai 0. | Menambah produk tanpa mengisi harga ditolak; produk yang berhasil disimpan langsung muncul pada etalase katalog publik `/`. |
| **FR-24** | `UC-07` | Sistem harus memungkinkan admin mengubah nama, deskripsi, harga, kategori, stok fisik, dan tautan gambar produk. | Perubahan harga pada produk yang diedit langsung ter-update di basis data dan ditampilkan di sisi pelanggan. |
| **FR-25** | `UC-07` | Sistem harus menyediakan tombol aksi cepat untuk mengubah stok produk menjadi 0 (nonaktif) atau 30 (aktif kembali) dengan satu kali klik. | Satu kali klik tombol toggle status instan mengubah kuota stok dari 30 menjadi 0, atau sebaliknya dari 0 menjadi 30. |
| **FR-26** | `UC-08` | Sistem harus menampilkan seluruh rekapitulasi umpan balik (rating, kritik, foto bukti, identitas pengirim) dengan penandaan warna merah khusus untuk rating bernilai negatif (Layu, Robek). | Kartu ulasan dengan rating "Layu" atau kemasan "Robek" otomatis diberi sorotan teks berlatar belakang merah (*alert badge*). |
| **FR-27** | `UC-08` | Sistem harus menampilkan tombol tindak lanjut (*Follow-up WA*) secara kondisional hanya pada kartu umpan balik yang mencantumkan nomor kontak pelanggan. | Kartu ulasan yang tidak mencantumkan nomor WhatsApp pemesan tidak memunculkan tombol *Follow-up WA*. |
