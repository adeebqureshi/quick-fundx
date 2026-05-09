import type {
  Application,
  Lead,
  MonthlyDataPoint,
  PieDataPoint,
} from "@/types";

// ─── Admin ────────────────────────────────────────────────────────────────────
export const adminRevenueData: MonthlyDataPoint[] = [
  { month: "Jan", revenue: 120 },
  { month: "Feb", revenue: 185 },
  { month: "Mar", revenue: 210 },
  { month: "Apr", revenue: 280 },
  { month: "May", revenue: 350 },
  { month: "Jun", revenue: 420 },
];

export const adminLoanMix: PieDataPoint[] = [
  { name: "Personal", value: 40, color: "hsl(var(--chart-1))" },
  { name: "Business", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Home", value: 25, color: "hsl(var(--chart-3))" },
  { name: "LAP", value: 10, color: "hsl(var(--chart-4))" },
];

// ─── Customer ─────────────────────────────────────────────────────────────────
export const customerScoreData: MonthlyDataPoint[] = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 72 },
  { month: "Apr", score: 70 },
  { month: "May", score: 78 },
  { month: "Jun", score: 82 },
];

export const customerApplications: Application[] = [
  {
    id: "QF-1024",
    type: "Personal Loan",
    amount: "₹5,00,000",
    lender: "HDFC Bank",
    status: "approved",
    date: "2026-02-15",
  },
  {
    id: "QF-1025",
    type: "Business Loan",
    amount: "₹25,00,000",
    lender: "ICICI Bank",
    status: "processing",
    date: "2026-02-20",
  },
  {
    id: "QF-1026",
    type: "Home Loan",
    amount: "₹75,00,000",
    lender: "SBI",
    status: "pending",
    date: "2026-02-25",
  },
];

// ─── DSA ──────────────────────────────────────────────────────────────────────
export const dsaChartData: MonthlyDataPoint[] = [
  { month: "Jan", disbursed: 12, pending: 5 },
  { month: "Feb", disbursed: 18, pending: 8 },
  { month: "Mar", disbursed: 15, pending: 6 },
  { month: "Apr", disbursed: 22, pending: 4 },
  { month: "May", disbursed: 28, pending: 7 },
  { month: "Jun", disbursed: 35, pending: 9 },
];

export const dsaLeads: Application[] = [
  {
    id: "L-001",
    type: "Personal Loan",
    amount: "₹8,00,000",
    lender: "Rajesh Kumar",
    status: "approved",
    date: "2026-02-26",
  },
  {
    id: "L-002",
    type: "Home Loan",
    amount: "₹45,00,000",
    lender: "Priya Sharma",
    status: "processing",
    date: "2026-02-25",
  },
  {
    id: "L-003",
    type: "Business Loan",
    amount: "₹15,00,000",
    lender: "Amit Patel",
    status: "pending",
    date: "2026-02-24",
  },
  {
    id: "L-004",
    type: "Personal Loan",
    amount: "₹3,00,000",
    lender: "Sunita Verma",
    status: "disbursed",
    date: "2026-02-22",
  },
];

// ─── Lender ───────────────────────────────────────────────────────────────────
export const lenderLeads: Lead[] = [
  {
    id: "QF-2001",
    name: "Vikram Singh",
    loan: "Personal Loan",
    amount: "₹7,00,000",
    score: 78,
    status: "pending",
  },
  {
    id: "QF-2002",
    name: "Neha Gupta",
    loan: "Home Loan",
    amount: "₹55,00,000",
    score: 85,
    status: "processing",
  },
  {
    id: "QF-2003",
    name: "Arjun Reddy",
    loan: "Business Loan",
    amount: "₹20,00,000",
    score: 62,
    status: "pending",
  },
  {
    id: "QF-2004",
    name: "Meera Joshi",
    loan: "Personal Loan",
    amount: "₹4,00,000",
    score: 91,
    status: "approved",
  },
];
