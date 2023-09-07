import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import {
  productDeleteInputSchema,
  productGetInputSchema,
} from "../../input-schemas/product.input";
import { db } from "../../db/db";
import {
  deleteProduct,
  createProduct,
  importProducts,
} from "../../services/product.service";
import {
  ProductSchema,
  ProductSchemaWithImages,
  importSchema,
  insertProductSchema,
} from "../../db/schemas/products.schema";

export default router({
  get: publicProcedure
    .meta({ openapi: { method: "GET", path: "/product" } })
    .input(productGetInputSchema)
    .output(ProductSchemaWithImages)
    .query(({ input }) => {
      return db.query.products.findFirst({
        where: (product, { eq }) => eq(product.id, input.id),
        with: { images: { columns: { id: true, url: true } } },
      });
    }),
  create: publicProcedure
    .input(insertProductSchema)
    .mutation(({ input }) => createProduct(input)),
  delete: publicProcedure
    .input(productDeleteInputSchema)
    .mutation(({ input }) => deleteProduct(input)),
  import: publicProcedure
    .input(importSchema)
    .mutation(({ input }) => importProducts(input)),
});
