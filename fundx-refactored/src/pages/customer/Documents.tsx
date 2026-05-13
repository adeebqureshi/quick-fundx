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

const Documents = () => (
  <DashboardLayout navItems={navItems} role="Customer">
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="text-sm text-muted-foreground">Upload and track all KYC documents securely.</p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <p className="text-sm text-muted-foreground">This module is being built out for document uploads, OCR processing, and secure KYC storage.</p>
      </div>
    </div>
  </DashboardLayout>
);

export default Documents;
