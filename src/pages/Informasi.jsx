
import { useMemo, useState } from "react";
import {
  Newspaper,
  Search,
  CalendarDays,
  ArrowUpRight,
  Clock3,
  X,
  FileText,
} from "lucide-react";

import SectionTitle from "../components/SectionTitle";

// Data berita akan dihubungkan dengan backend nantinya
const newsData = [];

export default function Informasi() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedNews, setSelectedNews] = useState(null);

  const categories = [
    "Semua",
    "Berita",
    "Pengumuman",
    "Kegiatan",
    "Informasi",
  ];

  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword);

      const matchesCategory =
        activeCategory === "Semua" ||
        item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const featuredNews = filteredNews[0];
  const remainingNews = featuredNews
    ? filteredNews.slice(1)
    : [];

  return (
    <div className="mx-auto min-h-[65vh] max-w-7xl px-5 py-16 lg:px-8">

      {/* Header */}
      <SectionTitle
        eyebrow="Informasi"
        title="Berita dan Informasi PEMDI"
        description="Informasi terbaru mengenai kegiatan, kebijakan, pengumuman, dan perkembangan penerapan Pemerintahan Digital Kota Dumai."
      />

      {/* Ringkasan */}
      <div className="mb-10 flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
            <Newspaper size={26} />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Pusat Informasi
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Informasi Pemerintahan Digital
            </h2>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 px-5 py-3">
          <p className="text-xs text-slate-500">
            Total Publikasi
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900">
            {newsData.length} Informasi
          </p>
        </div>
      </div>

      {/* Pencarian dan Kategori */}
      <section className="mb-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Informasi Terbaru
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Berita dan publikasi seputar Pemerintahan Digital.
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
              placeholder="Cari informasi..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

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

      {/* Berita Utama */}
      {featuredNews && (
        <button
          type="button"
          onClick={() => setSelectedNews(featuredNews)}
          className="group mb-10 grid w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:shadow-lg md:grid-cols-2"
        >
          <div className="h-64 overflow-hidden bg-slate-100 md:h-full">
            {featuredNews.image ? (
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full min-h-64 items-center justify-center text-slate-400">
                <Newspaper size={48} />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-7 md:p-10">
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {featuredNews.category}
            </span>

            <h2 className="mt-4 text-2xl font-bold leading-tight text-slate-900 transition group-hover:text-blue-700 md:text-3xl">
              {featuredNews.title}
            </h2>

            <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-500">
              {featuredNews.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <CalendarDays size={15} />
                {featuredNews.date}
              </span>

              <span className="flex items-center gap-2 font-semibold text-blue-700">
                Baca selengkapnya
                <ArrowUpRight size={15} />
              </span>
            </div>
          </div>
        </button>
      )}

      {/* Daftar Berita */}
      {remainingNews.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {remainingNews.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-slate-100 text-slate-400">
                  <Newspaper size={40} />
                </div>
              )}

              <div className="p-5">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {item.category}
                </span>

                <h3 className="mt-4 font-bold leading-6 text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="flex items-center gap-2 text-xs text-slate-400">
                    <CalendarDays size={14} />
                    {item.date}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedNews(item)}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900"
                  >
                    Baca
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            {newsData.length === 0 ? (
              <FileText size={30} />
            ) : (
              <Search size={30} />
            )}
          </div>

          <h3 className="font-semibold text-slate-800">
            {newsData.length === 0
              ? "Belum Ada Publikasi"
              : "Informasi Tidak Ditemukan"}
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {newsData.length === 0
              ? "Berita dan informasi resmi Pemerintahan Digital Kota Dumai akan ditampilkan di sini setelah tersedia."
              : "Coba gunakan kata kunci atau kategori lainnya."}
          </p>
        </div>
      )}

      {/* Modal Detail Berita */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedNews(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-slate-950/70 p-2 text-white transition hover:bg-slate-950"
              aria-label="Tutup detail"
            >
              <X size={20} />
            </button>

            {selectedNews.image && (
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="h-64 w-full object-cover"
              />
            )}

            <div className="p-7">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {selectedNews.category}
              </span>

              <h2 className="mt-4 text-2xl font-bold text-slate-900">
                {selectedNews.title}
              </h2>

              <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                <CalendarDays size={15} />
                {selectedNews.date}
              </p>

              <p className="mt-6 whitespace-pre-line text-sm leading-8 text-slate-600">
                {selectedNews.content || selectedNews.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
