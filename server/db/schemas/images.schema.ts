import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { products } from "./products.schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const images = sqliteTable("images", {
  id: integer("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  url: text("url").notNull(),
});

export const insertImagesSchema = createInsertSchema(images);
export type insertImagesType = z.infer<typeof insertImagesSchema>;
