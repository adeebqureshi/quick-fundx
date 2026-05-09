import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const loanTypes = [
  { value: "personal", label: "Personal Loan", tenure: 36 },
  { value: "business", label: "Business Loan", tenure: 48 },
  { value: "home", label: "Home Loan", tenure: 240 },
  { value: "lap", label: "Loan Against Property", tenure: 180 },
];

const employmentTypes = [
  { value: "salaried", label: "Salaried" },
  { value: "self", label: "Self Employed" },
];

type Result = {
  eligible: boolean;
  score: number;
  maxEmi: number;
  maxLoan: number;
  approvalChance: string;
  reasons: string[];
};

const formatCurrency = (value: number) =>
  value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const Eligibility = () => {
  const [loanType, setLoanType] = useState("personal");
  const [employment, setEmployment] = useState("salaried");
  const [income, setIncome] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [age, setAge] = useState("");
  const [existingEmi, setExistingEmi] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const tenure = useMemo(
    () => loanTypes.find((item) => item.value === loanType)?.tenure ?? 36,
    [loanType],
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const incomeValue = Math.max(0, Number(income));
    const creditValue = Math.max(0, Number(creditScore));
    const ageValue = Math.max(0, Number(age));
    const emiValue = Math.max(0, Number(existingEmi));

    const reasons: string[] = [];
    const minIncome = employment === "salaried" ? 25000 : 35000;

    if (ageValue < 21 || ageValue > 60) {
      reasons.push("Age should be between 21 and 60 years.");
    }
    if (creditValue < 650) {
      reasons.push("Credit score should be at least 650.");
    }
    if (incomeValue < minIncome) {
      reasons.push(`Monthly income should be at least ₹${formatCurrency(minIncome)}.`);
    }

    const maxEmi = Math.max(0, incomeValue * 0.45 - emiValue);
    if (maxEmi <= 0) {
      reasons.push("Existing EMIs are too high compared to income.");
    }

    let score = 0;
    if (creditValue >= 750) score += 35;
    else if (creditValue >= 700) score += 25;
    else if (creditValue >= 650) score += 15;
    else score += 5;

    if (incomeValue >= 80000) score += 25;
    else if (incomeValue >= 50000) score += 18;
    else if (incomeValue >= 30000) score += 10;
    else score += 5;

    score += employment === "salaried" ? 15 : 10;

    if (ageValue >= 25 && ageValue <= 55) score += 15;
    else if (ageValue >= 21 && ageValue <= 60) score += 10;

    const emiRatio = incomeValue > 0 ? emiValue / incomeValue : 1;
    if (emiRatio <= 0.3) score += 10;
    else if (emiRatio <= 0.5) score += 5;

    score = Math.min(100, score);

    const approvalChance =
      score >= 80 ? "High" : score >= 65 ? "Medium" : "Low";

    const maxLoan = Math.max(0, Math.round((maxEmi * tenure) / 1000) * 1000);

    setResult({
      eligible: reasons.length === 0 && score >= 60,
      score,
      maxEmi,
      maxLoan,
      approvalChance,
      reasons,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[72px]">
        <section className="bg-hero py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 backdrop-blur">
                Eligibility Check
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-secondary-foreground">
                Check Your Eligibility
              </h1>
              <p className="text-muted-foreground text-lg mt-4">
                Enter basic details to get an instant pre-score and estimated loan eligibility.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
              <form
                onSubmit={handleSubmit}
                className="bg-card/90 border border-border/70 rounded-3xl p-8 shadow-card space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanType">Loan Type</Label>
                    <Select value={loanType} onValueChange={setLoanType}>
                      <SelectTrigger id="loanType">
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        {loanTypes.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employment">Employment Type</Label>
                    <Select value={employment} onValueChange={setEmployment}>
                      <SelectTrigger id="employment">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentTypes.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="income">Monthly Income (₹)</Label>
                    <Input
                      id="income"
                      type="number"
                      min="0"
                      value={income}
                      onChange={(event) => setIncome(event.target.value)}
                      placeholder="e.g. 45000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creditScore">Credit Score</Label>
                    <Input
                      id="creditScore"
                      type="number"
                      min="0"
                      max="900"
                      value={creditScore}
                      onChange={(event) => setCreditScore(event.target.value)}
                      placeholder="e.g. 720"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      min="18"
                      max="75"
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                      placeholder="e.g. 30"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="existingEmi">Existing Monthly EMI (₹)</Label>
                    <Input
                      id="existingEmi"
                      type="number"
                      min="0"
                      value={existingEmi}
                      onChange={(event) => setExistingEmi(event.target.value)}
                      placeholder="e.g. 8000"
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="shadow-primary-glow w-full h-12">
                  Check Eligibility
                </Button>
              </form>

              <div className="space-y-6">
                <div className="bg-card/90 border border-border/70 rounded-3xl p-6 shadow-card">
                  <h3 className="font-display text-lg font-semibold text-card-foreground">
                    Estimated Eligibility
                  </h3>
                  {result ? (
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <span
                          className={`text-sm font-semibold ${
                            result.eligible ? "text-success" : "text-warning"
                          }`}
                        >
                          {result.eligible ? "Eligible" : "Needs Improvement"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Approval Chance</span>
                        <span className="text-sm font-semibold text-secondary-foreground">
                          {result.approvalChance}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Eligibility Score</span>
                        <span className="text-sm font-semibold text-secondary-foreground">
                          {result.score}/100
                        </span>
                      </div>
                      <div className="rounded-2xl bg-muted/40 p-4">
                        <p className="text-xs text-muted-foreground">Maximum eligible EMI</p>
                        <p className="text-xl font-display font-bold text-secondary-foreground">
                          ₹{formatCurrency(result.maxEmi)}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-primary/10 p-4">
                        <p className="text-xs text-muted-foreground">Estimated loan amount</p>
                        <p className="text-xl font-display font-bold text-primary">
                          ₹{formatCurrency(result.maxLoan)}
                        </p>
                      </div>
                      {result.reasons.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-secondary-foreground">
                            Improve eligibility
                          </p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {result.reasons.map((reason) => (
                              <li key={reason}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-3">
                      Fill the form to see your eligibility score and estimate.
                    </p>
                  )}
                </div>

                <div className="bg-secondary/90 border border-sidebar-border rounded-3xl p-6 text-center shadow-card-hover">
                  <h3 className="font-display text-lg font-semibold text-secondary-foreground">
                    Ready to Apply?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Create an account to view offers and start your application.
                  </p>
                  <Link to="/register">
                    <Button size="lg" className="shadow-primary-glow mt-4">
                      Continue to Application
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Eligibility;
