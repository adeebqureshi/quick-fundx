import type { Request, Response } from "express";
import { CampaignStatus } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const stats = asyncHandler(async (_req: Request, res: Response) => {
  const [users, campaigns, donations, reports] = await Promise.all([prisma.user.count(), prisma.campaign.count(), prisma.donation.count(), prisma.report.count({ where: { status: "OPEN" } })]);
  res.json({ success: true, data: { users, campaigns, donations, openReports: reports } });
});
export const moderateCampaign = asyncHandler(async (req: Request, res: Response) => {
  const campaign = await prisma.campaign.update({ where: { id: req.params.id }, data: { status: req.body.status as CampaignStatus, approvedAt: req.body.status === "APPROVED" ? new Date() : undefined } });
  res.json({ success: true, data: campaign });
});
export const suspendUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await prisma.user.update({ where: { id: req.params.id }, data: { bannedAt: req.body.suspended ? new Date() : null } });
  res.json({ success: true, data: user });
});
