import React, { useState, useEffect } from "react";
import axios from "axios";
import citiesFile from "../../../cities.json";
import Loader from "../components/Loader";
import CitySearchInput from "../components/CitySearch";
import StartDatePicker from "../components/StartDatePicker";
import EndDatePicker from "../components/EndDatePicker";

function UserHome() {
  const [cities, setCities] = useState([]);
  const [filteredCities1, setFilteredCities1] = useState([]);
  const [filteredCities2, setFilteredCities2] = useState([]);
  const [searchQuery1, setSearchQuery1] = useState(
    "Schiphol Zuid, Schiphol Airport, Netherlands"
  ); // Pre-fill with default value
  const [searchQuery2, setSearchQuery2] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    city1: "",
    city2: "",
    startDate: "",
    endDate: "",
  });
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [selectedCity2, setSelectedCity2] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const loadCities = () => {
      const cityData = citiesFile;

      const validCities = cityData.filter(
        (destination) => destination.city && destination.city.trim() !== ""
      );

      setCities(validCities);
      setFilteredCities1(validCities);
      setFilteredCities2(validCities);
      setLoading(false);
    };

    loadCities();
  }, []);

  useEffect(() => {
    const result1 = cities.filter((city) =>
      city.city.toLowerCase().includes(searchQuery1.toLowerCase())
    );
    setFilteredCities1(result1);
    setCurrentPage(1);
  }, [searchQuery1, cities]);

  useEffect(() => {
    const result2 = cities.filter((city) =>
      city.city.toLowerCase().includes(searchQuery2.toLowerCase())
    );
    setFilteredCities2(result2);
    setCurrentPage(1);
  }, [searchQuery2, cities]);

  useEffect(() => {
    if (selectedCity1 && startDate && selectedCity2) {
      setLoading(true);
      axios
        .get("http://localhost:5001/api/flights", {})
        .then((response) => {
          const fetchedFlights = response.data.flights || flightsFile;

          // Filter flights where scheduleDate matches startDate and selectedCity2.code matches flight.destinations[0]
          const matchedFlights = fetchedFlights.filter(
            (flight) =>
              flight.scheduleDate === startDate &&
              flight.destinations[0] === selectedCity2.code
          );
          console.log(matchedFlights);

          if (matchedFlights.length > 0) {
            setFlights(matchedFlights); // Set matching flights
          } else {
            setFlights([]); // Clear flights if no match
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching flight data:", error);
          setLoading(false);
        });
    }
  }, [selectedCity1, selectedCity2, startDate, endDate]);

  const handleSubmit = () => {
    let hasError = false;
    // ... existing error handling logic ...

    if (!hasError) {
      // Fetch flights using axios
      const fetchFlights = async () => {
        try {
          const response = await axios.get("http://localhost:5001/api/flights");

          const flights = response.data.flights || [];
          setLoading(false);

          // Filter flights based on scheduleDate and selectedCity2.code
          const matchingFlights = flights.filter((flight) => {
            return (
              flight.scheduleDate === startDate &&
              flight.route.destinations[0] === selectedCity2.code
            );
          });

          // Log the matching flights
          console.log(matchingFlights);

          // Update state with the matching flights
          setFlights(matchingFlights);
        } catch (error) {
          console.error("Error fetching flight data:", error);
          setLoading(false);
        }
      };

      setLoading(true);
      fetchFlights();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add your Flight</h1>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <CitySearchInput
            label="From:"
            searchQuery={searchQuery1}
            setSearchQuery={setSearchQuery1}
            filteredCities={filteredCities1.slice(
              (currentPage - 1) * citiesPerPage,
              currentPage * citiesPerPage
            )}
            onSelectCity={setSelectedCity1}
            error={error.city1}
          />
          <CitySearchInput
            label="To:"
            searchQuery={searchQuery2}
            setSearchQuery={setSearchQuery2}
            filteredCities={filteredCities2.slice(
              (currentPage - 1) * citiesPerPage,
              currentPage * citiesPerPage
            )}
            onSelectCity={setSelectedCity2}
            error={error.city2}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <StartDatePicker
            startDate={startDate}
            setStartDate={setStartDate}
            error={error.startDate}
          />
          <EndDatePicker
            endDate={endDate}
            setEndDate={setEndDate}
            error={error.endDate}
          />
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={handleSubmit}
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
            Search Flights
          </button>
          {loading && <Loader />}
        </div>

        <div style={{ marginTop: "20px" }}>
          {flights.length > 0 ? (
            flights.map((flight) => (
              <div
                key={flight.id}
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}>
                <strong>Flight Number:</strong> {flight.flightNumber}
                <br />
                <strong>Flight Name:</strong> {flight.flightName}
                <br />
                <strong>Departure Time:</strong> {flight.scheduleDate}
                <br />
                <strong>Arrival Time:</strong> {flight.actualLandingTime}
                <br />
                <strong>Airline:</strong> {flight.prefixICAO}
                <br />
                <strong>Terminal:</strong> {flight.route.destinations[0]}
              </div>
            ))
          ) : (
            <p>No flights found for the selected date</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserHome;
