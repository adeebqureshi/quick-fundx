import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "@prisma/client";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/security.js";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies?.accessToken;
  if (!token) throw new AppError(401, "Authentication required");
  const payload = verifyAccessToken(token);
  req.user = { id: payload.sub, role: payload.role as UserRole, email: payload.email };
  next();
}

export const authorize = (...roles: UserRole[]) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) throw new AppError(403, "Insufficient permissions");
  next();
};
