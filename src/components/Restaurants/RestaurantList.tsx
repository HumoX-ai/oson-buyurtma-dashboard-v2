"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  deleteRestaurant,
  setRestaurants,
  addRestaurant,
  updateRestaurant,
} from "@/store/slices/restaurantSlice";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RestaurantCard from "./RestaurantCard";
import RestaurantForm from "./RestaurantForm";
import { Restaurant } from "@/lib/data";

interface RestaurantListProps {
  initialRestaurants: Restaurant[];
}

export default function RestaurantList({
  initialRestaurants,
}: RestaurantListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants } = useSelector((state: RootState) => state.restaurant);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(
    null
  );

  useEffect(() => {
    dispatch(setRestaurants(initialRestaurants));
  }, [dispatch, initialRestaurants]);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );

      if (response.status === 204) {
        dispatch(deleteRestaurant(id));
        toast({
          title: "Restoran o'chirildi",
          description: "Restoran muvaffaqiyatli o'chirildi",
          variant: "success",
        });
      } else {
        console.error("Failed to delete restaurant from server");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      let response;
      if (editingRestaurant) {
        response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/${editingRestaurant.id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch(
          updateRestaurant({ id: editingRestaurant.id, ...response.data })
        );
        setIsLoading(false);
        toast({
          title: "Restoran yangilandi",
          description: "Restoran muvaffaqiyatli yangilandi",
          variant: "success",
        });
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch(addRestaurant(response.data));
        setIsLoading(false);
        toast({
          title: "Restoran qo'shildi",
          description: "Yangi restoran muvaffaqiyatli qo'shildi",
          variant: "success",
        });
      }
      setIsDialogOpen(false);
      setEditingRestaurant(null);
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false);
      toast({
        title: "Xatolik yuz berdi",
        description: "Amalni bajarishda xatolik yuz berdi",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Restoranlar</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRestaurant(null)}>
              Yangi restoran qo&#39;shish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingRestaurant
                  ? "Restoranni tahrirlash"
                  : "Yangi restoran qo'shish"}
              </DialogTitle>
            </DialogHeader>
            <RestaurantForm
              isLoading={isLoading}
              onSubmit={handleSubmit}
              initialData={
                editingRestaurant
                  ? {
                      name: editingRestaurant.name,
                      contact_phone: editingRestaurant.contact_phone,
                      contact_email: editingRestaurant.contact_email,
                      status: editingRestaurant.status as unknown as
                        | "active"
                        | "archived", // Ensure this is "active" or "archived"
                      owner: editingRestaurant.owner.toString(), // Convert number to string
                      address: editingRestaurant.address,
                      description: editingRestaurant.description,
                    }
                  : undefined
              }
            />
          </DialogContent>
        </Dialog>
      </div>

      {restaurants.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">
          Restoranlar mavjud emas
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onEdit={() => openEditDialog(restaurant)}
              onDelete={() => handleDelete(restaurant.id)}
              
            />
          ))}
        </div>
      )}
    </div>
  );
}
