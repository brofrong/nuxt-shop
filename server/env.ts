import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_AUTH_TOKEN: z.string(),
});

export const ENV = envSchema.parse(process.env);
