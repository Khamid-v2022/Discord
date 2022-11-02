import express from "express";
import PaymentController from "../controllers/paymentController.js";
const router = express.Router();

router.get("/config", PaymentController.config);


router.post("/webhook", PaymentController.webhook);

router.post("/checkoutsession", PaymentController.checkoutSession);
router.post("/success", PaymentController.successfullPayment);
router.get("/getPaymentHistory", PaymentController.getPaymentHistory);
router.post("/diamond", PaymentController.diamond);
router.get("/paymentAfterPack", PaymentController.paymentAfterPack);
router.get("/paymentAfterDiamond", PaymentController.paymentAfterDiamond);


export default router;
