import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Vitest configurations go here
    setupFiles: ["./tests/vitest-setup.ts"],
    globals: true,
    environment: "jsdom",
  },
});
