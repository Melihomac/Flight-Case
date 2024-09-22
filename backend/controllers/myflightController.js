import asyncHandler from "express-async-handler";
import Flight from "../models/flightModel.js";

// @desc    Save a flight
// @route   POST /api/myflights
// @access  Private
const bookFlight = asyncHandler(async (req, res) => {
  //fetch req params
  const { flightNumber, flightName, scheduleDate } = req.body;
  console.log("Received request body:", req.body);

  if (!flightNumber || !flightName || !scheduleDate) {
    res.status(400);
    throw new Error("Missing flight data");
  }

  const userExists = await Flight.findOne({ flightNumber });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const flight = await Flight.create({
    flightNumber,
    flightName,
    scheduleDate,
  });

  if (flight) {
    console.log("Flight booked successfully:", flight);
    res.status(201).json(flight);
  } else {
    res.status(400);
    throw new Error("Flight booking failed");
  }
});

const getBookFlight = asyncHandler(async (req, res) => {
  const user = {
    flightNumber: req.flightNumber,
    flightName: req.flightName,
    scheduleDate: req.scheduleDate,
  };
  res.status(200).json(user);
});

export { bookFlight, getBookFlight };
