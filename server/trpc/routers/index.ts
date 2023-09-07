import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import product from "./product";
import { productsInputSchema } from "../../input-schemas/products.input";
import { getProducts } from "../../services/products.sevice";

export const appRouter = router({
  hello: publicProcedure
    .meta({ openapi: { path: "/hello", method: "GET" } })
    .input(z.object({ text: z.string().optional() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => {
      return { greeting: `hello ${input?.text ?? "world"}` };
    }),
  product,
  products: publicProcedure
    .input(productsInputSchema)
    .query(({ input }) => getProducts(input)),
});

// export type definition of API
export type AppRouter = typeof appRouter;
