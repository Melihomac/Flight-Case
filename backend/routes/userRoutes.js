// userRoutes.js
import express from "express";
const router = express.Router();
import {
  authUser,
  updateUserProfile,
  getUserProfile,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { getFlights } from "../controllers/flightController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getDestination } from "../controllers/destinationController.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/flights", protect, getFlights);
router.get("/destinations", protect, getDestination);

export default router;
