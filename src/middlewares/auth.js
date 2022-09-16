function auth(req, res, next) {
	// if (!req.DiscordUser) {
	// 	res.redirect("/login");
	// }

	console.log("Auth");
	next();
}

export default auth;
