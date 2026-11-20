
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";

import { navigation } from "../data/portalData";
import AppSwitcher from "./AppSwitcher";

export default function Navbar({
  isAuthenticated,
  onLogout,
}) {
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

        {/* LOGO PEMDI */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-800 text-white">
            <span className="text-xl font-bold">D</span>
          </div>

          <div>
            <p className="text-lg font-bold leading-tight text-slate-900">
              PEMDI DUMAI
            </p>
            <p className="text-xs text-slate-500">
              Pemerintah Kota Dumai
            </p>
          </div>
        </Link>

        {/* NAVIGASI DESKTOP */}
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
        </nav>

        {/* LOGIN / APP SWITCHER */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <AppSwitcher onLogout={onLogout} />
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800"
            >
              <LogIn size={17} />
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Buka menu navigasi"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* NAVIGASI MOBILE */}
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
          </nav>
        </div>
      )}
    </header>
  );
}
