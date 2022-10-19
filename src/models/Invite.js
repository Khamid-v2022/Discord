import mongoose from "mongoose";
const Schema = mongoose.Schema;

const inviteSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  serverName: {
    type: String,
    required: true,
  },
  serverId: {
    type: String,
    required: true,
  },
  iconId: {
    type: String,
  },
  userid: {
    type: String,
    required: true,
  },
  campaignType: {
    type: String,
  },
  invitetype: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Active", //Active || Paused || Refunded || Complete || Inactive
  },
  target: {
    total: {
      type: Number,
      default: 0,
    },
    achieved: {
      type: Number,
      default: 0,
    },
  },
  cost: {
    coins: {
      type: Number,
      default: 0,
    },
    diamond: {
      type: Number,
      default: 0,
    }
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Invite = mongoose.model("invite", inviteSchema);
export default Invite;
