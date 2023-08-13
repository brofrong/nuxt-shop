import { useValidatedBody } from "h3-zod";
import { z } from "zod";
import { db } from "../../db/db";
import { images } from "../../db/schemas/images.schema";
import {
  insertProductSchema,
  products,
} from "../../db/schemas/products.schema";

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, insertProductSchema);

  let newProduct: { id: number } | null = null;

  await db.transaction(async (tx) => {
    const result = await tx
      .insert(products)
      .values(body)
      .onConflictDoUpdate({
        target: products.id,
        set: body,
      })
      .returning({ id: products.id })
      .run();
    newProduct = z.object({ id: z.number() }).parse(result.rows[0]);

    // костыль что бы не создовать новое фото thumbnail
    if (body.id) return;

    await tx
      .insert(images)
      .values({ productId: newProduct.id, url: body.thumbnail })
      .run();
  });

  return newProduct;
});
