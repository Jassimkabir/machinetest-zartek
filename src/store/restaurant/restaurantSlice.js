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
    setQuantity: (state, action) => {
      const { restaurant } = state;
      const updatedMenuList = restaurant?.table_menu_list.map((category) =>
        category.menu_category_id === action.payload.categoryId
          ? {
              ...category,
              category_dishes: category.category_dishes.map((dish) =>
                dish.dish_id === action.payload.id
                  ? { ...dish, quantity: action.payload.quantity }
                  : dish,
              ),
            }
          : category,
      );
      state.restaurant = { ...restaurant, table_menu_list: updatedMenuList };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRestaurant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRestaurant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurant = {
          ...action.payload[0],
          table_menu_list: action.payload[0]?.table_menu_list.map(
            (category) => ({
              ...category,
              category_dishes: category.category_dishes.map((dish) => ({
                ...dish,
                quantity: 0,
              })),
            }),
          ),
        };
      })
      .addCase(getRestaurant.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updateStatus, setQuantity } = restaurantSlice.actions;

export default restaurantSlice.reducer;

export const selectRestaurant = (state) => {
  return state.restaurant.restaurant;
};

export const selectCartCount = (state) => {
  return state.restaurant.restaurant?.table_menu_list
    .map((item) =>
      item.category_dishes.reduce((acc, curr) => acc + curr.quantity, 0),
    )
    .reduce((acc, cur) => acc + cur, 0);
};
