import React, { useEffect } from "react";
import axios from "axios";

function FetchFlights() {
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("/api/flights", {
          params: {
            departureCity: "AMS",
            startDate: "2024-09-19",
          },
        });

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <h1>Fetch Flights</h1>
      <p>Check the console for flight data.</p>
    </div>
  );
}

export default FetchFlights;
