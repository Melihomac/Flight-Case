import express from "express";
const router = express.Router();
import { getFlights } from "../controllers/flightController.js";

// Flight data for routes
router.get("/", getFlights);

export default router;
