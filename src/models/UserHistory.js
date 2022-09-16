import mongoose from "mongoose";
const Schema=mongoose.Schema;

const historySchema=new Schema({
	userid: {
		type: String,
		required: true,
		uniqe: true,
		sparse: true,
	},
   tasks:[
      {
         joinedserver:{
            type: String,
         },
         skipserver:{
            type: String,
         },
         date:{
            type: Date,
            default: Date.now
         }
      }
   ]
})

const UserHistory=mongoose.model("uHistory", historySchema);
export default UserHistory;