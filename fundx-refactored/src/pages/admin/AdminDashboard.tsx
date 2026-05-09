import DashboardLayout from "@/components/dashboard/DashboardLayout";
import type { NavItem } from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";
import { adminRevenueData, adminLoanMix } from "@/mocks/dashboardData";
import {
  LayoutDashboard,
  Users,
  Building2,
  IndianRupee,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Lenders", href: "/admin/lenders", icon: Building2 },
  { label: "Commission Engine", href: "/admin/commissions", icon: IndianRupee },
  { label: "Revenue", href: "/admin/revenue", icon: BarChart3 },
  { label: "CMS", href: "/admin/cms", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminDashboard = () => (
  <DashboardLayout navItems={navItems} role="Admin">
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="Total Users"
          value="2,450"
          change="+180"
          changeType="up"
        />
        <StatCard
          icon={Building2}
          title="Active Lenders"
          value="52"
          change="+3"
          changeType="up"
        />
        <StatCard
          icon={IndianRupee}
          title="Monthly Revenue"
          value="₹4.2L"
          change="+18%"
          changeType="up"
        />
        <StatCard
          icon={BarChart3}
          title="Conversion Rate"
          value="24%"
          change="+2%"
          changeType="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue trend */}
        <ErrorBoundary>
          <div className="lg:col-span-2 bg-card rounded-xl shadow-card p-6">
            <h3 className="font-display text-base font-semibold text-card-foreground mb-4">
              Revenue Trend (₹ Lakhs)
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={adminRevenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
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
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  fill="url(#revGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ErrorBoundary>

        {/* Loan mix */}
        <ErrorBoundary>
          <div className="bg-card rounded-xl shadow-card p-6">
            <h3 className="font-display text-base font-semibold text-card-foreground mb-4">
              Loan Mix
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={adminLoanMix}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {adminLoanMix.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              {adminLoanMix.map((l) => (
                <span
                  key={l.name}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: l.color }}
                  />
                  {l.name}
                </span>
              ))}
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  </DashboardLayout>
);

export default AdminDashboard;
