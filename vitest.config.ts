/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            all: true,
            reporter: ["text", "html"],
            extension: [".vue", ".ts", ".js"],
        },
    },
    plugins: [
        vue(),
    ],
});
