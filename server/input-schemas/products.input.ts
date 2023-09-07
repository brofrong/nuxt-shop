import { z } from "zod";

export const filterInputSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  minPrice: z.number().gte(0).default(0),
  maxPrice: z.number().gte(0).default(10000),
  minRating: z.number().gte(0).lte(5).default(0),
  maxRating: z.number().gte(0).lte(5).default(5),
  stock: z.number().gte(0).default(0),
  brand: z.string().optional(),
  category: z.string().optional(),
});

export const filterQueryInputSchema = z.object({
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
    .regex(/\d+/)
    .default("10000")
    .transform(Number)
    .refine((n) => n >= 0),
  minRating: z
    .string()
    .regex(/\d+/)
    .default("0")
    .transform(Number)
    .refine((n) => n >= 0),
  maxRating: z
    .string()
    .regex(/\d+/)
    .default("5")
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
  page: z
    .string()
    .regex(/\d+/)
    .default("0")
    .transform(Number)
    .refine((n) => n >= 0),
});

export const productsInputSchema = z
  .object({
    page: z.number().gte(0).default(0),
  })
  .merge(filterInputSchema);

export type ProductsInput = z.infer<typeof productsInputSchema>;
