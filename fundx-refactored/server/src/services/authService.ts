import { UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";
import { comparePassword, hashPassword, hashToken, signAccessToken, signRefreshToken } from "../utils/security.js";

const publicUser = (user: { id: string; name: string; email: string; role: UserRole; avatar?: string | null; verified: boolean }) => ({ id: user.id, name: user.name, email: user.email, role: user.role.toLowerCase(), avatar: user.avatar, verified: user.verified });

export async function register(input: { name: string; email: string; password: string; role: UserRole; phone?: string }) {
  const exists = await prisma.user.findUnique({ where: { email: input.email } });
  if (exists) throw new AppError(409, "Email already registered");
  const user = await prisma.user.create({ data: { ...input, password: await hashPassword(input.password), username: input.email.split("@")[0] } });
  return issueTokens(user);
}

export async function login(email: string, password: string, meta: { ip?: string; userAgent?: string }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) throw new AppError(401, "Invalid email or password");
  if (user.bannedAt) throw new AppError(403, "Account suspended");
  return issueTokens(user, meta);
}

export async function issueTokens(user: { id: string; email: string; role: UserRole; name: string; avatar?: string | null; verified: boolean }, meta?: { ip?: string; userAgent?: string }) {
  const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id });
  await prisma.session.create({ data: { userId: user.id, refreshTokenHash: hashToken(refreshToken), ip: meta?.ip, userAgent: meta?.userAgent, expiresAt: new Date(Date.now() + 30 * 864e5) } });
  return { user: publicUser(user), accessToken, refreshToken };
}
