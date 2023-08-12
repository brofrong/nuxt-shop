import { useValidatedQuery, zh } from "h3-zod";
import { z } from "zod";
import { db } from "../db/db";
import { sql } from "drizzle-orm";
import { products } from "../db/schemas/products.schema";

const PAGE_LIMIT = 10;

const productsInputSchema = z.object({
  page: z
    .string()
    .regex(/\d+/)
    .default("0")
    .transform(Number)
    .refine((n) => n >= 0),
});

export default defineEventHandler(async (event) => {
  const input = await useValidatedQuery(event, productsInputSchema);

  const totalQuery = db.run(sql`SELECT COUNT(*) as total FROM ${products}`);
  const productsQuery = db.query.products.findMany({
    limit: PAGE_LIMIT,
    offset: PAGE_LIMIT * input.page,
    with: {
      images: {
        columns: { id: true, url: true },
      },
    },
  });

  const [totalResult, productsResult] = await Promise.all([
    totalQuery,
    productsQuery,
  ]);

  return {
    products: productsResult,
    total: Number(totalResult.rows[0].total) || 0,
    skip: PAGE_LIMIT * input.page,
    limit: PAGE_LIMIT,
  };
});
