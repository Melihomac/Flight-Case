import express from "express";
const router = express.Router();
import { bookFlight } from "../controllers/myflightController.js";

// Flight verileri için route
router.get("/", bookFlight);

export default router;
