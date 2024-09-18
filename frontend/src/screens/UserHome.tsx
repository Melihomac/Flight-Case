import React, { useEffect, useState } from "react";
import axios from "axios";

function UserHome() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const token = localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo")).token
          : null;

        const response = await axios.get(
          "http://localhost:5001/api/destinations", // Doğru API endpoint'i olduğundan emin olun
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data); // Veriyi kontrol edin

        // Yanıtın `destinations` verisini içerdiğinden emin olun
        if (
          response.data.destinations &&
          Array.isArray(response.data.destinations)
        ) {
          setDestinations(response.data.destinations); // Destinations'ı state'e aktar
        } else {
          setDestinations([]);
        }

        setLoading(false);
      } catch (error) {
        setError("Error fetching destinations");
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Destination Data</h1>
      <ul>
        {destinations.length > 0 ? (
          destinations.map((destination, index) => (
            <li key={index}>City: {destination.city}</li>
          ))
        ) : (
          <li>No destinations available</li>
        )}
      </ul>
    </div>
  );
}

export default UserHome;
