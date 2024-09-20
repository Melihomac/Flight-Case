import React from "react";

const StartDatePicker = ({ startDate, setStartDate, error }) => {
  const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

  return (
    <div style={{ flex: 1 }}>
      <label htmlFor="startDate">Depart:</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        min={today} // Disallow past dates
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      />
      {error.startDate && (
        <p style={{ color: "red", fontSize: "12px" }}>{error.startDate}</p>
      )}
    </div>
  );
};

export default StartDatePicker;
