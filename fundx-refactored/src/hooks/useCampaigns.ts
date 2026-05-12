import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

export interface CampaignCard {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAmount: string;
  raisedAmount: string;
  images: string[];
  deadline: string;
  featured: boolean;
  creator: { id: string; name: string; avatar?: string | null };
}

export function useCampaigns(params = "page=1&limit=6&sort=trending") {
  return useQuery({
    queryKey: ["campaigns", params],
    queryFn: () => apiClient.get<{ items: CampaignCard[] }>(`/campaigns?${params}`),
  });
}
