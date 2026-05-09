export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ELIGIBILITY: "/eligibility",
  BECOME_PARTNER: "/become-a-partner",
  CUSTOMER: "/customer",
  ADMIN: "/admin",
  LENDER: "/lender",
  DSA: "/dsa",
  NOT_FOUND: "*",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
