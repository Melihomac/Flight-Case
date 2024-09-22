import { apiSliceFlight } from "./apiSlice";

export const myFlightsApiSlice = apiSliceFlight.injectEndpoints({
  endpoints: (builder) => ({
    bookFlight: builder.mutation({
      query: (data) => ({
        url: `/myflights`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useBookFlightMutation } = myFlightsApiSlice;
