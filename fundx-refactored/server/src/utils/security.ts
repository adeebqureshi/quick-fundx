import crypto from "crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const hashPassword = async (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};
export const comparePassword = async (password: string, stored: string) => {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), candidate);
};
export const hashToken = (token: string) => crypto.createHash("sha256").update(token).digest("hex");
export const signAccessToken = (payload: object) => jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
export const signRefreshToken = (payload: object) => jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
export const verifyAccessToken = (token: string) => jwt.verify(token, env.JWT_ACCESS_SECRET) as { sub: string; role: string; email: string };
