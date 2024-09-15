"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formSchema } from "./schema";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface RestaurantFormProps {
  isLoading: boolean;
  onSubmit: (formData: FormData) => void;
  initialData?: z.infer<typeof formSchema>;
}

interface UserInfo {
  id: string;
  name: string;
  role: string;
  phone: string;
}

export default function RestaurantForm({
  isLoading,
  onSubmit,
  initialData = {
    name: "",
    contact_phone: "",
    contact_email: "",
    status: "active",
    owner: "",
    address: "",
    description: "",
  },
}: RestaurantFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserInfo[]>([]);
  console.log(user);

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_AUTH}/auth/users/`
      );
      setUser(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleSubmit = form.handleSubmit((data) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("contact_phone", data.contact_phone);
    formDataToSend.append("contact_email", data.contact_email);
    formDataToSend.append("status", data.status);
    formDataToSend.append("owner", data.owner ?? "");
    formDataToSend.append("address", data.address);
    formDataToSend.append("description", data.description);
    if (selectedImage) {
      formDataToSend.append("image", selectedImage);
    }
    onSubmit(formDataToSend);
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel htmlFor="name">Nomi</FormLabel>
                <FormControl>
                  <Input id="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_phone"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel htmlFor="contact_phone">Telefon raqami</FormLabel>
                <FormControl>
                  <Input id="contact_phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contact_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="contact_email">Email</FormLabel>
              <FormControl>
                <Input id="contact_email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="address">Manzili</FormLabel>
              <FormControl>
                <Input id="address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? undefined} // Ensure value is not null
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue>
                      {field.value ? field.value : "Foydalanuvchi tanlang"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {user &&
                    user
                      .filter((user) => user.role === "restaurant_owner")
                      .map((user: UserInfo) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} - ({user.phone})
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="address">Restoran haqida</FormLabel>
              <FormControl>
                <Input id="address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="active" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Restoran aktiv holatda
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="archived" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Restoran arxiv holatda
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel htmlFor="image">Rasm</FormLabel>
          <FormControl>
            <div>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {selectedImage ? "Rasm tanlandi" : "Rasm tanlash"}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Yuklanmoqda...
            </>
          ) : (
            "Saqlash"
          )}
        </Button>
      </form>
    </Form>
  );
}
