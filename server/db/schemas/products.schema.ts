import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { images } from "./images.schema";
import { string, z } from "zod";

export const products = sqliteTable("users", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  discountPercentage: real("discountPercentage"),
  rating: real("rating"),
  stock: integer("stock").notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  thumbnail: text("thumbnail").notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
  images: many(images),
}));

export const insertProductSchema = createInsertSchema(products).merge(
  z.object({ thumbnail: string().url() })
);

export type InsertProductDTO = z.infer<typeof insertProductSchema>;

export const ProductSchema = createSelectSchema(products);

export type Product = z.infer<typeof ProductSchema>;

const imagesArray = z.object({ images: z.array(z.string()) });

export const importSchema = z.object({
  products: z.array(insertProductSchema.merge(imagesArray)),
});
export type ImportDTO = z.infer<typeof importSchema>;

export const ProductSchemaWithImages = ProductSchema.merge(
  z.object({ images: z.array(z.object({ id: z.number(), url: z.string() })) })
).optional();
