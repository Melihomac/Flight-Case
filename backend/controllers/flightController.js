import asyncHandler from "express-async-handler";
import axios from "axios";

// Schiphol API'den uçuş verilerini çek
const getFlights = asyncHandler(async (req, res) => {
  //let { departureCity, destinationCity, endDate } = req.query;
  try {
    const response = await axios.get(
      "https://api.schiphol.nl/public-flights/flights",
      {
        headers: {
          resourceversion: "v4",
          app_id: process.env.SCHIPHOL_APP_ID, // Store API keys in environment variables
          app_key: process.env.SCHIPHOL_APP_KEY, // Store API keys in environment variables
        },
        params: req.query,
        // params: {
        //   //departureAirport: departureCity, // Adjust this according to API documentation
        //   //destinationAirport: destinationCity, // Adjust this according to API documentation
        //   //scheduleDate: startDate,
        //   //endDate: endDate,
        // },
      }
    );

    const flights = response.data; // Modify based on the actual response structure
    res.status(200).json(flights);
    //console.log(flights);
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching flight data from Schiphol API");
  }
});

export { getFlights };
