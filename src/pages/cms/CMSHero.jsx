
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Image as ImageIcon,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Images,
  ChevronUp,
  ChevronDown,
  Eye,
} from "lucide-react";
import { usePortalContent } from "../../context/PortalContentContext";

const initialForm = {
  alt: "",
  src: "",
};

export default function CMSHero({ onLogout }) {
  const { content, updateContent } = usePortalContent();
  const heroImages = content.heroImages || [];

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState(initialForm);

  function openAddModal() {
    setEditingId(null);
    setForm(initialForm);
    setShowModal(true);
  }

  function openEditModal(item) {
    setEditingId(item.id);
    setForm({
      alt: item.alt || "",
      src: item.src || "",
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
        src: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.src.trim()) {
      alert("Gambar banner wajib diisi.");
      return;
    }

    const heroItem = {
      id: editingId ?? Date.now(),
      src: form.src,
      alt: form.alt.trim() || "Banner Pemerintah Kota Dumai",
    };

    const updatedImages =
      editingId !== null
        ? heroImages.map((item) =>
            item.id === editingId
              ? { ...item, ...heroItem }
              : item
          )
        : [...heroImages, heroItem];

    updateContent("heroImages", updatedImages);

    setShowModal(false);
    setEditingId(null);
    setForm(initialForm);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus banner ini?"
    );

    if (!confirmed) return;

    updateContent(
      "heroImages",
      heroImages.filter((item) => item.id !== id)
    );
  }

  function moveImage(index, direction) {
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= heroImages.length) {
      return;
    }

    const updatedImages = [...heroImages];

    [updatedImages[index], updatedImages[targetIndex]] = [
      updatedImages[targetIndex],
      updatedImages[index],
    ];

    updateContent("heroImages", updatedImages);
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
                <ImageIcon size={21} className="text-blue-600" />
                <h1 className="text-xl font-bold text-slate-900">
                  Manajemen Hero Banner
                </h1>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Kelola gambar banner utama halaman depan portal.
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
        <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Total Hero Banner
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {heroImages.length}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Urutan banner menentukan urutan tampil pada halaman utama,
                jika halaman publik menggunakan urutan data ini.
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4 text-blue-600">
              <Images size={28} />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Daftar Banner
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Atur gambar yang ditampilkan pada halaman utama.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Tambah Banner
          </button>
        </div>

        {/* Banner List */}
        {heroImages.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {heroImages.map((item, index) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="group relative aspect-[16/7] bg-slate-100">
                  <img
                    src={item.src}
                    alt={item.alt || "Hero banner"}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="absolute left-3 top-3 rounded-lg bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white">
                    Banner {index + 1}
                  </div>

                  <button
                    onClick={() => setPreviewImage(item.src)}
                    className="absolute bottom-3 right-3 rounded-lg bg-white/90 p-2 text-slate-700 opacity-0 shadow transition group-hover:opacity-100"
                    title="Preview banner"
                  >
                    <Eye size={18} />
                  </button>
                </div>

                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Teks Alternatif
                  </p>

                  <h3 className="mt-1 font-semibold text-slate-900">
                    {item.alt || "Banner Pemerintah Kota Dumai"}
                  </h3>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveImage(index, -1)}
                        disabled={index === 0}
                        title="Geser ke atas"
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ChevronUp size={18} />
                      </button>

                      <button
                        onClick={() => moveImage(index, 1)}
                        disabled={index === heroImages.length - 1}
                        title="Geser ke bawah"
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ChevronDown size={18} />
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={15} />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Images size={42} className="mx-auto text-slate-300" />

            <h3 className="mt-4 font-semibold text-slate-800">
              Belum ada hero banner
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Tambahkan gambar untuk ditampilkan pada halaman utama.
            </p>

            <button
              onClick={openAddModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Tambah Banner
            </button>
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingId !== null
                    ? "Edit Hero Banner"
                    : "Tambah Hero Banner"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Pilih gambar dan lengkapi informasi banner.
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
                  Teks Alternatif Gambar
                </label>

                <input
                  name="alt"
                  value={form.alt}
                  onChange={handleChange}
                  placeholder="Contoh: Kegiatan Pemerintah Kota Dumai"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Gambar Banner *
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-400 hover:bg-blue-50">
                  <Upload size={26} className="text-slate-400" />

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
                  name="src"
                  value={form.src.startsWith("data:") ? "" : form.src}
                  onChange={handleChange}
                  placeholder="https://contoh.com/banner.jpg"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />

                {form.src && (
                  <div className="relative mt-4 overflow-hidden rounded-xl border border-slate-200">
                    <img
                      src={form.src}
                      alt="Preview banner"
                      className="max-h-56 w-full object-contain"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          src: "",
                        }))
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
                  {editingId !== null
                    ? "Simpan Perubahan"
                    : "Tambah Banner"}
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
            alt="Preview hero banner"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
