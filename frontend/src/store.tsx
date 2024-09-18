import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.tsx";
import { apiSlice } from "./slices/apiSlice";
import flightSlice from "./slices/flightSlice.tsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    flights: flightSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
