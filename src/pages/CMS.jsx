
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Images,
  Newspaper,
  ImagePlus,
  LogOut,
  Settings,
  ArrowRight,
  Eye,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";

import { usePortalContent } from "../context/PortalContentContext";

const cmsMenus = [
  {
    title: "Kelola Regulasi",
    description:
      "Tambah, ubah, hapus, dan atur publikasi dokumen regulasi Portal PEMDI.",
    path: "/cms/regulasi",
    icon: FileText,
    color: "blue",
  },
  {
    title: "Kelola Galeri",
    description:
      "Atur foto dan dokumentasi kegiatan Pemerintah Kota Dumai.",
    path: "/cms/galeri",
    icon: Images,
    color: "violet",
  },
  {
    title: "Kelola Informasi",
    description:
      "Kelola berita, pengumuman, dan informasi pada halaman publik.",
    path: "/cms/informasi",
    icon: Newspaper,
    color: "amber",
  },
  {
    title: "Kelola Hero Banner",
    description:
      "Atur gambar utama, deskripsi, dan tampilan slideshow halaman depan.",
    path: "/cms/hero",
    icon: ImagePlus,
    color: "emerald",
  },
];

export default function CMS({ onLogout }) {
  const navigate = useNavigate();
  const { content } = usePortalContent();

  const statistics = [
    {
      title: "Total Regulasi",
      value: content.regulations?.length || 0,
      icon: FileText,
      color: "blue",
    },
    {
      title: "Total Galeri",
      value: content.gallery?.length || 0,
      icon: Images,
      color: "violet",
    },
    {
      title: "Total Informasi",
      value: content.news?.length || 0,
      icon: Newspaper,
      color: "amber",
    },
    {
      title: "Hero Banner",
      value: content.heroImages?.length || 0,
      icon: ImagePlus,
      color: "emerald",
    },
  ];

  const colorStyles = {
    blue: "bg-blue-50 text-blue-700",
    violet: "bg-violet-50 text-violet-700",
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
  };

  function handleLogout() {
    onLogout?.();
    navigate("/", { replace: true });
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

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:flex"
            >
              <Eye size={17} />
              Lihat Portal
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={17} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {/* Page Heading */}
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-700">
            <LayoutDashboard size={17} />
            Dashboard Administrator
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Content Management System
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Kelola konten, informasi, dan dokumentasi Portal
            Pemerintah Digital Kota Dumai melalui satu dashboard.
          </p>
        </section>

        {/* Welcome */}
        <section className="mb-8 overflow-hidden rounded-2xl bg-blue-900 p-6 text-white md:p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-blue-200">
                <CheckCircle2 size={17} />
                Panel Administrator
              </div>

              <h3 className="text-xl font-bold md:text-2xl">
                Selamat Datang di CMS PEMDI
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">
                Gunakan dashboard ini untuk mengelola seluruh
                konten yang ditampilkan pada Portal PEMDI Kota Dumai.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-50"
            >
              Lihat Portal
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-9">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">
                Ringkasan Konten
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Jumlah konten yang saat ini tersedia.
              </p>
            </div>

            <FolderOpen size={21} className="text-slate-400" />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {statistics.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorStyles[item.color]}`}
                    >
                      <Icon size={20} />
                    </div>

                    <span className="text-xs text-slate-400">
                      Konten
                    </span>
                  </div>

                  <p className="mt-4 text-2xl font-bold text-slate-900">
                    {item.value}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CMS Menus */}
        <section>
          <div className="mb-4">
            <h3 className="font-bold text-slate-900">
              Pengelolaan Konten
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Pilih modul yang ingin dikelola.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {cmsMenus.map((menu) => {
              const Icon = menu.icon;

              return (
                <Link
                  key={menu.path}
                  to={menu.path}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorStyles[menu.color]}`}
                    >
                      <Icon size={23} />
                    </div>

                    <ArrowRight
                      size={20}
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                    />
                  </div>

                  <h4 className="font-semibold text-slate-900">
                    {menu.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {menu.description}
                  </p>

                  <div className="mt-5 text-sm font-semibold text-blue-700">
                    Buka Pengelolaan
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Storage Information */}
        <section className="mt-8 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Pengelolaan konten aktif
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Data CMS saat ini disimpan secara lokal pada browser.
                Integrasi backend akan dilakukan pada tahap berikutnya.
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
            Mode Frontend
          </span>
        </section>
      </main>
    </div>
  );
}
