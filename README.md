
# 📦 Gudang Inventory Tracker – Proyek Akhir Pengujian Perangkat Lunak

Sebuah aplikasi manajemen gudang berbasis web yang dikembangkan sebagai proyek akhir mata kuliah **Pengujian Perangkat Lunak**. Aplikasi ini memungkinkan petugas gudang mencatat barang masuk, melihat daftar entri terbaru, dan menghapus data barang secara langsung — dengan dukungan validasi, penyimpanan permanen, dan pengujian menyeluruh.

---

## 📘 User Story 

Gudang membutuhkan sistem digital untuk mencatat barang masuk agar mempermudah pelacakan stok dan mengurangi kesalahan pencatatan manual. Petugas gudang harus dapat:

- Mengisi formulir dengan **nama barang** dan **jumlah**.
- Melihat **daftar barang masuk terbaru** secara langsung setelah pencatatan.

Aplikasi harus menyediakan:
- Formulir dengan 2 kolom:
  - **Nama Barang** (wajib diisi, maksimal 100 karakter)
  - **Jumlah** (wajib diisi, angka bulat positif)
- Setelah mengklik tombol **"Catat Barang"**:
  - Data dikirim ke backend.
  - Daftar entri terbaru diperbarui **secara otomatis (tanpa refresh)** dengan menampilkan: nama, jumlah, dan waktu pencatatan.
- Jika input tidak valid, tampilkan pesan error seperti:
  - `"Nama barang wajib diisi"`
  - `"Jumlah harus angka positif"`
- Data tersimpan di backend dan tetap tersedia meskipun halaman di-refresh atau aplikasi dimatikan.



## 👥 Pembagian Role & Tanggung Jawab

| Nama        | NIM                  | Peran                  | Deskripsi Tugas                                                                                   |
| ----------- | ---------------------| ---------------------- | ------------------------------------------------------------------------------------------------- |
| Syaifullah Hilmi Ma'arij | 22/497775/TK/54568 | **Frontend Developer** | Pembuatan frontend dengan validasi form, integrasi API, unit test frontend                          |
| Fatimah Nadia Eka Putri | 22/497876/TK/54588 | **Backend Developer**  | Pembuatan endpoint API, koneksi ke database MongoDB, validasi server, unit test backend                              |
| Fahrin Ulya Nisrina | 22/497708/TK/54557 | **QA Tester**          | Menyusun user requirement, acceptance criteria, menulis & menjalankan pengujian (E2E & API test) |


## 🎤 Link Presentasi

