import express from "express";
const router=express.Router();
import InviteController from '../controllers/InviteController.js';

router.get("/", InviteController.GetLinks);
router.get("/checkstatus", InviteController.checkstatus);

router.post("/add", InviteController.AddLink);
router.post("/update", InviteController.UpdateCampaignStatus);
router.get("/assign", InviteController.AssignInvite);


router.get("/getAvailableServers", InviteController.getAvailableServers);
router.get("/getJoinedServers", InviteController.getJoinedServers);
router.get("/checkIsJoined", InviteController.checkIsJoined);



// router.get("/timer", InviteController.timer);

export default router;