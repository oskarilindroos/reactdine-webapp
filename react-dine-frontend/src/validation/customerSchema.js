import { z } from "zod";

export const Customer = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().email(),
  street: z.string().trim().min(1, { message: "Street is required" }),
  postalCode: z.string().trim().min(1, { message: "Postal code is required" }),
  city: z.string().trim().min(1, { message: "City is required" }),
});
