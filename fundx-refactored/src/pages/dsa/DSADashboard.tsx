import DashboardLayout from "@/components/dashboard/DashboardLayout";
import type { NavItem } from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";
import { dsaChartData, dsaLeads } from "@/mocks/dashboardData";
import { formatDate } from "@/utils/formatters";
import {
  LayoutDashboard,
  Users,
  FileText,
  IndianRupee,
  UserPlus,
  BarChart3,
  Settings,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const navItems: NavItem[] = [
  { label: "Overview", href: "/dsa", icon: LayoutDashboard },
  { label: "Leads", href: "/dsa/leads", icon: Users },
  { label: "Applications", href: "/dsa/applications", icon: FileText },
  { label: "Commissions", href: "/dsa/commissions", icon: IndianRupee },
  { label: "Sub-DSA", href: "/dsa/sub-dsa", icon: UserPlus },
  { label: "Reports", href: "/dsa/reports", icon: BarChart3 },
  { label: "Settings", href: "/dsa/settings", icon: Settings },
];

const DSADashboard = () => (
  <DashboardLayout navItems={navItems} role="DSA Partner">
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="Total Leads"
          value="142"
          change="+12 this week"
          changeType="up"
        />
        <StatCard
          icon={FileText}
          title="Active Applications"
          value="38"
          change="+5"
          changeType="up"
        />
        <StatCard
          icon={IndianRupee}
          title="Total Commission"
          value="₹4,85,000"
          change="+₹62K"
          changeType="up"
        />
        <StatCard icon={UserPlus} title="Sub-DSAs" value="6" />
      </div>

      <ErrorBoundary>
        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="font-display text-base font-semibold text-card-foreground mb-4">
            Loan Disbursement Trend
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dsaChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: 12,
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: 12,
                  color: "hsl(var(--muted-foreground))",
                }}
              />
              <Bar
                dataKey="disbursed"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
                name="Disbursed"
              />
              <Bar
                dataKey="pending"
                fill="hsl(var(--chart-2))"
                radius={[4, 4, 0, 0]}
                name="Pending"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-display text-base font-semibold text-card-foreground">
              Recent Leads
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  {["Name", "Loan Type", "Amount", "Status", "Date"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-semibold text-muted-foreground px-6 py-3"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {dsaLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-card-foreground">
                      {lead.lender}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {lead.type}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-card-foreground">
                      {lead.amount}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(lead.date)}
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

export default DSADashboard;
