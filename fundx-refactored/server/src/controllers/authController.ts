import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as authService from "../services/authService.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.register(req.body);
  res.status(201).json({ success: true, data });
});
export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.login(req.body.email, req.body.password, { ip: req.ip, userAgent: req.get("user-agent") });
  res.json({ success: true, data });
});
export const me = asyncHandler(async (req: Request, res: Response) => res.json({ success: true, data: { user: req.user } }));
export const logout = asyncHandler(async (_req: Request, res: Response) => res.json({ success: true, message: "Logged out" }));
export const forgotPassword = asyncHandler(async (_req: Request, res: Response) => res.json({ success: true, message: "If the email exists, reset instructions were sent." }));
export const resetPassword = asyncHandler(async (_req: Request, res: Response) => res.json({ success: true, message: "Password reset endpoint ready for provider integration." }));
export const verifyOtp = asyncHandler(async (_req: Request, res: Response) => res.json({ success: true, message: "OTP verification structure ready." }));
