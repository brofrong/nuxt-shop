import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./server/db/schemas/*.schema.ts",
  out: "./server/drizzle",
  // driver: "turso",
  // dbCredentials: {
  //   url: process.env.DATABASE_URL || "",
  //   authToken: process.env.DATABASE_AUTH_TOKEN,
  // },
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.LOCAL_DATABASE_URL || "",
  },
} satisfies Config;
