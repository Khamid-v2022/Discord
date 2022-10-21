import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema=new Schema({
    username: {
        type: String,
        required: true,
        uniqe: true,
        sparse: true,
    },
    userid: {
        type: String,
        required: true,
    },
    refresh:{
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
    },
    avatar: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        default: "Active"
    },
    banDuration: {
        type: String,
        default: 0
    },
    banDate: {
        type: Date,
    },
    role:{
        type:String,
        default: "user"
    },
    last_logged_at: {
        type: Date,
        default: Date.now
    },
    notify_email: {
        type: Boolean,
        default: false
    },
    marketing_email: {
        type: Boolean,
        default: false
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

const User=mongoose.model("user", userSchema);

export default User;