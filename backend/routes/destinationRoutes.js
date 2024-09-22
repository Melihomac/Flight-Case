import express from "express";
const router = express.Router();
import {
  bookFlight,
  getBookFlight,
} from "../controllers/myflightController.js";

// Flight data for routes
router.post("/", bookFlight);
router.get("/", getBookFlight);

export default router;
