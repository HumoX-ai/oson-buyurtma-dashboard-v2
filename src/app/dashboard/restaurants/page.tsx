import RestaurantList from "@/components/Restaurants/RestaurantList";
import { getRestaurants } from "@/lib/data";
import React from "react";

export default async function Restaurants() {
  const initialRestaurants = await getRestaurants();
  console.log("restaurants", initialRestaurants);

  return (
    <div>
      <RestaurantList initialRestaurants={initialRestaurants} />
    </div>
  );
}
