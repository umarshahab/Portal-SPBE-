
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
  } from "lucide-react";

  import { aspects } from "../data/evaluationData";
  import SectionTitle from "../components/SectionTitle";
  import DomainCard from "../components/DomainCard";

  import {
    domains,
    gallery,
    documents,
  } from "../data/portalData";

  import { Link } from "react-router-dom";

  export default function Home({
    evidenceData = {},
    indicatorsData = [],
  }) {

    // Total evidence yang sudah diunggah
    
    // Mendukung struktur lama (array) dan struktur baru (object bertingkat).
    const getIndicatorFiles = (indicatorId) => {
      const indicatorEvidence = evidenceData?.[indicatorId];

      if (!indicatorEvidence) return [];

      // Struktur lama
      if (Array.isArray(indicatorEvidence)) {
        return indicatorEvidence;
      }

      // Struktur baru berdasarkan ID persyaratan
      if (typeof indicatorEvidence === "object") {
        return Object.values(indicatorEvidence).flatMap((files) =>
          Array.isArray(files) ? files : []
        );
      }

      return [];
    };
    

    // Total file evidence yang sudah diunggah
    const uploadedEvidenceCount = indicatorsData.reduce(
      (total, indicator) =>
        total + getIndicatorFiles(indicator.id).length,
      0
    );

    // Jumlah indikator yang sudah memiliki minimal satu evidence
    const filledIndicatorCount = indicatorsData.filter(
      (indicator) => getIndicatorFiles(indicator.id).length > 0
    ).length;

    // Total target evidence
    const totalEvidenceTarget = indicatorsData.reduce(
      (total, indicator) => {
        const target = Number(indicator.totalEvidence);
        return total + (Number.isFinite(target) ? target : 0);
      },
      0
    );

    // Persentase kelengkapan evidence
    const evidencePercentage =
      totalEvidenceTarget > 0
        ? Math.min(
            (uploadedEvidenceCount / totalEvidenceTarget) * 100,
            100
          )
        : 0;

      console.log("=== DEBUG DASHBOARD ===");
      console.log("Evidence Data:", evidenceData);
      console.log("Indicators Data:", indicatorsData);
      console.log("Total Uploaded:", uploadedEvidenceCount);
      console.log("Total Target:", totalEvidenceTarget);
      console.log("Percentage:", evidencePercentage);

    // Perhitungan rata-rata tertimbang seluruh indikator
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

    // Perhitungan nilai setiap aspek berdasarkan skor indikator
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
                Portal Pemerintah Digital Kota Dumai sebagai pusat
                informasi kebijakan, tata kelola, manajemen, dan
                layanan pemerintahan digital.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/indeks"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-blue-900 transition hover:bg-blue-50"
                >
                  Jelajahi PEMDI
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="https://spbe.dumaikota.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Portal SPBE
                  <ArrowUpRight size={18} />
                </a>
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
                    PEMDI Kota Dumai
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
                eyebrow="Tentang PEMDI"
                title="Transformasi Digital Pemerintahan"
                description="Pemerintah Digital merupakan upaya penyelenggaraan pemerintahan dengan memanfaatkan teknologi digital untuk meningkatkan tata kelola pemerintahan dan kualitas pelayanan publik."
              />

              <p className="text-sm leading-8 text-slate-500">
                Melalui transformasi pemerintah digital, Pemerintah Kota
                Dumai mendorong tata kelola pemerintahan yang efektif,
                efisien, transparan, dan akuntabel serta meningkatkan
                kualitas pelayanan publik.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-blue-50 p-7">
                <Building2
                  className="mb-5 text-blue-800"
                  size={32}
                />

                <h3 className="font-bold text-slate-900">
                  Tata Kelola
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Pemerintahan yang terintegrasi.
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-cyan-50 p-7">
                <ShieldCheck
                  className="mb-5 text-cyan-800"
                  size={32}
                />

                <h3 className="font-bold text-slate-900">
                  Keamanan
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Pengelolaan informasi yang aman.
                </p>
              </div>

              <div className="rounded-2xl bg-indigo-50 p-7">
                <FileText
                  className="mb-5 text-indigo-800"
                  size={32}
                />

                <h3 className="font-bold text-slate-900">
                  Kebijakan
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Landasan kebijakan Pemerintah Digital.
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-slate-100 p-7">
                <Building2
                  className="mb-5 text-slate-700"
                  size={32}
                />

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

        {/* DASHBOARD HASIL EVALUASI */}
        <section className="bg-[#f6f8fc] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            {/* DASHBOARD HEADING */}
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-800">
                  <Activity size={14} />
                  RINGKASAN EVALUASI
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Hasil Evaluasi PEMDI
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                  Gambaran hasil penilaian, perkembangan indikator,
                  dan kelengkapan data dukung PEMDI Pemerintah Kota Dumai.
                </p>
              </div>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              {/* INDEX */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-200/70 ring-1 ring-blue-500/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <Gauge size={23} strokeWidth={2.2} />
                  </div>

                  <span className="text-xs font-medium text-slate-400">
                    Rata-rata Nilai
                  </span>
                </div>

                <p className="mt-6 text-3xl font-bold text-slate-900">
                  {overallWeightedScore.toFixed(2)}
                  <span className="ml-1 text-lg font-medium text-slate-400">
                    / 5.00
                  </span>
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Rata-rata nilai tertimbang indikator
                </p>
              </div>

              {/* PERSENTASE */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-200/70 ring-1 ring-cyan-500/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <TrendingUp size={23} strokeWidth={2.2} />
                  </div>

                  <span className="text-xs font-medium text-slate-400">
                    Kelengkapan Evidence
                  </span>
                </div>

                <p className="mt-6 text-3xl font-bold text-slate-900">
                  {evidencePercentage.toFixed(2)}%
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Persentase evidence terunggah
                </p>
              </div>

              {/* INDIKATOR */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200/70 ring-1 ring-emerald-500/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <ClipboardList size={23} strokeWidth={2.2} />
                  </div>

                  <span className="text-xs font-medium text-slate-400">
                    Indikator
                  </span>
                </div>

                <p className="mt-6 text-3xl font-bold text-slate-900">
                  {filledIndicatorCount}

                  <span className="ml-1 text-lg font-medium text-slate-400">
                    / {indicatorsData.length}
                  </span>
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Indikator dengan evidence terunggah
                </p>
              </div>

              {/* EVIDENCE */}
              <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-lg shadow-violet-200/70 ring-1 ring-violet-500/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                    <FileText size={23} strokeWidth={2.2} />
                  </div>

                  <span className="text-xs font-medium text-slate-400">
                    Data Dukung
                  </span>
                </div>

                <p className="mt-6 text-3xl font-bold text-slate-900">
                  {uploadedEvidenceCount}

                  <span className="ml-1 text-lg font-medium text-slate-400">
                    / {totalEvidenceTarget}
                  </span>
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Evidence yang telah diunggah
                </p>
              </div>
            </div>

            {/* MAIN CHART SECTION */}
            <div className="mt-7 grid gap-6 lg:grid-cols-3">

              {/* ASPECT SCORE CHART */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Hasil Evaluasi per Aspek
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Perbandingan nilai rata-rata tertimbang setiap aspek.
                    </p>
                  </div>

                  <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-3 text-white shadow-lg shadow-blue-200/60">
                    <Activity size={21} />
                  </div>
                </div>

                <div className="space-y-6">
                  {aspectScores.map((aspect) => (
                    <div key={aspect.id}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800">
                            {aspect.code}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {aspect.name}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-bold text-slate-900">
                          {aspect.score.toFixed(2)}

                          <span className="font-normal text-slate-400">
                            {" "}/ 5
                          </span>
                        </p>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 transition-all duration-700"
                          style={{
                            width: `${Math.min(
                              (aspect.score / 5) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-7 border-t border-slate-100 pt-4 text-xs leading-6 text-slate-400">
                  Catatan: Nilai aspek dihitung dari rata-rata tertimbang
                  skor indikator berdasarkan bobotnya. Visualisasi ini
                  menggunakan data evaluasi yang tersedia pada aplikasi.
                </p>
              </div>

              {/* EVIDENCE COMPLETION */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    Kelengkapan Evidence
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Progres unggahan data dukung evaluasi.
                  </p>
                </div>

                <div className="flex justify-center py-5">
                  <div
                    className="relative flex h-48 w-48 items-center justify-center rounded-full"
                    style={{
                      background: `conic-gradient(#2563eb ${
                        evidencePercentage * 3.6
                      }deg, #e2e8f0 0deg)`,
                    }}
                  >
                    <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">
                      <span className="text-3xl font-bold text-slate-900">
                        {evidencePercentage.toFixed(1)}%
                      </span>

                      <span className="mt-1 text-xs text-slate-400">
                        Kelengkapan
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                      Evidence terunggah
                    </div>

                    <span className="font-bold text-slate-900">
                      {uploadedEvidenceCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                      Target evidence
                    </div>

                    <span className="font-bold text-slate-900">
                      {totalEvidenceTarget}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                      <CircleCheck size={17} />

                      {filledIndicatorCount} indikator telah memiliki evidence
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HIGHEST AND LOWEST ASPECT */}
            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* HIGHEST */}
              <div className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6">
                <div className="rounded-xl bg-white p-3 text-emerald-700 shadow-sm">
                  <TrendingUp size={24} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    Aspek dengan nilai tertinggi
                  </p>

                  <h4 className="mt-1 font-bold text-slate-900">
                    {highestAspect?.name || "-"}
                  </h4>

                  <p className="mt-1 text-sm text-slate-600">
                    Nilai: {highestAspect?.score.toFixed(2) || "0.00"} / 5
                  </p>
                </div>
              </div>

              {/* LOWEST */}
              <div className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-orange-50/70 p-6">
                <div className="rounded-xl bg-white p-3 text-orange-700 shadow-sm">
                  <Activity size={24} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-700">
                    Aspek dengan nilai terendah
                  </p>

                  <h4 className="mt-1 font-bold text-slate-900">
                    {lowestAspect?.name || "-"}
                  </h4>

                  <p className="mt-1 text-sm text-slate-600">
                    Nilai: {lowestAspect?.score.toFixed(2) || "0.00"} / 5
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOMAIN PEMDI */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionTitle
              eyebrow="Ruang Lingkup"
              title="Domain Pemerintah Digital"
              description="Kenali empat domain utama yang menjadi landasan transformasi digital Pemerintah Kota Dumai."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {domains.map((domain) => (
                <DomainCard
                  key={domain.number}
                  domain={domain}
                />
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
                description="Dokumentasi kegiatan dan koordinasi penerapan PEMDI Kota Dumai."
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
              title="Dokumen PEMDI"
              description="Kumpulan dokumen pendukung kebijakan, tata kelola, dan manajemen Pemerintah Digital."
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
      </>
    );
    
  }
