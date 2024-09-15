"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
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
import { UserInfo, Restaurant } from "@/lib/data";
import {
  addUser,
  deleteUser,
  setUsers,
  updateUser,
} from "@/store/slices/userSlice";
import AdministrationForm from "./AdministrationForm";
import AdministrationCard from "./AdministrationCard";

interface AdministrationListProps {
  initialAdministration: UserInfo[];
  restaurants: Restaurant[]; // Restoran ma'lumotlari ham qabul qilinadi
}

export default function AdministrationList({
  initialAdministration,
  restaurants,
}: AdministrationListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.user);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<UserInfo | null>(null);

  // Restoranlarni foydalanuvchi ID si bo'yicha guruhlash
  const restaurantsByOwner = restaurants.reduce<Record<number, Restaurant[]>>(
    (acc, restaurant) => {
      if (!acc[restaurant.owner]) {
        acc[restaurant.owner] = [];
      }
      acc[restaurant.owner].push(restaurant);
      return acc;
    },
    {}
  );

  console.log("restaurantsByOwner", restaurantsByOwner);

  useEffect(() => {
    dispatch(setUsers(initialAdministration));
  }, [dispatch, initialAdministration]);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_AUTH}/auth/users/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );

      if (response.status === 204) {
        dispatch(deleteUser(id));
        toast({
          title: "Admin o'chirildi",
          description: "Admin muvaffaqiyatli o'chirildi",
          variant: "success",
        });
      } else {
        console.error("Failed to delete admin from server");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      let response;
      if (editingUser) {
        response = await axios.patch(
          `${process.env.NEXT_PUBLIC_AUTH}/auth/users/${editingUser.id}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch(updateUser({ id: editingUser.id, ...response.data }));
        setIsLoading(false);
        toast({
          title: "Restoran yangilandi",
          description: "Restoran muvaffaqiyatli yangilandi",
          variant: "success",
        });
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_AUTH}/auth/register/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch(addUser(response.data));
        setIsLoading(false);
        toast({
          title: "Restoran qo'shildi",
          description: "Yangi admin muvaffaqiyatli qo'shildi",
          variant: "success",
        });
      }
      setIsDialogOpen(false);
      setEditingUser(null);
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

  const openEditDialog = (user: UserInfo) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Restoranlar adminstratorlari</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingUser(null)}>
              Yangi admin qo&#39;shish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Adminni tahrirlash" : "Yangi admin qo'shish"}
              </DialogTitle>
            </DialogHeader>
            <AdministrationForm
              isLoading={isLoading}
              onSubmit={handleSubmit}
              initialData={
                editingUser
                  ? {
                      name: editingUser.name,
                      phone: editingUser.phone,
                      password: "",
                      role: editingUser.role as "restaurant_owner",
                    }
                  : undefined
              }
            />
          </DialogContent>
        </Dialog>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">
          Restoranlar mavjud emas
        </p>
      ) : (
        <div className="grid grid-cols-1 items-start sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <AdministrationCard
              key={user.id}
              user={user}
              restaurant={restaurantsByOwner[user.id] || []}
              onEdit={() => openEditDialog(user)}
              onDelete={() => handleDelete(user.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
