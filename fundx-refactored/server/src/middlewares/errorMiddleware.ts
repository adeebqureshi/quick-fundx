import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { isProduction } from "../config/env.js";

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(new AppError(404, `Route ${req.method} ${req.originalUrl} not found`));
}

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    ...(!isProduction && { stack: err.stack, details: err instanceof AppError ? err.details : undefined }),
  });
}
