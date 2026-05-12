import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/fundx"),
  JWT_ACCESS_SECRET: z.string().min(24).default("dev-access-secret-change-me-now"),
  JWT_REFRESH_SECRET: z.string().min(24).default("dev-refresh-secret-change-me-now"),
  CORS_ORIGIN: z.string().default("http://localhost:8080"),
  UPLOAD_DIR: z.string().default("uploads"),
});

export const env = envSchema.parse(process.env);
export const isProduction = env.NODE_ENV === "production";
