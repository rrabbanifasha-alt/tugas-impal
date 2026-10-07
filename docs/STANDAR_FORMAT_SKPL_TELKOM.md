# STANDAR FORMAT & PANDUAN PENULISAN SKPL
## Adaptasi Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) KITANI
### Program Studi S1 Informatika — Fakultas Informatika — Universitas Telkom

---

## 1. Identitas & Format Halaman Sampul (*Cover*)

Halaman judul dokumen wajib mengikuti format baku berikut:

```
+-------------------------------------------------------------------------+
|                                                                         |
|                               +---------+                               |
|                               |  SKPL   |                               |
|                               +---------+                               |
|                                                                         |
|               SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK                     |
|                                                                         |
|                            SAYUR IKAT                                   |
|                                                                         |
|                               untuk:                                    |
|                    Ibu Rumah Tangga dan Pengelola Toko                  |
|                                                                         |
|                                                                         |
|                         Dipersiapkan oleh:                              |
|                   [Nama Lengkap 1]      [NIM 1]                         |
|                   [Nama Lengkap 2]      [NIM 2]                         |
|                   [Nama Lengkap 3]      [NIM 3]                         |
|                                                                         |
|                                                                         |
|                     Program Studi S1 Informatika                        |
|                          Fakultas Informatika                           |
|                           Universitas Telkom                            |
|                                  2026                                   |
|                                                                         |
+-------------------------------------------------------------------------+
```

---

## 2. Header & Footer Wajib (*Running Header & Confidentiality Footer*)

Setiap halaman isi (mulai dari halaman 2 sampai selesai) wajib memiliki tabel *Header* dan *Footer* resmi:

### A. Tabel Running Header
| Program Studi S1 Informatika<br>-<br>Fakultas Informatika<br>*(Logo Telkom)* | SKPL - Nomor Dokumen: `SKPL-SI-2026`<br>Revisi: `1` \| Tgl: `[Tanggal]` | Halaman: `X dari Y` |
| :--- | :--- | :--- |

### B. Tabel Running Footer (Pernyataan Hak Milik & Kerahasiaan)
| Prodi S1 Informatika - Universitas Telkom | SKPL | Halaman X dari Y |
| :--- | :--- | :--- |
| **Dokumen ini dan informasi yang ada di dalamnya adalah milik Prodi S1 Informatika-Universitas Telkom dan bersifat rahasia. Dilarang untuk mereproduksi dokumen ini tanpa diketahui oleh Program Studi S1 Informatika, Universitas Telkom** | | |

---

## 3. Format Bagian Awal (*Front Matter*)

### 1. Daftar Perubahan
Digunakan untuk mencatat riwayat versi dokumen secara formal.

| Revisi | Deskripsi |
| :---: | :--- |
| **A** | Penentuan identitas sistem, scope, dan kebutuhan fungsional awal |
| **B** | Penambahan pemodelan analisis Use Case Diagram dan Skenario |
| **C** | Penambahan Class Diagram dan Activity Diagram |

*Tabel Otorisasi & Persetujuan Dokumen:*
| INDEX | A | B | C | D | E |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TGL** | 7 Okt 2026 | | | | |
| **Ditulis oleh** | [Nama Penulis] | | | | |
| **Diperiksa oleh** | [Nama Pemeriksa] | | | | |
| **Disetujui oleh** | [Nama Dosen/Reviewer] | | | | |

### 2. Daftar Halaman Perubahan
| Revisi | Halaman | Isi Semula | Perubahan |
| :---: | :---: | :--- | :--- |
| **A** | - | Draft awal | Pembuatan dokumen |

### 3. Daftar Isi
Memuat struktur hierarkis bab, sub-bab, serta nomor halaman bertitik (*dotted leader*).

---

## 4. Sistematika Struktur Bab (Template Standar Telkom)

Sesuai dokumen acuan KITANI, struktur bab tersusun atas:

