import { z } from "zod";

export const productGetInputSchema = z.object({
  id: z
    .string()
    .regex(/\d+/)
    .default("0")
    .transform(Number)
    .refine((n) => n >= 0),
});

export type ProductGetInput = z.infer<typeof productGetInputSchema>;
