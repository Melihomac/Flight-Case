import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useBookFlightMutation } from "../slices/myflightsApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const MyFlights = () => {
  const location = useLocation();
  const { flight } = location.state || {}; // Get the flight data from location.state
  const [bookFlight] = useBookFlightMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!flight) {
    return <p>No flight selected.</p>;
  }

  const bookFlightSave = async () => {
    try {
      // Gönderilen flight verilerini loglayın
      console.log("Sending flight data:", {
        flightNumber: flight.flightNumber,
        flightName: flight.flightName,
        scheduleDate: flight.scheduleDate,
      });

      const res = await axios.post(
        "http://localhost:5001/api/myflights",
        {
          flightNumber: flight.flightNumber,
          flightName: flight.flightName,
          scheduleDate: flight.scheduleDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", res.data);
      toast.success("Flight Added");
    } catch (err) {
      console.error("Error object:", err);
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.error) {
        toast.error(err.error);
      } else {
        toast.error("Flight already booked");
      }
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Selected Flight</h1>
        <p>
          <strong>Flight Number:</strong> {flight.flightNumber}
        </p>
        <p>
          <strong>Flight Name:</strong> {flight.flightName}
        </p>
        <p>
          <strong>Departure Time:</strong> {flight.scheduleDate}
        </p>
        <p>
          <strong>Arrival Time:</strong> {flight.actualLandingTime}
        </p>
        <p>
          <strong>Airline:</strong> {flight.prefixICAO}
        </p>
        <p>
          <strong>Terminal:</strong> {flight.route.destinations[0]}
        </p>
      </div>
      <button
        onClick={bookFlightSave}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}>
        Book Flight
      </button>
    </>
  );
};

export default MyFlights;
