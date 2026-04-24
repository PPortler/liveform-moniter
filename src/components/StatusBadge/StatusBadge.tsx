import { Status } from "@/consts/enum";

type StatusBadgeProps = {
  status: Status;
};

const STATUS_MAP: Record<
  Status,
  { label: string; className: string }
> = {
  [Status.ACTIVE]: {
    label: "Active",
    className: "bg-green-100 text-green-700",
  },
  [Status.INACTIVE]: {
    label: "Inactive",
    className: "bg-yellow-100 text-yellow-700",
  },
  [Status.SUBMITTED]: {
    label: "Submitted",
    className: "bg-blue-100 text-blue-700",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_MAP[status];

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}