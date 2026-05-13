import DashboardLayout from "@/components/dashboard/DashboardLayout";
import type { NavItem } from "@/components/dashboard/DashboardLayout";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";
import { customerApplications } from "@/mocks/dashboardData";
import { formatDate } from "@/utils/formatters";
import { LayoutDashboard, FileText, CheckCircle, Upload, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const navItems: NavItem[] = [
  { label: "Overview", href: "/customer", icon: LayoutDashboard },
  { label: "Applications", href: "/customer/applications", icon: FileText },
  { label: "Eligibility Checker", href: "/customer/eligibility", icon: CheckCircle },
  { label: "Documents", href: "/customer/documents", icon: Upload },
  { label: "Profile", href: "/customer/profile", icon: User },
];

const CustomerApplications = () => (
  <DashboardLayout navItems={navItems} role="Customer">
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Loan Applications</h1>
          <p className="text-sm text-muted-foreground">Track application status and next steps.</p>
        </div>
        <Link
          to="/customer/apply"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          New Application
        </Link>
      </div>

      <ErrorBoundary>
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Application #</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Product</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Amount</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Date</th>
                  <th className="px-6 py-3 text-left font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-background">
                {customerApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-muted/70 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-foreground">{app.applicationNumber}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{app.product}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">₹{app.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(app.date)}</td>
                    <td className="px-6 py-4">
                      <Link className="text-primary hover:text-primary/80" to={`/customer/applications/${app.id}`}>
                        View
                      </Link>
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

export default CustomerApplications;
