import { apiSlice } from "./apiSlice";
import { usersApiSlice } from "./usersApiSlice";

const USERS_URL = "/api";

export const myFlightsApiSlice = apiSlice.injectEndpoints({
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

export const { useBookFlightMutation } = usersApiSlice;
