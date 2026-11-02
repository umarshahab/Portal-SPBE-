
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  ShieldCheck,
  Building2,
  ChevronRight,
} from "lucide-react";

import SectionTitle from "../components/SectionTitle";
import DomainCard from "../components/DomainCard";

import {
  domains,
  gallery,
  documents,
} from "../data/portalData";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-blue-100">
              <ShieldCheck size={17} />
              Pemerintah Kota Dumai
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Mewujudkan
              <span className="block text-cyan-300">
                Pemerintahan Digital
              </span>
              yang Terintegrasi
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-blue-100 md:text-lg">
              Portal Sistem Pemerintahan Berbasis Elektronik
              Kota Dumai sebagai pusat informasi kebijakan,
              tata kelola, manajemen, dan layanan pemerintahan
              berbasis elektronik.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/indeks"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-blue-900 transition hover:bg-blue-50"
              >
                Jelajahi SPBE
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Evaluasi SPBE
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200"
                alt="Ilustrasi gedung pemerintahan modern"
                className="h-80 w-full rounded-2xl object-cover md:h-[420px]"
              />

              <div className="absolute -bottom-5 -left-3 rounded-xl bg-white p-5 shadow-xl md:-left-8">
                <p className="text-xs font-medium text-slate-500">
                  Transformasi Digital
                </p>
                <p className="mt-1 text-lg font-bold text-blue-900">
                  SPBE Kota Dumai
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionTitle
              eyebrow="Tentang SPBE"
              title="Transformasi Digital Pemerintahan"
              description="Sistem Pemerintahan Berbasis Elektronik merupakan penyelenggaraan pemerintahan yang memanfaatkan teknologi informasi dan komunikasi untuk memberikan layanan kepada pengguna SPBE."
            />

            <p className="text-sm leading-8 text-slate-500">
              Melalui penerapan SPBE, Pemerintah Kota Dumai
              mendorong tata kelola pemerintahan yang efektif,
              efisien, transparan, dan akuntabel serta
              meningkatkan kualitas pelayanan publik.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-blue-50 p-7">
              <Building2 className="mb-5 text-blue-800" size={32} />
              <h3 className="font-bold text-slate-900">
                Tata Kelola
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Pemerintahan yang terintegrasi.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-cyan-50 p-7">
              <ShieldCheck className="mb-5 text-cyan-800" size={32} />
              <h3 className="font-bold text-slate-900">
                Keamanan
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Pengelolaan informasi yang aman.
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-7">
              <FileText className="mb-5 text-indigo-800" size={32} />
              <h3 className="font-bold text-slate-900">
                Kebijakan
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Landasan penerapan SPBE.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-100 p-7">
              <Building2 className="mb-5 text-slate-700" size={32} />
              <h3 className="font-bold text-slate-900">
                Pelayanan
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Layanan publik berbasis digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DOMAIN SPBE */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Ruang Lingkup"
            title="Domain Sistem Pemerintahan Berbasis Elektronik"
            description="Kenali empat domain utama penerapan SPBE yang menjadi landasan transformasi digital Pemerintah Kota Dumai."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map((domain) => (
              <DomainCard key={domain.number} domain={domain} />
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionTitle
              eyebrow="Dokumentasi"
              title="Galeri Kegiatan"
              description="Dokumentasi kegiatan dan koordinasi penerapan SPBE Kota Dumai."
            />

            <Link
              to="/galeri"
              className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-blue-800"
            >
              Lihat semua
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((item, index) => (
              <article
                key={index}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-700">
                    {item.category}
                  </p>

                  <h3 className="min-h-20 text-base font-bold leading-6 text-slate-900">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Pusat Dokumen"
            title="Dokumen SPBE"
            description="Kumpulan dokumen pendukung kebijakan, tata kelola, dan manajemen SPBE."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {documents.map((document, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="rounded-xl bg-blue-50 p-3 text-blue-800">
                  <FileText size={25} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold text-blue-700">
                    {document.category}
                  </p>

                  <h3 className="font-bold leading-6 text-slate-900">
                    {document.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400">
                    {document.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVALUATION CTA */}
      <section className="bg-blue-900 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 text-center md:flex-row md:text-left lg:px-8">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-300">
              Evaluasi SPBE
            </p>

            <h2 className="text-3xl font-bold text-white">
              Pengelolaan Evaluasi SPBE
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-blue-100">
              Akses sistem evaluasi dan pengelolaan data dukung
              SPBE melalui akun pengguna yang telah terdaftar.
            </p>
          </div>

          <Link
            to="/login"
            className="inline-flex shrink-0 items-center gap-3 rounded-lg bg-white px-6 py-4 font-bold text-blue-900 transition hover:bg-blue-50"
          >
            Masuk ke Evaluasi
            <ChevronRight size={19} />
          </Link>
        </div>
      </section>
    </>
  );
}
