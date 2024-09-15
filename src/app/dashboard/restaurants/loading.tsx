import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingRestaurants() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Restoranlar</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-[#2a2727] rounded-lg shadow-md overflow-hidden"
          >
            <Skeleton className="w-full h-48" /> {/* Rasm uchun */}
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />{" "}
              {/* Restoran nomi uchun */}
              <Skeleton className="h-4 w-1/2 mb-4" />{" "}
              {/* Telefon raqami uchun */}
              <Skeleton className="h-10 w-full" />{" "}
              {/* O'chirish tugmasi uchun */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
