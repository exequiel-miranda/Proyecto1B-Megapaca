import { Router } from "express";
import testEmailController from "../controllers/testBrevo.js";

const router = Router();

router.post("/", testEmailController.sendEmail);

export default router;