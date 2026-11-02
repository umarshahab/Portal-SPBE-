
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, LockKeyhole } from "lucide-react";
import { navigation } from "../data/portalData";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-700"
        : "text-slate-600 hover:text-blue-700"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-800 text-white">
            <span className="text-xl font-bold">D</span>
          </div>

          <div>
            <p className="text-lg font-bold leading-tight text-slate-900">
              SPBE DUMAI
            </p>
            <p className="text-xs text-slate-500">
              Pemerintah Kota Dumai
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={linkClass}
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/login"
            className="flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
          >
            <LockKeyhole size={16} />
            Login Evaluasi
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-700 lg:hidden"
          aria-label="Buka menu navigasi"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={linkClass}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 font-semibold text-blue-800"
            >
              <LockKeyhole size={16} />
              Login Evaluasi
              <ChevronDown size={14} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
