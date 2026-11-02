
import { Link } from "react-router-dom";
import { MapPin, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="mb-4 text-xl font-bold text-white">
            SPBE KOTA DUMAI
          </h3>
          <p className="max-w-sm text-sm leading-7 text-slate-400">
            Portal informasi Sistem Pemerintahan Berbasis Elektronik
            Pemerintah Kota Dumai.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">
            Navigasi
          </h3>
          <div className="flex flex-col gap-3 text-sm">
            <Link to="/" className="hover:text-white">Beranda</Link>
            <Link to="/indeks" className="hover:text-white">Indeks</Link>
            <Link to="/regulasi" className="hover:text-white">Regulasi</Link>
            <Link to="/galeri" className="hover:text-white">Galeri</Link>
            <Link to="/informasi" className="hover:text-white">Informasi</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">
            Informasi Kontak
          </h3>

          <div className="flex flex-col gap-4 text-sm text-slate-400">
            <p className="flex items-start gap-3">
              <MapPin size={18} />
              Pemerintah Kota Dumai, Provinsi Riau
            </p>
            <p className="flex items-center gap-3">
              <Mail size={18} />
              Informasi kontak resmi menyusul
            </p>
            <p className="flex items-center gap-3">
              <Globe size={18} />
              Portal SPBE Kota Dumai
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Portal SPBE Kota Dumai.
        Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
