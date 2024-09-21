// userRoutes.js
import express from "express";
const router = express.Router();
import {
  authUser,
  updateUserProfile,
  getUserProfile,
  logoutUser,
  registerUser,
  bookFlight,
} from "../controllers/userController.js";
import { getFlights } from "../controllers/flightController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/flights", protect, getFlights);
router.get("/myflights", protect, bookFlight);

export default router;
