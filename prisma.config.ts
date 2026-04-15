import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Aquí es donde Prisma 7 busca la conexión ahora
    url: (globalThis as any).process?.env?.["DATABASE_URL"],
  },
});