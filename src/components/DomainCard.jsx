
import {
  FileCheck,
  Network,
  Settings,
  Monitor,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const icons = {
  "file-check": FileCheck,
  network: Network,
  settings: Settings,
  monitor: Monitor,
};

export default function DomainCard({ domain }) {
  const Icon = icons[domain.icon] || FileCheck;

  return (
    <Link
      to={domain.path}
      className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
    >
      <div className="mb-7 flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
          <Icon size={27} />
        </div>

        <span className="text-3xl font-bold text-slate-200">
          {domain.number}
        </span>
      </div>

      <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-blue-800">
        {domain.title}
      </h3>

      <p className="text-sm leading-7 text-slate-500">
        {domain.description}
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-800">
        Pelajari lebih lanjut
        <ArrowUpRight size={16} />
      </div>
    </Link>
  );
}
