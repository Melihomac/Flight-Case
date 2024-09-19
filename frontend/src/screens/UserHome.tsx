import React, { useState, useEffect } from "react";
import citiesFile from "../../../cities.json";
import Loader from "../components/Loader";

function UserHome() {
  const [cities, setCities] = useState([]);
  const [filteredCities1, setFilteredCities1] = useState([]);
  const [filteredCities2, setFilteredCities2] = useState([]);
  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(10); // Number of cities per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    city1: "",
    city2: "",
    startDate: "",
    endDate: "",
  });
  const [dropdownVisible1, setDropdownVisible1] = useState(false);
  const [dropdownVisible2, setDropdownVisible2] = useState(false);
  const [selectedCity1, setSelectedCity1] = useState(null);
  const [selectedCity2, setSelectedCity2] = useState(null);
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date

  useEffect(() => {
    const loadCities = () => {
      // Load cities from local file
      const cityData = citiesFile;

      // Filter out entries without a city
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
    // Filter cities based on search query for Input 1
    const result1 = cities.filter((city) =>
      city.city.toLowerCase().includes(searchQuery1.toLowerCase())
    );
    setFilteredCities1(result1);
    setCurrentPage(1); // Reset to the first page on search
  }, [searchQuery1, cities]);

  useEffect(() => {
    // Filter cities based on search query for Input 2
    const result2 = cities.filter((city) =>
      city.city.toLowerCase().includes(searchQuery2.toLowerCase())
    );
    setFilteredCities2(result2);
    setCurrentPage(1); // Reset to the first page on search
  }, [searchQuery2, cities]);

  // Pagination logic
  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities1 = filteredCities1.slice(
    indexOfFirstCity,
    indexOfLastCity
  );
  const currentCities2 = filteredCities2.slice(
    indexOfFirstCity,
    indexOfLastCity
  );

  const handleSearch1 = (event) => {
    setSearchQuery1(event.target.value);
    setDropdownVisible1(true); // Show dropdown on search
  };

  const handleSearch2 = (event) => {
    setSearchQuery2(event.target.value);
    setDropdownVisible2(true); // Show dropdown on search
  };

  const handleSelectCity1 = (city) => {
    setSearchQuery1(`${city.city}, ${city.name}, ${city.country}`);
    setSelectedCity1(city);
    setDropdownVisible1(false); // Hide dropdown after selection
  };

  const handleSelectCity2 = (city) => {
    setSearchQuery2(`${city.city}, ${city.name}, ${city.country}`);
    setSelectedCity2(city);
    setDropdownVisible2(false); // Hide dropdown after selection
  };

  const handleFocus1 = () => {
    setDropdownVisible1(true); // Show dropdown when input is focused
  };

  const handleFocus2 = () => {
    setDropdownVisible2(true); // Show dropdown when input is focused
  };

  const handleBlur = (event, dropdownSetter) => {
    // Delay hiding the dropdown to allow clicks on the dropdown items
    setTimeout(() => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        dropdownSetter(false);
      }
    }, 100);
  };

  const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

  const handleSubmit = () => {
    let valid = true;
    let newError = {
      city1: "",
      city2: "",
      startDate: "",
      endDate: "",
    };

    // Validate inputs
    if (!selectedCity1) {
      newError.city1 = "Please select a departure city.";
      valid = false;
    }
    if (!selectedCity2) {
      newError.city2 = "Please select a destination city.";
      valid = false;
    }
    if (!startDate) {
      newError.startDate = "Please select a start date.";
      valid = false;
    }
    if (!endDate) {
      newError.endDate = "Please select an end date.";
      valid = false;
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newError.endDate = "Return date must be after the departure date.";
      valid = false;
    }

    if (valid) {
      setLoading(true);
      setTimeout(() => {
        console.log("City 1:", selectedCity1);
        console.log("City 2:", selectedCity2);
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
        setLoading(false);
      }, 1000); // Simulate a delay for loading
    } else {
      setError(newError);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add your Flight</h1>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="search1">From:</label>
            <input
              type="text"
              id="search1"
              value={searchQuery1}
              onChange={handleSearch1}
              onFocus={handleFocus1}
              onBlur={(event) => handleBlur(event, setDropdownVisible1)}
              placeholder="Type to search..."
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            {dropdownVisible1 && searchQuery1 && (
              <div style={{ position: "relative" }}>
                <ul
                  style={{
                    position: "absolute",
                    border: "1px solid #ccc",
                    maxHeight: "150px",
                    overflowY: "auto",
                    width: "100%",
                    backgroundColor: "white",
                    zIndex: 1,
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}>
                  {currentCities1.length > 0 ? (
                    currentCities1.map((destination, index) => (
                      <li
                        key={index}
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ccc",
                          cursor: "pointer",
                          backgroundColor: "#f9f9f9",
                          borderRadius: "5px",
                        }}
                        onClick={() => handleSelectCity1(destination)}>
                        City: {destination.city}, Airport: {destination.name},
                        Country: {destination.country}
                      </li>
                    ))
                  ) : (
                    <li style={{ padding: "8px" }}>No destinations found</li>
                  )}
                </ul>
              </div>
            )}
            {error.city1 && (
              <p style={{ color: "red", fontSize: "12px" }}>{error.city1}</p>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="search2">To:</label>
            <input
              type="text"
              id="search2"
              value={searchQuery2}
              onChange={handleSearch2}
              onFocus={handleFocus2}
              onBlur={(event) => handleBlur(event, setDropdownVisible2)}
              placeholder="Type to search..."
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            {dropdownVisible2 && searchQuery2 && (
              <div style={{ position: "relative" }}>
                <ul
                  style={{
                    position: "absolute",
                    border: "1px solid #ccc",
                    maxHeight: "150px",
                    overflowY: "auto",
                    width: "100%",
                    backgroundColor: "white",
                    zIndex: 1,
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}>
                  {currentCities2.length > 0 ? (
                    currentCities2.map((destination, index) => (
                      <li
                        key={index}
                        style={{
                          padding: "8px",
                          borderBottom: "1px solid #ccc",
                          cursor: "pointer",
                          backgroundColor: "#f9f9f9",
                          borderRadius: "5px",
                        }}
                        onClick={() => handleSelectCity2(destination)}>
                        City: {destination.city}, Airport: {destination.name},
                        Country: {destination.country}
                      </li>
                    ))
                  ) : (
                    <li style={{ padding: "8px" }}>No destinations found</li>
                  )}
                </ul>
              </div>
            )}
            {error.city2 && (
              <p style={{ color: "red", fontSize: "12px" }}>{error.city2}</p>
            )}
          </div>
        </div>

        {/* Date Inputs */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="startDate">Depart:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={today} // Ensure future dates cannot be selected
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            {error.startDate && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {error.startDate}
              </p>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="endDate">Return:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              max={today} // Ensure future dates cannot be selected
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            {error.endDate && (
              <p style={{ color: "red", fontSize: "12px" }}>{error.endDate}</p>
            )}
          </div>
        </div>

        {/* Button and Loading Animation */}
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
      </div>
    </div>
  );
}

export default UserHome;
