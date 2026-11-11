
import {
  Activity,
  CalendarDays,
  FileCheck2,
  Info,
  TrendingUp,
} from "lucide-react";

import SectionTitle from "../components/SectionTitle";
import DomainCard from "../components/DomainCard";
import { domains } from "../data/portalData";

export default function Indeks() {
  const summary = [
    {
      label: "Nilai Indeks",
      value: "Belum tersedia",
      description: "Menunggu data penilaian resmi",
      icon: Activity,
    },
    {
      label: "Tahun Penilaian",
      value: "Belum ditetapkan",
      description: "Periode evaluasi PEMDI",
      icon: CalendarDays,
    },
    {
      label: "Status Penilaian",
      value: "Menunggu Data",
      description: "Data resmi belum tersedia",
      icon: FileCheck2,
    },
  ];

  return (
    <div className="mx-auto min-h-[65vh] max-w-7xl px-5 py-16 lg:px-8">

      {/* Header */}
      <SectionTitle
        eyebrow="Indeks PEMDI"
        title="Indeks Pemerintahan Digital"
        description="Informasi mengenai hasil penilaian, penerapan, dan perkembangan Pemerintahan Digital di lingkungan Pemerintah Kota Dumai."
      />

      {/* Ringkasan Indeks */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Ringkasan Indeks
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Gambaran umum hasil penilaian Pemerintahan Digital Kota Dumai.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {summary.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">
                    {item.label}
                  </p>

                  <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                    <Icon size={21} />
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {item.value}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Informasi Indeks */}
      <section className="mb-14 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 p-7 text-white md:p-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-blue-300/30 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
              Informasi Penilaian PEMDI
            </span>

            <h2 className="mt-5 text-2xl font-bold leading-tight md:text-3xl">
              Mengukur Perkembangan Pemerintahan Digital Kota Dumai
            </h2>

            <p className="mt-4 text-sm leading-7 text-blue-100">
              Indeks Pemerintahan Digital memberikan gambaran mengenai
              perkembangan penerapan pemerintahan digital melalui
              penilaian terhadap berbagai aspek penyelenggaraan
              pemerintahan.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
            <TrendingUp size={28} className="text-blue-200" />

            <div>
              <p className="text-sm font-semibold">
                Data Indeks
              </p>
              <p className="mt-1 text-xs text-blue-200">
                Menunggu publikasi resmi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Penilaian */}
      <section className="mb-14">
        <div className="mb-7">
          <h2 className="text-xl font-bold text-slate-900">
            Domain Pemerintahan Digital
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Ruang lingkup informasi penerapan Pemerintahan Digital
            berdasarkan domain yang ditampilkan pada portal.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((domain) => (
            <DomainCard
              key={domain.number}
              domain={domain}
            />
          ))}
        </div>
      </section>

      {/* Catatan */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <Info size={20} className="mt-0.5 shrink-0 text-blue-700" />

        <div>
          <h3 className="text-sm font-semibold text-blue-900">
            Catatan Informasi
          </h3>

          <p className="mt-1 text-sm leading-6 text-blue-800">
            Nilai indeks, periode penilaian, dan rincian hasil evaluasi
            akan diperbarui berdasarkan data serta dokumen resmi
            Pemerintah Kota Dumai.
          </p>
        </div>
      </div>
    </div>
  );
}
