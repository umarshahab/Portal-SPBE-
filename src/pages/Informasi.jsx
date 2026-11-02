
import SectionTitle from "../components/SectionTitle";
import { Newspaper } from "lucide-react";

export default function Informasi() {
  return (
    <div className="mx-auto min-h-[65vh] max-w-7xl px-5 py-20 lg:px-8">
      <SectionTitle
        eyebrow="Informasi"
        title="Berita dan Informasi SPBE"
        description="Informasi terbaru mengenai kegiatan dan perkembangan penerapan SPBE Kota Dumai."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <Newspaper
          className="mx-auto mb-5 text-blue-800"
          size={48}
        />

        <h3 className="text-xl font-bold text-slate-900">
          Informasi SPBE
        </h3>

        <p className="mt-3 text-sm text-slate-500">
          Berita dan informasi resmi akan ditampilkan
          pada halaman ini.
        </p>
      </div>
    </div>
  );
}
