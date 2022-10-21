import express from "express";
import { DiscordResponse } from "../middlewares/MyDiscord.js";
import UserController from "../controllers/UserController.js";
// import User from "../../front/src/res/svg/User.jsx";
const router = express.Router();

let cb = "";
const clientId = process.env.CLIENT_ID;
if (process.env.ENVIRONMENT === "production") {
	cb = process.env.WEB_CALL_BACK;
} else {
	cb = process.env.CALL_BACK;
}

router.get("/login", (req, res) => {
	const { customCB } = req.query;
	if (customCB) {
		res.redirect(
			`https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&scope=identify%20guilds%20email%20guilds.members.read&state=15773059ghq9183habn&redirect_uri=${customCB}`
		);
	} else {
		res.redirect(
			`https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&scope=identify%20guilds%20email%20guilds.members.read&state=15773059ghq9183habn&redirect_uri=${cb}/api/user`
		);
	}
});
// discordresponse
router.get("/", UserController.DiscordResponse);

router.get("/getuser", UserController.getUser);
router.post("/updateuser", UserController.updateUser);
router.get("/getbalance", UserController.getBalance);
router.get("/guilds", UserController.getGuilds);
router.post("/checkguildmember", UserController.checkGuildMember);
router.get("/logout", UserController.userLogout);

// admin route
router.get("/users", UserController.getUserList);

export default router;
