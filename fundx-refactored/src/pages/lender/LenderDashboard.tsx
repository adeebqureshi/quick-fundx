import DashboardLayout from "@/components/dashboard/DashboardLayout";
import type { NavItem } from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";
import { lenderLeads } from "@/mocks/dashboardData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, RefreshCw, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const navItems: NavItem[] = [
  { label: "Leads", href: "/lender", icon: LayoutDashboard },
  { label: "Status Updates", href: "/lender/status", icon: RefreshCw },
  { label: "Reports", href: "/lender/reports", icon: BarChart3 },
];

const LenderDashboard = () => (
  <DashboardLayout navItems={navItems} role="Lender">
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="Assigned Leads"
          value="24"
          change="+6 this week"
          changeType="up"
        />
        <StatCard icon={LayoutDashboard} title="Approved" value="14" />
        <StatCard icon={RefreshCw} title="Processing" value="7" />
        <StatCard
          icon={BarChart3}
          title="Approval Rate"
          value="58%"
          change="+3%"
          changeType="up"
        />
      </div>

      <ErrorBoundary>
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-display text-base font-semibold text-card-foreground">
              Assigned Leads
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  {[
                    "ID",
                    "Borrower",
                    "Loan Type",
                    "Amount",
                    "Score",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-muted-foreground px-6 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lenderLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-mono font-medium text-card-foreground">
                      {lead.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-card-foreground">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {lead.loan}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-card-foreground">
                      {lead.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          lead.score >= 80
                            ? "text-success"
                            : lead.score >= 60
                              ? "text-warning"
                              : "text-destructive"
                        )}
                      >
                        {lead.score}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7"
                          onClick={() =>
                            toast.info(`Viewing lead ${lead.id}`)
                          }
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="text-xs h-7"
                          onClick={() =>
                            toast.success(`Accepted lead ${lead.id}`)
                          }
                        >
                          Accept
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  </DashboardLayout>
);

export default LenderDashboard;
