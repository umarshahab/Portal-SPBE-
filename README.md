# Portal Pemerintah Digital (PEMDI) Kota Dumai

Portal Pemerintah Digital (PEMDI) Kota Dumai merupakan aplikasi berbasis web yang dikembangkan untuk mendukung penyelenggaraan, pengelolaan, dan pemantauan evaluasi Pemerintah Digital di lingkungan Pemerintah Kota Dumai.

Aplikasi ini dirancang sebagai platform terintegrasi untuk menyajikan informasi Pemerintah Digital, memantau pemenuhan indikator evaluasi, serta mengelola dokumen evidence sebagai bukti dukung pelaksanaan evaluasi.

## Tentang Project

Portal PEMDI Kota Dumai merupakan pengembangan portal yang sebelumnya berfokus pada Sistem Pemerintahan Berbasis Elektronik (SPBE). Seiring dengan penyesuaian arah pengembangan, sistem dan antarmuka mulai disesuaikan dengan konsep Pemerintah Digital.

Pengembangan saat ini difokuskan pada sisi frontend menggunakan React.js. Integrasi backend dan database akan dikembangkan pada tahap selanjutnya.

## Teknologi

- React.js 19
- Vite 8
- JavaScript (ES6+)
- Tailwind CSS 4
- React Router DOM
- Lucide React
- Node.js dan npm

## Fitur dan Progres Pengembangan

### 1. Portal Utama

- [x] Landing page Portal PEMDI Kota Dumai
- [x] Bagian pengenalan dan informasi Pemerintah Digital
- [x] Dashboard ringkasan evaluasi
- [x] Visualisasi aspek dan domain evaluasi
- [x] Galeri dokumentasi
- [x] Bagian dokumen dan informasi pendukung
- [x] Navigasi menuju halaman evaluasi

### 2. Portal Evaluasi

- [x] Halaman evaluasi Pemerintah Digital
- [x] Penyajian indikator evaluasi
- [x] Pengelompokan indikator berdasarkan kategori Internal dan External
- [x] Informasi bobot dan tingkat kematangan indikator
- [x] Penyajian substansi dan kebutuhan evidence
- [x] Referensi modul dokumen untuk 20 indikator evaluasi
- [x] Filter daftar indikator dan evidence

### 3. Pengelolaan Evidence

- [x] Upload dokumen evidence
- [x] Preview dokumen PDF dan gambar
- [x] Download dokumen evidence
- [x] Hapus dokumen evidence
- [x] Validasi format dan ukuran file
- [x] Dukungan PDF, JPG, PNG, dan WEBP
- [x] Batas ukuran file maksimal 10 MB
- [x] Ringkasan jumlah evidence yang telah diunggah

**Catatan:** Pengelolaan evidence saat ini masih berjalan di sisi frontend menggunakan penyimpanan sementara browser. Integrasi penyimpanan permanen melalui backend dan database belum diimplementasikan.

### 4. Pengembangan Selanjutnya

- [ ] Perancangan dan implementasi backend API
- [ ] Integrasi database
- [ ] Autentikasi dan otorisasi pengguna
- [ ] Pengelolaan pengguna dan hak akses
- [ ] Penyimpanan evidence secara permanen
- [ ] Integrasi data evaluasi dengan backend
- [ ] Penyempurnaan perhitungan dan visualisasi hasil evaluasi
- [ ] Pengelolaan laporan evaluasi
- [ ] Pengujian dan penyempurnaan sistem

## Struktur Project

```text
portal-spbe/
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
│   ├── data/
│   │   ├── evaluationData.js
│   │   └── portalData.js
│   ├── layouts/
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Evaluasi.jsx
│   ├── utils/
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

Untuk menjalankan hasil build secara lokal:

```bash
npm run preview
```

## Status Pengembangan

Project Portal PEMDI Kota Dumai masih dalam tahap pengembangan bertahap.

Pengembangan saat ini berfokus pada penyempurnaan antarmuka, struktur halaman evaluasi, penyajian indikator, dan pengelolaan evidence. Tahap berikutnya diarahkan pada perancangan arsitektur backend, integrasi database, autentikasi, serta pengembangan mekanisme penyimpanan data secara permanen.

## Repository

GitHub: https://github.com/umarshahab/Portal-SPBE-

## Lisensi

Project ini dikembangkan untuk mendukung kebutuhan pengelolaan dan pemantauan evaluasi Pemerintah Digital di lingkungan Pemerintah Kota Dumai.
