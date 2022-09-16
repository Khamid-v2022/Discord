import Cron from "croner";
import Link from "../models/Link.js";
import fetch from "node-fetch";

let banScheduler;
// check their user status
export default async function CronScheduler() {
  const links = await getList();
  let index = 0;
  // console.log("CronScheduler",links);
  banScheduler = Cron("*/10 * * * * *", async () => {
    if (index + 1 > links.length) {
      console.log("scheduler.destroy()");
      banScheduler.stop();
      index = 0;
    } else {
      console.log("index", index);
      checkLinkStatus(links[index].serverId);
      console.log(links[index]);
      index = index + 1;
    }
  });
}

// getting list of links: last 24 days
async function getList() {
  try {
    const linkList = await Link.find({
      created_at: { $gte: new Date(new Date() - 1 * 60 * 60 * 24 * 1000) },
    });
    // console.log(linkList);
    // checkStatus(linkList)
    return linkList;
  } catch (error) {
    console.log({ message: error.message });
  }
}

// check user status
async function checkLinkStatus(gid) {
  try {
    console.log("checkLinkStatus",gid);
    const user=await fetch("api/user/checkguildmember",{
      method: "POST",
      body:{gid}
    });

    console.log(user);
  } catch (error) {
    return { message: error.message };
  }
}

// generate report for ban
