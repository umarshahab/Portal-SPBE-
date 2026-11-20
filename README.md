# Portal Pemerintah Digital (PEMDI) Kota Dumai

Portal Pemerintah Digital (PEMDI) Kota Dumai merupakan aplikasi berbasis web yang dikembangkan untuk mendukung penyelenggaraan, pengelolaan, dan pemantauan evaluasi Pemerintah Digital di lingkungan Pemerintah Kota Dumai.

Aplikasi ini dirancang sebagai platform terintegrasi untuk menyajikan informasi Pemerintah Digital, memantau pemenuhan indikator evaluasi, mengelola dokumen evidence, serta menyediakan Content Management System (CMS) untuk pengelolaan konten portal.

## Tentang Project

Portal PEMDI Kota Dumai merupakan pengembangan portal yang sebelumnya berfokus pada Sistem Pemerintahan Berbasis Elektronik (SPBE). Seiring dengan penyesuaian arah pengembangan, sistem, struktur halaman, dan antarmuka mulai disesuaikan dengan konsep Pemerintah Digital.

Pengembangan saat ini difokuskan pada sisi frontend menggunakan React.js. Backend API, database, autentikasi terintegrasi, dan penyimpanan permanen direncanakan untuk dikembangkan pada tahap berikutnya.

## Teknologi

- React.js 19
- Vite 8
- JavaScript (ES6+)
- Tailwind CSS 4
- React Router DOM
- Lucide React
- Node.js
- npm
- Local Storage Browser

## Fitur dan Progres Pengembangan

### 1. Portal Utama

- [x] Landing page Portal PEMDI Kota Dumai
- [x] Bagian pengenalan dan informasi Pemerintah Digital
- [x] Dashboard ringkasan evaluasi
- [x] Visualisasi aspek dan domain evaluasi
- [x] Galeri dokumentasi
- [x] Bagian dokumen dan informasi pendukung
- [x] Navigasi menuju halaman evaluasi
- [x] Penyajian konten portal berdasarkan data yang dikelola melalui CMS

### 2. Portal Evaluasi

- [x] Halaman evaluasi Pemerintah Digital
- [x] Penyajian indikator evaluasi
- [x] Pengelompokan indikator berdasarkan kategori Internal dan External
- [x] Informasi bobot dan tingkat kematangan indikator
- [x] Penyajian substansi dan kebutuhan evidence
- [x] Referensi modul dokumen untuk 20 indikator evaluasi
- [x] Filter daftar indikator dan evidence
- [x] Ringkasan pemenuhan evidence pada dashboard

### 3. Pengelolaan Evidence

- [x] Upload dokumen evidence
- [x] Preview dokumen PDF dan gambar
- [x] Download dokumen evidence
- [x] Hapus dokumen evidence
- [x] Validasi format dan ukuran file
- [x] Dukungan PDF, JPG, PNG, dan WEBP
- [x] Batas ukuran file maksimal 10 MB
- [x] Ringkasan jumlah evidence yang telah diunggah
- [x] Sinkronisasi data evidence dengan ringkasan pada halaman utama selama sesi aplikasi berjalan

**Catatan:** Pengelolaan evidence masih berjalan di sisi frontend menggunakan penyimpanan sementara browser. Data file belum tersimpan secara permanen dan dapat hilang ketika halaman dimuat ulang. Penyimpanan permanen akan dikembangkan melalui backend dan database.

### 4. Content Management System (CMS)

- [x] Halaman dashboard CMS
- [x] Pengelolaan regulasi
- [x] Tambah, edit, dan hapus data regulasi
- [x] Pengelolaan galeri dokumentasi
- [x] Tambah, edit, dan hapus data galeri
- [x] Pengelolaan informasi dan berita
- [x] Tambah, edit, dan hapus informasi
- [x] Pengaturan status publikasi informasi
- [x] Pengelolaan gambar Hero pada halaman utama
- [x] Upload gambar dan preview
- [x] Pengaturan urutan gambar Hero
- [x] Penyimpanan konten CMS menggunakan Local Storage browser

