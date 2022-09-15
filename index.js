import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
// config environment
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// database(mongodb)
import connectDb from "./src/database/db.js";
const DATABASE_URL = process.env.DATABASE_URL;
connectDb(DATABASE_URL);


// morgan for development
app.use(morgan("dev"));

// parsing incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie-parser
app.use(cookieParser(process.env.API_TOKEN));

// routes
import route from './src/route/route.js';
app.use("/api",route)

// resolving cors
app.use(cors({ origin: true, credentials: true }))
// static frontend
app.use(express.static(path.resolve(__dirname, "./src/views")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "./src/views", "index.html"))
})

// listing to port
app.listen(PORT, () => {
  console.log(`Listining at http://localhost:${PORT}`);
});
