import mongoose from "mongoose";
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  uid: {
    //userid of discorduser from our db
    type: String,
    required: true,
  },
  inviteId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  serverId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Active",
  },
  expire_at: {
    type: Date,
    default: Date.now() + 1000 * 60, //60+ Seconds
  },
});

const Link = mongoose.model("link", linkSchema);
export default Link;
