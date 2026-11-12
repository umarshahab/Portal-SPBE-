
import { FileText, Download, ExternalLink } from "lucide-react";
import { getModuleFile } from "../utils/moduleFiles";

export default function ModuleDocumentLink({
  indicatorId,
  variant = "default",
}) {
  const moduleUrl = getModuleFile(indicatorId);

  if (!moduleUrl) return null;

  if (variant === "compact") {
  return (
    <a
      href={moduleUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: "10px",
        lineHeight: "10px",
        fontWeight: 400,
      }}
      className="inline-flex shrink-0 items-center border border-blue-200 rounded px-1 py-0.5 text-blue-600 hover:bg-blue-50 transition-colors"
    >
      Indikator Modul
    </a>
  );
}

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <FileText size={22} />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800">
            Modul Indikator {indicatorId}
          </p>

          <p className="text-xs text-gray-500">
            Dokumen panduan evaluasi PEMDI (.pptx)
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={moduleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <ExternalLink size={15} />
          Buka
        </a>

        <a
          href={moduleUrl}
          download={`Modul Indikator ${indicatorId}.pptx`}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Download size={15} />
          Unduh
        </a>
      </div>
    </div>
  );
}
