
import { useMemo, useState } from "react";
import {
  Search,
  Image as ImageIcon,
  X,
  Maximize2,
  Images,
} from "lucide-react";

import SectionTitle from "../components/SectionTitle";
import { gallery } from "../data/portalData";

export default function Galeri() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedImage, setSelectedImage] = useState(null);

  // Membuat daftar kategori secara otomatis dari data galeri
  const categories = [
    "Semua",
    ...new Set(gallery.map((item) => item.category).filter(Boolean)),
  ];

  // Filter dokumentasi
  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch = item.title
        .toLowerCase()
        .includes(keyword);

      const matchesCategory =
        activeCategory === "Semua" ||
        item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="mx-auto min-h-[65vh] max-w-7xl px-5 py-16 lg:px-8">

      {/* Header */}
      <SectionTitle
        eyebrow="Dokumentasi"
        title="Galeri Kegiatan PEMDI"
        description="Dokumentasi kegiatan koordinasi, sosialisasi, dan pelaksanaan Pemerintahan Digital di lingkungan Pemerintah Kota Dumai."
      />

      {/* Ringkasan Galeri */}
      <div className="mb-10 flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
            <Images size={26} />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Dokumentasi Kegiatan
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {gallery.length} Foto
            </h2>
          </div>
        </div>

        <p className="max-w-md text-sm leading-6 text-slate-500">
          Kumpulan dokumentasi aktivitas dan perkembangan
          Pemerintahan Digital Kota Dumai.
        </p>
      </div>

      {/* Pencarian dan Filter */}
      <section className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Dokumentasi Kegiatan
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Jelajahi berbagai dokumentasi kegiatan PEMDI.
            </p>
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari dokumentasi..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Kategori */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-blue-700 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Galeri */}
      {filteredGallery.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGallery.map((item, index) => (
              <article
                key={item.id ?? `${item.title}-${index}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(item)}
                  className="relative block h-60 w-full overflow-hidden bg-slate-100 text-left"
                  aria-label={`Lihat foto ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition duration-300 group-hover:bg-slate-950/35">
                    <Maximize2
                      size={28}
                      className="scale-75 text-white opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100"
                    />
                  </div>
                </button>

                <div className="p-5">
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {item.category}
                  </span>

                  <h3 className="mt-3 font-bold leading-6 text-slate-900 transition group-hover:text-blue-700">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Menampilkan {filteredGallery.length} dari {gallery.length} dokumentasi.
          </p>
        </>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <ImageIcon size={30} />
          </div>

          <h3 className="font-semibold text-slate-800">
            {gallery.length === 0
              ? "Belum Ada Dokumentasi"
              : "Dokumentasi Tidak Ditemukan"}
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {gallery.length === 0
              ? "Dokumentasi kegiatan Pemerintahan Digital Kota Dumai akan ditampilkan di sini setelah tersedia."
              : "Coba gunakan kata kunci atau kategori lainnya."}
          </p>
        </div>
      )}

      {/* Preview Foto */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-slate-950/70 p-2 text-white transition hover:bg-slate-950"
              aria-label="Tutup preview"
            >
              <X size={22} />
            </button>

            <div className="flex max-h-[75vh] items-center justify-center bg-slate-950">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            <div className="p-5">
              <span className="text-xs font-semibold text-blue-700">
                {selectedImage.category}
              </span>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
