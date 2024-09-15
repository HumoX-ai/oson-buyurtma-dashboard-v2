import { Restaurant } from "@/lib/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RestaurantState {
  restaurants: Restaurant[];
}

const initialState: RestaurantState = {
  restaurants: [],
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
    deleteRestaurant: (state, action: PayloadAction<number>) => {
      state.restaurants = state.restaurants.filter(
        (restaurant) => restaurant.id !== action.payload
      );
    },

    addRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.restaurants = [...state.restaurants, action.payload];
    },

    updateRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.restaurants = state.restaurants.map((restaurant) => {
        if (restaurant.id === action.payload.id) {
          return action.payload;
        }
        return restaurant;
      });
    },
  },
});

export const {
  setRestaurants,
  deleteRestaurant,
  addRestaurant,
  updateRestaurant,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
