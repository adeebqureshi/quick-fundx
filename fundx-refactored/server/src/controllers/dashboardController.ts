import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

export const dashboard = asyncHandler(async (req: Request, res: Response) => {
  res.json({ success: true, data: { role: req.user?.role.toLowerCase(), stats: [{ title: "Active Campaigns", value: "12", change: "+8%" }, { title: "Total Raised", value: "₹42.5L", change: "+18%" }], chart: [{ month: "Jan", value: 120 }, { month: "Feb", value: 185 }, { month: "Mar", value: 240 }], applications: [] } });
});