**Catatan:** CMS saat ini menggunakan Local Storage sehingga perubahan konten tetap tersedia setelah halaman dimuat ulang pada browser dan perangkat yang sama. Data belum tersinkronisasi dengan pengguna atau perangkat lain karena backend belum tersedia.

### 5. Login dan Akses Admin

- [x] Halaman login admin
- [x] Portal utama dapat diakses tanpa login
- [x] Pembatasan akses halaman internal melalui mekanisme Protected Route frontend
- [x] Akses CMS dan evaluasi melalui halaman internal
- [x] Logout admin
- [x] Setelah logout, pengguna diarahkan kembali ke halaman utama PEMDI
- [x] Status autentikasi sementara menggunakan Local Storage browser

**Catatan:** Mekanisme login saat ini masih berupa implementasi frontend dan belum menggunakan autentikasi backend. Belum dapat dianggap sebagai sistem keamanan untuk penggunaan produksi.

## Pengembangan Selanjutnya

### Backend dan Database

- [ ] Perancangan arsitektur backend
- [ ] Implementasi backend API
- [ ] Perancangan dan integrasi database
- [ ] Implementasi autentikasi dan otorisasi pengguna
- [ ] Pengelolaan pengguna dan hak akses
- [ ] Penyimpanan evidence secara permanen
- [ ] Integrasi data evaluasi dengan backend
- [ ] Integrasi CMS dengan database
- [ ] Pengelolaan laporan evaluasi
- [ ] Penyempurnaan perhitungan dan visualisasi hasil evaluasi
- [ ] Pengujian dan penyempurnaan sistem

## Struktur Project

```text
Portal-SPBE-/
├── public/
│   ├── modules/
│   │   ├── Modul Indikator 1.pptx
│   │   ├── Modul Indikator 2.pptx
│   │   └── ... (hingga indikator 20)
│   └── assets/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   │   └── PortalContentContext.jsx
│   ├── data/
│   │   ├── evaluationData.js
│   │   └── portalData.js
│   ├── layouts/
│   ├── pages/
│   │   ├── cms/
│   │   │   ├── CMSRegulasi.jsx
│   │   │   ├── CMSGaleri.jsx
│   │   │   ├── CMSInformasi.jsx
│   │   │   └── CMSHero.jsx
│   │   ├── Home.jsx
│   │   ├── Evaluasi.jsx
│   │   ├── DataEvidence.jsx
│   │   ├── Regulasi.jsx
│   │   ├── Galeri.jsx
│   │   └── Informasi.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*Struktur di atas merupakan gambaran direktori utama project dan dapat berkembang mengikuti implementasi berikutnya.*

## Instalasi dan Menjalankan Project

### Persyaratan

Pastikan perangkat telah memiliki:

- Node.js
- npm
- Git

### 1. Clone Repository

```bash
git clone https://github.com/umarshahab/Portal-SPBE-.git
```

### 2. Masuk ke Direktori Project

```bash
cd Portal-SPBE-
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Aplikasi dapat diakses melalui alamat lokal yang ditampilkan oleh Vite, biasanya:

```text
http://localhost:5173
```

### 5. Build untuk Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

## Status Pengembangan

**Status: Frontend Development**

Pengembangan Portal PEMDI Kota Dumai saat ini telah mencakup portal utama, halaman evaluasi, pengelolaan evidence, CMS, serta alur akses admin di sisi frontend.

Tahap selanjutnya akan difokuskan pada pengembangan backend secara terpisah, mulai dari perancangan arsitektur API, database, autentikasi, hingga integrasi penyimpanan data secara permanen.

## Repository

GitHub: https://github.com/umarshahab/Portal-SPBE-

## Lisensi

Project ini dikembangkan untuk mendukung kebutuhan pengelolaan dan pemantauan evaluasi Pemerintah Digital di lingkungan Pemerintah Kota Dumai.
