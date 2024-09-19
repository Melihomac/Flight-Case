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
  const [searchQuery1, setSearchQuery1] = useState("");
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
    if (selectedCity1 && startDate) {
      setLoading(true);
      axios
        .get("http://localhost:5001/api/flights", {
          params: {
            departureCity: selectedCity1.code,
            destinationCity: selectedCity2 ? selectedCity2.code : "",
            startDate: startDate,
            endDate: endDate,
          },
        })
        .then((response) => {
          console.log("API Response:", response.data); // Log the entire response to inspect its structure
          const fetchedFlights = response.data.flights || [];
          console.log("Fetched Flights:", fetchedFlights); // Log fetched flights to verify the data
          setFlights(fetchedFlights);
          setLoading(false);
          console.log(flights);
        })
        .catch((error) => {
          console.error("Error fetching flight data:", error);
          setLoading(false);
        });
    }
  }, [selectedCity1, selectedCity2, startDate, endDate]);

  const handleSubmit = () => {
    let hasError = false;

    if (!selectedCity1) {
      setError((prev) => ({
        ...prev,
        city1: "Please select a departure city",
      }));
      hasError = true;
    }
    if (!selectedCity2) {
      setError((prev) => ({
        ...prev,
        city2: "Please select a destination city",
      }));
      hasError = true;
    }
    if (!startDate) {
      setError((prev) => ({
        ...prev,
        startDate: "Please select a start date",
      }));
      hasError = true;
    }
    if (!endDate) {
      setError((prev) => ({ ...prev, endDate: "Please select an end date" }));
      hasError = true;
    }

    if (!hasError) {
      // Trigger the effect to fetch and filter flights
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

        <div>
          <ul>
            {flights.map((flight) => (
              <li key={flight.id}>
                <strong>Flight Number:</strong> {flight.flightNumber}
                <br />
                <strong>Flight Name:</strong> {flight.flightName}
                <br />
                <strong>Departure Time:</strong> {flight.scheduleDateTime}
                <br />
                <strong>Arrival Time:</strong> {flight.actualLandingTime}
                <br />
                <strong>Airline:</strong> {flight.prefixICAO}
                <br />
                <strong>Terminal:</strong> {flight.terminal}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
