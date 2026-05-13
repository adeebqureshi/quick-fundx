import DashboardLayout from "@/components/dashboard/DashboardLayout";
import type { NavItem } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutDashboard, FileText, CheckCircle, Upload, User } from "lucide-react";
import { useState, type FormEvent } from "react";

const navItems: NavItem[] = [
  { label: "Overview", href: "/customer", icon: LayoutDashboard },
  { label: "Applications", href: "/customer/applications", icon: FileText },
  { label: "Eligibility Checker", href: "/customer/eligibility", icon: CheckCircle },
  { label: "Documents", href: "/customer/documents", icon: Upload },
  { label: "Profile", href: "/customer/profile", icon: User },
];

const Apply = () => {
  const [formData, setFormData] = useState({
    loanProductId: "",
    requestedAmount: "",
    tenureMonths: "",
    monthlyIncome: "",
    cibilScore: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting application:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout navItems={navItems} role="Customer">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Apply for a Loan</h1>
          <p className="text-sm text-muted-foreground">Complete the application form and our team will review it.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="loanProduct">Loan Product</Label>
              <Select onValueChange={(value) => handleChange("loanProductId", value)}>
                <SelectTrigger id="loanProduct" className="w-full">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Loan</SelectItem>
                  <SelectItem value="home">Home Loan</SelectItem>
                  <SelectItem value="business">Business Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Requested Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={formData.requestedAmount}
                onChange={(e) => handleChange("requestedAmount", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenure">Tenure (Months)</Label>
              <Input
                id="tenure"
                type="number"
                placeholder="Enter tenure"
                value={formData.tenureMonths}
                onChange={(e) => handleChange("tenureMonths", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income">Monthly Income</Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter monthly income"
                value={formData.monthlyIncome}
                onChange={(e) => handleChange("monthlyIncome", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="cibil">CIBIL Score (Optional)</Label>
              <Input
                id="cibil"
                type="number"
                placeholder="Enter CIBIL score"
                value={formData.cibilScore}
                onChange={(e) => handleChange("cibilScore", e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Apply;
