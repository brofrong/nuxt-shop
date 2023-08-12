import { SQL, and, gte, like, lte, sql } from "drizzle-orm";
import { useValidatedQuery } from "h3-zod";
import { db } from "../db/db";
import { products } from "../db/schemas/products.schema";
import {
  ProductsInput,
  productsInputSchema,
} from "../input-schemas/products.input";

const PAGE_LIMIT = 10;

export default defineEventHandler(async (event) => {
  const input = await useValidatedQuery(event, productsInputSchema);

  const conditions = buildConditions(input);

  const rowsCountQuery = getRowsCount(input, conditions);
  const productsQuery = getProductsQuery(input, conditions);

  const [rowsCountResult, productsResult] = await Promise.all([
    rowsCountQuery,
    productsQuery,
  ]);

  return {
    products: productsResult,
    total: rowsCountResult,
    skip: PAGE_LIMIT * input.page,
    limit: PAGE_LIMIT,
  };
});

function buildConditions(input: ProductsInput) {
  const condition: SQL[] = [];

  if (input.title) condition.push(like(products.title, `%${input.title}%`));
  if (input.category) condition.push(like(products.category, input.category));
  if (input.brand) condition.push(like(products.brand, `%${input.brand}%`));
  if (input.description)
    condition.push(like(products.description, `%${input.description}%`));
  if (input.maxPrice !== Infinity)
    condition.push(lte(products.price, input.maxPrice));

  condition.push(gte(products.price, input.minPrice));
  condition.push(gte(products.rating, input.rating));
  condition.push(gte(products.stock, input.stock));

  return and(...condition);
}

async function getRowsCount(input: ProductsInput, conditions?: SQL) {
  const query = await db.run(
    sql`SELECT COUNT(*) as total FROM ${products} WHERE ${conditions}`
  );
  return Number(query.rows[0].total) || 0;
}

async function getProductsQuery(input: ProductsInput, conditions?: SQL) {
  return db.query.products.findMany({
    limit: PAGE_LIMIT,
    offset: PAGE_LIMIT * input.page,
    where: conditions,
    with: {
      images: {
        columns: { id: true, url: true },
      },
    },
  });
}
