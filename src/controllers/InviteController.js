import Invite from "../models/Invite.js";
import Earning from "../models/Earning.js";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import Link from "../models/Link.js";
import Cron from "croner";

// Start New Joining Compaign
async function AddLink(req, res) {

  // // checking Link is avalible or not
  const { link, fast } = req.body;
  // const oauthData = await req.cookies.access_token;

  // const check = await checkInviteLink(link, oauthData);
  // if(!check){
  //   res.status(200).json({
  //     Message: "You entered invailid or expired invite link. Be sure the link is correct!",
  //   });
  // } else {
    try {
      // checking campaign type
      if (fast) {
        StarsCampain(req, res);
      } else {
        DiamondsCampain(req, res);
      }
    } catch (error) {
      res.json(error);
    }
  // }
}
// Running Stars Campaign
async function StarsCampain(req, res) {
  try {
    const { link, target, fast } = req.body;

    const userCookie = req.cookies.DiscordUser;
    const user = jwt.verify(userCookie, process.env.API_TOKEN);

    // checking account balance of the user
    const earnings = await Earning.findOne({ userid: user.userid });
    const purchasedStars = await earnings.purchased.stars;
    const earnedStars = await earnings.earned.stars;
    let userStars = 0;
    let inviteType = "";

    if (purchasedStars > 0) {
      userStars = parseInt(purchasedStars);
      inviteType = "purchased";
    } else {
      userStars = parseInt(earnedStars);
      inviteType = "earned";
    }
    console.log(userStars, inviteType);
    const server = await getServerId(link);
    
    if(server){
      if (userStars >= target) {
        // check duplicate link
        const is_exist = await Invite.find({link:link, $or: [{status:{ $eq: "Active"}}, {status:{ $eq: "Inactive"}}, {status:{ $eq: "Paused"}}]});

        if(is_exist.length > 0){
          res.status(200).json({
            Message: "Invite Link duplicated!",
          });
          return;
        }

        const remainingStars = userStars - target;
        const updateEarning = { "purchased.stars": remainingStars };
        const result1 = await Earning.findOneAndUpdate(
          { userid: earnings.userid },
          updateEarning,
          {
            new: true,
          }
        );

        const data = new Invite({
          link,
          userid: user.userid,
          invitetype: inviteType,
          target: {
            total: target,
            achieved: 0,
          },
          cost: {
            coins: target,
            diamond: 0
          },
          campaignType: fast,
          serverId: server.id,
          iconId: server.icon,
          serverName: server.name,
        });

        const result2 = await data.save();
        res.status(201).json({ invite: result2, earning: result1 });
      } else {
        res.status(200).json({
          Message: "You don't have enough balance to start this campaign!",
        });
      }
    } else {
      res.status(200).json({
        Message: "You entered an invalid link!",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// need modifications init
// Running Diamonds Campaign
async function DiamondsCampain(req, res) {
  try {
    const { link, target, fast } = req.body;

    const userCookie = req.cookies.DiscordUser;
    const user = jwt.verify(userCookie, process.env.API_TOKEN);

    // checking account balance of the user
    const earnings = await Earning.findOne({ userid: user.userid });
    const purchasedStars = await earnings.purchased.stars;
    const purchasedDiamonds = await earnings.purchased.diamonds;
    const earnedStars = await earnings.earned.stars;
    const earnedDiamonds = await earnings.earned.diamonds;
    let userStars = 0;
    let userDiamonds = 0;
    let inviteType = "";

    if (purchasedStars > 0 && purchasedDiamonds > 0) {
      userStars = parseInt(purchasedStars);
      userDiamonds = parseInt(purchasedDiamonds);
      inviteType = "purchased";
    } else {
      if (earnedStars > 0 && earnedDiamonds > 0) {
        userStars = parseInt(earnedStars);
        userDiamonds = parseInt(earnedDiamonds);
        inviteType = "earned";
      } else {
        // send him error for insufficient balance
      }
    }

    const server = await getServerId(link);

    if(server){
      if (userStars >= target && userDiamonds >= 1) {
        // check duplicate link
        // const is_exist = await Invite.find({userid: earnings.userid, link:link, status:{ $ne: "Complete"} });
        const is_exist = await Invite.find({link:link, $or: [{status:{ $eq: "Active"}}, {status:{ $eq: "Inactive"}}, {status:{ $eq: "Paused"}}]});
        if(is_exist.length > 0){
          res.status(200).json({
            Message: "Invite Link duplicated!",
          });
          return;
        }

        const remainingStars = userStars - target;
        const remainingDiamonds = userDiamonds - 1;

        const updateEarning = { "purchased.stars": remainingStars };
        const result1 = await Earning.findOneAndUpdate(
          { userid: earnings.userid },
          updateEarning,
          {
            new: true,
          }
        );

        const data = new Invite({
          link,
          userid: user.userid,
          invitetype: inviteType,
          target: {
            total: target,
            achieved: 0,
          },
          cost: {
            coins: target,
            diamond: 0
          },
          campaignType: fast,
          serverId: server.id,
          iconId: server.icon,
          serverName: server.name,
        });

        const result2 = await data.save();
        res.status(201).json({ invite: result2, earning: result1 });
      } else {
        res.status(200).json({
          Message: "You don't have enough balance to start this campaign!",
        });
      }
    } else {
      res.status(200).json({
        Message: "You entered an invalid link!",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update Campaign Status
async function UpdateCampaignStatus(req, res) {
  try {
    const { _id, status } = req.body;
    const result = await Invite.findByIdAndUpdate(
      _id,
      { $set: { status } },
      { new: true }
    );

    const target = result.target;
    const remaining = target.total - target.achieved;
    // refunding coins
    if (result.status === "Refunded") {
      let query;
      const userBalance = await Earning.findOne({ userid: result.userid });
      if (result.invitetype === "purchased") {
        query = { "purchased.stars": userBalance.purchased.stars + remaining };
      } else if (result.invitetype === "earned") {
        query = { "earned.stars": userBalance.earned.stars + remaining };
      }
      const result1 = await Earning.findOneAndUpdate(
        { userid: result.userid },
        { $set: query },
        { new: true }
      );
    }

    const discordUser = await req.cookies.DiscordUser;
    const data = jwt.verify(discordUser, process.env.API_TOKEN);

    const inviteData = await Invite.find({ userid: data.userid });

    res.status(200).json(inviteData);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Get Own Campaigns
async function GetLinks(req, res) {
  try {
    const discordUser = await req.cookies.DiscordUser;
    const data = jwt.verify(discordUser, process.env.API_TOKEN);

    const inviteData = await Invite.find({ userid: data.userid }).sort({ created_at: -1 });
    res.status(200).json(inviteData);
  } catch (error) {
    res.json(error);
  }
}

// assigning link for 60 seconds
async function AssignInvite(req, res) {
  try {
    const oauthData = await req.cookies.access_token;
    // discrod userid from our db
    const discordUser = req.cookies.DiscordUser;
    const userCookie = jwt.verify(discordUser, process.env.API_TOKEN);
    const _id = userCookie.userid;

    // res.send(invite);
    const { message, invite, joiner } = await checkLink(_id, oauthData);

    if (message) {
      res.status(204).json({ message });
    } else {
      const achieved = await invite.target.achieved;
      const newAchieved = achieved + 1;
      const updateInvite = { "target.achieved": newAchieved };
      // increasing acheivment of campaign
      const inviteData = await Invite.findOneAndUpdate(
        { _id: invite._id },
        { $set: updateInvite },
        { new: true }
      );

      // assigning link to user for 60 sec
      const linking = await new Link({
        uid: _id,
        inviteId: invite._id,
        serverId: invite.serverId,
      });
      const response = await linking.save();
 
      // callback to check user existence after 1 hour
      new Cron("* 10 * * * *", { maxRuns: 1 }, () => {
        checkAssigningStatus(
          _id,
          response._id,
          oauthData,
          invite.serverId,
          inviteData
        );
      });

      res.status(200).send({
        invite: inviteData,
        joiner: { ...response._doc, remaining: -59 },
      });
    }
  } catch (error) {
    res.status(401).json({ AssignInvite: error.message });
  }
}

async function getAvailableServers(req, res) {
  try {
    const oauthData = await req.cookies.access_token;
    // discrod userid from our db
    const discordUser = req.cookies.DiscordUser;
    const userCookie = jwt.verify(discordUser, process.env.API_TOKEN);
    const _id = userCookie.userid;

    const invite = await Invite.find(
      {
        userid: { $ne: _id },
        $expr: { $lt: ["$target.achieved", "$target.total"] },
        status: "Active",
      },
      null,
      { sort: { invitetype: -1 } }
    )

    let result = [];

    if(invite.length > 0){
      // remove servers already joined
      const joined = await Link.find({
        uid: _id,
      })

      if(joined.length > 0){
        for( let i = 0; i < invite.length; i++ ) {
          let flag = true;
          for( let j = 0; j < joined.length; j++ ) {
            if( invite[i].serverId == joined[j].serverId ){
              flag = false;
              break;
            }
          }

          if(flag){
            result.push(invite[i]);
          }
        }
      }
    }
    
    res.send(result);
   
  } catch (error) {
    res.status(401).json({ "message": error.message });
  }
}

// getting guild info from db
async function getInvite(lim, ski) {
  try {
    const invite = await Invite.find(
      {
        $expr: { $lt: ["$target.achieved", "$target.total"] },
        status: "Active",
      },
      null,
      { sort: { invitetype: -1 } }
    )
      .limit(lim)
      .skip(ski);

    return invite[0];
  } catch (error) {
    console.log({ getLink: error.message });
  }
}

// getting guild info from db
async function checkLink(_id, oauthData) {
  let limit = 1;
  let skip = 0;
  let fLoop = true;
  do {
    const invite = await getInvite(limit, skip);

    if (invite) {
      // checking if already joined?
      const joiner = await Link.aggregate([
        {
          $match: {
            uid: _id,
            serverId: invite.serverId,
          },
        },
        {
          $project: {
            status: 1,
            remaining: {
              $dateDiff: {
                startDate: "$expire_at",
                endDate: "$$NOW",
                unit: "second",
              },
            },
          },
        },
      ]);

      if (!joiner[0]?.remaining) {
        // if not already joined according to our db
        // check existence in discord server
        const isExist = await checkGuildMember(oauthData, invite.serverId);

        if (isExist.user && isExist !== null) {
          // user exist in server fetch another link
          limit = limit + 1;
          skip = skip + 1;
          fLoop = true;
        } else {
          // Check Invite Link is avalible still or expire
          const check = await checkInviteLink(invite.link, oauthData);
          if(!check){
            // Invite Link expired, so fetch another link
            limit = limit + 1;
            skip = skip + 1;
            fLoop = true;
          } else {
            fLoop = false;
            return { message: false, invite: invite, joiner };
          }         
        }
      } else {
        // user exist in server fetch another link
        limit = limit + 1;
        skip = skip + 1;
        fLoop = true;
      }
    } else {
      // we dont have more campaigns
      fLoop = false;
      return {
        message: "We Dont have Invitations right now, try Again later",
        invite: "",
      };
    }
  } while (fLoop);
}

async function checkInviteLink(link, oauthData){
  
  // get code from invitation link
  let links = link.split("/");
  let code = links[links.length - 1];

  // Check Invite Link is avalible still or expire
  const data = jwt.verify(oauthData, process.env.API_TOKEN);
  try {
    const invite_result = await fetch(
      `https://discord.com/api/invites/${code}`,
      {
        headers: {
          authorization: `${data.token_type} ${data.access_token}`,
        },
      }
    );

    console.log("RESULT:::::::::::::", invite_result);
    const invite_obj = await invite_result.json();

    if(invite_obj.code === 10006 || invite_obj.expires_at) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("RESULT:::::::::::::ERROR:", error)
    return false;
  }
}

// check guild member existence
async function checkGuildMember(oauthData, gid) {
  try {
    if (!oauthData) {
      return null;
    } else {
      const data = jwt.verify(oauthData, process.env.API_TOKEN);

      const userResult = await fetch(
        `https://discord.com/api/users/@me/guilds/${gid}/member`,
        {
          headers: {
            authorization: `${data.token_type} ${data.access_token}`,
          },
        }
      );
      const guild = await userResult.json();
      
      console.log("GUILD:", guild);
      return guild;
    }
  } catch (error) {
    return { message: error.message };
  }
}

// checking join status after 1h seconds
async function checkAssigningStatus(_id, doc, oauthData, serverId, inviteData) {
  const isJoined = await checkGuildMember(oauthData, serverId);

  if (isJoined.user && isJoined !== null) {
    const linkJoin = Link.findOne({ uid: _id, "_id": doc });
    if(linkJoin.status != "Complete"){
      // if joined
      const linkJoin = await Link.findOneAndUpdate(
        { uid: _id, "_id": doc },
        { $set: { status: "Complete", join_date: Date.now() } },
        { new: true }
      );
      // giving reward to the user
      const reward = await Earning.findOneAndUpdate(
        { userid: _id },
        { $inc: { "earned.stars": 1 } },
        { new: true }
      );
    }
    
  } else {
    // failed to join
    const achieved = await inviteData.target.achieved;
    const newAchieved = achieved - 1;
    const updateInvite = { "target.achieved": newAchieved };
    // decreasing acheivment
    const invite = await Invite.findOneAndUpdate(
      { _id: inviteData._id },
      { $set: updateInvite },
      { new: true }
    );

    const linkJoin = await Link.findOneAndUpdate(
      { uid: _id, _id: doc },
      { $set: { status: "Expired" } },
      { new: true }
    );
  }
}

// getting server id from invite link
async function getServerId(link) {
  try {
    // get id of invite link
    const pos = link.search("g/") + 2;
    let inviteLinkId = link.substr(pos, link.length);

    const serverData = await fetch(
      `http://discord.com/api/invites/${inviteLinkId}`
    );

    const discordServer = await serverData.json();
    const server = {
      id: discordServer.guild.id,
      icon: discordServer.guild.icon,
      name: discordServer.guild.name,
    };

    return server;
  } catch (error) {
    // link might be expired if it triggers errror
    console.log({ getServerId: error.message });
    return false;
  }
}

async function checkstatus(req, res) {
  try {
    const id = req.query.id;
    const linkJoin = await Link.findOne({ _id: id.toString() });
    res.status(200).send(linkJoin);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

async function cancelJoin(req, res) {
  try {
    const id = req.query.id;
    // cancel to join
    const linkJoin = await Link.findOneAndUpdate(
      { _id: id.toString() },
      { $set: { status: "Expired" } },
      { new: true }
    );

    const link = await Invite.findOneAndUpdate(
      {_id: linkJoin.inviteId},
      { $inc: { "target.achieved": -1 } }
    )

    res.status(200).send(linkJoin);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}


async function checkIsJoined(req, res){
  const oauthData = await req.cookies.access_token;
  const discordUser = req.cookies.DiscordUser;
  const userCookie = jwt.verify(discordUser, process.env.API_TOKEN);
  const _id = userCookie.userid;

  const serverId = req.query.id;

  const isJoined = await checkGuildMember(oauthData, serverId);
  
  try {
    if (isJoined !== null && isJoined.user ) {
      // if joined
      const linkJoin = await Link.findOneAndUpdate(
        { uid: _id, serverId: serverId },
        { $set: { status: "Complete", join_date: Date.now() } },
        { new: true }
      );
      // giving reward to the user
      const reward = await Earning.findOneAndUpdate(
        { userid: _id },
        { $inc: { "earned.stars": 1 } },
        { new: true }
      );
      res.status(200).json({ message: "Joinded" });
    } else {
      res.status(201).json({ message: "Not Joinded" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
  
}

async function getJoinedServers(req, res){
  try {
    const discordUser = await req.cookies.DiscordUser;
    const data = jwt.verify(discordUser, process.env.API_TOKEN);

    const result = await Link.aggregate([ 
      { "$match": { uid: data.userid, status: "Complete" }},
      {
        $lookup: {
          from: 'invites',
          localField: 'serverId',
          foreignField: 'serverId',
          as: 'invite',
        }
      }
    ]);

    res.status(200).send(result);

  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

const InviteController = {
  GetLinks,
  getAvailableServers,
  AddLink,
  UpdateCampaignStatus,
  AssignInvite,
  checkstatus,
  checkIsJoined,
  getJoinedServers,
  cancelJoin
};

export default InviteController;
