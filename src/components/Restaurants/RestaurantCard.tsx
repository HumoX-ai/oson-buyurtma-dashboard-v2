"use client";

import React from "react";
import { Restaurant } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: () => void;
  onDelete: () => void;
}

export default function RestaurantCard({
  restaurant,
  onEdit,
  onDelete,
}: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative min-h-full">
      <Image
        width={400}
        height={300}
        src={restaurant.image || "/noImage.svg"}
        alt={restaurant.name}
        priority
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-2 right-2 flex space-x-2">
        <Button onClick={onEdit} size="sm" variant="secondary">
          <Edit className="h-4 w-4" />
        </Button>
        <Button onClick={onDelete} size="sm" variant="destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-black">
          {restaurant.name}
        </h3>
        <p className="text-gray-600 mb-4">{restaurant.contact_phone}</p>
      </div>
      <Link href={`/dashboard/restaurants/${restaurant.id}/menus`}>
        <Button className="w-full rounded-t-none">Menular</Button>
      </Link>
    </div>
  );
}
