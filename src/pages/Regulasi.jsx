
import SectionTitle from "../components/SectionTitle";
import { FileText, Download } from "lucide-react";

export default function Regulasi() {
  return (
    <div className="mx-auto min-h-[65vh] max-w-7xl px-5 py-20 lg:px-8">
      <SectionTitle
        eyebrow="Dokumen Resmi"
        title="Regulasi SPBE"
        description="Kumpulan peraturan dan kebijakan yang menjadi dasar penerapan SPBE."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <FileText className="mx-auto mb-5 text-blue-800" size={48} />
        <h3 className="text-xl font-bold text-slate-900">
          Daftar Regulasi
        </h3>
        <p className="mt-3 text-sm text-slate-500">
          Dokumen regulasi resmi akan ditambahkan setelah
          data tersedia.
        </p>
      </div>
    </div>
  );
}
