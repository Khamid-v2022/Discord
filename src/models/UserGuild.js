import mongoose from "mongoose";
const Schema = mongoose.Schema;

const guildSchema = new Schema({
	userid: {
		type: String,
		required: true,
		uniqe: true,
		sparse: true,
	},
	guilds: [
		{
			guildid: {
				type: String,
				required: true,
			},
			joining: {
				type: Date,
				default: Date.now,
			},
			status: {
				type: String,
				default: "Active",
			},
		},
	],
});

const UserGuild = mongoose.model("UserGuild", guildSchema);
export default UserGuild;
