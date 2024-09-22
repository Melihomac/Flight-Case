import mongoose from "mongoose";

// mongoDb Flight schema
const flightSchema = mongoose.Schema(
  {
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
