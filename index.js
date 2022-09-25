import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import auth from "./src/middlewares/auth.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// setting dotenv
import "dotenv/config";
// mongodb
import connectDb from "./src/database/db.js";
// const DATABASE_URL =
// 	process.env.DATABASE_URL || "mongodb://localhost:27017/LinkedCord";
const DATABASE_URL = process.env.DATABASE_URL;
connectDb(DATABASE_URL);

// express server
const app = express();

const PORT = process.env.PORT || 3031;
// generating logs in console
app.use(morgan("dev"));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// setting cookiepaser
app.use(cookieParser(process.env.API_TOKEN));

// setting router
import route from "./src/routes/route.js";
app.use("/api", route);
// resolving cors
import cors from "cors";
app.use(cors({ origin: true, credentials: true }));

app.get("/login", (req, res) => {
  return res.redirect("/api/user/login");
});

app.get("/logout", (req, res) => {
  return res.redirect("/api/user/logout");
});

// static frontend
// app.use([auth, express.static(path.resolve(__dirname, "./src/views"))]);
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./src/views", "index.html"));
// });

app.use([auth, express.static(path.resolve(__dirname, "./front/build"))]);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./front/build", "index.html"));
});

// cron scheduler
// import Cron from "croner";
// import CronScheduler from './src/cron/ban.js';
// Cron('* * * * *',()=>{
//     console.log("cron.schedule")
//     CronScheduler();
// })

app.listen(PORT, () => {
  console.log(`Server Running at http://localhost:${PORT}`);
});