[🔗 Lihat Slide Presentasi Tim](https://example.com/link-google-slide-anda)


---

## 🚀 Panduan Instalasi (Fullstack)

### 1. Clone Repository

```bash
git clone https://github.com/saaip7/testing-storage-management.git
cd testing-storage-management
````



### 2. Menjalankan Backend

```bash
cd server
npm install
npm run dev
```

> Backend berjalan di `http://localhost:5000`



### 3. Menjalankan Frontend

```bash
cd client
npm install
npm run dev
```

> Frontend berjalan di `http://localhost:3000`
> Pastikan frontend mengakses API backend dari `http://localhost:5000`



## 📂 Struktur Folder Project

```
/repo-root
│
├── /client                     # Frontend (Next.js + shadcn/ui)
│   ├── /components             # Komponen: AddItemSheet, ItemTable
│      └── /__tests__           # Unit test frontend     
│   └── /app                    # Halaman utama
│
├── /server                     # Backend (Express + MongoDB)
│   ├── /config                 # Endpoint GET, POST, DELETE
│       └── db.js               # konfigurasi database
│   ├── /src                 
│       └── /routes              # Endpoint GET, POST, DELETE
│       └── /models              # Skema mongoose
│       └── /controllers         # Logic backend
│   ├── /tests                   # Unit dan API test backend
│   └── server.js                # Inisialisasi server
│
└── README.md
```

---

## ✅ Daftar Fitur

| ID  | Fitur                                                                                                               |
| --- | ------------------------------------------------------------------------------------------------------------------- |
| F1  | Form input dengan validasi frontend: "Nama Barang" (required, max 100 karakter), "Jumlah" (required, angka positif) |
| F2  | Tombol aksi "Catat Barang" untuk kirim data ke backend                                                              |
| F3  | Endpoint API untuk menyimpan data barang (POST `/items`)                                                            |
| F4  | Endpoint API untuk mengambil data barang terbaru (GET `/items`)                                                     |
| F5  | Tabel frontend menampilkan 10 entri terbaru (nama, jumlah, timestamp)                                               |
| F6  | Validasi backend untuk memastikan data valid                                                                        |
| F7  | Data tetap muncul setelah halaman di-refresh                                                                        |
| F8  | Data disimpan secara permanen di database                                                                           |
| F9  | Barang bisa dihapus dari daftar                                                                                     |
| F10 | Endpoint DELETE untuk menghapus barang berdasarkan ID                                                               |
| F11 | Tampilkan pesan error spesifik jika validasi gagal (frontend & backend)                                             |



## 🎯 Acceptance Criteria

| ID    | Kriteria                                                                            |
| ----- | ----------------------------------------------------------------------------------- |
| F1    | Form tidak bisa dikirim jika nama kosong atau lebih dari 100 karakter               |
| F1    | Form tidak bisa dikirim jika jumlah kosong atau bukan angka positif                 |
| F2    | Klik "Catat Barang" harus mengirim data valid ke backend                            |
| F3    | Backend menyimpan data dengan timestamp                                             |
| F4    | Backend mengembalikan daftar barang terbaru                                         |
| F5    | Tabel frontend update otomatis dalam 1 detik tanpa reload                           |
| F6    | Backend kirim error 400 dan pesan jika validasi gagal                               |
| F7,F8 | Setelah refresh, data tetap muncul di daftar                                        |
| F9    | Setelah delete, barang langsung hilang dari tabel                                   |
| F10   | Data terhapus dari database berdasarkan ID                                          |
| F11   | Tampilkan error seperti "Nama barang wajib diisi" atau "Jumlah harus angka positif" |

---

## 🧪 Testing & Validasi

### ✅ Unit Test

| Layer    | Tools                        | File Referensi                                                                                                                        |
| -------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend | Jest + React Testing Library | [`client/src/components/__tests__/AddItemTest.test.tsx`](client/src/components/__tests__/AddItemTest.test.tsx)                        |
|          |                              | [`client/src/components/__tests__/RenderItemTable.test.tsx`](client/src/components/__tests__/RenderItemTable.test.tsx)                |
| Backend  | Jest + Supertest             | [`server/tests/unit/controllers.test.js`](server/tests/unit/controllers.test.js)                                                      |
|          |                              | [`server/tests/unit/validateItem.test.js`](server/tests/unit/validateItem.test.js)                                                    |
|          |                              | [`server/tests/integration/integration.test.js`](server/tests/integration/integration.test.js)                                        |


### 🧪 Screenshot Hasil API Test

- Fetch Items API Testing

![API Test - Fetch Items](https://i.imghippo.com/files/pIq5232vSY.jpeg)

> Respon 200 OK

- Post Items API Testing

![API Test - Post Items](https://i.imghippo.com/files/sr1776j.jpeg)

> Respon 200 OK

- Delete Items API Testing

![API Test - Delete Items](https://i.imghippo.com/files/z2330g.jpeg)

> Respon 200 OK



### 🧪 Screenshot Hasil Coverage Unit Test

- 💡 Backend Coverage Test

![Backed Test Coverage](https://i.imghippo.com/files/DBQ3561QI.jpeg)

- 💡 Frontend Coverage Test

![Backed Test Coverage](https://i.imghippo.com/files/vrid6702QMk.png)
> Meskipun seluruh test suite berhasil dijalankan 100% (2 passed dari 2 total) dan semua test case lolos (11/11), hasil coverage masih menunjukkan beberapa bagian berwarna merah. Hal ini terjadi karena pengujian memang difokuskan pada dua komponen utama yaitu AddItemSheet dan ItemTable, yang mencakup validasi form, pengiriman data, render tabel, dan penghapusan item. Komponen lain seperti elemen UI (misalnya card.tsx, sheet.tsx, button.tsx) tidak menjadi fokus karena hanya berperan sebagai presentational component tanpa logic penting. Oleh karena itu, warna merah tidak menandakan kegagalan pengujian, melainkan hanya bagian yang tidak secara langsung disentuh oleh test.








