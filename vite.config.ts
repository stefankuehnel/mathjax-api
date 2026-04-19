import build from "@hono/vite-build/cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@errors": fileURLToPath(new URL("./src/errors", import.meta.url)),
      "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
      "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),
    },
  },
  plugins: [
    build(),
    devServer({
      adapter,
      entry: "src/index.tsx",
    }),
  ],
});
