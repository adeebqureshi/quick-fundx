import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import * as c from "../controllers/campaignController.js";
import { campaignCreateSchema, campaignListSchema, donationSchema } from "../validators/campaignValidators.js";
export const campaignRouter = Router();
campaignRouter.get("/", validate(campaignListSchema), c.list);
campaignRouter.post("/", authenticate, validate(campaignCreateSchema), c.create);
campaignRouter.post("/:id/donations", authenticate, validate(donationSchema), c.donate);