### Bab 1: Pendahuluan
* **1.1 Tujuan Penulisan Dokumen**: Menjelaskan urgensi dokumen sebagai pedoman tim pengembang, QA, dan stakeholder.
* **1.2 Ruang Lingkup / Cakupan Dokumen**: Latar belakang domain masalah (pertanian/sayur), nilai urgensi, dan deskripsi sistem sebagai solusi digital.
* **1.3 Definisi, Singkatan, dan Akronim**: Pengenalan istilah-istilah inti sistem dalam bentuk poin bertitik dua (`Istilah : Definisi`).
* **1.4 Referensi**: Daftar pustaka dengan sitasi bernomor `1), 2), 3)` (skripsi, jurnal IEEE/ACM, atau rujukan web resmi).

### Bab 2: Deskripsi Global Perangkat Lunak
* **2.1 Statement of Objective Perangkat Lunak**:
  * Paragraf pengantar tujuan strategis sistem.
  * Poin manfaat utama perangkat lunak (diawali *bullet point* tebal).
* **2.2 Perspektif dan Goal Perangkat Lunak**:
  * Posisi sistem (*marketplace*, web e-grocery, client-server).
  * Poin daftar *Goal Sistem*.
* **2.3 Profil dan Kelas Pengguna**:
  Tabel berformat 4 kolom:
  | No | User Class | Peran dalam Sistem | Tujuan / Kebutuhan Utama |
  | :-: | :--- | :--- | :--- |
  | 1 | Pelanggan (*Buyer*) | Memilih produk sayur dan memesan via WA | Memperoleh sayur segar bebas plastik secara praktis |
  | 2 | Admin (*Store Manager*) | Mengelola stok, pesanan, dan feedback | Menjaga efisiensi operasional dan melayani komplain |
* **2.4 Lingkungan Operasi**:
  * Platform (Web Browser Responsive / Android)
  * Perangkat (Smartphone / PC dengan koneksi internet)
  * Database (SQLite / MySQL)
  * Autentikasi
  * Integrasi komunikasi / pembayaran
* **2.5 Batasan Perangkat Lunak / Sistem**:
  Sub-poin berformat tebal:
  * Keterbatasan Teknis Pengguna
  * Keterbatasan Perangkat
  * Koneksi Internet
  * Respons Sistem
  * Keamanan Data
  * Manajemen Pembayaran
  * Wilayah Pengiriman (khusus Tangerang & Gading Serpong)
* **2.6 Asumsi dan Dependensi**:
  * **A. Asumsi** (Daftar bernomor angka 1..N mengenai kondisi ideal pengguna, data, dan lingkungan)
  * **B. Dependensi** (Daftar bernomor angka 1..N mengenai ketergantungan pihak ketiga: Hosting, Database, WhatsApp URI API, Jaringan Seluler)

### Bab 3: Deskripsi Rinci Perangkat Lunak
* **3.1 Deskripsi Kebutuhan**:
  * **3.1.1 Kebutuhan Fungsional**:
    Tabel 4 kolom dengan kodefikasi `FR-[MODUL]-[NOMOR]`:
    | No. | Kode Kebutuhan | Deskripsi | Nama Kebutuhan |
    | :-: | :--- | :--- | :--- |
    | 1. | FR-CAT-01 | Sistem harus menampilkan katalog produk sayur berfilter... | Penjelajahan Katalog |
    | 2. | FR-CART-01 | Sistem harus mendukung pengelolaan keranjang belanja... | Keranjang Belanja |
    | 3. | FR-ORDR-01 | Sistem harus mendukung checkout pesanan dengan integrasi WhatsApp... | Pemesanan Produk |
  * **3.1.2 Kebutuhan Non-Fungsional**:
    Tabel 4 kolom dengan kriteria kualitas standar ISO/IEEE:
    | No. | Quality Criteria | Kode Kebutuhan | Deskripsi |
    | :-: | :--- | :--- | :--- |
    | 1. | *Usability* | NFR-USB-01 | Tingkat kemudahan diukur dengan kuesioner SUS (*System Usability Scale*). |
    | 2. | *Performance* | NFR-PRF-01 | Waktu respon sistem tidak melebihi 3 detik pada kondisi jaringan normal. |
    | 3. | *Security* | NFR-SEC-01 | Data pesanan dan kontak terlindungi di database server. |
* **3.2 Pemodelan Analisis**:
  * **3.2.1 Usecase Diagram**: Gambar visual Use Case lengkap.
  * **3.2.1.X Usecase Scenario #X "[NAMA USECASE KAPITAL]"**:
    Tabel baku skenario Use Case (lihat Bagian 5).
  * **3.2.2 Class Diagram**: Gambar diagram kelas berelasi (atribut, tipe data, visibilitas `+`/`-`, operasi/metode, dan derajat relasi).
