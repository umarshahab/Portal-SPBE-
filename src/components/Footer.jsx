
import { Link } from "react-router-dom";
import { MapPin, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">

        {/* Identitas Portal */}
        <div>
          <h3 className="mb-4 text-xl font-bold tracking-wide text-white">
            PEMDI KOTA DUMAI
          </h3>

          <p className="max-w-sm text-sm leading-7 text-slate-400">
            Portal Pemerintahan Digital Kota Dumai sebagai pusat
            informasi kebijakan, tata kelola, manajemen, dan
            layanan pemerintahan digital.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="mb-4 font-semibold text-white">
            Navigasi
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            {[
              { label: "Beranda", path: "/" },
              { label: "Indeks", path: "/indeks" },
              { label: "Regulasi", path: "/regulasi" },
              { label: "Galeri", path: "/galeri" },
              { label: "Informasi", path: "/informasi" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="w-fit text-slate-400 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Informasi Kontak */}
        <div>
          <h3 className="mb-4 font-semibold text-white">
            Informasi Kontak
          </h3>

          <div className="flex flex-col gap-4 text-sm text-slate-400">
            <p className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              Pemerintah Kota Dumai, Provinsi Riau
            </p>

            <p className="flex items-center gap-3">
              <Mail size={18} className="shrink-0" />
              Informasi kontak resmi menyusul
            </p>

            <p className="flex items-center gap-3">
              <Globe size={18} className="shrink-0" />
              Portal Pemerintahan Digital Kota Dumai
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800 px-5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Portal Pemerintahan Digital Kota Dumai.
        Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
