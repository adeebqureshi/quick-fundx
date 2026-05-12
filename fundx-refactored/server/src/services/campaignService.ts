import { CampaignStatus, PaymentStatus } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";

export async function listCampaigns(query: { page: number; limit: number; search?: string; category?: string; status?: string; sort: string }) {
  const where = {
    visibility: "PUBLIC" as const,
    ...(query.category && { category: query.category }),
    ...(query.status && { status: query.status as CampaignStatus }),
    ...(query.search && { OR: [{ title: { contains: query.search, mode: "insensitive" as const } }, { description: { contains: query.search, mode: "insensitive" as const } }] }),
  };
  const orderBy = query.sort === "funded" ? { raisedAmount: "desc" as const } : query.sort === "deadline" ? { deadline: "asc" as const } : { createdAt: "desc" as const };
  const [items, total] = await Promise.all([
    prisma.campaign.findMany({ where, orderBy, skip: (query.page - 1) * query.limit, take: query.limit, include: { creator: { select: { id: true, name: true, avatar: true } }, _count: { select: { likes: true, donations: true } } } }),
    prisma.campaign.count({ where }),
  ]);
  return { items, pagination: { page: query.page, limit: query.limit, total, pages: Math.ceil(total / query.limit) } };
}

export async function createCampaign(creatorId: string, input: Record<string, unknown>) {
  const title = String(input.title);
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now()}`;
  return prisma.campaign.create({ data: { ...(input as object), slug, creatorId, status: CampaignStatus.PENDING_REVIEW } });
}

export async function donate(userId: string, campaignId: string, amount: number, gateway: string) {
  const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
  if (!campaign) throw new AppError(404, "Campaign not found");
  return prisma.$transaction(async (tx) => {
    const donation = await tx.donation.create({ data: { donorId: userId, campaignId, amount, gateway, paymentStatus: PaymentStatus.PENDING, transactionId: `${gateway}_${Date.now()}` } });
    return { donation, paymentIntent: { provider: gateway, clientSecret: "replace-with-provider-secret", status: "requires_confirmation" } };
  });
}
