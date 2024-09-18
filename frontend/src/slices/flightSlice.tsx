import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  flights: [],
  loading: false,
  error: null,
};

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.userInfo?.token;
    try {
      const response = await axios.get("http://localhost:5001/api/flights", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.results || [];
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Error fetching flights"
      );
    }
  }
);

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.flights = action.payload;
        state.loading = false;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default flightSlice.reducer;
