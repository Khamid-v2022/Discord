import express from "express";
import UserController from "../controllers/UserController.js";
const router = express.Router();


// discordresponse
router.get("/", UserController.DiscordResponse);

router.get("/guilds", UserController.getGuilds);
router.get("/checkguildmember", UserController.checkGuildMember);
router.get("/logout", UserController.userLogout);

export default router;
