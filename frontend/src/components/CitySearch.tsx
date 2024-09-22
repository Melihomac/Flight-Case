import React, { useState } from "react";

function CitySearchInput({
  label,
  searchQuery,
  setSearchQuery,
  filteredCities,
  onSelectCity,
  error,
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setDropdownVisible(true);
  };

  const handleSelectCity = (city) => {
    setSearchQuery(`${city.city}, ${city.name}, ${city.country}`);
    onSelectCity(city); // Pass the selected city object
    setDropdownVisible(false); // Hide dropdown after selection
  };

  const handleFocus = () => {
    setDropdownVisible(true); // Show dropdown when input is focused
  };

  const handleBlur = (event) => {
    // Delay hiding the dropdown to allow clicks on the dropdown items
    setTimeout(() => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setDropdownVisible(false);
      }
    }, 100);
  };

  return (
    <div style={{ flex: 1 }}>
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{
            width: "20px",
            height: "20px",
            position: "absolute",
            left: "10px",
            pointerEvents: "none",
          }}>
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Type to search..."
          style={{
            width: "100%",
            padding: "10px 10px 10px 40px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
      </div>
      {dropdownVisible && searchQuery && (
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
            {filteredCities.length > 0 ? (
              filteredCities.map((destination, index) => (
                <li
                  key={index}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #ccc",
                    cursor: "pointer",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleSelectCity(destination)}>
                  City: {destination.city}, Airport: {destination.name},
                  Country: {destination.country}, Code: {destination.code}
                </li>
              ))
            ) : (
              <li style={{ padding: "8px" }}>No destinations found</li>
            )}
          </ul>
        </div>
      )}
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
    </div>
  );
}

export default CitySearchInput;
