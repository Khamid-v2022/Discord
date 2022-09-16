import fetch from "node-fetch";
import jwt from 'jsonwebtoken';

// setting dotenv
import "dotenv/config";

let cb="";
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
if (process.env.ENVIRONMENT === "production") {
	cb = process.env.WEB_CALL_BACK;
} else {
	cb = process.env.CALL_BACK;
}

// After Login/Register Redirect
export async function DiscordResponse(req, res, next) {
	const { code, state } = req.query;
	if (!code || state!="15773059ghq9183habn") {
		res.status(403).json({ Message: "Failed to Verify your identity" });
	} else {
		try {
			// gettin access_token from discord
			const oauthResult = await fetch(getAuthUri(1), {
				method: "POST",
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: "authorization_code",
					redirect_uri: `${cb}/api/user`,
					scope: "identify email guilds",
				}),
			});
			const oauthData = await oauthResult.json();
			const {token_type, access_token, refresh_token}=oauthData;

			// jwt reference token
			const referenceToken = jwt.sign(
				JSON.stringify({token_type,access_token,refresh_token}),
				process.env.API_TOKEN
			)
			// const hashedToken=encryption(referenceToken);
			res.cookie("access_token", referenceToken,{
				httpOnly: true,
				secure: process.env.ENVIRONMENT === "production",
				SameSite: true
			});
			
			next();
		} catch (error) {
			console.error(error.message);
			res.json({ message: error.message });
		}
	}
}

export async function RefreshToken(req, res, next) {
	if (!req.session.oauthData) {
		res.json({ Message: "You have to Logged in!" });
	}
	try {
		const oauthResult = await fetch(getAuthUri(1), {
			method: "POST",
			body: new URLSearchParams({
				client_id: clientId,
				client_secret: clientSecret,
				grant_type: "refresh_token",
				redirect_uri: cb,
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		const oauthData = await oauthResult.json();
		req.session.oauthData = oauthData;
		req.session.save();
	} catch (error) {
		console.log(error);
	}

	next();
}



// export async function GetUserGuilds(req, res, next) {
// 	if (req.session.oauthData == null) {
// 		RefreshToken(req, res, next);
// 	} else {
// 		try {
// 			const userResult = await fetch(`${getAuthUri(2)}/guilds`, {
// 				headers: {
// 					authorization: `${req.session.oauthData.token_type} ${req.session.oauthData.access_token}`,
// 				},
// 			});
// 			const userGuilds = await userResult.json();
// 			req.session.userGuilds = userGuilds;
// 			req.session.save();
// 			next();
// 		} catch (error) {
// 			console.log(error);
// 			res.json({ Message: error.message });
// 		}
// 	}
// }



// get url for discord requests


function getAuthUri(index, state = "15773059ghq9183habn") {
	// state value should related to user cookie and hashed
	const uris = [
		`https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&scope=identify%20guilds%20email&state=15773059ghq9183habn&redirect_uri=${cb}/api/user`,
		"https://discord.com/api/oauth2/token",
		"https://discord.com/api/users/@me",
		"https://discord.com/api/invites/7ubPYnrJ", //fetch guild details with invite link
		"https://cdn.discordapp.com/avatars/user_id/user_avatar.png *", //fetch user avatar
		"https://cdn.discordapp.com/icons/guid_id/icon_id.png?size=512" //fetch guild icon
	];

	return uris[index];
}
