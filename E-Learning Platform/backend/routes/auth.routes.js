import express from "express";
import { signup, login, adminLogin } from "../controllers/auth.controller.js";
import authValidation from "../validations/auth.validation.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

router.post("/signup", validate(authValidation.signup), signup);

router.post("/login", validate(authValidation.login), login);

router.post("/admin/login", validate(authValidation.adminLogin), adminLogin);

export default router;
