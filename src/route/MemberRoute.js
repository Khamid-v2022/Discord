import express from "express";
import MemberController from "../controller/MemberController.js";
const router = express.Router();

router.get("/", MemberController.getMembers);
router.get("/getmember/:id", MemberController.getMember);
router.get("/getChart", MemberController.getChart);

router.post("/updatediamonds", MemberController.updateDiamonds);
router.post("/updatestars", MemberController.updateStars);

export default router;
