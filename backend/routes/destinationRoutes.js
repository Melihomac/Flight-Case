import express from "express";
const router = express.Router();
import { getDestination } from "../controllers/destinationController.js";

// Flight verileri için route
router.get("/", getDestination);

export default router;
