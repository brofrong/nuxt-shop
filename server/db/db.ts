import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from "@libsql/client";
import { ENV } from "../env";
import { images } from "./schemas/images.schema";
import { products } from "./schemas/products.schema";

const client = createClient({
  url: ENV.DATABASE_URL,
  authToken: ENV.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema: { images: images, products: products },
});

migrate(db, { migrationsFolder: "server/drizzle" });
