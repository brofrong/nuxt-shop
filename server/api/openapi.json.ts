import { generateOpenApiDocument } from "trpc-openapi";
import { appRouter } from "../trpc/routers";

export default defineEventHandler(() => {
  return generateOpenApiDocument(appRouter, {
    title: "Example CRUD API",
    description: "OpenAPI compliant REST API built using tRPC with Next.js",
    version: "1.0.0",
    baseUrl: "http://localhost:3000/api",
    docsUrl: "https://github.com/jlalmes/trpc-openapi",
    tags: ["auth", "users", "posts"],
  });
});
