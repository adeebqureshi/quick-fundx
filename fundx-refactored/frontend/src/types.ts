export type UserRole = "customer" | "dsa" | "lender" | "admin" | "manager" | "superadmin";

export interface User {
  id: string;
  phone: string;
  email: string | null;
  full_name: string;
  role: UserRole;
  kyc_status: string;
  is_verified: boolean;
}

export interface LoanProduct {
  id: string;
  code: string;
  name: string;
  category: string;
  min_amount: string;
  max_amount: string;
  min_tenure_months: number;
  max_tenure_months: number;
  interest_rate_min: string | null;
  interest_rate_max: string | null;
}

export interface EligibilityResponse {
  eligible: boolean;
  score: number;
  reasons: string[];
  suggested_tenure_months: number | null;
}
