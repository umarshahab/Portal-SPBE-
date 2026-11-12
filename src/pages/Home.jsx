import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  ShieldCheck,
  Building2,
  Activity,
  Gauge,
  ClipboardList,
  CircleCheck,
  TrendingUp,
  Landmark,
  LockKeyhole,
  Layers3,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { aspects } from "../data/evaluationData";
import SectionTitle from "../components/SectionTitle";
import DomainCard from "../components/DomainCard";
import {
  domains,
  gallery,
  documents,
} from "../data/portalData";

const heroImages = [
  {
    src: "/dmi1.jpg",
    alt: "Dokumentasi Pemerintah Kota Dumai",
  },
  {
    src: "/dmi2.jpg",
    alt: "Kegiatan Pemerintah Kota Dumai",
  },
  {
    src: "/dmi3.jpg",
    alt: "Lingkungan Pemerintah Kota Dumai",
  },
];

// REUSABLE COMPONENTS

function FeatureCard({ icon: Icon, title, description, color }) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 group-hover:bg-blue-700",
    cyan: "bg-cyan-50 text-cyan-700 group-hover:bg-cyan-600",
    indigo: "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-700",
    slate: "bg-slate-100 text-slate-700 group-hover:bg-slate-700",
  };

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5">
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-white ${colorStyles[color]}`}
      >
        <Icon size={23} strokeWidth={1.8} />
      </div>

      <h3 className="font-bold text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, suffix, description, color }) {
  const colorStyles = {
    blue: "from-blue-600 to-indigo-700 shadow-blue-200/60",
    cyan: "from-cyan-500 to-blue-600 shadow-cyan-200/60",
    emerald: "from-emerald-500 to-teal-600 shadow-emerald-200/60",
    violet: "from-violet-600 to-purple-700 shadow-violet-200/60",
  };

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:-translate-y-1 ${colorStyles[color]}`}
        >
          <Icon size={22} strokeWidth={2} />
        </div>

        <span className="text-xs font-medium text-slate-400">
          {label}
        </span>
      </div>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </span>

        {suffix && (
          <span className="text-sm font-medium text-slate-400">
            {suffix}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

function AspectBar({ aspect }) {
  const percentage = Math.min(
    Math.max((aspect.score / 5) * 100, 0),
    100
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800">
            {aspect.code}
          </p>

          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            {aspect.name}
          </p>
        </div>

        <p className="shrink-0 text-sm font-bold tabular-nums text-slate-900">
          {aspect.score.toFixed(2)}
          <span className="font-normal text-slate-400"> / 5</span>
        </p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function AspectHighlight({ title, aspect, type }) {
  const isHighest = type === "highest";

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-5 ${
        isHighest
          ? "border-emerald-100 bg-emerald-50/70"
          : "border-orange-100 bg-orange-50/70"
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ${
          isHighest ? "text-emerald-700" : "text-orange-700"
        }`}
      >
        {isHighest ? (
          <TrendingUp size={22} />
        ) : (
          <Activity size={22} />
        )}
      </div>

      <div className="min-w-0">
        <p
          className={`text-[11px] font-bold uppercase tracking-wider ${
            isHighest ? "text-emerald-700" : "text-orange-700"
          }`}
        >
          {title}
        </p>

        <h4 className="mt-1 truncate text-sm font-bold text-slate-900">
          {aspect?.name || "-"}
        </h4>

        <p className="mt-1 text-xs text-slate-500">
          Nilai: {aspect ? aspect.score.toFixed(2) : "0.00"} / 5
        </p>
      </div>
    </div>
  );
}

// HOME PAGE

export default function Home({
  evidenceData = {},
  indicatorsData = [],
}) {

  const [activeHeroImage, setActiveHeroImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);


  // Mendapatkan file evidence berdasarkan ID indikator.
  // Mendukung struktur lama (array) dan struktur baru (object).
  const getIndicatorFiles = (indicatorId) => {
    const indicatorEvidence = evidenceData?.[indicatorId];

    if (!indicatorEvidence) return [];

    if (Array.isArray(indicatorEvidence)) {
      return indicatorEvidence;
    }

    if (typeof indicatorEvidence === "object") {
      return Object.values(indicatorEvidence).flatMap((files) =>
        Array.isArray(files) ? files : []
      );
    }

    return [];
  };

  // EVIDENCE SUMMARY

  const uploadedEvidenceCount = indicatorsData.reduce(
    (total, indicator) =>
      total + getIndicatorFiles(indicator.id).length,
    0
  );

  const filledIndicatorCount = indicatorsData.filter(
    (indicator) => getIndicatorFiles(indicator.id).length > 0
  ).length;

  const totalEvidenceTarget = indicatorsData.reduce(
    (total, indicator) => {
      const target = Number(indicator.totalEvidence);
      return total + (Number.isFinite(target) ? target : 0);
    },
    0
  );

  const evidencePercentage =
    totalEvidenceTarget > 0
      ? Math.min(
          (uploadedEvidenceCount / totalEvidenceTarget) * 100,
          100
        )
      : 0;

  // INDICATOR SCORE

  const totalIndicatorWeight = indicatorsData.reduce(
    (total, indicator) =>
      total + Number(indicator.weight || 0),
    0
  );

  const overallWeightedScore =
    totalIndicatorWeight > 0
      ? indicatorsData.reduce(
          (total, indicator) =>
            total +
            Number(indicator.score || 0) *
              Number(indicator.weight || 0),
          0
        ) / totalIndicatorWeight
      : 0;

  // ASPECT SCORE

  const aspectScores = aspects.map((aspect) => {
    const aspectIndicators = indicatorsData.filter(
      (indicator) =>
        Number(indicator.aspectId) === Number(aspect.id)
    );

    const totalWeight = aspectIndicators.reduce(
      (total, indicator) =>
        total + Number(indicator.weight || 0),
      0
    );

    const weightedScore = aspectIndicators.reduce(
      (total, indicator) =>
        total +
        Number(indicator.score || 0) *
          Number(indicator.weight || 0),
      0
    );

    return {
      ...aspect,
      score:
        totalWeight > 0
          ? weightedScore / totalWeight
          : 0,
    };
  });

  const sortedAspects = [...aspectScores].sort(
    (a, b) => b.score - a.score
  );

  const highestAspect = sortedAspects[0];
  const lowestAspect = sortedAspects[sortedAspects.length - 1];

  return (
    <>
      {/* HERO SECTION */}

      <section className="relative isolate overflow-hidden bg-[#071b3a]">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-500/15 blur-[100px]" />
          <div className="absolute -bottom-60 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[110px]" />

          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          {/* Hero content */}
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold tracking-wide text-blue-100 backdrop-blur-sm">
              <ShieldCheck size={16} className="text-cyan-300" />
              PEMERINTAH KOTA DUMAI
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[58px]">
              Mewujudkan
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Pemerintahan Digital
              </span>
              yang Terintegrasi
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-8 text-blue-100/80 sm:text-base">
              Portal Pemerintah Digital Kota Dumai sebagai pusat
              informasi kebijakan, tata kelola, manajemen, dan
              penyelenggaraan pemerintahan digital.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/indeks"
                className="group inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-950 shadow-lg shadow-blue-950/20 transition-all hover:-translate-y-0.5 hover:bg-cyan-50"
              >
                Jelajahi PEMDI
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="https://spbe.dumaikota.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
              >
                Portal SPBE
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-7">
              <div>
                <p className="text-2xl font-bold text-white">4</p>
                <p className="mt-1 text-xs text-blue-200/70">
                  Domain utama
                </p>
              </div>

              <div className="h-9 w-px bg-white/15" />

              <div>
                <p className="text-2xl font-bold text-white">20</p>
                <p className="mt-1 text-xs text-blue-200/70">
                  Indikator evaluasi
                </p>
              </div>

              <div className="h-9 w-px bg-white/15" />

              <div>
                <p className="text-2xl font-bold text-white">Digital</p>
                <p className="mt-1 text-xs text-blue-200/70">
                  Transformasi pemerintahan
                </p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto mb-12 w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 to-blue-600/10 blur-2xl" />

            <div className="relative rounded-[1.7rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/20 backdrop-blur-sm">
              <div className="relative h-[300px] overflow-hidden rounded-[1.2rem] sm:h-[390px]">

                {/* Gambar bergantian otomatis */}
                {heroImages.map((image, index) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                      activeHeroImage === index
                        ? "z-10 opacity-100"
                        : "z-0 opacity-0"
                    }`}
                  />
                ))}

                {/* Overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#071b3a]/90 via-[#071b3a]/10 to-transparent" />

                {/* Konten gambar */}
                <div className="absolute bottom-0 left-0 right-0 z-30 p-6 sm:p-8">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    <span className="h-px w-7 bg-cyan-300" />
                    Digital Transformation
                  </div>

                  <h2 className="max-w-sm text-2xl font-bold leading-tight text-white sm:text-3xl">
                    Membangun tata kelola pemerintahan masa depan.
                  </h2>

                  <p className="mt-3 text-sm text-blue-100/80">
                    Pemerintah Digital Kota Dumai
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-12 -left-2 z-40 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-left-8 sm:p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Landmark size={23} />
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-400">
                  Transformasi Digital
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  PEMDI Kota Dumai
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      
      {/* INTRODUCTION */}

      <section className="relative isolate overflow-hidden bg-slate-50 py-24 sm:py-28">
        {/* Background Decoration */}
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">

            {/* LEFT CONTENT */}
            <div className="max-w-xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-800">
                  Mengenal PEMDI
                </span>
              </div>

              <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">
                Membangun
                <span className="block text-blue-700">
                  Pemerintahan
                </span>
                Digital yang
                <span className="block bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                  Terintegrasi.
                </span>
              </h2>

              <p className="mt-7 text-base leading-8 text-slate-600">
                Pemerintah Digital merupakan upaya transformasi penyelenggaraan
                pemerintahan melalui pemanfaatan teknologi digital untuk
                menciptakan tata kelola yang lebih efektif, efisien, transparan,
                dan akuntabel.
              </p>

              <p className="mt-4 text-sm leading-8 text-slate-500">
                Pemerintah Kota Dumai terus mendorong integrasi sistem,
                penguatan keamanan informasi, serta peningkatan kualitas
                pelayanan publik agar dapat memberikan manfaat nyata bagi
                masyarakat.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  to="/indeks"
                  className="group inline-flex items-center gap-3 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/25"
                >
                  Pelajari lebih lanjut
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <ShieldCheck size={19} className="text-blue-700" />
                  Transformasi Digital
                </div>
              </div>

              {/* Supporting Highlights */}
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200 pt-7">
                <div>
                  <p className="text-sm font-extrabold text-slate-900">Terpadu</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Integrasi sistem
                  </p>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">Terpercaya</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Keamanan informasi
                  </p>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">Melayani</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Fokus masyarakat
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative mx-auto w-full max-w-xl">

              {/* Main Visual Card */}
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-7 shadow-2xl shadow-blue-950/20 sm:p-9">

                {/* Decorative Elements */}
                <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-2xl" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                        Pemerintah Kota Dumai
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-white">
                        Pemerintah Digital
                      </h3>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cyan-300 backdrop-blur">
                      <Landmark size={25} />
                    </div>
                  </div>

                  <div className="my-9 flex items-center justify-center">
                    <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-br from-blue-400/20 to-cyan-300/5 shadow-[0_0_80px_rgba(34,211,238,0.12)]">
                      <div className="absolute inset-4 rounded-full border border-dashed border-cyan-200/30" />
                      <div className="absolute inset-9 rounded-full border border-white/10" />
                      <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-cyan-300 shadow-xl backdrop-blur">
                        <Building2 size={48} strokeWidth={1.5} />
                      </div>

                      <div className="absolute -right-2 top-8 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-blue-500 text-white shadow-lg">
                        <Activity size={21} />
                      </div>
                      <div className="absolute -bottom-1 left-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-cyan-500 text-white shadow-lg">
                        <ShieldCheck size={21} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-7 text-center">
                    <p className="text-lg font-bold text-white">
                      Satu Ekosistem Digital
                    </p>
                    <p className="mt-2 text-sm leading-6 text-blue-200">
                      Mewujudkan pemerintahan yang terhubung,
                      aman, dan berorientasi pada pelayanan publik.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        icon: Building2,
                        title: "Tata Kelola",
                        desc: "Sistem terintegrasi",
                      },
                      {
                        icon: LockKeyhole,
                        title: "Keamanan",
                        desc: "Informasi terlindungi",
                      },
                      {
                        icon: FileText,
                        title: "Kebijakan",
                        desc: "Regulasi terarah",
                      },
                      {
                        icon: Layers3,
                        title: "Pelayanan",
                        desc: "Layanan digital",
                      },
                    ].map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={index}
                          className="group rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.13]"
                        >
                          <Icon
                            size={21}
                            className="text-cyan-300 transition-transform duration-300 group-hover:scale-110"
                          />
                          <p className="mt-3 text-sm font-bold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-blue-200">
                            {item.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Floating Label */}
              <div className="absolute -bottom-12 -left-4 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-900/10 sm:flex lg:-left-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <ShieldCheck size={23} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Transformasi Digital
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Menuju pelayanan yang lebih baik
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
</section>


      {/* EVALUATION DASHBOARD */}

      <section className="relative overflow-hidden bg-[#f5f7fb] py-20 sm:py-24">
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          {/* Heading */}
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-2 text-[11px] font-bold tracking-wider text-blue-800 shadow-sm">
                <Activity size={14} />
                RINGKASAN EVALUASI
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Hasil Evaluasi PEMDI
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                Gambaran hasil penilaian, perkembangan indikator,
                dan kelengkapan data dukung PEMDI Pemerintah Kota Dumai.
              </p>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={Gauge}
              label="Rata-rata Nilai"
              value={overallWeightedScore.toFixed(2)}
              suffix="/ 5.00"
              description="Rata-rata nilai tertimbang indikator"
              color="blue"
            />

            <StatCard
              icon={TrendingUp}
              label="Kelengkapan Evidence"
              value={`${evidencePercentage.toFixed(2)}%`}
              description="Persentase evidence terunggah"
              color="cyan"
            />

            <StatCard
              icon={ClipboardList}
              label="Indikator"
              value={filledIndicatorCount}
              suffix={`/ ${indicatorsData.length}`}
              description="Indikator dengan evidence terunggah"
              color="emerald"
            />

            <StatCard
              icon={FileText}
              label="Data Dukung"
              value={uploadedEvidenceCount}
              suffix={`/ ${totalEvidenceTarget}`}
              description="Evidence yang telah diunggah"
              color="violet"
            />
          </div>

          {/* Main dashboard */}
          <div className="mt-7 grid gap-6 lg:grid-cols-3">
            {/* Aspect chart */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:col-span-2 sm:p-7">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Hasil Evaluasi per Aspek
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Perbandingan nilai rata-rata tertimbang setiap aspek.
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Activity size={21} />
                </div>
              </div>

              <div className="space-y-7">
                {aspectScores.map((aspect) => (
                  <AspectBar key={aspect.id} aspect={aspect} />
                ))}
              </div>

              <p className="mt-8 border-t border-slate-100 pt-4 text-xs leading-6 text-slate-400">
                Catatan: Nilai aspek dihitung dari rata-rata tertimbang
                skor indikator berdasarkan bobotnya. Visualisasi ini
                menggunakan data evaluasi yang tersedia pada aplikasi.
              </p>
            </div>

            {/* Evidence completion */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Kelengkapan Evidence
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Progres unggahan data dukung evaluasi.
                </p>
              </div>

              <div className="flex justify-center py-8">
                <div
                  className="relative flex h-48 w-48 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#2563eb ${
                      evidencePercentage * 3.6
                    }deg, #e8edf5 0deg)`,
                  }}
                >
                  <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-3xl font-bold tracking-tight text-slate-900">
                      {evidencePercentage.toFixed(1)}%
                    </span>

                    <span className="mt-1 text-xs text-slate-400">
                      Kelengkapan
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    Evidence terunggah
                  </div>

                  <span className="font-bold tabular-nums text-slate-900">
                    {uploadedEvidenceCount}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    Target evidence
                  </div>

                  <span className="font-bold tabular-nums text-slate-900">
                    {totalEvidenceTarget}
                  </span>
                </div>

                <div className="flex items-start gap-2 border-t border-slate-100 pt-4 text-sm font-medium leading-6 text-emerald-700">
                  <CircleCheck size={17} className="mt-0.5 shrink-0" />

                  {filledIndicatorCount} indikator telah memiliki evidence
                </div>
              </div>
            </div>
          </div>

          {/* Highest and lowest aspect */}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <AspectHighlight
              title="Aspek dengan nilai tertinggi"
              aspect={highestAspect}
              type="highest"
            />

            <AspectHighlight
              title="Aspek dengan nilai terendah"
              aspect={lowestAspect}
              type="lowest"
            />
          </div>
        </div>
      </section>

      {/* ==================================================
          DOMAIN PEMDI
      ================================================== */}

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Ruang Lingkup"
            title="Domain Pemerintah Digital"
            description="Kenali empat domain utama yang menjadi landasan transformasi digital Pemerintah Kota Dumai."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {domains.map((domain) => (
              <DomainCard
                key={domain.number}
                domain={domain}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          GALLERY
      ================================================== */}

      <section className="bg-[#f5f7fb] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionTitle
              eyebrow="Dokumentasi"
              title="Galeri Kegiatan"
              description="Dokumentasi kegiatan dan koordinasi penerapan PEMDI Kota Dumai."
            />

            <Link
              to="/galeri"
              className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-blue-800 transition-colors hover:text-blue-600"
            >
              Lihat semua
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((item, index) => (
              <article
                key={index}
                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent opacity-60" />
                </div>

                <div className="p-5">
                  <p className="mb-3 inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                    {item.category}
                  </p>

                  <h3 className="min-h-20 text-sm font-bold leading-6 text-slate-900 transition-colors group-hover:text-blue-800">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          DOCUMENTS
      ================================================== */}

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Pusat Dokumen"
            title="Dokumen PEMDI"
            description="Kumpulan dokumen pendukung kebijakan, tata kelola, dan manajemen Pemerintah Digital."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((document, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                  <FileText size={23} />
                </div>

                <div className="min-w-0">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    {document.category}
                  </p>

                  <h3 className="text-sm font-bold leading-6 text-slate-900">
                    {document.title}
                  </h3>

                  <p className="mt-3 text-xs text-slate-400">
                    {document.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
