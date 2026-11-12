import { useNavigate } from "react-router-dom";
import { Fragment, useMemo, useState } from "react";
import {Search,LayoutDashboard,FileText,ShieldCheck,Database,Settings,Users,ChevronDown,ChevronRight,LogOut,
  Bell,Menu,X,ClipboardList,CircleCheck,Clock3,Eye,ArrowLeft,
} from "lucide-react"; 

import {
  evaluationSummary,
  architectures,
  aspects,
  indicators as initialIndicators,
} from "../data/evaluationData";

import EvidenceManager from "../components/EvidenceManager";
import AppSwitcher from "../components/AppSwitcher";

const filters = ["Semua", "Internal", "External", "Terisi Evidence"];

const architectureIcons = [
  FileText,
  Settings,
  Database,
  ShieldCheck,
];

function countUploadedEvidence(indicatorEvidence) {
  if (Array.isArray(indicatorEvidence)) {
    return indicatorEvidence.length;
  }

  if (!indicatorEvidence || typeof indicatorEvidence !== "object") {
    return 0;
  }

  return Object.entries(indicatorEvidence)
    .filter(([key]) => key !== "_legacy")
    .reduce(
      (total, [, files]) => total + (files?.length || 0),
      indicatorEvidence._legacy?.length || 0
    );
}

