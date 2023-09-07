import { z } from "zod";
import { db } from "../db/db";
import {
  ImportDTO,
  InsertProductDTO,
  insertProductSchema,
  products,
} from "../db/schemas/products.schema";
import { images, insertImagesType } from "../db/schemas/images.schema";
import { eq } from "drizzle-orm";
import { ProductDeleteInput } from "../input-schemas/product.input";

export async function createProduct(input: InsertProductDTO) {
  let newProduct: { id: number } | null = null;

  await db.transaction(async (tx) => {
    const result = await tx
      .insert(products)
      .values(input)
      .onConflictDoUpdate({
        target: products.id,
        set: input,
      })
      .returning({ id: products.id })
      .run();
    newProduct = z.object({ id: z.number() }).parse(result.rows[0]);

    // костыль что бы не создовать новое фото thumbnail
    if (input.id) return;

    await tx
      .insert(images)
      .values({ productId: newProduct.id, url: input.thumbnail })
      .run();
  });

  return newProduct;
}

export async function deleteProduct(input: ProductDeleteInput) {
  const ret = await db.transaction(async (tx) => {
    await tx.delete(images).where(eq(images.productId, input.id)).run();
    await tx.delete(products).where(eq(products.id, input.id)).run();
  });

  return { status: "ok" };
}

export async function importProducts(input: ImportDTO) {
  const insertProducts = await db
    .insert(products)
    .values(input.products)
    .onConflictDoNothing({ target: products.id })
    .run();

  const imagesValues: insertImagesType[] = [];

  input.products.forEach((product) =>
    product.images.forEach((image) => {
      if (product.id) {
        imagesValues.push({ productId: product.id, url: image });
      }
    })
  );
  const insertImages = await db.insert(images).values(imagesValues).run();

  return { insertProducts, insertImages };
}
