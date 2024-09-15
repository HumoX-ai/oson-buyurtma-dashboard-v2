import React from "react";
import { z } from "zod";
import formSchema from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import InputMask from "react-input-mask";

interface userFormProps {
  isLoading: boolean;
  onSubmit: (formData: FormData) => void;
  initialData?: z.infer<typeof formSchema>;
}

const AdministrationForm = ({
  isLoading,
  onSubmit,
  initialData = {
    name: "",
    phone: "",
    password: "",
    role: "restaurant_owner",
  },
}: userFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleSubmit = form.handleSubmit((data) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("phone", data.phone);
    formDataToSend.append("password", data.password);
    formDataToSend.append("role", data.role);
    onSubmit(formDataToSend);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel htmlFor="To'liq ism">To&#39;liq ism</FormLabel>
              <FormControl>
                <Input id="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel htmlFor="Phone">Telefon raqam</FormLabel>
              <FormControl>
                <InputMask
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  mask="+999 99 999-99-99"
                  maskChar={null}
                  placeholder="+998 XX XXX-XX-XX"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel htmlFor="password">Parol</FormLabel>
              <FormControl>
                <Input id="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel htmlFor="role">Loyihaga ro&#39;l</FormLabel>
              <FormControl>
                <Input id="role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
};

export default AdministrationForm;
