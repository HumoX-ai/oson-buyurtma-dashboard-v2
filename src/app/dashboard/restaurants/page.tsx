import RestaurantList from "@/components/Restaurants/RestaurantList";
import { getRestaurants } from "@/lib/data";

export default async function Restaurants() {
  const initialRestaurants = await getRestaurants();
  console.log("restaurants", initialRestaurants);

  return <RestaurantList initialRestaurants={initialRestaurants} />;
}
