import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer";
import { Col, Row } from "react-bootstrap";

const MyFlights = () => {
  const location = useLocation();
  const { flight } = location.state || {}; // Get the flight data from location.state

  if (!flight) {
    return <p>No flight selected.</p>;
  }

  const bookFlightSave = async () => {
    try {
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
      <div className="container my-4">
        <div className="card shadow">
          <div className="card-body">
            <div className="d-flex">
              <h3 className="card-text">
                {new Date(flight.scheduleDateTime).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </h3>
              <h3>-</h3>
              <h3 className="card-text">
                {new Date(flight.lastUpdatedAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </h3>
            </div>
            <hr className="my-3" />
            <Row>
              <Col>
                <h5>Destinations</h5>
                <div className="d-flex align-items-center">
                  <p className="card-text p-1 mb-0">AMS to</p>
                  <p className="card-text p-1 mb-0">
                    {flight.route.destinations[0]}
                  </p>
                </div>
              </Col>
              <Col>
                <h5>Flight ID</h5>
                <div className="d-flex align-items-center">
                  <p className="card-text p-1 mb-0">{flight.flightName}</p>
                </div>
              </Col>
              <Col>
                <h5>Arrival Date</h5>
                <div className="d-flex align-items-center">
                  <p className="card-text p-1 mb-0">{flight.scheduleDate}</p>
                </div>
              </Col>
              <Col>
                <h5>Terminal Code</h5>
                <div className="d-flex align-items-center">
                  <p className="card-text p-1 mb-0">
                    {flight.route.destinations[0]}
                  </p>
                </div>
              </Col>
            </Row>
            <hr className="my-3" />
            <div className="text-center mt-3">
              <button
                onClick={bookFlightSave}
                className="btn btn-primary btn-lg"
                style={{
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}>
                Book Flight
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyFlights;
