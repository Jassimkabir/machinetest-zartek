import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRestaurants } from "../../api";

const initialState = {
  status: "idle",
  restaurant: undefined,
};

export const getRestaurant = createAsyncThunk(
  "restaurant/getRestaurant",
  async () => {
    const response = await getRestaurants();
    return response;
  },
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    updateStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRestaurant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRestaurant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurant = action.payload[0];
      })
      .addCase(getRestaurant.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updateStatus } = restaurantSlice.actions;

export default restaurantSlice.reducer;

export const selectRestaurant = (state) => {
  return state.restaurant.restaurant;
};
