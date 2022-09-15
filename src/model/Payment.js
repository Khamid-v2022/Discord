import mongoose from "mongoose";
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  trxid: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  trx_time: {
    type: Date,
    default: Date.now(),
  },
});

const Payment = mongoose.model("payment", paymentSchema);
export default Payment;
