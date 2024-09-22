import React from "react";

const EndDatePicker = ({ endDate, setEndDate, error }) => {
  const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  return (
    <div style={{ flex: 1 }}>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        min={today} // Ensure past dates cannot be selected
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
  );
};

export default EndDatePicker;
