import fetch from "node-fetch";
// models
import User from "../models/User.js";
import Earning from "../models/Earning.js";

import jwt from "jsonwebtoken";
// setting dotenv
import "dotenv/config";
let cb = "";
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
if (process.env.ENVIRONMENT === "production") {
  cb = process.env.WEB_CALL_BACK;
} else {
  cb = process.env.CALL_BACK;
}

export async function DiscordResponse(req, res) {
  const { code, state } = req.query;
  if (!code || state != "15773059ghq9183habn") {
    res.status(403).json({ Message: "Failed to Verify your identity" });
  } else {
    try {
      // gettin access_token from discord
      const oauthResult = await fetch("https://discord.com/api/oauth2/token", {
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
      const { token_type, access_token } = oauthData;

      // jwt reference token
      const referenceToken = await jwt.sign(
        JSON.stringify({ token_type, access_token }),
        process.env.API_TOKEN
      );
      // const hashedToken=encryption(referenceToken);
      res.cookie("access_token", referenceToken, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
        SameSite: true,
      });

      // res.redirect('/loggedin');
      const response = await userLogin(oauthData);
      if (response.err) {
        res.status(response.status).json({ Message: response.message });
      }
      const userToken = jwt.sign(
        JSON.stringify({
          userid: response.userid,
          username: response.username,
          avatar: response.avatar,
          banner: response.banner,
          status: response.status,
        }),
        process.env.API_TOKEN
      );
      res.cookie("DiscordUser", userToken, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
        SameSite: true,
      });

      res.redirect("/");
    } catch (error) {
      console.error(error.message);
      res.json({ message: error.message });
    }
  }
}
async function userLogin(oauthData) {
  try {
    console.log(oauthData);
    if (!oauthData) {
      return { message: "You have to Loggin.", err: true, status: 401 };
    } else {
      const userResult = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });
      const discordUser = await userResult.json();

      const isExist = await User.findOne({
        username: discordUser.username,
        email: discordUser.email,
      });

      if (isExist) {
        return isExist;
      } else {
        const userData = new User({
          username: discordUser.username,
          userid: discordUser.id,
          email: discordUser.email,
          banner: discordUser.banner,
          avatar: discordUser.avatar,
          refresh: oauthData.refresh_token,
        });
        const result1 = await userData.save();
        const earnData = new Earning({ userid: discordUser.id });
        await earnData.save();

        return result1;
      }
    }
  } catch (error) {
    return { message: error.message, err: true };
  }
}

// get list of guilds
async function getGuilds(req, res) {
  try {
    const oauthData = await req.cookies.access_token;
    if (!oauthData) {
      res.status(401).json({ Message: "You have to Loggin." });
    } else {
      const data = jwt.verify(oauthData, process.env.API_TOKEN);
      const userResult = await fetch(
        `https://discord.com/api/users/@me/guilds`,
        {
          headers: {
            authorization: `${data.token_type} ${data.access_token}`,
          },
        }
      );
      const guilds = await userResult.json();
      const filteredGuilds = await guilds.map((item) => {
        return { id: item.id, name: item.name, owner: item.owner };
      });
      res.status(200).json(filteredGuilds);
    }
  } catch (error) {
    res.send({ message: error.message });
  }
}

// check guild member existence
async function checkGuildMember(req, res) {
  try {
    // const { gid } = req.body;
    const gid = "752553802359505017";

    console.log(gid);

    const oauthData = await req.cookies.access_token;
    if (!oauthData) {
      res.status(401).json({ Message: "You have to Loggin." });
    } else {
      const data = await jwt.verify(oauthData, process.env.API_TOKEN);
      // https://discord.com/api/users/@me/guilds
      const userResult = await fetch(
        `https://discord.com/api/users/@me/guilds/${gid}/member`,
        {
          headers: {
            authorization: `${data.token_type} ${data.access_token}`,
          },
        }
      );
      const guild = await userResult.json();

      // const isExist = await guilds.filter((item) => {
      // 	console.log(`Gid: ${gid} & Guild: ${item.name}`)
      // 	return item.id === gid;
      // });
      // res.status(200).json(guilds);

      if (guild.user > 0) return res.status(207).json({ user: guild.user });
      res.status(200).json({ Message: "User Can join the new Guild!" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}

function userLogout(req, res) {
  res.cookie("DiscordUser", null, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "production",
    SameSite: true,
  });
  res.clearCookie("DiscordUser");
  res.cookie("access_token", null, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "production",
    SameSite: true,
  });
  res.clearCookie("access_token");

  res.redirect("/");
}

//get user balance
async function getBalance(req, res) {
  try {
    const discordUser = req.cookies.DiscordUser;
    const data = jwt.verify(discordUser, process.env.API_TOKEN);

    const response = await Earning.findOne({
      userid: data.userid,
    });

    res.send(response);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

//get user
async function getUser(req, res) {
  try {
    const discordUser = req.cookies.DiscordUser;
    const data = jwt.verify(discordUser, process.env.API_TOKEN);

    const response = await User.findOne({
      username: data.username,
      userid: data.userid,
    });

    res.send(response);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

// for adminside
async function getUserList(req, res) {
  try {
    const users = await User.find();
    const userData = users.map((item) => {
      return {
        name: item.name,
        email: item.email,
        created_at: item.created_at,
        status: item.status,
      };
    });
    res.send(userData);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
}

const UserController = {
  userLogin,
  userLogout,
  getGuilds,
  checkGuildMember,
  DiscordResponse,
  getUserList,
  getUser,
  getBalance,
};

export default UserController;
