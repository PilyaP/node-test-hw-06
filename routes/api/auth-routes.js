import express from "express";

import authController from "../../controllers/auth-controller.js";

import { validateBody } from "../../decorators/index.js";
import authenticate from "../../middlewares/authenticate.js";
import authSchema from "../../schemas/authSchema.js";
import subscriptionSchema from "../../schemas/subscriptionSchema.js";
import upload from "../../middlewares/upload.js";
import resendVerifyEmailSchema from "../../schemas/resendVerifyEmailSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), authController.signup);

authRouter.post("/login", validateBody(authSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);
authRouter.patch(
  "/",
  authenticate,
  validateBody(subscriptionSchema),
  authController.updateSubscription
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

authRouter.get("/verify/:verificationToken", authController.verifyEmail);

authRouter.post(
  "/verify",
  validateBody(resendVerifyEmailSchema),
  authController.resendVerifyEmail
);

export default authRouter;
