
import SectionTitle from "../components/SectionTitle";
import { domains } from "../data/portalData";
import DomainCard from "../components/DomainCard";

export default function Indeks() {
  return (
    <div className="mx-auto min-h-[65vh] max-w-7xl px-5 py-20 lg:px-8">
      <SectionTitle
        eyebrow="Indeks SPBE"
        title="Indeks Sistem Pemerintahan Berbasis Elektronik"
        description="Informasi mengenai penerapan dan perkembangan Sistem Pemerintahan Berbasis Elektronik di lingkungan Pemerintah Kota Dumai."
      />

      <div className="mb-10 rounded-2xl bg-blue-900 p-8 text-white">
        <p className="text-sm text-blue-200">Informasi Indeks SPBE</p>
        <h2 className="mt-3 text-2xl font-bold">
          Data indeks akan ditampilkan di sini
        </h2>
        <p className="mt-3 text-sm text-blue-100">
          Nilai dan tahun penilaian akan diisi berdasarkan
          dokumen resmi Pemerintah Kota Dumai.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {domains.map((domain) => (
          <DomainCard key={domain.number} domain={domain} />
        ))}
      </div>
    </div>
  );
}
