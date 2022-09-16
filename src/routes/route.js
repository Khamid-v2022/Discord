import express from "express";
const router = express.Router();
import userRoute from './userRoute.js';
import inviteRoute from './inviteRoute.js';
import generalRoutes from './generalRoutes.js';
import paymentRoutes from './paymentRoutes.js';

// user routes
router.use("/", generalRoutes);
router.use("/user", userRoute);
router.use("/invite", inviteRoute);
router.use("/payment", paymentRoutes);
 
export default router