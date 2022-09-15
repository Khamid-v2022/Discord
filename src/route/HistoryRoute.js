import express from "express";
import HistoryController from "../controller/HistoryController.js";
const router = express.Router();

router.get("/", HistoryController.getHistory);

export default router;
