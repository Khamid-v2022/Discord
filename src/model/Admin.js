import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cookie: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
