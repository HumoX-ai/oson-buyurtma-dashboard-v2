import { z } from "zod";

const formSchema = z.object({
  phone: z
    .string()
    .min(9, "Telefon raqam formatini to'liq kiriting")
    .max(17, "Telefon raqami noto'g'ri")
    .regex(
      /^\+998 \d{2} \d{3}-\d{2}-\d{2}$/,
      "To'g'ri telefon formatini kiriting"
    ),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["restaurant_owner"]),
});

export default formSchema;
