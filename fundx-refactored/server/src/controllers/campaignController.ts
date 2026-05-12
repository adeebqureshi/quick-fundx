import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as campaigns from "../services/campaignService.js";

export const list = asyncHandler(async (req: Request, res: Response) => res.json({ success: true, data: await campaigns.listCampaigns(req.query as never) }));
export const create = asyncHandler(async (req: Request, res: Response) => res.status(201).json({ success: true, data: await campaigns.createCampaign(req.user!.id, req.body) }));
export const donate = asyncHandler(async (req: Request, res: Response) => res.status(201).json({ success: true, data: await campaigns.donate(req.user!.id, req.params.id, Number(req.body.amount), req.body.gateway) }));
