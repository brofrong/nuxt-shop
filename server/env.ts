import { z } from "zod";

const envSchema = z.object({
  DEV: z.boolean(),
  LOCAL_DATABASE_URL: z.string().optional(),
  DATABASE_URL: z.string(),
  DATABASE_AUTH_TOKEN: z.string(),
});

export const ENV = envSchema.parse({ ...process.env, DEV: import.meta.dev });
