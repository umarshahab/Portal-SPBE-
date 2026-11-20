
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Newspaper,
  Calendar,
  Upload,
  Eye,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { usePortalContent } from "../../context/PortalContentContext";

const initialForm = {
  title: "",
  category: "Berita Pemerintahan",
  date: new Date().toISOString().slice(0, 10),
  description: "",
  image: "",
  status: "Draft",
};

const categories = [
  "Berita Pemerintahan",
  "Informasi Publik",
  "Pengumuman",
  "Kegiatan",
  "Artikel",
  "Lainnya",
];

export default function CMSInformasi({ onLogout }) {
  const { content, updateContent } = usePortalContent();
  const news = content.news || [];

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState(initialForm);

  const publishedCount = news.filter(
    (item) => item.status === "Dipublikasikan"
  ).length;

  const draftCount = news.filter(
    (item) => item.status !== "Dipublikasikan"
  ).length;

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch = [
        item.title,
        item.description,
        item.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(keyword);

      const matchesStatus =
        selectedStatus === "Semua" ||
        (selectedStatus === "Dipublikasikan"
          ? item.status === "Dipublikasikan"
          : item.status !== "Dipublikasikan");

      return matchesSearch && matchesStatus;
    });
  }, [news, search, selectedStatus]);

  function openAddModal() {
    setEditingId(null);
    setForm(initialForm);
    setShowModal(true);
  }

  function openEditModal(item) {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      category: item.category || "Berita Pemerintahan",
      date: item.date || "",
      description: item.description || "",
      image: item.image || "",
      status: item.status || "Draft",
    });
    setShowModal(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("Judul informasi wajib diisi.");
      return;
    }

    const newsItem = {
      id: editingId ?? Date.now(),
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      description: form.description.trim(),
      image: form.image,
      status: form.status,
    };

    const updatedNews =
      editingId !== null
        ? news.map((item) =>
            item.id === editingId
              ? { ...item, ...newsItem }
              : item
          )
        : [newsItem, ...news];

    updateContent("news", updatedNews);

    setShowModal(false);
    setEditingId(null);
    setForm(initialForm);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus informasi ini?"
    );

    if (!confirmed) return;

    updateContent(
      "news",
      news.filter((item) => item.id !== id)
    );
  }

  function handleToggleStatus(item) {
    const newStatus =
      item.status === "Dipublikasikan"
        ? "Draft"
        : "Dipublikasikan";

    const updatedNews = news.map((newsItem) =>
      newsItem.id === item.id
        ? { ...newsItem, status: newStatus }
        : newsItem
    );

    updateContent("news", updatedNews);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <Link
              to="/cms"
              className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <Newspaper size={21} className="text-blue-600" />
                <h1 className="text-xl font-bold text-slate-900">
                  Manajemen Informasi
                </h1>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Kelola berita, pengumuman, dan informasi publik.
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            Keluar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Statistics */}
        <div className="mb-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Informasi</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {news.length}
                </h2>
              </div>
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <FileText size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Dipublikasikan</p>
                <h2 className="mt-2 text-3xl font-bold text-emerald-600">
                  {publishedCount}
                </h2>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Draft</p>
                <h2 className="mt-2 text-3xl font-bold text-amber-600">
                  {draftCount}
                </h2>
              </div>
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari berita atau informasi..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="Semua">Semua Status</option>
              <option value="Dipublikasikan">Dipublikasikan</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Tambah Informasi
          </button>
        </div>

        {/* Information List */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-semibold">Informasi</th>
                  <th className="px-6 py-4 font-semibold">Kategori</th>
                  <th className="px-6 py-4 font-semibold">Tanggal</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-14 w-20 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                            <ImageIcon size={22} />
                          </div>
                        )}

                        <div className="max-w-sm">
                          <p className="font-semibold text-slate-800">
                            {item.title}
                          </p>
                          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                            {item.description || "Tidak ada deskripsi"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.category}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {item.date || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "Dipublikasikan"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status || "Draft"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setPreviewImage(item.image)}
                          disabled={!item.image}
                          title="Preview gambar"
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => openEditModal(item)}
                          title="Edit"
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          title="Hapus"
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredNews.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center">
                      <Newspaper
                        size={38}
                        className="mx-auto text-slate-300"
                      />
                      <p className="mt-3 font-medium text-slate-700">
                        Informasi tidak ditemukan
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Tambahkan informasi atau ubah kata kunci pencarian.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingId !== null
                    ? "Edit Informasi"
                    : "Tambah Informasi"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Lengkapi detail berita atau informasi publik.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Judul Informasi *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan judul informasi"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Kategori
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Tanggal Publikasi
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Deskripsi Informasi
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tuliskan isi atau ringkasan informasi..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Gambar Thumbnail
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-blue-400 hover:bg-blue-50">
                  <Upload size={24} className="text-slate-400" />
                  <span className="mt-2 text-sm font-medium text-slate-700">
                    Klik untuk memilih gambar
                  </span>
                  <span className="mt-1 text-xs text-slate-400">
                    JPG, PNG, WEBP — Maksimal 5 MB
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <div className="my-3 text-center text-xs text-slate-400">
                  ATAU MASUKKAN URL GAMBAR
                </div>

                <input
                  name="image"
                  value={form.image.startsWith("data:") ? "" : form.image}
                  onChange={handleChange}
                  placeholder="https://contoh.com/gambar.jpg"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />

                {form.image && (
                  <div className="relative mt-4 overflow-hidden rounded-xl border border-slate-200">
                    <img
                      src={form.image}
                      alt="Preview thumbnail"
                      className="max-h-48 w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          image: "",
                        }))
                      }
                      className="absolute right-2 top-2 rounded-lg bg-white p-2 text-red-600 shadow"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status Publikasi
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Dipublikasikan">Dipublikasikan</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {editingId !== null
                    ? "Simpan Perubahan"
                    : "Tambah Informasi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-6"
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <img
            src={previewImage}
            alt="Preview informasi"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
