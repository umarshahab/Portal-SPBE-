
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("admin@spbe.dumai.go.id");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const validEmail = "admin@spbe.dumai.go.id";
    const validPassword = "admin123";

    if (
      email.trim().toLowerCase() === validEmail &&
      password === validPassword
    ) {
      onLogin();
      navigate("/preview/evaluasi", { replace: true });
    } else {
      setError("Email atau password yang kamu masukkan salah.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-5">
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/40 bg-white/20 p-6 shadow-2xl shadow-blue-900/10 backdrop-blur-2xl sm:p-8">

        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-slate-600 transition hover:text-blue-800"
        >
          <ArrowLeft size={15} />
          Kembali ke Beranda
        </Link>

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/70 bg-blue-100/70 text-blue-800 shadow-sm backdrop-blur-md">
          <ShieldCheck size={27} />
        </div>

        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-800">
            Portal SPBE Dumai
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Login Evaluasi
          </h1>

          <p className="mt-2 text-xs leading-5 text-slate-600">
            Masuk menggunakan akun terdaftar untuk
            mengakses sistem evaluasi SPBE.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">
              Email
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-white/80 bg-white/65 px-3 shadow-sm transition focus-within:border-blue-400 focus-within:bg-white/85">
              <Mail size={17} className="shrink-0 text-blue-500" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-white/80 bg-white/65 px-3 shadow-sm transition focus-within:border-blue-400 focus-within:bg-white/85">
              <LockKeyhole size={17} className="shrink-0 text-blue-500" />

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-blue-800 to-blue-700 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition duration-300 hover:-translate-y-0.5 hover:from-blue-900 hover:to-blue-800 hover:shadow-xl"
          >
            Masuk ke Sistem
          </button>
        </form>

        <div className="mt-5 rounded-lg border border-amber-200/60 bg-amber-50/65 px-3 py-2.5 text-xs leading-5 text-amber-800 backdrop-blur-md">
          Login menggunakan akun demo selama tahap pengembangan frontend.
        </div>

        <p className="mt-5 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Portal SPBE Kota Dumai
        </p>

      </div>
    </main>
  );
}
