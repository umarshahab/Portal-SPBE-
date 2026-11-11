
export const navigation = [
  { label: "Beranda", path: "/" },
  { label: "Indeks", path: "/indeks" },
  { label: "Regulasi", path: "/regulasi" },
  { label: "Galeri", path: "/galeri" },
  { label: "Informasi", path: "/informasi" },
];

export const domains = [
  {
    number: "01",
    title: "Kebijakan PEMDI",
    description:
      "Informasi kebijakan dan landasan penyelenggaraan Pemerintahan Digital.",
    path: "/indeks",
    icon: "file-check",
  },
  {
    number: "02",
    title: "Tata Kelola PEMDI",
    description:
      "Informasi tata kelola, koordinasi, dan pengelolaan Pemerintahan Digital Pemerintah Kota Dumai.",
    path: "/indeks",
    icon: "network",
  },
  {
    number: "03",
    title: "Manajemen PEMDI",
    description:
      "Informasi manajemen risiko, keamanan, data, dan sumber daya Pemerintahan Digital.",
    path: "/indeks",
    icon: "settings",
  },
  {
    number: "04",
    title: "Layanan PEMDI",
    description:
      "Informasi layanan administrasi pemerintahan dan layanan publik berbasis digital.",
    path: "/indeks",
    icon: "monitor",
  },
];

// Dokumentasi kegiatan
// Gambar saat ini masih ilustrasi dan perlu diganti dengan foto resmi.
export const gallery = [
  {
    id: 1,
    title:
      "Rapat Lintas OPD Guna Peningkatan Progres Kesiapan Penilaian PEMDI",
    category: "Kegiatan",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900",
    isSample: true,
  },
  {
    id: 2,
    title: "Rapat Bidang Aplikasi dengan Bidang Layanan",
    category: "Koordinasi",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900",
    isSample: true,
  },
  {
    id: 3,
    title: "Rapat Rutin Untuk Pengerjaan PEMDI",
    category: "Kegiatan",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900",
    isSample: true,
  },
  {
    id: 4,
    title: "Rapat Kolaborasi Dengan Dinas Perizinan",
    category: "Kolaborasi",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900",
    isSample: true,
  },
];

// Dokumen pendukung yang akan diisi dengan dokumen resmi.
export const documents = [
  {
    id: 1,
    title: "Dokumen Kebijakan Pemerintahan Digital",
    category: "Kebijakan",
    date: "Belum tersedia",
    status: "Menunggu dokumen",
    url: null,
  },
  {
    id: 2,
    title: "Dokumen Tata Kelola Pemerintahan Digital",
    category: "Tata Kelola",
    date: "Belum tersedia",
    status: "Menunggu dokumen",
    url: null,
  },
  {
    id: 3,
    title: "Dokumen Manajemen Pemerintahan Digital",
    category: "Manajemen",
    date: "Belum tersedia",
    status: "Menunggu dokumen",
    url: null,
  },
];
