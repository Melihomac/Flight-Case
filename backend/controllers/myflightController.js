import asyncHandler from "express-async-handler";
import Flight from "../models/flightModel.js";

// @desc    Save a flight
// @route   POST /api/flights/book
// @access  Private
const bookFlight = asyncHandler(async (req, res) => {
  const { flightNumber, flightName, scheduleDate } = req.body;

  // Check if the flight already exists in the database
  const flightExists = await Flight.findOne({ flightNumber, scheduleDate, user: req.user._id });
  if (flightExists) {
    res.status(400);
    throw new Error("Flight already booked.");
  }

  // Create and save new flight booking
  const flight = await Flight.create({
    user: req.user._id, // Associate with logged-in user
    flightNumber,
    flightName,
    scheduleDate,
  });

  if (flight) {
    res.status(201).json({
      flightNumber: flight.flightNumber,
      flightName: flight.flightName,
      scheduleDate: flight.scheduleDate,
    });
  } else {
    res.status(400);
    throw new Error("Invalid flight data.");
  }
});

export { bookFlight };
