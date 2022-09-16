import mongoose from "mongoose";
const Schema=mongoose.Schema;

const purchaseSchema=new Schema({
	userid: {
		type: String,
		required: true,
		uniqe: true,
		sparse: true,
	},
   orderid:{
      type: String,
      required: true,
   },
   amount: {
      type: Number,
      required: true
   },
   item:{
      stars:{
         type: Number,
      },
      diamonds:{
         type: Number
      }
   },
   timestamp: {
      type: Date,
      default: Date.now
   },  
});

const Purchase=mongoose.model("purchases", purchaseSchema);
export default Purchase;