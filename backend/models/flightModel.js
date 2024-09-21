import mongoose from "mongoose";

const flightSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // Reference to User model
    flightNumber: { type: String, required: true },
    flightName: { type: String, required: true },
    scheduleDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;
