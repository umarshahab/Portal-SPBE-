const OFFICIAL_PORTAL =
  "https://evidence-pemdi.dumaikota.go.id/evidence";

export const indicatorModules = {
  1: {
    title: "Tingkat Kematangan Tata Kelola Pemerintah Digital",
    type: "Internal",
    expectedEvidence: 13,
    description:
      "Tata kelola Pemerintah Digital merupakan kerangka kerja yang memastikan perencanaan, pelaksanaan, dan pengendalian penerapan Pemerintah Digital berjalan secara terpadu.",
    legalBasis: [
      "Peraturan Presiden Nomor 12 Tahun 2025 tentang RPJMN 2025–2029",
    ],
    measurementObjects: [
      "Arsitektur Pemerintah Digital Instansi Pemerintah",
      "Rencana Aksi Nasional Pemerintah Digital sebagai referensi rencana aksi instansi pemerintah",
    ],
    
    criteria: [
    {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
        {
            id: "1-1",
            number: 1,
            name: "Rencana Aksi Nasional Pemerintah Digital pada Perencanaan Instansi sebagai acuan layanan digital yang tercantum pada Portal Layanan Digital Pemerintah pada Instansi Pemerintah",
            value: 0.25,
        },
        {
            id: "1-2",
            number: 2,
            name: "Portal Layanan Digital Pemerintah pada Instansi Pemerintah",
            value: 0.25,
        },
        ],
    },
    {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
        {
            id: "2-1",
            number: 1,
            name: "Rencana Layanan Digital yang akan dipadukan pada portal sesuai perencanaan Rencana Aksi Nasional Pemerintah Digital",
            value: 0.5,
        },
        {
            id: "2-2",
            number: 2,
            name: "Portal Layanan Digital Pemerintah pada Instansi Pemerintah pada sebagian Layanan Digital Pemerintah berbasis siklus hidup",
            value: 0.5,
        },
        {
            id: "2-3",
            number: 4,
            name: "Pengisian Arsitektur Pemerintah Digital pada sebagian Layanan Digital Pemerintah melalui SIAP Digital",
            value: 0.25,
        },
        ],
    },
    {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
        {
            id: "3-1",
            number: 1,
            name: "Portal Layanan Digital Pemerintah pada Instansi Pemerintah pada seluruh Layanan Digital Pemerintah berbasis siklus hidup",
            value: 0.25,
        },
        {
            id: "3-2",
            number: 1,
            name: "Dokumen seluruh substansi Rencana Aksi Nasional Pemerintah Digital pada perencanaan Instansi Pemerintah",
            value: 0.25,
        },
        {
            id: "3-3",
            number: 2,
            name: "Bukti kegiatan konsolidasi kolaboratif Tim Koordinasi Pemerintah Digital dalam menyusun substansi Rencana Aksi Nasional Pemerintah Digital pada perencanaan Instansi Pemerintah",
            value: 0.25,
        },
        {
            id: "3-4",
            number: 3,
            name: "Perencanaan dan Anggaran yang mendukung substansi Rencana Aksi Nasional Pemerintah Digital pada perencanaan Instansi Pemerintah",
            value: 0.25,
        },
        {
            id: "3-5",
            number: 4,
            name: "Pengisian Arsitektur Pemerintah Digital pada seluruh Layanan Digital Pemerintah prioritas dan/atau Layanan Digital Pemerintah tematik melalui SIAP Digital",
            value: 0.25,
        },
        ],
    },
    {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
        {
            id: "4-1",
            number: 1,
            name: "Bukti reviu atas penerapan Tata Kelola Transformasi Digital Pemerintah",
            value: 0.25,
        },
        {
            id: "4-2",
            number: 2,
            name: "Arsitektur Pemerintah Digital yang selanjutnya menjadi referensi pembangunan/pengembangan Keterpaduan Layanan Digital di Lingkungan Pemerintah Daerah, terintegrasi dengan Layanan Digital Pemerintah Provinsi dan menjadi bagian Layanan Digital Pemerintah",
            value: 0.25,
        },
        ],
    },
    {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
        {
            id: "5-1",
            number: 1,
            name: "Bukti tindak lanjut reviu atas penerapan Tata Kelola Transformasi Digital Pemerintah",
            value: 0.5,
        },
        {
            id: "5-2",
            number: 2,
            name: "Perubahan Substansi Rencana Aksi Nasional Pemerintah Digital pada perencanaan Instansi Pemerintah",
            value: 0.5,
        },
        ],
    },
    ],

    source: OFFICIAL_PORTAL,
    sourceStatus: "verified-partial",
  },

  2: {
    title: "Tingkat Kematangan Manajemen Layanan Digital Pemerintah",
    type: "Internal",
    expectedEvidence: 7,
    description:
      "Manajemen Layanan Digital Pemerintah merupakan proses pengelolaan yang mendukung kualitas penyelenggaraan layanan digital pemerintah.",
    legalBasis: [
      "PP Nomor 60 Tahun 2008 tentang Sistem Pengendalian Intern Pemerintah",
      "Perpres Nomor 39 Tahun 2023 tentang Manajemen Risiko Pembangunan Nasional",
      "PermenPANRB Nomor 5 Tahun 2020 tentang Manajemen Risiko SPBE",
      "Peraturan BRIN Nomor 2 Tahun 2024 tentang Manajemen Pengetahuan",
    ],
    measurementObjects: [
      "Pelaksanaan manajemen layanan digital pemerintah",
      "Keselarasan manajemen layanan dengan Rencana Aksi Nasional Pemerintah Digital",
    ],
    
    criteria: [
    {
        level: 1,
        name: "Initiate / Kurang",
        maxPM: 0.5,
        requirements: [
        {
            id: "2-1-1",
            number: 1,
            name: "Substansi sebagian Rencana Aksi Nasional Pemerintah Digital pada perencanaan Instansi Pemerintah",
            value: 0.25,
        },
        {
            id: "2-1-2",
            number: 2,
            name: "Bukti Pelaksanaan Manajemen pada Layanan Digital Pemerintah sesuai dengan kebutuhan internal",
            value: 0.25,
        },
        ],
    },
    {
        level: 2,
        name: "Emerging / Cukup",
        maxPM: 1,
        requirements: [
        {
            id: "2-2-1",
            number: 1,
            name: "Substansi seluruh Rencana Aksi Nasional Pemerintah Digital pada perencanaan Instansi Pemerintah",
            value: 0.5,
        },
        {
            id: "2-2-2",
            number: 2,
            name: "Bukti Pelaksanaan Manajemen pada sebagian Layanan Digital Pemerintah",
            value: 0.5,
        },
        ],
    },
    {
        level: 3,
        name: "Developing / Baik",
        maxPM: 1,
        requirements: [
        {
            id: "2-3-1",
            number: 1,
            name: "Bukti Pelaksanaan Manajemen Layanan Digital Pemerintah pada seluruh Layanan Digital Pemerintah sesuai Rencana Aksi Nasional Pemerintah Digital",
            value: 1,
        },
        ],
    },
    {
        level: 4,
        name: "Embedded / Sangat Baik",
        maxPM: 0.5,
        requirements: [
        {
            id: "2-4-1",
            number: 1,
            name: "Laporan Reviu Penerapan Manajemen Layanan Digital Pemerintah",
            value: 0.5,
        },
        ],
    },
    {
        level: 5,
        name: "Leading / Memuaskan",
        maxPM: 1,
        requirements: [
        {
            id: "2-5-1",
            number: 1,
            name: "Optimalisasi Manajemen Layanan Digital Pemerintah",
            value: 1,
        },
        ],
    },
    ],

    source: OFFICIAL_PORTAL,
    sourceStatus: "verified-partial",
  },

  3: {
    title: "Tingkat Kematangan Sumber Daya Manusia Pemerintah Digital",
    type: "Internal",
    expectedEvidence: 24,
    description:
      "Pengukuran kematangan sumber daya manusia dalam mendukung penyelenggaraan Pemerintah Digital.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "3-1-1",
            number: 1,
            name: "Peta Kompetensi untuk pelaksanaan Pemerintah Digital",
            value: 0.13,
          },
          {
            id: "3-1-2",
            number: 2,
            name: "Bukti penggunaan aplikasi dasar dan sistem kerja digital internal",
            value: 0.13,
          },
          {
            id: "3-1-3",
            number: 3,
            name: "Dokumentasi pelaksanaan komunitas belajar",
            value: 0.13,
          },
          {
            id: "3-1-4",
            number: 4,
            name: "Laporan penggunaan microlearning internal (modul singkat, video, e-learning sederhana)",
            value: 0.13,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "3-2-1",
            number: 1,
            name: "Peta Kompetensi untuk pelaksanaan Pemerintah Digital",
            value: 0.2,
          },
          {
            id: "3-2-2",
            number: 2,
            name: "Laporan peningkatan kompetensi digital",
            value: 0.2,
          },
          {
            id: "3-2-3",
            number: 3,
            name: "Dokumentasi pelaksanaan komunitas belajar (20% ASN)",
            value: 0.2,
          },
          {
            id: "3-2-4",
            number: 4,
            name: "Laporan penggunaan pembelajaran digital nasional",
            value: 0.2,
          },
          {
            id: "3-2-5",
            number: 5,
            name: "Laporan keikutsertaan pada forum internasional dalam meningkatkan kompetensi digital ASN",
            value: 0.2,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "3-3-1",
            number: 1,
            name: "Peta Kompetensi Digital untuk pelaksanaan Pemerintah Digital",
            value: 0.2,
          },
          {
            id: "3-3-2",
            number: 2,
            name: "Laporan peningkatan kompetensi digital",
            value: 0.2,
          },
          {
            id: "3-3-3",
            number: 3,
            name: "Dokumentasi pelaksanaan komunitas belajar (50% ASN)",
            value: 0.2,
          },
          {
            id: "3-3-4",
            number: 4,
            name: "Laporan Pemanfaatan AI dan Analisis Data (20% ASN)",
            value: 0.2,
          },
          {
            id: "3-3-5",
            number: 5,
            name: "Laporan keikutsertaan pada forum internasional dalam meningkatkan kompetensi digital ASN (50% ASN)",
            value: 0.2,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "3-4-1",
            number: 1,
            name: "Peta Kompetensi Digital untuk pelaksanaan Pemerintah Digital",
            value: 0.13,
          },
          {
            id: "3-4-2",
            number: 2,
            name: "Laporan peningkatan kompetensi digital",
            value: 0.13,
          },
          {
            id: "3-4-3",
            number: 3,
            name: "Dokumentasi pelaksanaan komunitas belajar (75% ASN)",
            value: 0.13,
          },
          {
            id: "3-4-4",
            number: 4,
            name: "Laporan Pemanfaatan AI dan Analisis Data yang intensif (50% ASN)",
            value: 0.13,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
          {
            id: "3-5-1",
            number: 1,
            name: "Peta Kompetensi Digital untuk pelaksanaan Pemerintah Digital",
            value: 0.17,
          },
          {
            id: "3-5-2",
            number: 2,
            name: "Laporan peningkatan kompetensi digital",
            value: 0.17,
          },
          {
            id: "3-5-3",
            number: 3,
            name: "Dokumentasi pelaksanaan komunitas belajar (90% ASN)",
            value: 0.17,
          },
          {
            id: "3-5-4",
            number: 4,
            name: "Laporan Pemanfaatan AI dan Analisis Data yang intensif (90% ASN)",
            value: 0.17,
          },
          {
            id: "3-5-5",
            number: 5,
            name: "Bukti keahlian digital (20% ASN)",
            value: 0.17,
          },
          {
            id: "3-5-6",
            number: 6,
            name: "Laporan pemanfaatan teknologi terbaru",
            value: 0.17,
          },
        ],
      },
    ],

    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  4: {
    title: "Tingkat Kematangan Kolaborasi Pemerintah Digital",
    type: "Internal",
    expectedEvidence: 8,
    description:
      "Pengukuran pelaksanaan kolaborasi antarinstansi pemerintah dalam penerapan Pemerintah Digital.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [
        {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
            {
            id: "4-1-1",
            number: 1,
            name: "Penetapan Tim Koordinasi Pemerintah Digital Instansi Pemerintah",
            value: 0.17,
            },
            {
            id: "4-1-2",
            number: 2,
            name: "Substansi Rencana Aksi Nasional Pemerintah Digital pada perencanaan Instansi Pemerintah dengan rincian rencana kolaborasi antar unit kerja/perangkat daerah dalam menerapkan Pemerintah Digital",
            value: 0.17,
            },
            {
            id: "4-1-3",
            number: 3,
            name: "Bukti Pelaksanaan Kolaborasi antar unit kerja/perangkat daerah dalam menerapkan Pemerintah Digital sesuai Substansi Rencana Aksi Nasional Pemerintah Digital pada perencanaan Instansi Pemerintah",
            value: 0.17,
            },
        ],
        },
        {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
            {
            id: "4-2-1",
            number: 1,
            name: "Substansi Rencana Aksi Nasional Pemerintah Digital pada perencanaan Instansi Pemerintah dengan rincian rencana kolaborasi antar Instansi Pemerintah dalam menerapkan Pemerintah Digital",
            value: 0.5,
            },
            {
            id: "4-2-2",
            number: 2,
            name: "Bukti Pelaksanaan Kolaborasi antar Instansi Pemerintah dalam menerapkan Pemerintah Digital sesuai Substansi Rencana Aksi Nasional Pemerintah Digital pada perencanaan Instansi Pemerintah",
            value: 0.5,
            },
        ],
        },
        {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
            {
            id: "4-3-1",
            number: 1,
            name: "Bukti Pelaksanaan Kolaborasi perencanaan Instansi Pemerintah bersama dan tidak terbatas kepada akademisi, lembaga penelitian, pelaku usaha, industri, media, komunitas, dan organisasi masyarakat baik dalam negeri maupun luar negeri dalam menerapkan Pemerintah Digital sesuai Substansi Rencana Aksi Nasional Pemerintah Digital pada perencanaan Instansi Pemerintah",
            value: 1,
            },
        ],
        },
        {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
            {
            id: "4-4-1",
            number: 1,
            name: "Laporan Reviu kegiatan Kolaborasi Pemerintah Digital",
            value: 0.5,
            },
        ],
        },
        {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
            {
            id: "4-5-1",
            number: 1,
            name: "Optimalisasi Kolaborasi Pemerintah Digital",
            value: 1,
            },
        ],
        },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "verified-partial",
  },

  5: {
    title: "Tingkat Kematangan Tata Kelola Data",
    type: "External",
    expectedEvidence: 0,
    description:
      "Pengukuran mengacu pada Indeks Satu Data Indonesia.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [],
    source: OFFICIAL_PORTAL,
    sourceStatus: "external",
  },

  6: {
    title: "Tingkat Kematangan Penyelenggaraan Informasi Geospasial",
    type: "External",
    expectedEvidence: 0,
    description:
      "Pengukuran mengacu pada Indeks Simpul Jaringan Informasi Geospasial.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [],
    source: OFFICIAL_PORTAL,
    sourceStatus: "external",
  },

  7: {
    title: "Tingkat Kematangan Pembangunan Statistik",
    type: "External",
    expectedEvidence: 0,
    description:
      "Pengukuran mengacu pada Indeks Pembangunan Statistik.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [],
    source: OFFICIAL_PORTAL,
    sourceStatus: "external",
  },

  8: {
    title: "Tingkat Kematangan Pelindungan Data Pribadi",
    type: "Internal",
    expectedEvidence: 35,
    description:
      "Pengukuran penerapan tata kelola dan aspek teknis pelindungan data pribadi.",
    legalBasis: [
      "Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi",
    ],
    measurementObjects: [],
    criteria: [
        {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
            {
            id: "8-1-1",
            number: 1,
            name: "Dokumentasi uraian Tata Kelola Pelindungan Data Pribadi",
            value: 0.07,
            },
            {
            id: "8-1-2",
            number: 2,
            name: "Dokumentasi uraian program awareness dan kompetensi Pelindungan Data Pribadi bagi pegawai",
            value: 0.07,
            },
            {
            id: "8-1-3",
            number: 3,
            name: "Dokumentasi uraian penunjukan Pejabat/Petugas PDP (DPO)",
            value: 0.07,
            },
            {
            id: "8-1-4",
            number: 4,
            name: "Dokumentasi uraian pelaksanaan mekanisme pemenuhan Hak Subjek Data",
            value: 0.07,
            },
            {
            id: "8-1-5",
            number: 5,
            name: "Dokumentasi uraian pelaksanaan pemberitahuan pelindungan Data Pribadi",
            value: 0.07,
            },
            {
            id: "8-1-6",
            number: 6,
            name: "Dokumentasi uraian pelaksanaan mekanisme pengamanan Data Pribadi",
            value: 0.07,
            },
            {
            id: "8-1-7",
            number: 7,
            name: "Dokumentasi uraian pelaksanaan mekanisme Pengelolaan Risiko atau Dampak Data Pribadi",
            value: 0.07,
            },
        ],
        },
        {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
            {
            id: "8-2-1",
            number: 1,
            name: "Dokumentasi Tata Kelola Pelindungan Data Pribadi secara menyeluruh",
            value: 0.14,
            },
            {
            id: "8-2-2",
            number: 2,
            name: "Dokumentasi pelaksanaan program awareness dan kompetensi Pelindungan Data Pribadi bagi pegawai",
            value: 0.14,
            },
            {
            id: "8-2-3",
            number: 3,
            name: "Dokumen penunjukkan Pejabat/Petugas PDP (DPO)",
            value: 0.14,
            },
            {
            id: "8-2-4",
            number: 4,
            name: "Dokumentasi mekanisme pemenuhan Hak Subjek Data pada sebagian Layanan Digital Pemerintah",
            value: 0.14,
            },
            {
            id: "8-2-5",
            number: 5,
            name: "Dokumentasi pemberitahuan pelindungan Data Pribadi dan terpublikasi pada sebagian Layanan Digital Pemerintah",
            value: 0.14,
            },
            {
            id: "8-2-6",
            number: 6,
            name: "Dokumentasi mekanisme pengamanan Data Pribadi pada sebagian Layanan Digital Pemerintah",
            value: 0.14,
            },
            {
            id: "8-2-7",
            number: 7,
            name: "Dokumentasi mekanisme Pengelolaan Risiko atau Dampak Data Pribadi pada sebagian Layanan Digital Pemerintah",
            value: 0.14,
            },
        ],
        },
        {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
            {
            id: "8-3-1",
            number: 1,
            name: "Dokumentasi penerapan Tata Kelola Pelindungan Data Pribadi pada seluruh Layanan Digital Pemerintah",
            value: 0.14,
            },
            {
            id: "8-3-2",
            number: 2,
            name: "Dokumentasi pelaksanaan program awareness dan kompetensi Pelindungan Data Pribadi bagi pegawai secara berkala",
            value: 0.14,
            },
            {
            id: "8-3-3",
            number: 3,
            name: "Dokumentasi pelaksanaan tugas dan fungsi Pejabat/Petugas PDP (DPO)",
            value: 0.14,
            },
            {
            id: "8-3-4",
            number: 4,
            name: "Dokumentasi mekanisme pemenuhan Hak Subjek Data pada seluruh Layanan Digital Pemerintah",
            value: 0.14,
            },
            {
            id: "8-3-5",
            number: 5,
            name: "Dokumentasi pemberitahuan pelindungan Data Pribadi dan terpublikasi pada seluruh Layanan Digital Pemerintah",
            value: 0.14,
            },
            {
            id: "8-3-6",
            number: 6,
            name: "Dokumentasi mekanisme pengamanan Data Pribadi pada seluruh Layanan Digital",
            value: 0.14,
            },
            {
            id: "8-3-7",
            number: 7,
            name: "Dokumentasi mekanisme Pengelolaan Risiko atau Dampak Data Pribadi pada seluruh Layanan Digital Pemerintah",
            value: 0.14,
            },
        ],
        },
        {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
            {
            id: "8-4-1",
            number: 1,
            name: "Dokumentasi evaluasi Tata Kelola Pelindungan Data Pribadi",
            value: 0.07,
            },
            {
            id: "8-4-2",
            number: 2,
            name: "Dokumentasi evaluasi pada pelaksanaan program awareness dan kompetensi Pelindungan Data Pribadi bagi pegawai",
            value: 0.07,
            },
            {
            id: "8-4-3",
            number: 3,
            name: "Dokumentasi evaluasi pada pelaksanaan tugas dan fungsi Pejabat/Petugas PDP (DPO)",
            value: 0.07,
            },
            {
            id: "8-4-4",
            number: 4,
            name: "Dokumentasi evaluasi pada mekanisme pemenuhan Hak Subjek Data",
            value: 0.07,
            },
            {
            id: "8-4-5",
            number: 5,
            name: "Dokumentasi evaluasi pada substansi pelaksanaan publikasi pemberitahuan Data Pribadi",
            value: 0.07,
            },
            {
            id: "8-4-6",
            number: 6,
            name: "Dokumentasi evaluasi pada mekanisme pengamanan Data Pribadi",
            value: 0.07,
            },
            {
            id: "8-4-7",
            number: 7,
            name: "Dokumentasi evaluasi berkala pada Pengelolaan Risiko atau Dampak Data Pribadi pada seluruh Layanan Digital Pemerintah",
            value: 0.07,
            },
        ],
        },
        {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
            {
            id: "8-5-1",
            number: 1,
            name: "Dokumentasi tindak lanjut hasil evaluasi Tata Kelola Pelindungan Data Pribadi",
            value: 0.14,
            },
            {
            id: "8-5-2",
            number: 2,
            name: "Dokumentasi tindak lanjut hasil evaluasi pada pelaksanaan program awareness dan kompetensi Pelindungan Data Pribadi bagi pegawai",
            value: 0.14,
            },
            {
            id: "8-5-3",
            number: 3,
            name: "Dokumentasi tindak lanjut hasil evaluasi pada pelaksanaan tugas dan fungsi Pejabat/Petugas PDP (DPO)",
            value: 0.14,
            },
            {
            id: "8-5-4",
            number: 4,
            name: "Dokumentasi tindak lanjut hasil evaluasi pada mekanisme pemenuhan Hak Subjek Data",
            value: 0.14,
            },
            {
            id: "8-5-5",
            number: 5,
            name: "Dokumentasi hasil evaluasi pada substansi pelaksanaan publikasi pemberitahuan Data Pribadi",
            value: 0.14,
            },
            {
            id: "8-5-6",
            number: 6,
            name: "Dokumentasi tindak lanjut hasil evaluasi pada mekanisme pengamanan Data Pribadi",
            value: 0.14,
            },
            {
            id: "8-5-7",
            number: 7,
            name: "Dokumentasi tindak lanjut hasil evaluasi berkala pada Pengelolaan Risiko atau Dampak Data Pribadi",
            value: 0.14,
            },
        ],
        },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  9: {
    title: "Tingkat Kematangan Pelaksanaan Audit Keamanan Pemerintah Digital dan Teknologi Pemerintah Digital",
    type: "Internal",
    expectedEvidence: 6,
    description:
      "Pengukuran pelaksanaan audit keamanan Pemerintah Digital dan teknologi Pemerintah Digital.",
    legalBasis: [
      "Peraturan BSSN Nomor 8 Tahun 2024",
    ],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "9-1-1",
            number: 1,
            name: "Penetapan Tim Audit yang ditetapkan oleh Koordinator Pemerintah Digital di setiap Instansi Pemerintah",
            value: 0.25,
          },
          {
            id: "9-1-2",
            number: 2,
            name: "Dokumen Perencanaan Audit Instansi Pemerintah",
            value: 0.25,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "9-2-1",
            number: 1,
            name: "Laporan Hasil Audit Internal Keamanan Pemerintah Digital dan Teknologi Pemerintah Digital Internal",
            value: 1,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "9-3-1",
            number: 1,
            name: "Laporan Hasil Tindak Lanjut Audit Keamanan Pemerintah Digital dan Teknologi Pemerintah Digital",
            value: 1,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "9-4-1",
            number: 1,
            name: "Laporan Hasil Audit Eksternal Keamanan Pemerintah Digital dan Teknologi Pemerintah Digital",
            value: 0.5,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
          {
            id: "9-5-1",
            number: 1,
            name: "Laporan Hasil Tindak Lanjut Audit Eksternal Keamanan Pemerintah Digital dan Teknologi Pemerintah Digital",
            value: 1,
          },
        ],
      },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  10: {
    title: "Tingkat Kematangan Keamanan Pemerintah Digital",
    type: "Internal",
    expectedEvidence: 6,
    description:
      "Pengukuran kematangan keamanan siber menggunakan instrumen IKASANDI.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "10-1-1",
            number: 1,
            name: "Nilai IKASANDI pada area Keamanan Siber 0 <= IKASANDI < 1,50",
            value: 0.5,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "10-2-1",
            number: 1,
            name: "Dokumentasi Identifikasi Infrastruktur Informasi Vital",
            value: 0.5,
          },
          {
            id: "10-2-2",
            number: 2,
            name: "Nilai IKASANDI pada area Keamanan Siber 1,50 <= IKASANDI < 2,50",
            value: 0.5,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "10-3-1",
            number: 1,
            name: "Nilai IKASANDI pada area Keamanan Siber 2,50 <= IKASANDI < 3,50",
            value: 1,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "10-4-1",
            number: 1,
            name: "Instrumen IKASANDI pada area Keamanan Siber 3,50 <= IKASANDI < 4,00",
            value: 0.5,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
          {
            id: "10-5-1",
            number: 1,
            name: "Instrumen IKASANDI pada area Keamanan Siber 4,00 <= IKASANDI <= 5,00",
            value: 1,
          },
        ],
      },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  11: {
    title: "Tingkat Kematangan Penerapan Kriptografi untuk Keamanan Data",
    type: "Internal",
    expectedEvidence: 6,
    description:
      "Pengukuran penerapan teknologi kriptografi untuk perlindungan keamanan data.",
    legalBasis: [
      "Keputusan Kepala BSSN Nomor 443 Tahun 2025 tentang Algoritma Kriptografi Indonesia",
    ],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "11-1-1",
            number: 1,
            name: "Laporan pelaksanaan penerapan teknologi kriptografi yang terdapat Identifikasi aset yang dilakukan enkripsi",
            value: 0.5,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "11-2-1",
            number: 1,
            name: "Laporan pelaksanaan penerapan teknologi kriptografi",
            value: 1,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "11-3-1",
            number: 1,
            name: "Laporan pelaksanaan penerapan teknologi kriptografi",
            value: 1,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "11-4-1",
            number: 1,
            name: "Laporan evaluasi penerapan teknologi kriptografi",
            value: 0.5,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
          {
            id: "11-5-1",
            number: 1,
            name: "Laporan tindak lanjut hasil evaluasi penerapan teknologi kriptografi",
            value: 0.5,
          },
          {
            id: "11-5-2",
            number: 2,
            name: "Nilai IKASANDI pada Area Kematangan Persandian 4,00 <= IKASANDI <= 5,00",
            value: 0.5,
          },
        ],
      },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  12: {
    title: "Tingkat Kematangan Kapabilitas Penanganan Insiden Siber",
    type: "Internal",
    expectedEvidence: 7,
    description:
      "Pengukuran kapabilitas penanganan insiden siber oleh tim tanggap insiden siber.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "12-1-1",
            number: 1,
            name: "Dokumentasi pelaksanaan penanganan insiden",
            value: 0.25,
          },
          {
            id: "12-1-2",
            number: 2,
            name: "Nilai IKASANDI pada area Penanganan Insiden Siber 0 <= IKASANDI < 1,50 (* bukan hasil verifikasi oleh lembaga yang menyelenggarakan tugas pemerintahan di bidang siber dan sandi)",
            value: 0.25,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "12-2-1",
            number: 1,
            name: "Penetapan TTIS",
            value: 0.5,
          },
          {
            id: "12-2-2",
            number: 2,
            name: "Nilai IKASANDI pada area Penanganan Insiden Siber 1,50 <= IKASANDI < 2,50 (* bukan hasil verifikasi oleh lembaga yang menyelenggarakan tugas pemerintahan di bidang siber dan sandi)",
            value: 0.5,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "12-3-1",
            number: 1,
            name: "Instrumen IKASANDI area Penanganan Insiden Siber 2,50 <= IKASANDI < 3,50",
            value: 1,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "12-4-1",
            number: 1,
            name: "Instrumen IKASANDI area Penanganan Insiden Siber 3,50 <= IKASANDI < 4,00",
            value: 0.5,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
          {
            id: "12-5-1",
            number: 1,
            name: "Instrumen IKASANDI area Penanganan Insiden Siber 4,00 <= IKASANDI <= 5,00",
            value: 1,
          },
        ],
      },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  13: {
    title: "Tingkat Kematangan Aplikasi Pemerintah Digital",
    type: "Internal",
    expectedEvidence: 12,
    description:
      "Pengukuran pembangunan dan pengembangan aplikasi Pemerintah Digital.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "13-1-1",
            number: 1,
            name: "Bukti Pelaksanaan Pengembangan Aplikasi",
            value: 0.17,
          },
          {
            id: "13-1-2",
            number: 2,
            name: "Substansi Rencana Aksi Pemerintah Digital pada Perencanaan Instansi Pemerintah",
            value: 0.17,
          },
          {
            id: "13-1-3",
            number: 3,
            name: "Aplikasi Pemerintah Digital pada Arsitektur Teknologi Pemerintah Digital dari SIAP Digital",
            value: 0.17,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "13-2-1",
            number: 1,
            name: "Dokumentasi pembangunan/pengembangan aplikasi Pemerintah Digital",
            value: 0.33,
          },
          {
            id: "13-2-2",
            number: 2,
            name: "Substansi Rencana Aksi Pemerintah Digital pada Perencanaan Instansi Pemerintah",
            value: 0.33,
          },
          {
            id: "13-2-3",
            number: 3,
            name: "Laporan hasil reviu Unit Pengelola Layanan Digital",
            value: 0.33,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "13-3-1",
            number: 1,
            name: "Dokumentasi pengembangan/pembangunan aplikasi Pemerintah Digital",
            value: 0.25,
          },
          {
            id: "13-3-2",
            number: 2,
            name: "Laporan hasil reviu Unit Pengelola Layanan Digital",
            value: 0.25,
          },
          {
            id: "13-3-3",
            number: 3,
            name: "Laporan hasil terminasi aplikasi Pemerintah Digital",
            value: 0.25,
          },
          {
            id: "13-3-4",
            number: 4,
            name: "Repositori aplikasi Pemerintah Digital",
            value: 0.25,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "13-4-1",
            number: 1,
            name: "Laporan reviu pelaksanaan pembangunan/pengembangan aplikasi",
            value: 0.5,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 0.5,
        requirements: [
          {
            id: "13-5-1",
            number: 1,
            name: "Perbaikan pelaksanaan pembangunan/pengembangan aplikasi berdasarkan hasil laporan reviu",
            value: 1,
          },
        ],
      },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  14: {
    title: "Tingkat Kematangan Infrastruktur Pemerintah Digital",
    type: "Internal",
    expectedEvidence: 6,
    description:
      "Pengukuran kematangan infrastruktur Pemerintah Digital pada arsitektur teknologi.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "14-1-1",
            number: 1,
            name: "Dasbor Ekosistem Pusat Data yang dimanfaatkan oleh Instansi Pemerintah",
            value: 0.25,
          },
          {
            id: "14-1-2",
            number: 2,
            name: "Infrastruktur Digital pada Arsitektur Teknologi Pemerintah Digital dari SIAP Digital",
            value: 0.25,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "14-2-1",
            number: 1,
            name: "Laporan pemantauan pemanfaatan infrastruktur Pemerintah Digital pada sebagian Layanan Digital Instansi Pemerintah yang berisikan matriks pemanfaatan infrastruktur Pemerintah Digital",
            value: 1,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "14-3-1",
            number: 1,
            name: "Laporan pemantauan pemanfaatan infrastruktur Pemerintah Digital pada seluruh Layanan Digital Instansi Pemerintah yang berisikan matriks pemanfaatan infrastruktur Pemerintah Digital",
            value: 1,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "14-4-1",
            number: 1,
            name: "Laporan Reviu infrastruktur Pemerintah Digital",
            value: 0.5,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
          {
            id: "14-5-1",
            number: 1,
            name: "Laporan tindak lanjut infrastruktur Pemerintah Digital",
            value: 1,
          },
        ],
      },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  15: {
    title: "Keterpaduan Proses Bisnis Pemerintah Digital Lintas Unit dan Instansi",
    type: "Internal",
    expectedEvidence: 9,
    description:
      "Pengukuran keterpaduan proses bisnis lintas unit dan instansi untuk mendukung layanan digital pemerintah.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "15-1-1",
            number: 1,
            name: "Proses Bisnis Pemerintah Digital untuk mendukung Layanan Digital pada Arsitektur Pemerintah Digital dari SIAP Digital",
            value: 0.5,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "15-2-1",
            number: 1,
            name: "Pemetaan proses bisnis Pemerintah Digital untuk mendukung Layanan Digital dari SIAP Digital",
            value: 0.33,
          },
          {
            id: "15-2-2",
            number: 2,
            name: "Proses bisnis to-be yang mendukung keterpaduan Layanan Digital Pemerintah",
            value: 0.33,
          },
          {
            id: "15-2-3",
            number: 3,
            name: "Laporan Pelaksanaan budaya tertib arsip pada sebagian Layanan Digital Pemerintah",
            value: 0.33,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "15-3-1",
            number: 1,
            name: "Pemetaan proses bisnis Pemerintah Digital untuk mendukung Layanan Digital dari SIAP Digital di seluruh Layanan Digital Pemerintah prioritas dan/atau Layanan Digital Pemerintah tematik",
            value: 0.33,
          },
          {
            id: "15-3-2",
            number: 2,
            name: "Proses bisnis to-be yang mendukung keterpaduan Layanan Digital Pemerintah di seluruh Layanan Digital Pemerintah prioritas dan/atau Layanan Digital Pemerintah tematik",
            value: 0.33,
          },
          {
            id: "15-3-3",
            number: 3,
            name: "Laporan Pelaksanaan budaya tertib arsip pada seluruh Layanan Digital Pemerintah",
            value: 0.33,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "15-4-1",
            number: 1,
            name: "Reviu pelaksanaan keterpaduan proses bisnis Pemerintah Digital untuk mendukung Layanan Digital Pemerintah Instansi Pemerintah",
            value: 0.5,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
          {
            id: "15-5-1",
            number: 1,
            name: "Tindak lanjut hasil reviu pelaksanaan keterpaduan proses bisnis Layanan Digital Pemerintah Instansi Pemerintah",
            value: 1,
          },
        ],
      },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  16: {
    title: "Integrasi Aplikasi",
    type: "Internal",
    expectedEvidence: 6,
    description:
      "Pengukuran pelaksanaan integrasi aplikasi Pemerintah Digital.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "16-1-1",
            number: 1,
            name: "Laporan Pelaksanaan Integrasi Aplikasi yang berisikan matriks integrasi",
            value: 0.5,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "16-2-1",
            number: 1,
            name: "Pemetaan Integrasi Aplikasi sesuai Rencana Aksi Pemerintah digital yang terdapat pada Perencanaan Instansi Pemerintah",
            value: 0.5,
          },
          {
            id: "16-2-2",
            number: 2,
            name: "Laporan pelaksanaan integrasi aplikasi pada sebagian layanan yang berisikan uraian pelaksanaan dan matriks pemantauan Integrasi Aplikasi",
            value: 0.5,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "16-3-1",
            number: 1,
            name: "Laporan pelaksanaan integrasi aplikasi pada seluruh layanan yang berisikan uraian pelaksanaan dan matriks pemantauan Integrasi Aplikasi",
            value: 1,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "16-4-1",
            number: 1,
            name: "Matriks pemantauan reviu pelaksanaan Integrasi Aplikasi",
            value: 0.5,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
          {
            id: "16-5-1",
            number: 1,
            name: "Matriks pemantauan hasil tindak lanjut Integrasi Aplikasi",
            value: 1,
          },
        ],
      },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  17: {
    title: "Portal Layanan Digital Pemerintah",
    type: "Internal",
    expectedEvidence: 13,
    description:
      "Pengukuran penerapan Portal Layanan Digital Pemerintah.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "17-1-1",
            number: 1,
            name: "Rencana Aksi Nasional Pemerintah Digital pada Perencanaan Instansi sebagai acuan layanan digital yang tercantum pada Portal Layanan Digital Pemerintah pada Instansi Pemerintah",
            value: 0.25,
          },
          {
            id: "17-1-2",
            number: 2,
            name: "Portal Layanan Digital Pemerintah pada Instansi Pemerintah",
            value: 0.25,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "17-2-1",
            number: 1,
            name: "Rencana Layanan Digital yang akan dipadukan pada portal sesuai perencanaan Rencana Aksi Nasional Pemerintah Digital",
            value: 0.5,
          },
          {
            id: "17-2-2",
            number: 2,
            name: "Portal Layanan Digital Pemerintah pada Instansi Pemerintah pada sebagian Layanan Digital Pemerintah berbasis siklus hidup",
            value: 0.5,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "17-3-1",
            number: 1,
            name: "Portal Layanan Digital Pemerintah pada Instansi Pemerintah pada seluruh Layanan Digital Pemerintah berbasis siklus hidup",
            value: 0.25,
          },
          {
            id: "17-3-2",
            number: 2,
            name: "Dasbor matriks pemantauan data Pemanfaatan Portal Layanan Digital Pemerintah Nasional",
            value: 0.25,
          },
          {
            id: "17-3-3",
            number: 3,
            name: "Persentase pemanfaatan Portal Layanan Digital Pemerintah Nasional lebih dari 50% dari populasi pengguna",
            value: 0.25,
          },
          {
            id: "17-3-4",
            number: 4,
            name: "Portal Layanan Digital Pemerintah pada Instansi Pemerintah menggunakan identitas digital yang diterbitkan oleh penyedia identitas digital",
            value: 0.25,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "17-4-1",
            number: 1,
            name: "Dasbor matriks Instansi Pemerintah dalam Pemanfaatan Portal Layanan Digital Pemerintah Nasional",
            value: 0.17,
          },
          {
            id: "17-4-2",
            number: 2,
            name: "Persentase pemanfaatan Portal Layanan Digital Pemerintah Nasional lebih dari 90% dari populasi pengguna",
            value: 0.17,
          },
          {
            id: "17-4-3",
            number: 3,
            name: "Reviu Pelaksanaan Portal Layanan Digital Instansi Pemerintah",
            value: 0.17,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
          {
            id: "17-5-1",
            number: 1,
            name: "Tindak Lanjut matriks pemantauan dalam Pemanfaatan Portal Layanan Digital Pemerintah Nasional",
            value: 0.5,
          },
          {
            id: "17-5-2",
            number: 2,
            name: "Persentase pemanfaatan Portal Layanan Digital Pemerintah Nasional lebih dari 90% dari populasi pengguna",
            value: 0.5,
          },
        ],
      },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  18: {
    title: "Interoperabilitas Data",
    type: "External",
    expectedEvidence: 0,
    description:
      "Pengukuran mengacu pada Indeks Satu Data Indonesia.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [],
    source: OFFICIAL_PORTAL,
    sourceStatus: "external",
  },

  19: {
    title: "Fasilitas Dukungan Pengguna Layanan Digital Pemerintah",
    type: "Internal",
    expectedEvidence: 10,
    description:
      "Pengukuran fasilitas dukungan pengguna dan pemantauan pemenuhan SLA layanan digital pemerintah.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "19-1-1",
            number: 1,
            name: "Dasbor Fasilitas Dukungan Pengguna Layanan Digital Pemerintah",
            value: 0.17,
          },
          {
            id: "19-1-2",
            number: 2,
            name: "Dasbor Pemantauan pemenuhan SLA",
            value: 0.17,
          },
          {
            id: "19-1-3",
            number: 3,
            name: "Dasbor pemantauan proses dan SLA setiap tahapan layanan per-pengguna",
            value: 0.17,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "19-2-1",
            number: 1,
            name: "Dasbor Fasilitas Dukungan Pengguna Layanan Digital Pemerintah",
            value: 0.5,
          },
          {
            id: "19-2-2",
            number: 2,
            name: "Pemenuhan Standar Layanan Digital 90% (SLA lebih dari 90%)",
            value: 0.5,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "19-3-1",
            number: 1,
            name: "Dasbor Fasilitas Dukungan Pengguna Layanan Digital Pemerintah",
            value: 0.5,
          },
          {
            id: "19-3-2",
            number: 2,
            name: "Pemenuhan Standar Layanan Digital 99% (SLA lebih dari 99%)",
            value: 0.5,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "19-4-1",
            number: 1,
            name: "Laporan Pelaksanaan Evaluasi Kepatuhan SLA dan Fasilitas Dukungan Pengguna",
            value: 0.5,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
          {
            id: "19-5-1",
            number: 1,
            name: "Tindak Lanjut matriks pemantauan data pelaksanaan Fasilitas Dukungan Pengguna",
            value: 0.5,
          },
          {
            id: "19-5-2",
            number: 2,
            name: "Pemenuhan Standar Layanan Digital 99,9% (SLA 99,9%)",
            value: 0.5,
          },
        ],
      },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },

  20: {
    title: "Tingkat Pengelolaan Kepuasan Pengguna Layanan Digital Pemerintah",
    type: "Internal",
    expectedEvidence: 20,
    description:
      "Pengukuran pengelolaan kepuasan dan partisipasi pengguna layanan digital pemerintah.",
    legalBasis: [],
    measurementObjects: [],
    criteria: [
      {
        level: 1,
        name: "Initiate/Kurang",
        maxPM: 0.5,
        requirements: [
          {
            id: "20-1-1",
            number: 1,
            name: "Hasil kepuasan pengguna layanan (dapat menggunakan SKM online atau Pengukuran Kepuasan lainnya)",
            value: 0.13,
          },
          {
            id: "20-1-2",
            number: 2,
            name: "Laporan Pelaksanaan SKM Online",
            value: 0.13,
          },
          {
            id: "20-1-3",
            number: 3,
            name: "Laporan Pelibatan Kelompok rentan, minimal 1",
            value: 0.13,
          },
          {
            id: "20-1-4",
            number: 4,
            name: "Laporan tindak lanjut pengelolaan kepuasan pengguna layanan digital pemerintah",
            value: 0.13,
          },
        ],
      },
      {
        level: 2,
        name: "Emerging/Cukup",
        maxPM: 1,
        requirements: [
          {
            id: "20-2-1",
            number: 1,
            name: "Hasil kepuasan pengguna layanan (dapat menggunakan SKM online atau Pengukuran Kepuasan lainnya) dengan response rate penilaian kepuasan 5%",
            value: 0.25,
          },
          {
            id: "20-2-2",
            number: 2,
            name: "Laporan Pelaksanaan Kepuasan Pengguna dengan fitur widet, pop-up rating, dan tombol berikan masukan",
            value: 0.25,
          },
          {
            id: "20-2-3",
            number: 3,
            name: "Laporan Pelibatan Kelompok rentan, minimal 3 Kelompok rentan",
            value: 0.25,
          },
          {
            id: "20-2-4",
            number: 4,
            name: "Laporan tindak lanjut pengelolaan kepuasan pengguna layanan digital pemerintah minimal 2 tindak lanjut",
            value: 0.25,
          },
        ],
      },
      {
        level: 3,
        name: "Developing/Baik",
        maxPM: 1,
        requirements: [
          {
            id: "20-3-1",
            number: 1,
            name: "Hasil kepuasan pengguna layanan (dapat menggunakan SKM online atau Pengukuran Kepuasan lainnya) dengan response rate penilaian kepuasan 40%, dan data transaksi yang terdapat pada layanan digital",
            value: 0.2,
          },
          {
            id: "20-3-2",
            number: 2,
            name: "Bukti penerapan mekanisme umpan balik di semua layanan digital",
            value: 0.2,
          },
          {
            id: "20-3-3",
            number: 3,
            name: "Bukti penetapan tim teknis pengelolaan kepuasan pengguna layanan digital",
            value: 0.2,
          },
          {
            id: "20-3-4",
            number: 4,
            name: "Dasbor publikasi umpan balik beserta cascading untuk hasil kepuasan tiap layanan",
            value: 0.2,
          },
          {
            id: "20-3-5",
            number: 5,
            name: "Laporan hasil mystery guest audit",
            value: 0.2,
          },
        ],
      },
      {
        level: 4,
        name: "Embedded/Sangat Baik",
        maxPM: 0.5,
        requirements: [
          {
            id: "20-4-1",
            number: 1,
            name: "Hasil kepuasan pengguna layanan (dapat menggunakan SKM online atau Pengukuran Kepuasan lainnya) dengan response rate penilaian kepuasan 70%, dan data transaksi yang terdapat pada layanan digital",
            value: 0.13,
          },
          {
            id: "20-4-2",
            number: 2,
            name: "Log perubahan layanan yang disajikan kepada publik secara darin atas hasil tindak lanjut reviu kepuasan pengguna",
            value: 0.13,
          },
          {
            id: "20-4-3",
            number: 3,
            name: "Bukti pelaksanaan Forum Diskusi Publik",
            value: 0.13,
          },
          {
            id: "20-4-4",
            number: 4,
            name: "Laporan hasil mystery guest audit",
            value: 0.13,
          },
        ],
      },
      {
        level: 5,
        name: "Leading/Memuaskan",
        maxPM: 1,
        requirements: [
          {
            id: "20-5-1",
            number: 1,
            name: "Hasil kepuasan pengguna layanan (dapat menggunakan SKM online atau Pengukuran Kepuasan lainnya) dengan response rate penilaian kepuasan 100%, dan data transaksi yang terdapat pada layanan digital",
            value: 0.33,
          },
          {
            id: "20-5-2",
            number: 2,
            name: "Bukti penyampaian informasi Trust score tracker",
            value: 0.33,
          },
          {
            id: "20-5-3",
            number: 3,
            name: "Pengelolaan User Satisfaction ledger",
            value: 0.33,
          },
        ],
      },
    ],
    source: OFFICIAL_PORTAL,
    sourceStatus: "needs-extraction",
  },
};