import { z } from "zod";
import {
  insertProductSchema,
  products,
} from "../../db/schemas/products.schema";
import { useValidatedBody } from "h3-zod";
import { db } from "../../db/db";
import { images, insertImagesType } from "../../db/schemas/images.schema";
import { I } from "drizzle-orm/select.types.d-7da7fae0";

const imagesArray = z.object({ images: z.array(z.string()) });

const importSchema = z.object({
  products: z.array(insertProductSchema.merge(imagesArray)),
});

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, importSchema);

  const insertProducts = db
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
  const insertImages = db.insert(images).values(imagesValues).run();

  return "Ok";
});
