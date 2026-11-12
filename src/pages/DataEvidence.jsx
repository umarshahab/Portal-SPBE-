import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  Image as ImageIcon,
  Download,
  Eye,
  Trash2,
  X,
  FolderOpen,
  Filter,
  File,
  ArrowLeft,
} from "lucide-react";

import { Link } from "react-router-dom";
import { aspects, indicators } from "../data/evaluationData";
import { indicatorModules } from "../data/indicatorModules";

function formatFileSize(bytes = 0) {
  if (!bytes || bytes <= 0) return "0 KB";

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getFileIcon(type) {
  if (type?.startsWith("image/")) return ImageIcon;
  if (type === "application/pdf") return FileText;
  return File;
}

function DataEvidence({ evidenceData = {}, setEvidenceData }) {
  const [search, setSearch] = useState("");
  const [selectedAspect, setSelectedAspect] = useState("all");
  const [previewFile, setPreviewFile] = useState(null);

  // Mengambil seluruh file dari format evidence baru dan lama.
  const allFiles = useMemo(() => {
    return indicators.flatMap((indicator) => {
      const aspect = aspects.find(
        (item) => Number(item.id) === Number(indicator.aspectId)
      );

      const indicatorEvidence = evidenceData?.[indicator.id];

      if (!indicatorEvidence) return [];

      // Mendukung format lama dan format baru.
      const files = Array.isArray(indicatorEvidence)
        ? indicatorEvidence.map((file) => ({
            ...file,
            requirementId: null,
            requirementName: "Unggahan sebelumnya",
          }))
        : Object.entries(indicatorEvidence).flatMap(
            ([requirementId, requirementFiles]) => {
              if (!Array.isArray(requirementFiles)) return [];

              const moduleData = indicatorModules[indicator.id];

              const requirement = moduleData?.criteria
                ?.flatMap((level) => level.requirements || [])
                .find((item) => item.id === requirementId);

              return requirementFiles.map((file) => ({
                ...file,
                requirementId:
                  requirementId === "_legacy" ? null : requirementId,
                requirementName:
                  requirementId === "_legacy"
                    ? "Unggahan sebelumnya"
                    : requirement?.name || "Data dukung",
              }));
            }
          );

      return files.map((file) => ({
        ...file,
        name: file.name || "Dokumen tanpa nama",
        type: file.type || "application/octet-stream",
        size: file.size || 0,
        indicatorId: indicator.id,
        indicatorName:
          indicatorModules[indicator.id]?.title || indicator.name,
        aspectId: indicator.aspectId,
        aspectName: aspect?.name || "-",
        architecture: aspect?.architecture || "-",
      }));
    });
  }, [evidenceData]);

  // Pencarian dan filter aspek
  const filteredFiles = useMemo(() => {
    return allFiles.filter((file) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        file.name.toLowerCase().includes(keyword) ||
        file.indicatorName.toLowerCase().includes(keyword) ||
        file.aspectName.toLowerCase().includes(keyword);

      const matchesAspect =
        selectedAspect === "all" ||
        String(file.aspectId) === selectedAspect;

      return matchesSearch && matchesAspect;
    });
  }, [allFiles, search, selectedAspect]);

  // Rekapitulasi dokumen
  const totalFiles = allFiles.length;

  const totalIndicators = new Set(
    allFiles.map((file) => file.indicatorId)
  ).size;

  const totalSize = allFiles.reduce(
    (total, file) => total + Number(file.size || 0),
    0
  );

  // Hapus dokumen
  function handleDelete(file) {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus file "${file.name}"?`
    );

    if (!confirmed) return;

    if (previewFile?.id === file.id) {
      setPreviewFile(null);
    }

    setEvidenceData((current) => {
      const indicatorEvidence = current?.[file.indicatorId];

      // Format evidence lama.
      if (Array.isArray(indicatorEvidence)) {
        return {
          ...current,
          [file.indicatorId]: indicatorEvidence.filter(
            (item) => item.id !== file.id
          ),
        };
      }

      // Format evidence baru.
      const requirementId = file.requirementId;

      if (!requirementId) return current;

      const requirementFiles =
        indicatorEvidence?.[requirementId] || [];

      return {
        ...current,
        [file.indicatorId]: {
          ...indicatorEvidence,
          [requirementId]: requirementFiles.filter(
            (item) => item.id !== file.id
          ),
        },
      };
    });

    if (file.url) {
      URL.revokeObjectURL(file.url);
    }
  }

  // Download dokumen
  function handleDownload(file) {
    if (!file.url) {
      alert("File tidak tersedia untuk diunduh.");
      return;
    }

    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name || "dokumen";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/preview/evaluasi"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Kembali ke Evaluasi
          </Link>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Manajemen Dokumen
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Data Evidence
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Kelola seluruh dokumen pendukung evaluasi SPBE
                dalam satu tempat.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              <FolderOpen size={18} className="text-blue-600" />
              <span>Dokumen Evidence</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total Dokumen */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={20} />
            </div>

            <p className="text-sm text-slate-500">Total Dokumen</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {totalFiles}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              File evidence yang diunggah
            </p>
          </div>

          {/* Indikator Terisi */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <FolderOpen size={20} />
            </div>

            <p className="text-sm text-slate-500">Indikator Terisi</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {totalIndicators}
              <span className="ml-1 text-sm font-medium text-slate-400">
                / {indicators.length}
              </span>
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Indikator yang memiliki dokumen
            </p>
          </div>

          {/* Total Ukuran */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <File size={20} />
            </div>

            <p className="text-sm text-slate-500">Total Ukuran File</p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {formatFileSize(totalSize)}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Akumulasi ukuran seluruh dokumen
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Search and Filter */}
          <div className="flex flex-col gap-3 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Daftar Dokumen
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {filteredFiles.length} dokumen ditemukan
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari dokumen atau indikator..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-72"
                />
              </div>

              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={selectedAspect}
                  onChange={(e) => setSelectedAspect(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-blue-400 sm:w-64"
                >
                  <option value="all">Semua Aspek</option>

                  {aspects.map((aspect) => (
                    <option key={aspect.id} value={String(aspect.id)}>
                      {aspect.code} - {aspect.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Document List */}
          {filteredFiles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Dokumen</th>
                    <th className="px-5 py-4 font-semibold">Indikator</th>
                    <th className="px-5 py-4 font-semibold">Aspek</th>
                    <th className="px-5 py-4 font-semibold">Ukuran</th>
                    <th className="px-5 py-4 font-semibold">Tanggal Upload</th>
                    <th className="px-5 py-4 text-center font-semibold">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredFiles.map((file) => {
                    const Icon = getFileIcon(file.type);

                    return (
                      <tr
                        key={`${file.indicatorId}-${file.id}`}
                        className="transition hover:bg-slate-50/80"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              <Icon size={19} />
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-56 truncate text-sm font-semibold text-slate-800">
                                {file.name}
                              </p>

                              <p className="mt-1 text-xs uppercase text-slate-400">
                                {file.type.split("/")[1] || "FILE"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="max-w-64 text-sm leading-5 text-slate-700">
                            {file.indicatorName}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {file.requirementName}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-700">
                            {file.aspectName}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {file.architecture}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {formatFileSize(file.size)}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {file.uploadedAt || "-"}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setPreviewFile(file)}
                              disabled={!file.url}
                              title="Lihat dokumen"
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              onClick={() => handleDownload(file)}
                              disabled={!file.url}
                              title="Download dokumen"
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Download size={17} />
                            </button>

                            <button
                              onClick={() => handleDelete(file)}
                              title="Hapus dokumen"
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <FolderOpen size={30} />
              </div>

              <h3 className="font-semibold text-slate-800">
                {search || selectedAspect !== "all"
                  ? "Dokumen tidak ditemukan"
                  : "Belum ada dokumen evidence"}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                {search || selectedAspect !== "all"
                  ? "Coba gunakan kata kunci atau filter aspek yang berbeda."
                  : "Dokumen yang diunggah melalui halaman Evaluasi akan muncul secara otomatis di sini."}
              </p>

              {!search && selectedAspect === "all" && (
                <Link
                  to="/preview/evaluasi"
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Buka Halaman Evaluasi
                </Link>
              )}
            </div>
          )}
        </div>

        <p className="mt-5 text-xs leading-5 text-slate-400">
          Data pada halaman ini berasal dari dokumen yang diunggah
          melalui halaman Evaluasi.
        </p>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-slate-900">
                  {previewFile.name}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {formatFileSize(previewFile.size)}
                </p>
              </div>

              <button
                onClick={() => setPreviewFile(null)}
                className="ml-4 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="min-h-[300px] flex-1 overflow-auto bg-slate-100 p-3">
              {previewFile.type === "application/pdf" ? (
                <iframe
                  src={previewFile.url}
                  title={previewFile.name}
                  className="h-[70vh] w-full rounded-lg bg-white"
                />
              ) : previewFile.type.startsWith("image/") ? (
                <div className="flex min-h-[60vh] items-center justify-center">
                  <img
                    src={previewFile.url}
                    alt={previewFile.name}
                    className="max-h-[70vh] max-w-full rounded-lg object-contain"
                  />
                </div>
              ) : (
                <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                  <FileText size={45} className="text-slate-400" />

                  <p className="mt-3 text-sm text-slate-600">
                    Format file ini belum mendukung pratinjau.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-5 py-4">
              <button
                onClick={() => setPreviewFile(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Tutup
              </button>

              <button
                onClick={() => handleDownload(previewFile)}
                disabled={!previewFile.url}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataEvidence;