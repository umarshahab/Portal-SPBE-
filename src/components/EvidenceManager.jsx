
import { useMemo, useState } from "react";
import {
  X,
  FileText,
  Upload,
  Download,
  Trash2,
  Eye,
  ExternalLink,
  ShieldCheck,
  ClipboardList,
  BookOpen,
  Layers3,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

import { aspects } from "../data/evaluationData";
import { indicatorModules } from "../data/indicatorModules";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const OFFICIAL_PORTAL =
  "https://evidence-pemdi.dumaikota.go.id/evidence";

const formatSize = (bytes) => {
  if (!bytes) return "0 KB";

  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    : `${(bytes / 1024).toFixed(1)} KB`;
};

const formatRequirementValue = (value) => {
  if (typeof value === "number") {
    return value.toLocaleString("id-ID");
  }

  return value;
};

const getRequirementFiles = (
  evidenceData,
  indicatorId,
  requirementId
) => {
  const indicatorEvidence = evidenceData?.[indicatorId];

  if (!indicatorEvidence || Array.isArray(indicatorEvidence)) {
    return [];
  }

  return indicatorEvidence[requirementId] || [];
};

const getRequirements = (criteria = []) => {
  return criteria.flatMap((level) =>
    (level.requirements || []).map((requirement, index) => ({
      ...requirement,
      number: requirement.number ?? index + 1,
      level: level.level,
      levelName: level.name,
    }))
  );
};

export default function EvidenceManager({
  indicator,
  onClose,
  evidenceData = {},
  setEvidenceData,
}) {
  const [activePreview, setActivePreview] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const moduleData = indicator
    ? indicatorModules[indicator.id]
    : null;

  const aspect = indicator
    ? aspects.find(
        (item) => Number(item.id) === Number(indicator.aspectId)
      )
    : null;

  const criteria = moduleData?.criteria || [];

  const requirements = useMemo(
    () => getRequirements(criteria),
    [criteria]
  );

  if (!indicator) return null;

  const indicatorEvidence = evidenceData?.[indicator.id];

  const legacyFiles = Array.isArray(indicatorEvidence)
    ? indicatorEvidence
    : indicatorEvidence?._legacy || [];

  const uploadedCount = requirements.reduce(
    (total, requirement) =>
      total +
      getRequirementFiles(
        evidenceData,
        indicator.id,
        requirement.id
      ).length,
    0
  );

  const formatWeight = `${indicator.weight}%`;

  // Upload file berdasarkan ID data dukung.
  const handleUpload = (requirementId, event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) return;

    setUploadError("");

    const validFiles = [];
    const errors = [];

    for (const file of selectedFiles) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        errors.push(
          `${file.name}: format tidak didukung. Gunakan PDF, JPG, PNG, atau WEBP.`
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(
          `${file.name}: ukuran file melebihi batas 10 MB.`
        );
        continue;
      }

      validFiles.push({
        id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
      });
    }

    if (validFiles.length) {
      setEvidenceData((previous) => {
        const previousIndicator = previous?.[indicator.id];

        const normalizedIndicator = Array.isArray(previousIndicator)
          ? { _legacy: previousIndicator }
          : previousIndicator || {};

        return {
          ...previous,
          [indicator.id]: {
            ...normalizedIndicator,
            [requirementId]: [
              ...(normalizedIndicator[requirementId] || []),
              ...validFiles,
            ],
          },
        };
      });
    }

    if (errors.length) {
      setUploadError(errors.join(" "));
    }

    event.target.value = "";
  };

  // Hapus file dari persyaratan tertentu.
  const handleDelete = (requirementId, fileId) => {
    const files = getRequirementFiles(
      evidenceData,
      indicator.id,
      requirementId
    );

    const deletedFile = files.find(
      (file) => file.id === fileId
    );

    if (deletedFile?.url) {
      URL.revokeObjectURL(deletedFile.url);
    }

    setEvidenceData((previous) => {
      const previousIndicator = previous?.[indicator.id];

      const normalizedIndicator = Array.isArray(previousIndicator)
        ? { _legacy: previousIndicator }
        : previousIndicator || {};

      return {
        ...previous,
        [indicator.id]: {
          ...normalizedIndicator,
          [requirementId]: (
            normalizedIndicator[requirementId] || []
          ).filter((file) => file.id !== fileId),
        },
      };
    });

    if (activePreview?.id === fileId) {
      setActivePreview(null);
    }
  };

  // Komponen setiap kebutuhan data dukung.
  const renderRequirement = (requirement) => {
    const files = getRequirementFiles(
      evidenceData,
      indicator.id,
      requirement.id
    );

    return (
      <div
        key={requirement.id}
        className="rounded-xl border border-slate-200 bg-white p-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-3">
            {/* Nomor persyaratan */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
              {requirement.number}
            </div>

            <div className="min-w-0">
              <h4 className="font-semibold leading-6 text-slate-800">
                {requirement.name}
              </h4>

              {requirement.description && (
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {requirement.description}
                </p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                  Level {requirement.level}: {requirement.levelName}
                </span>

                {requirement.value !== undefined &&
                  requirement.value !== null && (
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700">
                      Nilai: {formatRequirementValue(requirement.value)}
                    </span>
                  )}

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    files.length
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {files.length
                    ? `${files.length} file terunggah`
                    : "Belum ada file"}
                </span>
              </div>
            </div>
          </div>

          <label className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
            <Upload size={16} />
            Upload

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              multiple
              className="hidden"
              onChange={(event) =>
                handleUpload(requirement.id, event)
              }
            />
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex flex-col gap-3 rounded-lg bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FileText
                    size={18}
                    className="shrink-0 text-blue-600"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-700">
                      {file.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {formatSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActivePreview(file)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-blue-600"
                    title="Lihat file"
                  >
                    <Eye size={17} />
                  </button>

                  <a
                    href={file.url}
                    download={file.name}
                    className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-blue-600"
                    title="Download"
                  >
                    <Download size={17} />
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(requirement.id, file.id)
                    }
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    title="Hapus file"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
      <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                INDIKATOR {indicator.id}
              </span>

              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                {indicator.type}
              </span>
            </div>

            <h2 className="text-lg font-bold leading-7 text-slate-900 sm:text-xl">
              {indicator.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {aspect?.name || "Aspek PEMDI"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Tutup detail"
          >
            <X size={21} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">

          {/* Summary */}
          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Tipe Indikator</p>
              <p className="mt-2 font-semibold text-slate-800">
                {indicator.type}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Bobot</p>
              <p className="mt-2 font-semibold text-slate-800">
                {formatWeight}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Nilai Capaian</p>
              <p className="mt-2 font-semibold text-slate-800">
                {indicator.score ?? 1} / 5
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">File Terunggah</p>
              <p className="mt-2 font-semibold text-slate-800">
                {uploadedCount} file
              </p>
            </div>
          </section>

          {/* Description */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-600" />
              <h3 className="font-semibold text-slate-800">
                Deskripsi Indikator
              </h3>
            </div>

            <p className="text-sm leading-7 text-slate-600">
              {moduleData?.description ||
                "Deskripsi indikator belum tersedia pada master data."}
            </p>
          </section>

          {/* Legal Basis */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-600" />
              <h3 className="font-semibold text-slate-800">
                Dasar Hukum
              </h3>
            </div>

            {moduleData?.legalBasis?.length ? (
              <ul className="space-y-2">
                {moduleData.legalBasis.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-sm leading-6 text-slate-600"
                  >
                    <span className="font-semibold text-blue-600">
                      {index + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">
                Informasi dasar hukum masih dalam proses verifikasi modul.
              </p>
            )}
          </section>

          {/* Measurement Objects */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <Layers3 size={18} className="text-blue-600" />
              <h3 className="font-semibold text-slate-800">
                Objek yang Diukur
              </h3>
            </div>

            {moduleData?.measurementObjects?.length ? (
              <ul className="space-y-2">
                {moduleData.measurementObjects.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-sm leading-6 text-slate-600"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-1 shrink-0 text-emerald-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">
                Objek pengukuran masih dalam proses verifikasi modul.
              </p>
            )}
          </section>

          {/* External Indicator */}
          {indicator.type === "External" && (
            <section className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <h3 className="font-semibold text-blue-900">
                    Indikator Eksternal
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-blue-800">
                    Penilaian indikator ini menggunakan indeks atau
                    instrumen dari instansi pembina eksternal. Tidak
                    ada kewajiban upload data dukung internal pada
                    portal ini berdasarkan tabel resmi.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Criteria and Evidence Requirements */}
          {indicator.type !== "External" && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <ClipboardList
                  size={19}
                  className="text-blue-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Kriteria Penilaian dan Data Dukung
                </h3>
              </div>

              {criteria.length > 0 ? (
                criteria.map((level) => (
                  <div
                    key={level.level}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    {/* Level Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                          Level {level.level}
                        </p>

                        <h4 className="mt-1 font-semibold text-slate-800">
                          {level.name}
                        </h4>
                      </div>

                      <span className="text-xs font-semibold text-slate-400">
                        PM : 0 / {level.maxPM ?? 0}
                      </span>
                    </div>

                    {/* Level Description */}
                    {level.description && (
                      <div className="border-b border-slate-100 px-4 py-3">
                        <p className="text-sm leading-6 text-slate-600">
                          {level.description}
                        </p>
                      </div>
                    )}

                    {/* Requirements */}
                    <div className="space-y-3 p-4">
                      {(level.requirements || []).length > 0 ? (
                        level.requirements.map((requirement, index) =>
                          renderRequirement({
                            ...requirement,
                            number: requirement.number ?? index + 1,
                            level: level.level,
                            levelName: level.name,
                          })
                        )
                      ) : (
                        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                          Kriteria level ini tersedia, tetapi daftar
                          data dukungnya belum selesai diverifikasi.
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
                  <Clock3
                    size={28}
                    className="mx-auto text-slate-400"
                  />

                  <h4 className="mt-3 font-semibold text-slate-700">
                    Modul sedang diverifikasi
                  </h4>

                  <p className="mx-auto mt-1 max-w-lg text-sm leading-6 text-slate-500">
                    Kriteria penilaian dan daftar data dukung
                    indikator ini belum dimasukkan ke master data.
                    Informasi akan ditampilkan setelah dicocokkan
                    dengan modul resmi.
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Legacy Uploads */}
          {legacyFiles.length > 0 && (
            <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-600" />

                <h3 className="font-semibold text-amber-900">
                  Unggahan Sebelumnya
                </h3>
              </div>

              <p className="mt-2 text-sm text-amber-800">
                File berikut berasal dari format upload sebelumnya
                dan belum terhubung ke kebutuhan data dukung tertentu.
                File tetap dipertahankan.
              </p>

              <div className="mt-3 space-y-2">
                {legacyFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 rounded-lg bg-white p-3 text-sm text-slate-700"
                  >
                    <FileText size={16} />
                    <span className="truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Upload Error */}
          {uploadError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {uploadError}
            </div>
          )}

          {/* Source */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
            <p className="text-xs text-slate-400">
              Sumber informasi: Modul Indikator PEMDI Kota Dumai
            </p>

            <a
              href={moduleData?.source || OFFICIAL_PORTAL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Lihat portal resmi
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:px-7">
          <p className="text-xs text-slate-400">
            Format: PDF, JPG, PNG, WEBP • Maksimal 10 MB per file
          </p>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* File Preview */}
      {activePreview && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/80 p-4">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <p className="truncate pr-4 text-sm font-semibold text-slate-800">
                {activePreview.name}
              </p>

              <button
                type="button"
                onClick={() => setActivePreview(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="flex min-h-[300px] flex-1 items-center justify-center overflow-auto bg-slate-100">
              {activePreview.type === "application/pdf" ? (
                <iframe
                  src={activePreview.url}
                  title={activePreview.name}
                  className="h-[75vh] w-full"
                />
              ) : (
                <img
                  src={activePreview.url}
                  alt={activePreview.name}
                  className="max-h-[75vh] max-w-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
