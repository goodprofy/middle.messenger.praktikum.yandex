import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@runtemers": new URL("./src/runtemers", import.meta.url).pathname,
    },
  },

  esbuild: {
    jsx: "transform",
    jsxDev: false,
    jsxImportSource: "@runtemers",
    jsxInject: `import { h } from '@runtemers/jsx-runtime'`,
    jsxFactory: "h",
  },
});
