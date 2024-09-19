import React, { useEffect } from "react";
import axios from "axios";

function FetchFlights() {
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("/api/flights", {
          params: {
            departureCity: "AMS", // Example parameter, replace with actual value
            startDate: "2024-09-19", // Example parameter, replace with actual value
          },
        });

        console.log(response.data); // Log the data to the console
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlights();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h1>Fetch Flights</h1>
      <p>Check the console for flight data.</p>
    </div>
  );
}

export default FetchFlights;
