
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Grid3X3,
  X,
  Landmark,
  ClipboardCheck,
} from "lucide-react";

const applications = [
  {
    name: "PEMDI",
    description: "Portal Pemerintah Digital",
    path: "/",
    icon: Landmark,
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Evaluasi",
    description: "Sistem Evaluasi PEMDI",
    path: "/evaluasi",
    icon: ClipboardCheck,
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function AppSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu aplikasi"
        aria-expanded={isOpen}
        className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
          isOpen
            ? "bg-blue-100 text-blue-800"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        {isOpen ? <X size={21} /> : <Grid3X3 size={21} />}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Tutup menu aplikasi"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-14 z-50 w-80 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Aplikasi Pemerintah Digital
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Pilih portal yang ingin kamu akses.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {applications.map((app) => {
                const Icon = app.icon;
                const isActive =
                  app.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(app.path);

                return (
                  <Link
                    key={app.name}
                    to={app.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex flex-col items-center rounded-xl border p-4 text-center transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm ${
                      isActive
                        ? "border-blue-200 bg-blue-50/70"
                        : "border-slate-100"
                    }`}
                  >
                    <div
                      className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${app.color}`}
                    >
                      <Icon size={24} />
                    </div>

                    <span className="text-sm font-bold text-slate-800">
                      {app.name}
                    </span>

                    <span className="mt-1 text-[10px] leading-4 text-slate-500">
                      {app.description}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <p className="text-center text-[10px] text-slate-400">
                Pemerintah Kota Dumai
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
