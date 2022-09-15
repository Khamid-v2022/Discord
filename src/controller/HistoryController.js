// models
import Link from "../model/Link.js";

async function getHistory(req, res) {
  try {
    // const response = await Member.find({ role: "user" });
    const response = await Link.aggregate([
      // looking for activity details
      {
        $lookup: {
          from: "invites",
          localField: "inviteId",
          foreignField: "_id",
          as: "invite",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$invite", 0] }, "$$ROOT"],
          },
        },
      },
      { $project: { invite: 0 } },
      {
        $project: {
          uid: 1, //joiner
          inviteId: 1,
          serverName: 1,
          status: 1,
          userid: 1, //owner
        },
      },
      //   looking for owner details
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "userid",
          as: "owner",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$owner", 0] }, "$$ROOT"],
          },
        },
      },
      { $project: { owner: 0 } },
      {
        $project: {
          uid: 1, //joiner
          inviteId: 1,
          serverName: 1,
          status: 1,
          owner: "$username", //owner
        },
      },
      //   looking for joiner details
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "userid",
          as: "joiner",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$joiner", 0] }, "$$ROOT"],
          },
        },
      },
      { $project: { joiner: 0 } },
      {
        $project: {
          joiner: "$username", //joiner
          inviteId: 1,
          serverName: 1,
          status: 1,
          owner: 1, //owner
        },
      },
    ]);

    res.send(response);
  } catch (error) {
    console.log({ message: error.message });
    res.json({ message: error.message });
  }
}



const HistoryController = {
  getHistory,
};

export default HistoryController;
