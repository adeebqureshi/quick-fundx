import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";
import { capitalize } from "@/utils/formatters";

const statusConfig: Record<
  ApplicationStatus,
  { bg: string; text: string; dot: string }
> = {
  approved: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
  },
  pending: {
    bg: "bg-warning/10",
    text: "text-warning",
    dot: "bg-warning",
  },
  rejected: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    dot: "bg-destructive",
  },
  processing: {
    bg: "bg-info/10",
    text: "text-info",
    dot: "bg-info",
  },
  disbursed: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
  },
};

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status] ?? statusConfig.pending;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.bg,
        config.text
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      {capitalize(status)}
    </span>
  );
};

export default StatusBadge;
