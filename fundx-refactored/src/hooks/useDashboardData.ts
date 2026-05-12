import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import type { Application, MonthlyDataPoint, StatCardData } from "@/types";
import { customerApplications, customerScoreData } from "@/mocks/dashboardData";

export interface DashboardResponse {
  role: string;
  stats: StatCardData[];
  chart: MonthlyDataPoint[];
  applications: Application[];
}

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => apiClient.get<DashboardResponse>("/dashboard"),
    placeholderData: {
      role: "customer",
      stats: [],
      chart: customerScoreData,
      applications: customerApplications,
    },
  });
}
