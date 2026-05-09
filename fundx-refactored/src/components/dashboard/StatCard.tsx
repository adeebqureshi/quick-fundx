import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: React.ComponentType<LucideProps>;
}

const StatCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
}: StatCardProps) => (
  <div className="p-5 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      {change && (
        <span
          className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded-full",
            changeType === "up" && "bg-success/10 text-success",
            changeType === "down" && "bg-destructive/10 text-destructive",
            changeType === "neutral" && "bg-muted text-muted-foreground"
          )}
        >
          {change}
        </span>
      )}
    </div>
    <p className="text-2xl font-display font-bold text-card-foreground">
      {value}
    </p>
    <p className="text-sm text-muted-foreground mt-0.5">{title}</p>
  </div>
);

export default StatCard;
