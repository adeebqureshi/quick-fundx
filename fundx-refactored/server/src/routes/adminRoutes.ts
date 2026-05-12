import { Router } from "express";
import { UserRole } from "@prisma/client";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import * as c from "../controllers/adminController.js";
export const adminRouter = Router();
adminRouter.use(authenticate, authorize(UserRole.ADMIN));
adminRouter.get("/stats", c.stats);
adminRouter.patch("/campaigns/:id/moderate", c.moderateCampaign);
adminRouter.patch("/users/:id/suspend", c.suspendUser);
