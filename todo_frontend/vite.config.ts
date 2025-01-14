import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["./src/tests/vitest-setup.ts"],
    globals: true,
    environment: "jsdom",
  },
});