* **3.3 Activity Diagram**:
  * **3.3.X Activity Diagram #X "[Nama Activity]"**:
    Diagram alir ber-swimlane dengan pemisahan jalur: `User` vs `Sistem` (atau `Admin` vs `Sistem`).

### Bab 4: Kebutuhan Lain - Lain
* **4.1 Antarmuka Pengguna (*User Interface*)**: Prinsip visual (*earthy tone*, tombol jelas, responsif desktop/mobile).
* **4.2 Antarmuka Perangkat Keras (*Hardware Interface*)**: Kamera untuk foto sayur, RAM perangkat, memori server.
* **4.3 Antarmuka Perangkat Lunak (*Software Interface*)**: Next.js, React, Node.js, Prisma ORM, SQLite.
* **4.4 Antarmuka Komunikasi (*Communication Interface*)**: Protokol HTTPS, REST API JSON, WhatsApp Deep-Link URL Scheme.
* **4.5 Fitur Sistem Cerdas / Nilai Tambah**: Algoritma kalkulasi ongkir flat/gratis, filter ramah lingkungan, notifikasi stok kritis.

### Lampiran A: Daftar Kata-Kata Asing (Glosarium)
Wajib dibagi ke dalam tabel-tabel tematik:
* **A. Istilah Umum Sistem** (Tabel: `Istilah` \| `Definisi`)
* **B. Istilah Teknis Perangkat Lunak** (Tabel: `Istilah` \| `Definisi`)
* **C. Istilah pada Domain Bisnis** (Tabel: `Istilah` \| `Definisi`)
* **D. Singkatan & Akronim** (Tabel: `Singkatan/Akronim` \| `Kepanjangan` \| `Definisi`)
* **E. Istilah Khusus Proyek** (Tabel: `Istilah` \| `Penjelasan`)

---

## 5. Format Baku Tabel Skenario Use Case (Wajib Diikuti)

Setiap Use Case pada subbab **3.2.1.X** WAJIB ditulis dengan template tabel dua kolom berikut:

```markdown
| Nama Use Case | [Contoh: Pemesanan Produk] |
| :--- | :--- |
| **Deskripsi** | [Menjelaskan apa yang dilakukan use case ini] |
| **Aktor** | [Aktor yang mengeksekusi, misal: Pelanggan] |
| **Pre-Kondisi** | [Kondisi awal sebelum skenario dimulai] |
| **Post-Kondisi** | [Kondisi akhir setelah skenario berhasil] |
| **Skenario Utama** | |
| **Aktor** | **Sistem** |
| 1. [Aksi Aktor langkah 1] | |
| | 2. [Respon Sistem langkah 2] |
| 3. [Aksi Aktor langkah 3] | |
| | 4. [Respon Sistem langkah 4] |
| **Skenario Eksepsional (Alternative flow)** | **[Nama Kasus Error, misal: Stok Habis / Data Tidak Lengkap]** |
| **Aktor** | **Sistem** |
| 1. [Aksi salah dari aktor] | 2. [Respon error dan validasi dari sistem] |
```

---

## 6. Kaidah Gaya Bahasa (*Writing Style Rules*)

1. **Predikat Wajib pada Kebutuhan Fungsional**:
   * Gunakan: *"Sistem harus memungkinkan..."*, *"Sistem harus menyediakan..."*, *"Sistem mencatat..."*, *"Sistem memvalidasi..."*.
   * Hindari kalimat ambigu seperti *"Aplikasi mungkin menampilkan..."* atau *"Pengguna diharapkan..."*.
2. **Cetak Miring (*Italics*) untuk Istilah Asing**:
   * Seluruh istilah bahasa Inggris yang belum diserap wajib dicetak miring: *use case*, *database*, *slide-over cart*, *real-time*, *checkout*, *framework*, *frontend*, *backend*, *zero-waste*.
3. **Penyusunan Alur Skenario**:
   * Langkah aksi Aktor selalu bernomor ganjil di sisi kiri dan respon Sistem bernomor genap di sisi kanan secara bergantian (berdialog).
