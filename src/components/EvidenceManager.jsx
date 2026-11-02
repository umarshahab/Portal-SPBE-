
import { useEffect, useRef, useState } from "react";
import {
  X,
  FileText,
  UploadCloud,
  Image as ImageIcon,
  File,
  Eye,
  Trash2,
  CheckCircle2,
  Clock3,
  Download,
} from "lucide-react";

import { aspects } from "../data/evaluationData";

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function EvidenceManager({
  indicator,
  onClose,
  evidenceData,
  setEvidenceData,
}) {
  const inputRef = useRef(null);
  const objectUrlsRef = useRef([]);
  const files = evidenceData[indicator.id] || [];
  const [previewFile, setPreviewFile] = useState(null);
  const [error, setError] = useState("");

  const aspect = aspects.find(
    (item) => item.id === indicator.aspectId
  );

  function handleFiles(event) {
    const selectedFiles = Array.from(event.target.files || []);
    setError("");

    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    const validFiles = [];
    let errorMessage = "";

    selectedFiles.forEach((file) => {
        if (!allowedTypes.includes(file.type)) {
        errorMessage =
            "Format file tidak didukung. Gunakan PDF, JPG, PNG, atau WEBP.";
        return;
        }

        if (file.size > 10 * 1024 * 1024) {
        errorMessage = "Ukuran setiap file maksimal 10 MB.";
        return;
        }

        const url = URL.createObjectURL(file);

        objectUrlsRef.current.push(url);

        validFiles.push({
        id: `${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        url,
        uploadedAt: new Date().toLocaleString("id-ID"),
        });
    });

    if (errorMessage) setError(errorMessage);

    if (validFiles.length > 0) {
        setEvidenceData((current) => ({
        ...current,
        [indicator.id]: [
            ...(current[indicator.id] || []),
            ...validFiles,
        ],
        }));
    }

    event.target.value = "";
    }

  function removeFile(id) {
    const target = files.find((item) => item.id === id);

    if (target) {
        URL.revokeObjectURL(target.url);

        objectUrlsRef.current = objectUrlsRef.current.filter(
        (url) => url !== target.url
        );
    }

    setEvidenceData((current) => ({
        ...current,
        [indicator.id]: (current[indicator.id] || []).filter(
        (item) => item.id !== id
        ),
    }));

    if (previewFile?.id === id) {
        setPreviewFile(null);
    }
    }

  const isImage = (type) => type.startsWith("image/");

  return (
    <>
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]"
        onClick={onClose}
      >
        <div
          className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          {/* HEADER */}
          <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                Detail Indikator {indicator.id}
              </p>

              <h2 className="mt-1.5 max-w-xl text-[15px] font-bold leading-6 text-slate-900">
                {indicator.name}
              </h2>

              <p className="mt-1 text-[11px] text-slate-400">
                {aspect?.name || "Aspek tidak ditemukan"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={19} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
            {/* INDICATOR INFORMATION */}
            <section>
              <h3 className="mb-3 text-[12px] font-bold text-slate-800">
                Informasi Penilaian
              </h3>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] text-slate-400">
                    Tipe Indikator
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-slate-800">
                    {indicator.type}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400">
                    Bobot
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-slate-800">
                    {indicator.weight}%
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400">
                    Capaian Nilai
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-slate-800">
                    {indicator.score}/5.0
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400">
                    Arsitektur
                  </p>
                  <p className="mt-1 text-[11px] font-medium leading-5 text-slate-700">
                    {aspect?.architecture || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400">
                    Evidence pada Data Acuan
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-slate-800">
                    {indicator.evidence}/{indicator.totalEvidence}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400">
                    Evidence Sesi Ini
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-blue-700">
                    {files.length} file
                  </p>
                </div>
              </div>
            </section>

            {/* UPLOAD */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-[12px] font-bold text-slate-800">
                    Dokumen Data Dukung
                  </h3>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Unggah dokumen pendukung indikator ini.
                  </p>
                </div>

                <span className="text-[10px] text-slate-400">
                  Maks. 10 MB/file
                </span>
              </div>

              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                multiple
                onChange={handleFiles}
                className="hidden"
              />

              <button
                onClick={() => inputRef.current?.click()}
                className="group flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/60 px-4 py-7 text-center transition hover:border-blue-400 hover:bg-blue-50/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm transition group-hover:bg-blue-50">
                  <UploadCloud size={20} />
                </div>

                <p className="mt-3 text-[12px] font-semibold text-slate-700">
                  Pilih dokumen untuk diunggah
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  PDF, JPG, PNG, atau WEBP
                </p>
              </button>

              {error && (
                <p className="mt-2 text-[11px] text-red-600">
                  {error}
                </p>
              )}
            </section>

            {/* FILE LIST */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[12px] font-bold text-slate-800">
                  Daftar Dokumen
                </h3>

                <span className="text-[10px] text-slate-400">
                  {files.length} dokumen
                </span>
              </div>

              {files.length === 0 ? (
                <div className="rounded-lg border border-slate-100 px-4 py-8 text-center">
                  <FileText
                    size={24}
                    className="mx-auto text-slate-300"
                  />
                  <p className="mt-2 text-[11px] font-medium text-slate-600">
                    Belum ada dokumen
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Dokumen yang dipilih akan muncul di sini.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {files.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 py-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        {isImage(item.type) ? (
                          <ImageIcon size={17} />
                        ) : (
                          <File size={17} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-semibold text-slate-700">
                          {item.name}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {formatFileSize(item.size)} · {item.uploadedAt}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          onClick={() => setPreviewFile(item)}
                          title="Preview dokumen"
                          className="rounded-md p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye size={16} />
                        </button>

                        <a
                          href={item.url}
                          download={item.name}
                          title="Download dokumen"
                          className="rounded-md p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Download size={15} />
                        </a>

                        <button
                          onClick={() => removeFile(item.id)}
                          title="Hapus dokumen"
                          className="rounded-md p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* STATUS */}
            <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-3 text-[10px] leading-5 text-amber-700">
              <Clock3 size={15} className="mt-0.5 shrink-0" />
              <p>
                Mode pratinjau: dokumen hanya tersimpan sementara di
                browser. Pengiriman dan penyimpanan permanen akan
                dihubungkan dengan backend pada tahap berikutnya.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end border-t border-slate-100 px-6 py-4">
            <button
              onClick={onClose}
              className="rounded-lg bg-[#193b91] px-5 py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#142f75]"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>

      {/* DOCUMENT PREVIEW */}
      {previewFile && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4"
          onClick={() => setPreviewFile(null)}
        >
          <div
            className="flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3">
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-slate-800">
                  {previewFile.name}
                </p>
                <p className="text-[10px] text-slate-400">
                  Preview dokumen
                </p>
              </div>

              <button
                onClick={() => setPreviewFile(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-slate-100">
              {isImage(previewFile.type) ? (
                <div className="flex min-h-full items-center justify-center p-4">
                  <img
                    src={previewFile.url}
                    alt={previewFile.name}
                    className="max-h-full max-w-full rounded-md object-contain"
                  />
                </div>
              ) : (
                <iframe
                  src={previewFile.url}
                  title={previewFile.name}
                  className="h-full min-h-[65vh] w-full bg-white"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
