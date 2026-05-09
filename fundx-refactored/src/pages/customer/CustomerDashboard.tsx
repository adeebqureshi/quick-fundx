import DashboardLayout from "@/components/dashboard/DashboardLayout";
import type { NavItem } from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";
import { customerScoreData, customerApplications } from "@/mocks/dashboardData";
import { formatDate } from "@/utils/formatters";
import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  Upload,
  User,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const navItems: NavItem[] = [
  { label: "Overview", href: "/customer", icon: LayoutDashboard },
  { label: "Applications", href: "/customer/applications", icon: FileText },
  {
    label: "Eligibility Checker",
    href: "/customer/eligibility",
    icon: CheckCircle,
  },
  { label: "Documents", href: "/customer/documents", icon: Upload },
  { label: "Profile", href: "/customer/profile", icon: User },
];

const CustomerDashboard = () => (
  <DashboardLayout navItems={navItems} role="Customer">
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={FileText}
          title="Total Applications"
          value="3"
          change="+1 this month"
          changeType="up"
        />
        <StatCard
          icon={CheckCircle}
          title="Approval Rate"
          value="82%"
          change="+5%"
          changeType="up"
        />
        <StatCard icon={LayoutDashboard} title="Active Loans" value="1" />
        <StatCard icon={Upload} title="Documents Uploaded" value="8" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ErrorBoundary>
          <div className="lg:col-span-2 bg-card rounded-xl shadow-card p-6">
            <h3 className="font-display text-base font-semibold text-card-foreground mb-4">
              Eligibility Score Trend
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={customerScoreData}>
                <defs>
                  <linearGradient
                    id="scoreGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 12,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  domain={[50, 100]}
                  tick={{
                    fontSize: 12,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--chart-1))"
                  fill="url(#scoreGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ErrorBoundary>

        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="font-display text-base font-semibold text-card-foreground mb-4">
            EMI Estimate
          </h3>
          <div className="space-y-4">
            <div className="text-center p-4 rounded-xl bg-primary/5">
              <p className="text-3xl font-display font-bold text-primary">
                ₹12,450
              </p>
              <p className="text-xs text-muted-foreground mt-1">Monthly EMI</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm font-semibold text-card-foreground">
                  10.5%
                </p>
                <p className="text-xs text-muted-foreground">Interest Rate</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm font-semibold text-card-foreground">
                  36 Mo
                </p>
                <p className="text-xs text-muted-foreground">Tenure</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications table */}
      <ErrorBoundary>
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-display text-base font-semibold text-card-foreground">
              Recent Applications
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  {["ID", "Loan Type", "Amount", "Lender", "Status", "Date"].map(
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
                {customerApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-mono font-medium text-card-foreground">
                      {app.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {app.type}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-card-foreground">
                      {app.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {app.lender}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(app.date)}
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

export default CustomerDashboard;
