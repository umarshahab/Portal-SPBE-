
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Image as ImageIcon,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Upload,
  Eye,
  Images,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePortalContent } from "../../context/PortalContentContext";

const initialForm = {
  title: "",
  description: "",
  category: "Kegiatan Pemerintahan",
  date: "",
  image: "",
};

const categories = [
  "Kegiatan Pemerintahan",
  "Pelayanan Publik",
  "Infrastruktur",
  "Penghargaan",
  "Kegiatan Masyarakat",
  "Lainnya",
];

export default function CMSGaleri({ onLogout }) {
  const { content, updateContent } = usePortalContent();
  const galleries = content.gallery || [];

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState(initialForm);

  const filteredGalleries = useMemo(() => {
    return galleries.filter((item) => {
      const matchesSearch = `${item.title || ""} ${
        item.description || ""
      }`.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "Semua" ||
        (item.category || "Lainnya") === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [galleries, search, selectedCategory]);

  function openAddModal() {
    setEditingId(null);
    setForm(initialForm);
    setShowModal(true);
  }

  function openEditModal(item) {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "Kegiatan Pemerintahan",
      date: item.date || "",
      image: item.image || item.src || "",
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

    if (!form.title.trim() || !form.image.trim()) {
      alert("Judul dan gambar wajib diisi.");
      return;
    }

    const galleryItem = {
      id: editingId ?? Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      date: form.date,
      image: form.image,
      src: form.image,
    };

    let updatedGalleries;

    if (editingId !== null) {
      updatedGalleries = galleries.map((item) =>
        item.id === editingId
          ? { ...item, ...galleryItem }
          : item
      );
    } else {
      updatedGalleries = [galleryItem, ...galleries];
    }

    updateContent("gallery", updatedGalleries);
    setShowModal(false);
    setEditingId(null);
    setForm(initialForm);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus foto ini dari galeri?"
    );

    if (!confirmed) return;

    updateContent(
      "gallery",
      galleries.filter((item) => item.id !== id)
    );
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
                <Images size={20} className="text-blue-600" />
                <h1 className="text-xl font-bold text-slate-900">
                  Manajemen Galeri
                </h1>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Kelola dokumentasi kegiatan Pemerintah Kota Dumai.
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
        {/* Summary */}
        <div className="mb-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Dokumentasi</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {galleries.length}
                </h2>
              </div>
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Images size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Hasil Pencarian</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {filteredGalleries.length}
                </h2>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <ImageIcon size={24} />
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
                placeholder="Cari dokumentasi..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="Semua">Semua Kategori</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Tambah Foto
          </button>
        </div>

        {/* Gallery */}
        {filteredGalleries.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGalleries.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="group relative aspect-[4/3] bg-slate-100">
                  <img
                    src={item.image || item.src}
                    alt={item.title || "Dokumentasi kegiatan"}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <button
                    onClick={() =>
                      setPreviewImage(item.image || item.src)
                    }
                    className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100"
                  >
                    <Eye size={25} />
                  </button>
                </div>

                <div className="p-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {item.category || "Lainnya"}
                  </span>

                  <h3 className="mt-3 line-clamp-1 font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm text-slate-500">
                    {item.description || "Tidak ada deskripsi."}
                  </p>

                  {item.date && (
                    <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                      <Calendar size={14} />
                      {item.date}
                    </p>
                  )}

                  <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={15} />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <ImageIcon
              size={42}
              className="mx-auto text-slate-300"
            />
            <h3 className="mt-4 font-semibold text-slate-800">
              Dokumentasi tidak ditemukan
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Tambahkan foto atau ubah kata kunci pencarian.
            </p>
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingId !== null ? "Edit Dokumentasi" : "Tambah Dokumentasi"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Lengkapi informasi foto galeri.
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
                  Judul Dokumentasi *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan judul dokumentasi"
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
                    Tanggal Kegiatan
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
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Masukkan deskripsi dokumentasi"
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Gambar *
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-400 hover:bg-blue-50">
                  <Upload size={25} className="text-slate-400" />
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
                      alt="Preview gambar"
                      className="max-h-56 w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setForm((current) => ({ ...current, image: "" }))
                      }
                      className="absolute right-2 top-2 rounded-lg bg-white p-2 text-red-600 shadow"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
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
                  {editingId !== null ? "Simpan Perubahan" : "Tambah Galeri"}
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
            alt="Preview dokumentasi"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
