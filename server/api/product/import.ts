import { useValidatedBody } from "h3-zod";
import { z } from "zod";
import { db } from "../../db/db";
import { images, insertImagesType } from "../../db/schemas/images.schema";
import {
  insertProductSchema,
  products,
} from "../../db/schemas/products.schema";

const imagesArray = z.object({ images: z.array(z.string()) });

const importSchema = z.object({
  products: z.array(insertProductSchema.merge(imagesArray)),
});

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, importSchema);

  const insertProducts = await db
    .insert(products)
    .values(body.products)
    .onConflictDoNothing({ target: products.id })
    .run();

  const imagesValues: insertImagesType[] = [];
  body.products.forEach((product) =>
    product.images.forEach((image) => {
      if (product.id) {
        imagesValues.push({ productId: product.id, url: image });
      }
    })
  );
  const insertImages = await db.insert(images).values(imagesValues).run();

  return { insertProducts, insertImages };
});
