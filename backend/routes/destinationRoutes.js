import express from "express";
const router = express.Router();
import {
  bookFlight,
  getBookFlight,
} from "../controllers/myflightController.js";

// Flight verileri için route
router.post("/", bookFlight);
router.get("/", getBookFlight);

export default router;
