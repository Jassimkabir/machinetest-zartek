import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRestaurants } from "../../api";

const initialState = {
  status: "idle",
  restaurant: undefined,
  dishes: undefined,
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
    getDishes: (state, action) => {
      state.dishes = state.restaurant?.table_menu_list
        ?.find((item) => item.menu_category_id === action.payload)
        .category_dishes.map((item) => ({ ...item, quantity: 0 }));
    },
    setQuantity: (state, action) => {
      const dishIndex = state.dishes.findIndex(
        (item) => item.dish_id === action.payload.id,
      );
      state.dishes[dishIndex] = {
        ...state.dishes[dishIndex],
        quantity: action.payload.quantity,
      };
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

export const { updateStatus, getDishes, setQuantity } = restaurantSlice.actions;

export default restaurantSlice.reducer;

export const selectRestaurant = (state) => {
  return state.restaurant.restaurant;
};

export const selectDishes = (state) => {
  return state.restaurant.dishes;
};

export const selectCartCount = (state) => {
  return state.restaurant.dishes?.reduce((acc, curr) => acc + curr.quantity, 0);
};
