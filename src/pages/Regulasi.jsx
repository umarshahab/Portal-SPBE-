
import { useMemo, useState } from "react";
import {
  FileText,
  Search,
  Download,
  ExternalLink,
  Filter,
  FolderOpen,
} from "lucide-react";

import SectionTitle from "../components/SectionTitle";

// Data regulasi akan diisi berdasarkan dokumen resmi
const regulations = [];

export default function Regulasi() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const categories = [
    "Semua",
    "Undang-Undang",
    "Peraturan Pemerintah",
    "Peraturan Presiden",
    "Peraturan Menteri",
    "Peraturan Daerah",
    "Peraturan Wali Kota",
    "Keputusan",
    "Lainnya",
  ];

  const filteredRegulations = useMemo(() => {
    return regulations.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(keyword) ||
        item.number.toLowerCase().includes(keyword) ||
        String(item.year).includes(keyword);

      const matchesCategory =
        category === "Semua" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="mx-auto min-h-[65vh] max-w-7xl px-5 py-16 lg:px-8">

      {/* Header */}
      <SectionTitle
        eyebrow="Dokumen Resmi"
        title="Regulasi Pemerintahan Digital"
        description="Kumpulan peraturan, kebijakan, dan landasan hukum penyelenggaraan Pemerintahan Digital di lingkungan Pemerintah Kota Dumai."
      />

      {/* Summary */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
              <FileText size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Dokumen
              </p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {regulations.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
              <FolderOpen size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Kategori Regulasi
              </p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {categories.length - 1}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Document List */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Daftar Regulasi
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Temukan dokumen resmi Pemerintahan Digital.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari regulasi..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
                />
              </div>

              <div className="relative">
                <Filter
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm outline-none transition focus:border-blue-500 sm:w-56"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {filteredRegulations.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredRegulations.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-5 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                    <FileText size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.category} • {item.number} • {item.year}
                    </p>

                    {item.description && (
                      <p className="mt-2 text-sm text-slate-500">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <ExternalLink size={16} />
                      Lihat
                    </a>
                  )}

                  {item.downloadUrl && (
                    <a
                      href={item.downloadUrl}
                      download
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
                    >
                      <Download size={16} />
                      Unduh
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FolderOpen size={30} />
            </div>

            <h3 className="text-base font-semibold text-slate-800">
              {search || category !== "Semua"
                ? "Regulasi tidak ditemukan"
                : "Belum Ada Dokumen Regulasi"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {search || category !== "Semua"
                ? "Coba gunakan kata kunci atau kategori lainnya."
                : "Dokumen regulasi resmi Pemerintahan Digital Kota Dumai akan ditampilkan di bagian ini setelah tersedia."}
            </p>
          </div>
        )}

        <div className="border-t border-slate-100 px-6 py-4">
          <p className="text-xs text-slate-500">
            Menampilkan {filteredRegulations.length} dari {regulations.length} dokumen
          </p>
        </div>
      </section>
    </div>
  );
}
