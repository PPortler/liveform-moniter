import Link from "next/link";

export function BackButton() {
  return (
    <Link
      href="/"
      className="border px-4 py-1 rounded-lg inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-x-0.5 hover:text-blue-600"
    >
      <span>←</span>
      Back
    </Link>
  );
}