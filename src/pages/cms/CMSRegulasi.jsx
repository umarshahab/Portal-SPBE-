
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Search,
  FileText,
  Pencil,
  Trash2,
  X,
  ExternalLink,
  Download,
  Filter,
  FolderOpen,
  Save,
  Settings,
  LogOut,
} from "lucide-react";

import { usePortalContent } from "../../context/PortalContentContext";

const categories = [
  "Undang-Undang",
  "Peraturan Pemerintah",
  "Peraturan Presiden",
  "Peraturan Menteri",
  "Peraturan Daerah",
  "Peraturan Wali Kota",
  "Keputusan",
  "Lainnya",
];

const emptyForm = {
  title: "",
  category: "Peraturan Wali Kota",
  number: "",
  year: new Date().getFullYear(),
  description: "",
  url: "",
  downloadUrl: "",
};

export default function CMSRegulasi({ onLogout }) {
  const navigate = useNavigate();
  const { content, updateContent } = usePortalContent();

  const regulations = content.regulations || [];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredRegulations = useMemo(() => {
    return regulations.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        (item.title || "").toLowerCase().includes(keyword) ||
        String(item.number || "").toLowerCase().includes(keyword) ||
        String(item.year || "").includes(keyword);

      const matchesCategory =
        category === "Semua" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [regulations, search, category]);

  function handleLogout() {
    onLogout?.();
    navigate("/", { replace: true });
  }

  function openAddModal() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowModal(true);
  }

  function openEditModal(item) {
    setEditingId(item.id);

    setForm({
      title: item.title || "",
      category: item.category || "Lainnya",
      number: item.number || "",
      year: item.year || new Date().getFullYear(),
      description: item.description || "",
      url: item.url || "",
      downloadUrl: item.downloadUrl || "",
    });

    setShowModal(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: name === "year" ? value : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newRegulation = {
      id: editingId || `reg-${Date.now()}`,
      ...form,
      year: Number(form.year),
    };

    let updatedRegulations;

    if (editingId) {
      updatedRegulations = regulations.map((item) =>
        item.id === editingId ? newRegulation : item
      );
    } else {
      updatedRegulations = [
        newRegulation,
        ...regulations,
      ];
    }

    updateContent("regulations", updatedRegulations);

    setShowModal(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus regulasi ini?"
    );

    if (!confirmed) return;

    updateContent(
      "regulations",
      regulations.filter((item) => item.id !== id)
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-800 text-white">
              <Settings size={22} />
            </div>

            <div>
              <h1 className="font-bold text-slate-900">
                PEMDI DUMAI
              </h1>
              <p className="text-xs text-slate-500">
                Content Management System
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={17} />
            Keluar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {/* Breadcrumb */}
        <Link
          to="/cms"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
        >
          <ArrowLeft size={17} />
          Kembali ke Dashboard CMS
        </Link>

        {/* Heading */}
        <section className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-700">
              <FileText size={17} />
              Manajemen Konten
            </div>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Kelola Regulasi
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Kelola dokumen peraturan, kebijakan, dan landasan hukum
              Pemerintahan Digital Kota Dumai.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <Plus size={18} />
            Tambah Regulasi
          </button>
        </section>

        {/* Statistics */}
        <section className="mb-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <FileText size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">
                  Total Regulasi
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {regulations.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
                <FolderOpen size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">
                  Kategori Tersedia
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {categories.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h3 className="font-bold text-slate-900">
                  Daftar Dokumen Regulasi
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Tambah dan kelola dokumen yang ditampilkan pada halaman publik.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari regulasi..."
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 sm:w-64"
                  />
                </div>

                <div className="relative">
                  <Filter
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-7 text-sm outline-none focus:border-blue-500 sm:w-56"
                  >
                    <option value="Semua">Semua Kategori</option>
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
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Regulasi</th>
                    <th className="px-5 py-4">Kategori</th>
                    <th className="px-5 py-4">Nomor / Tahun</th>
                    <th className="px-5 py-4">Dokumen</th>
                    <th className="px-5 py-4 text-right">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredRegulations.map((item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="max-w-sm px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                            {item.description}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {item.number}
                        <br />
                        <span className="text-xs text-slate-400">
                          Tahun {item.year}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              title="Lihat dokumen"
                              className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}

                          {item.downloadUrl && (
                            <a
                              href={item.downloadUrl}
                              download
                              title="Unduh dokumen"
                              className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                            >
                              <Download size={16} />
                            </a>
                          )}

                          {!item.url && !item.downloadUrl && (
                            <span className="text-xs text-slate-400">
                              Belum tersedia
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            title="Edit regulasi"
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Hapus regulasi"
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <FolderOpen
                size={35}
                className="mx-auto text-slate-300"
              />
              <h3 className="mt-4 font-semibold text-slate-800">
                {search || category !== "Semua"
                  ? "Regulasi tidak ditemukan"
                  : "Belum Ada Regulasi"}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Tambahkan dokumen regulasi untuk ditampilkan pada portal.
              </p>
            </div>
          )}

          <div className="border-t border-slate-100 px-5 py-4">
            <p className="text-xs text-slate-500">
              Menampilkan {filteredRegulations.length} dari {regulations.length} regulasi
            </p>
          </div>
        </section>
      </main>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="font-bold text-slate-900">
                  {editingId ? "Edit Regulasi" : "Tambah Regulasi"}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Lengkapi informasi dokumen regulasi.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 overflow-y-auto p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Judul Regulasi *
                </label>
                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul regulasi"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Kategori *
                  </label>
                  <select
                    required
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Nomor Regulasi *
                  </label>
                  <input
                    required
                    name="number"
                    value={form.number}
                    onChange={handleChange}
                    placeholder="Contoh: 12 Tahun 2025"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Tahun *
                </label>
                <input
                  required
                  type="number"
                  min="1900"
                  max="2100"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Masukkan deskripsi singkat regulasi"
                  className="w-full resize-y rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  URL Dokumen
                </label>
                <input
                  type="url"
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-slate-400">
                  Tautan untuk membuka dokumen di tab baru.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  URL Download Dokumen
                </label>
                <input
                  type="url"
                  name="downloadUrl"
                  value={form.downloadUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-slate-400">
                  Tautan file yang dapat diunduh pengunjung.
                </p>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  <Save size={16} />
                  {editingId ? "Simpan Perubahan" : "Simpan Regulasi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
