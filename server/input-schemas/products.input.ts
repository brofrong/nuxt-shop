import { z } from "zod";

export const filterInputSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  minPrice: z
    .string()
    .regex(/\d+/)
    .default("0")
    .transform(Number)
    .refine((n) => n >= 0),
  maxPrice: z
    .string()
    .regex(/\d+|Infinity/)
    .default("Infinity")
    .transform(Number)
    .refine((n) => n >= 0),
  rating: z
    .string()
    .regex(/\d+/)
    .default("0")
    .transform(Number)
    .refine((n) => n >= 0),
  stock: z
    .string()
    .regex(/\d+/)
    .default("0")
    .transform(Number)
    .refine((n) => n >= 0),
  brand: z.string().optional(),
  category: z.string().optional(),
});

export const productsInputSchema = z
  .object({
    page: z
      .string()
      .regex(/\d+/)
      .default("0")
      .transform(Number)
      .refine((n) => n >= 0),
  })
  .merge(filterInputSchema);

export type ProductsInput = z.infer<typeof productsInputSchema>;
