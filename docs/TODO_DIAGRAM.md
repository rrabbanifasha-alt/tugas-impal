# PANDUAN DAN TO-DO LIST PEMBUATAN DIAGRAM SKPL & DPPL
### Sistem Web Sayur Ikat — Standar S1 Informatika Telkom University

Dokumen ini memuat daftar rencana kerja (*to-do list*) bertahap untuk penyusunan seluruh diagram pemodelan analisis dan perancangan perangkat lunak, lengkap dengan kriteria kepatuhan dan status pengerjaannya.

---

## 📋 Daftar Rencana Kerja Diagram

### FASE 1: Pemodelan Analisis Kebutuhan (SKPL - Bab 3)

- [x] **1. Use Case Diagram (Subbab 3.2.1)** — *SELESAI (STEP 14)*
  - Memetakan 2 Aktor (**Pelanggan** & **Admin Toko**) ke 8 Use Case (`UC-01` s.d. `UC-08`).
  - Menetapkan batas sistem (*system boundary*) "Sistem Web Sayur Ikat".
  - Berkas: `docs/STEP_14_USE_CASE_DIAGRAM.md`.

- [ ] **2. Use Case Scenario (Subbab 3.2.1.1 s.d. 3.2.1.8)** — *NEXT (STEP 15)*
  - Format tabel baku 2 kolom (*Aktor* vs *Sistem*).
  - Memuat *Pre-condition*, *Post-condition*, *Main Scenario*, dan *Alternative/Exceptional Flow*.
  - Terdiri atas 8 skenario:
    1. `UC-01`: Melihat Katalog dan Mencari Produk (Pelanggan)
    2. `UC-02`: Mengelola Keranjang Belanja (Pelanggan)
    3. `UC-03`: Melakukan Pemesanan Produk (Pelanggan)
    4. `UC-04`: Mengirim Ulasan Mutu (Pelanggan)
    5. `UC-05`: Melihat Dasbor Operasional (Admin Toko)
    6. `UC-06`: Mengelola Pesanan Masuk (Admin Toko)
    7. `UC-07`: Mengelola Produk dan Stok (Admin Toko)
    8. `UC-08`: Mengelola Ulasan Mutu (Admin Toko)

- [ ] **3. Class Diagram Analisis (Subbab 3.2.2)**
  - Menggambarkan struktur entitas domain sistem riil: `User`, `Product`, `Order`, `OrderItem`, dan `Feedback`.
  - Memuat atribut lengkap dengan visibilitas (`+`/`-`), tipe data, serta metode/operasi.
  - Menampilkan relasi antar kelas beserta derajat kardinalitas (*multiplicity* $1..1$, $1..*$, $0..*$).

- [ ] **4. Activity Diagram (Subbab 3.3.1 s.d. 3.3.8)**
  - Diagram alir berbasis jalur (*swimlane*) yang memisahkan tanggung jawab: `Pelanggan`/`Admin Toko` vs `Sistem`.
  - Dilengkapi *initial node*, *decision node*, *action state*, dan *final/activity final node*.
  - Terdiri atas 8 diagram alir:
    1. Activity Diagram `UC-01`: Penjelajahan dan Filter Katalog
    2. Activity Diagram `UC-02`: Manipulasi Keranjang & Kalkulasi Ongkir
    3. Activity Diagram `UC-03`: Checkout, Simpan Database, & Redirect WhatsApp
    4. Activity Diagram `UC-04`: Pengisian Rating, Validasi Foto $\le$ 5 MB, & Kirim Keluhan
    5. Activity Diagram `UC-05`: Agregasi Statistik Dasbor Operasional
    6. Activity Diagram `UC-06`: Filter dan Pembaruan Status Pesanan
    7. Activity Diagram `UC-07`: Penambahan/Pembaruan Produk & Toggle Cepat Stok
    8. Activity Diagram `UC-08`: Peninjauan Ulasan Negatif & Tindak Lanjut WA

---

### FASE 2: Perancangan Perangkat Lunak (DPPL)

- [ ] **5. Sequence Diagram Perancangan**
  - Menggambarkan interaksi runut waktu (*lifeline*, *activation bar*, pesan sinkron/asinkron, respon) antara aktor, *boundary page/component*, *Next.js Route Handler controller*, *Prisma ORM model*, dan *SQLite database*.
  - Alur utama:
    - Sequence Checkout Pesanan & Integrasi WhatsApp
    - Sequence Penambahan Produk & Pembaruan Stok
    - Sequence Pembaruan Status Pesanan Masuk

- [ ] **6. Entity Relationship Diagram (ERD) / Skema Relasi Database**
  - Model konseptual, logis, dan fisik dari basis data SQLite.
  - Tabel: `users`, `products`, `orders`, `order_items`, `feedbacks`.
  - Penegasan *Primary Key* (PK), *Foreign Key* (FK), *unique constraints*, dan *indexing*.

- [ ] **7. Deployment / Arsitektur Diagram**
  - Menggambarkan topologi fisik aplikasi:
    - Peramban Klien (Desktop / Mobile Browser) $\leftrightarrow$ HTTPS (TLS 1.3)
    - Next.js 16 Web Server (App Router & Route Handlers)
    - Prisma ORM Client $\leftrightarrow$ SQLite (`dev.db`)
    - Integrasi Eksternal: WhatsApp Web / URI Scheme Protocol (`https://wa.me/`)

---

## 🎯 Rekomendasi Urutan Pengerjaan Berikutnya

```
[STEP 14: Use Case Diagram] (Selesai)
           ↓
[STEP 15: Use Case Scenarios (UC-01 s.d. UC-08)] ← Rekomendasi Langkah Selanjutnya
           ↓
[STEP 16: Class Diagram]
           ↓
[STEP 17: Activity Diagrams (8 Diagram Alir Ber-swimlane)]
```
