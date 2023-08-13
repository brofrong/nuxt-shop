import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
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
