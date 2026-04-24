import { ButtonHTMLAttributes } from "react";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
};

export function AppButton({
  variant = "primary",
  fullWidth = false,
  className,
  children,
  ...props
}: AppButtonProps) {
  const baseClassName =
    "inline-flex cursor-pointer items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60";

  const variantClassName =
    variant === "secondary"
      ? "border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-700"
      : "bg-blue-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow";

  return (
    <button
      className={`${baseClassName} ${variantClassName} ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}