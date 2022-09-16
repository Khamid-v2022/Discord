import express from "express";
import PaymentController from "../controllers/paymentController.js";
const router = express.Router();

router.get("/config", PaymentController.config);


router.post("/webhook", PaymentController.webhook);

router.post("/checkoutsession", PaymentController.checkoutSession);
router.post("/success", PaymentController.successfullPayment);

router.post("/diamond", PaymentController.diamond);

export default router;
