import React from "react";
import { getRestaurantOwner, getRestaurants } from "@/lib/data";
import AdministrationList from "@/components/Administration/AdministrationList";

export default async function Administration() {
  const users = await getRestaurantOwner();
  const restaurants = await getRestaurants();

  if (!users || users.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">
          Restoranlar adminstratorlari
        </h1>
        <p>Hech qanday restoran egasi topilmadi</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <AdministrationList
        restaurants={restaurants}
        initialAdministration={users}
      />
    </div>
  );
}