export default function Evaluasi({
  evidenceData,
  setEvidenceData,
  indicatorsData = initialIndicators,
  setIndicatorsData,
}) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [expandedAspects, setExpandedAspects] = useState(
    aspects.map((item) => item.id)
  );

  // Mengubah nilai capaian indikator
  function updateIndicatorScore(id, value) {
    if (!setIndicatorsData) return;

    if (value === "") {
      setIndicatorsData((current) =>
        current.map((indicator) =>
          indicator.id === id
            ? { ...indicator, score: "" }
            : indicator
        )
      );

      return;
    }

    const newScore = Math.min(
      5,
      Math.max(0, Number(value))
    );

    setIndicatorsData((current) =>
      current.map((indicator) =>
        indicator.id === id
          ? { ...indicator, score: newScore }
          : indicator
      )
    );
  }

  // Filter dan pencarian indikator
  const filteredIndicators = useMemo(() => {
    return indicatorsData.filter((item) => {
      const aspect = aspects.find(
        (aspect) =>
          Number(aspect.id) === Number(item.aspectId)
      );

      const keyword = search.toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(keyword) ||
        aspect?.name.toLowerCase().includes(keyword) ||
        `ind-${item.id}`.includes(keyword);

      const indicatorEvidence = evidenceData?.[item.id] || {};

      const uploadedCount = countUploadedEvidence(evidenceData?.[item.id]);

      const matchesFilter =
        filter === "Semua" ||
        (filter === "Terisi Evidence" && uploadedCount > 0) ||
        item.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [
    search,
    filter,
    evidenceData,
    indicatorsData,
  ]);

  function toggleAspect(id) {
    setExpandedAspects((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function scrollToTable() {
    document
      .getElementById("indicator-table")
      ?.scrollIntoView({ behavior: "smooth" });

    setSidebarOpen(false);
  }

  // Total evidence yang sudah diunggah
  const uploadedEvidenceCount = indicatorsData.reduce(
  (total, indicator) =>
    total + countUploadedEvidence(evidenceData?.[indicator.id]),
    0
  );

  // Jumlah indikator yang memiliki evidence
  const filledIndicatorCount = indicatorsData.filter(
    (indicator) =>
      countUploadedEvidence(evidenceData?.[indicator.id]) > 0
  ).length;

  const totalIndicatorCount = indicatorsData.length;

  // Target evidence
  const totalEvidenceTarget = indicatorsData.reduce(
    (total, indicator) =>
      total + Number(indicator.totalEvidence || 0),
    0
  );

  // Persentase kelengkapan evidence
  const evidenceCompletion =
    totalEvidenceTarget > 0
      ? (uploadedEvidenceCount / totalEvidenceTarget) * 100
      : 0;

  const filledPercentage = Math.min(
    evidenceCompletion,
    100
  );

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-800">

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-200/80 bg-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* BRAND */}
        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#193b91] text-white">
              <ShieldCheck size={21} strokeWidth={2.1} />
            </div>

            <div>
              <h2 className="text-[15px] font-bold tracking-tight text-slate-900">
                SPBE DUMAI
              </h2>

              <p className="mt-0.5 text-[10px] tracking-wide text-slate-400">
                Evaluation System
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">
            Menu Utama
          </p>

          <nav className="space-y-1">
            <button className="flex w-full items-center gap-3 rounded-lg bg-[#eef3ff] px-3.5 py-3 text-[13px] font-semibold text-[#193b91]">
              <LayoutDashboard size={18} />
              Dashboard Evaluasi
            </button>

            <button
              onClick={scrollToTable}
              className="flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-[13px] text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <ClipboardList size={18} />
              Data Indikator
            </button>

            <button
              onClick={() =>
                navigate("/evaluasi/data-evidence")
              }
              className="flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-[13px] text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <FileText size={18} />
              Data Evidence
            </button>
          </nav>

          <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">
            Pengaturan
          </p>

          <nav className="space-y-1">
            <button className="flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-[13px] text-slate-600 transition hover:bg-slate-50">
              <Users size={18} />
              Pengguna
            </button>

            <button className="flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-[13px] text-slate-600 transition hover:bg-slate-50">
              <Settings size={18} />
              Pengaturan Sistem
            </button>
          </nav>
        </div>

        {/* USER */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50/80 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#193b91] text-xs font-semibold text-white">
              A
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-slate-800">
                Administrator
              </p>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Pengelola SPBE
              </p>
            </div>

            <LogOut size={16} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
        />
      )}

      {/* MAIN */}
      <main className="min-h-screen lg:ml-[260px]">

        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-5 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>
              <h1 className="text-[15px] font-bold tracking-tight text-slate-900">
                Dashboard Evaluasi
              </h1>

              <p className="mt-0.5 hidden text-[11px] text-slate-400 sm:block">
                Sistem Evaluasi Pemerintah Digital
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AppSwitcher />
            <button
              aria-label="Notifikasi"
              className="relative rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="hidden text-right sm:block">
              <p className="text-[13px] font-semibold text-slate-800">
                Administrator
              </p>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Pemerintah Kota Dumai
              </p>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="mx-auto max-w-[1600px] space-y-8 px-5 py-7 md:px-8 md:py-9">

          {/* INTRO */}
          <section className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#244ca8]" />

                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#244ca8]">
                  PEMDI KOTA DUMAI
                </p>
              </div>

              <h2 className="text-[25px] font-bold tracking-tight text-slate-900 md:text-[30px]">
                Evaluasi Pemerintah Digital
              </h2>

              <p className="mt-2 text-[13px] text-slate-500">
                Monitoring capaian indikator dan kelengkapan data dukung.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-md border border-amber-200/80 bg-amber-50/70 px-3 py-2 text-[11px] font-medium text-amber-700">
              <Clock3 size={14} />
              Data pratinjau
            </div>
          </section>

          {/* ARCHITECTURE */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[15px] font-bold tracking-tight text-slate-900">
                Arsitektur Pemerintah Digital
              </h3>

              <span className="text-[11px] text-slate-400">
                {architectures.length} Arsitektur
              </span>
            </div>

            <div className="grid overflow-hidden rounded-xl border border-slate-200/80 bg-white sm:grid-cols-2 xl:grid-cols-4">
              {architectures.map((item, index) => {
                const Icon =
                  architectureIcons[index] || FileText;

                const architectureAspects = aspects.filter(
                  (aspect) =>
                    aspect.architecture === item.title
                );

                const architectureIndicatorCount =
                  indicatorsData.filter((indicator) =>
                    architectureAspects.some(
                      (aspect) =>
                        Number(aspect.id) ===
                        Number(indicator.aspectId)
                    )
                  ).length;

                return (
                  <div
                    key={item.number}
                    className={`group px-5 py-5 transition hover:bg-slate-50/70 ${
                      index !== 0
                        ? "border-t border-slate-100 sm:border-l xl:border-t-0"
                        : ""
                    } ${
                      index === 1 ? "sm:border-t-0" : ""
                    }`}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0f4fc] text-[#244ca8]">
                        <Icon size={19} strokeWidth={1.9} />
                      </div>

                      <span className="text-[11px] font-semibold tabular-nums text-slate-300">
                        {item.number}
                      </span>
                    </div>

                    <h4 className="min-h-[42px] text-[13px] font-semibold leading-5 text-slate-800">
                      {item.title}
                    </h4>

                    <div className="mt-4 flex items-center gap-6 border-t border-slate-100 pt-3.5">
                      <div>
                        <p className="text-[19px] font-bold tracking-tight text-slate-900">
                          {architectureAspects.length}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Aspek
                        </p>
                      </div>

                      <div>
                        <p className="text-[19px] font-bold tracking-tight text-slate-900">
                          {architectureIndicatorCount}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Indikator
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SUMMARY */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[15px] font-bold tracking-tight text-slate-900">
                Ringkasan Penilaian
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

              {/* INDEX */}
              <div className="rounded-xl bg-[#193b91] px-5 py-5 text-white">
                <p className="text-[12px] text-blue-100/80">
                  Indeks PEMDI
                </p>

                <div className="mt-2 flex items-end justify-between">
                  <h3 className="text-[30px] font-bold tracking-tight">
                    {Number(evaluationSummary.index).toFixed(2)}
                  </h3>

                  <LayoutDashboard
                    size={21}
                    className="mb-1 text-blue-200/70"
                  />
                </div>

                <p className="mt-1 text-[10px] text-blue-100/70">
                  Base Point + Capaian Evidence
                </p>
              </div>

              {/* SCORE */}
              <div className="rounded-xl border border-slate-200/80 bg-white px-5 py-5">
                <p className="text-[12px] text-slate-500">
                  Persentase Skor
                </p>

                <h3 className="mt-2 text-[30px] font-bold tracking-tight text-slate-900">
                  {Number(evaluationSummary.percentage).toFixed(2)}%
                </h3>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#3159b5]"
                    style={{
                      width: `${Math.min(
                        Number(evaluationSummary.percentage),
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* EVIDENCE */}
              <div className="rounded-xl border border-slate-200/80 bg-white px-5 py-5">
                <p className="text-[12px] text-slate-500">
                  Evidence Terisi
                </p>

                <h3 className="mt-2 text-[30px] font-bold tracking-tight text-slate-900">
                  {uploadedEvidenceCount}

                  <span className="ml-1 text-[15px] font-medium text-slate-400">
                    / {totalEvidenceTarget}
                  </span>
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Total kelengkapan data dukung
                </p>
              </div>

              {/* INDICATORS */}
              <div className="rounded-xl border border-slate-200/80 bg-white px-5 py-5">
                <p className="text-[12px] text-slate-500">
                  Indikator Terisi
                </p>

                <h3 className="mt-2 text-[30px] font-bold tracking-tight text-slate-900">
                  {filledIndicatorCount}

                  <span className="ml-1 text-[15px] font-medium text-slate-400">
                    / {totalIndicatorCount}
                  </span>
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Indikator yang memiliki evidence
                </p>
              </div>
            </div>
          </section>

          {/* EVIDENCE PROGRESS */}
          <section className="rounded-xl border border-slate-200/80 bg-white px-5 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-[13px] font-bold text-slate-800">
                  Kelengkapan Data Dukung
                </h3>

                <p className="mt-1 text-[11px] text-slate-400">
                  Progres pengumpulan evidence seluruh indikator
                </p>
              </div>

              <span className="text-[17px] font-bold tabular-nums text-[#244ca8]">
                {filledPercentage.toFixed(1)}%
              </span>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#3159b5] transition-all"
                style={{
                  width: `${filledPercentage}%`,
                }}
              />
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-slate-400">
              <span>
                {uploadedEvidenceCount} evidence terisi
              </span>

              <span>
                {Math.max(
                  totalEvidenceTarget - uploadedEvidenceCount,
                  0
                )}{" "}
                belum terisi
              </span>
            </div>
          </section>

          {/* INDICATOR TABLE */}
          <section
            id="indicator-table"
            className="scroll-mt-24 overflow-hidden rounded-xl border border-slate-200/80 bg-white"
          >
            {/* TABLE HEADER */}
            <div className="border-b border-slate-100 px-5 py-5 md:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-[15px] font-bold tracking-tight text-slate-900">
                    Tabel Indikator Evidence
                  </h3>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Daftar indikator dan kelengkapan data dukung.
                  </p>
                </div>

                <span className="text-[11px] font-medium text-slate-500">
                  Menampilkan{" "}
                  <span className="font-bold text-slate-800">
                    {filteredIndicators.length}
                  </span>{" "}
                  dari {indicatorsData.length} indikator
                </span>
              </div>

              {/* SEARCH AND FILTER */}
              <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-sm">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama indikator atau aspek..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#3159b5] focus:ring-2 focus:ring-blue-50"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {filters.map((item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`rounded-md px-3 py-2 text-[11px] font-medium transition ${
                        filter === item
                          ? "bg-[#193b91] text-white"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-[#fafbfd] text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    <th className="w-14 px-5 py-3.5 font-semibold">
                      No.
                    </th>

                    <th className="px-4 py-3.5 font-semibold">
                      Indikator
                    </th>

                    <th className="w-24 px-4 py-3.5 font-semibold">
                      Tipe
                    </th>

                    <th className="w-20 px-4 py-3.5 font-semibold">
                      Bobot
                    </th>

                    <th className="w-32 px-4 py-3.5 font-semibold">
                      Capaian
                    </th>

                    <th className="w-32 px-4 py-3.5 font-semibold">
                      Evidence
                    </th>

                    <th className="w-24 px-4 py-3.5 text-center font-semibold">
                      Detail
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {aspects.map((aspect) => {
                    const rows = filteredIndicators.filter(
                      (item) =>
                        Number(item.aspectId) === Number(aspect.id)
                    );

                    if (rows.length === 0) return null;

                    const isExpanded = expandedAspects.includes(
                      aspect.id
                    );

                    return (
                      <Fragment key={aspect.id}>
                        {/* ASPECT GROUP */}
                        <tr className="border-b border-slate-100 bg-[#f8faff]">
                          <td colSpan={7} className="px-5 py-3">
                            <button
                              onClick={() =>
                                toggleAspect(aspect.id)
                              }
                              className="flex w-full items-center gap-3 text-left"
                            >
                              <span className="text-slate-400">
                                {isExpanded ? (
                                  <ChevronDown size={15} />
                                ) : (
                                  <ChevronRight size={15} />
                                )}
                              </span>

                              <span className="flex h-6 min-w-6 items-center justify-center rounded bg-[#e9effc] px-1.5 text-[10px] font-bold text-[#244ca8]">
                                {aspect.code}
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="block text-[12px] font-semibold text-slate-800">
                                  {aspect.name}
                                </span>

                                <span className="mt-0.5 block text-[10px] text-slate-400">
                                  {aspect.architecture}
                                </span>
                              </span>

                              <span className="whitespace-nowrap text-[10px] text-slate-400">
                                Bobot {aspect.weight}%
                                <span className="mx-1 text-slate-300">
                                  ·
                                </span>
                                {rows.length} indikator
                              </span>
                            </button>
                          </td>
                        </tr>

                        {/* INDICATOR ROWS */}
                        {isExpanded &&
                          rows.map((item) => {
                            const uploadedCount = (
                              evidenceData?.[item.id] || []
                            ).length;

                            return (
                              <tr
                                key={item.id}
                                className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50/70"
                              >
                                <td className="px-5 py-3.5 text-[11px] tabular-nums text-slate-400">
                                  {item.id}
                                </td>

                                <td className="px-4 py-3.5">
                                  <p className="max-w-[440px] text-[12px] font-medium leading-5 text-slate-700">
                                    {item.name}
                                  </p>
                                </td>

                                <td className="px-4 py-3.5">
                                  <span
                                    className={`text-[10px] font-medium ${
                                      item.type === "Internal"
                                        ? "text-[#3159b5]"
                                        : "text-violet-600"
                                    }`}
                                  >
                                    {item.type}
                                  </span>
                                </td>

                                <td className="px-4 py-3.5 text-[12px] font-medium tabular-nums text-slate-600">
                                  {item.weight}%
                                </td>

                                {/* CAPAIAN */}
                                <td className="px-4 py-3.5">
                                  <div className="flex items-center gap-1.5">
                                    <input
                                      type="number"
                                      min="0"
                                      max="5"
                                      step="0.01"
                                      value={item.score ?? 0}
                                      onChange={(e) =>
                                        updateIndicatorScore(
                                          item.id,
                                          e.target.value
                                        )
                                      }
                                      className="w-16 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-center text-[12px] font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    <span className="text-[10px] text-slate-400">
                                      / 5.0
                                    </span>
                                  </div>
                                </td>

                                {/* EVIDENCE */}
                                <td className="px-4 py-3.5">
                                  <div className="flex items-center gap-1.5">
                                    {uploadedCount > 0 ? (
                                      <CircleCheck
                                        size={14}
                                        className="text-emerald-600"
                                      />
                                    ) : (
                                      <Clock3
                                        size={14}
                                        className="text-slate-400"
                                      />
                                    )}

                                    <span className="text-[11px] font-medium tabular-nums text-slate-600">
                                      {uploadedCount}/{item.totalEvidence}
                                    </span>
                                  </div>
                                </td>

                                {/* DETAIL */}
                                <td className="px-4 py-3.5 text-center">
                                  <button
                                    onClick={() =>
                                      setSelectedIndicator(item)
                                    }
                                    aria-label={`Detail indikator ${item.id}`}
                                    className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-semibold text-[#3159b5] transition hover:bg-blue-50"
                                  >
                                    <Eye size={13} />
                                    Detail
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </Fragment>
                    );
                  })}

                  {filteredIndicators.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center"
                      >
                        <Search
                          size={22}
                          className="mx-auto text-slate-300"
                        />

                        <p className="mt-3 text-[12px] font-medium text-slate-600">
                          Indikator tidak ditemukan
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Coba gunakan kata kunci atau filter lainnya.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* TABLE FOOTER */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-[#fafbfd] px-5 py-3">
              <p className="text-[10px] text-slate-400">
                Total {filteredIndicators.length} indikator ditampilkan
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setFilter("Semua");
                  setExpandedAspects(
                    aspects.map((item) => item.id)
                  );
                }}
                className="text-[10px] font-semibold text-[#3159b5] transition hover:text-blue-900"
              >
                Reset filter
              </button>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pb-4 text-center text-[10px] text-slate-400">
            © {new Date().getFullYear()} Portal SPBE Kota Dumai
            <span className="mx-1.5 text-slate-300">·</span>
            Sistem Evaluasi Pemerintah Digital
          </footer>
        </div>
      </main>

      {/* DETAIL INDIKATOR DAN EVIDENCE */}
      {selectedIndicator && (
        <EvidenceManager
          indicator={selectedIndicator}
          onClose={() => setSelectedIndicator(null)}
          evidenceData={evidenceData}
          setEvidenceData={setEvidenceData}
        />
      )}
    </div>
  );
} 