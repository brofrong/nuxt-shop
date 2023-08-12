import { useValidatedQuery } from "h3-zod";
import { db } from "../../db/db";
import { productGetInputSchema } from "../../input-schemas/product.get.input";

export default defineEventHandler(async (event) => {
  const input = await useValidatedQuery(event, productGetInputSchema);
  return db.query.products.findFirst({
    where: (product, { eq }) => eq(product.id, input.id),
    with: { images: { columns: { id: true, url: true } } },
  });
});
