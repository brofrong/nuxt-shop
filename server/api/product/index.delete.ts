import { useValidatedQuery } from "h3-zod";
import { db } from "../../db/db";
import { productDeleteInputSchema } from "../../input-schemas/product.get.input";
import { products } from "../../db/schemas/products.schema";
import { eq } from "drizzle-orm";
import { images } from "../../db/schemas/images.schema";

export default defineEventHandler(async (event) => {
  const input = await useValidatedQuery(event, productDeleteInputSchema);

  const ret = await db.transaction(async (tx) => {
    await tx.delete(images).where(eq(images.productId, input.id)).run();
    await tx.delete(products).where(eq(products.id, input.id)).run();
  });

  return { status: "ok" };
});
