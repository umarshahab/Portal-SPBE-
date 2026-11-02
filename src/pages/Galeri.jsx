
import SectionTitle from "../components/SectionTitle";
import { gallery } from "../data/portalData";

export default function Galeri() {
  return (
    <div className="mx-auto min-h-[65vh] max-w-7xl px-5 py-20 lg:px-8">
      <SectionTitle
        eyebrow="Dokumentasi"
        title="Galeri Kegiatan SPBE"
        description="Dokumentasi kegiatan koordinasi, sosialisasi, dan pelaksanaan SPBE."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((item, index) => (
          <article
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-56 w-full object-cover"
            />

            <div className="p-5">
              <p className="text-xs font-bold text-blue-700">
                {item.category}
              </p>

              <h3 className="mt-3 font-bold leading-6 text-slate-900">
                {item.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
