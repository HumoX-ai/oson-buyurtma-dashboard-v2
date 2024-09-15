import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nomi kamida 2 ta belgi bo'lishi kerak",
  }),
  contact_phone: z.string().regex(/^\+?[0-9]{9,}$/, {
    message: "Yaroqli telefon raqamini kiriting",
  }),
  contact_email: z
    .string()
    .email({ message: "Yaroqli email manzilini kiriting" }),
  description: z.string(),
  owner: z.string().optional(),
  status: z.enum(["active", "archived"]),
  address: z.string(),
});
