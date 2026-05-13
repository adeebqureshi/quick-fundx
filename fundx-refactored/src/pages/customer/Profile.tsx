import DashboardLayout from "@/components/dashboard/DashboardLayout";
import type { NavItem } from "@/components/dashboard/DashboardLayout";
import { LayoutDashboard, FileText, CheckCircle, Upload, User } from "lucide-react";

const navItems: NavItem[] = [
  { label: "Overview", href: "/customer", icon: LayoutDashboard },
  { label: "Applications", href: "/customer/applications", icon: FileText },
  { label: "Eligibility Checker", href: "/customer/eligibility", icon: CheckCircle },
  { label: "Documents", href: "/customer/documents", icon: Upload },
  { label: "Profile", href: "/customer/profile", icon: User },
];

const Profile = () => (
  <DashboardLayout navItems={navItems} role="Customer">
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">View and manage your account details.</p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <p className="text-sm text-muted-foreground">This area will include your profile information, KYC status, and contact details.</p>
      </div>
    </div>
  </DashboardLayout>
);

export default Profile;
