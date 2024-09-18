import express from "express";
const router = express.Router();
import { getFlights } from "../controllers/flightController.js";

// Flight verileri için route
router.get("/", getFlights);

export default router;
