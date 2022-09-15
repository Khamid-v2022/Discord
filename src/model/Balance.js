import mongoose from "mongoose";
const Schema = mongoose.Schema;

const earningSchema = new Schema({
  userid: {
    //discord user id
    type: String,
    required: true,
    uniqe: true,
    sparse: true,
  },
  purchased: {
    diamonds: {
      type: Number,
      default: 20,
    },
    stars: {
      type: Number,
      default: 100,
    },
  },
  earned: {
    diamonds: {
      type: Number,
      default: 0,
    },
    stars: {
      type: Number,
      default: 0,
    },
  },
});

const Balance = mongoose.model("Earning", earningSchema);
export default Balance;
