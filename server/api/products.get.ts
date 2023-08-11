import { db } from "../db/db";
import { products } from "../db/schemas/products.schema";

export default defineEventHandler((event) => {
  return db.query.products.findMany({
    limit: 10,
  });
});
