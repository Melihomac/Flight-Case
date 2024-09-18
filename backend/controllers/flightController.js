import asyncHandler from "express-async-handler";
import axios from "axios";

// Schiphol API'den uçuş verilerini çek
const getFlights = asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.schiphol.nl/public-flights/flights",
      {
        headers: {
          resourceversion: "v4",
          app_id: process.env.SCHIPHOL_APP_ID, // Store API keys in environment variables
          app_key: process.env.SCHIPHOL_APP_KEY, // Store API keys in environment variables
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching flight data from Schiphol API");
  }
});

export { getFlights };
