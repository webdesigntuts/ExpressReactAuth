import { Router } from "express";
import * as accountController from "../controllers/accountController.js";
import validateReqBody from "../middlewares/validateBody.js";
import requiresAuth from "../middlewares/requiresAuth.js";
import registerSchema from "../schemas/accountSchemas/registerSchema.js";
import loginSchema from "../schemas/accountSchemas/loginSchema.js";

const router = Router();

router.post(
  "/register",
  validateReqBody(registerSchema),
  accountController.register
);

router.post("/login", validateReqBody(loginSchema), accountController.login);

router.post("/logout", accountController.logout);

router.get("/whoami", requiresAuth, accountController.whoAmI);

export default router;
