import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { Client, Config, createClient } from "@libsql/client";
import { ENV } from "../env";
import { images, postsRelations } from "./schemas/images.schema";
import { products, productsRelations } from "./schemas/products.schema";

let config: Config;

if (ENV.DEV) {
  if (!ENV.LOCAL_DATABASE_URL)
    throw new Error("LOCAL_DATABASE_URL don't set in .env");

  config = {
    url: `file:${ENV.LOCAL_DATABASE_URL}`,
  };
} else {
  config = {
    url: ENV.DATABASE_URL,
    authToken: ENV.DATABASE_AUTH_TOKEN,
  };
}

const client = createClient(config);

const schema = {
  images: images,
  products: products,
  productsRelations: productsRelations,
  postsRelations: postsRelations,
};

export const db = drizzle(client, { schema });

migrate(db, { migrationsFolder: "server/drizzle" });
