// ─── User & Auth ────────────────────────────────────────────────────────────
export type UserRole = "customer" | "admin" | "lender" | "dsa";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// ─── Application / Loan ─────────────────────────────────────────────────────
export type ApplicationStatus =
  | "approved"
  | "pending"
  | "rejected"
  | "processing"
  | "disbursed";

export interface Application {
  id: string;
  type: string;
  amount: string;
  lender: string;
  status: ApplicationStatus;
  date: string;
}

export interface Lead {
  id: string;
  name: string;
  loan: string;
  amount: string;
  score: number;
  status: ApplicationStatus;
}

// ─── Dashboard Stats ─────────────────────────────────────────────────────────
export interface StatCardData {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
}

// ─── Chart Data ──────────────────────────────────────────────────────────────
export interface MonthlyDataPoint {
  month: string;
  [key: string]: string | number;
}

export interface PieDataPoint {
  name: string;
  value: number;
  color: string;
}
