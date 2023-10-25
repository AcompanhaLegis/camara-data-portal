/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
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
        alias: {
            "@/": new URL("./src/", import.meta.url).pathname,
        },
    },
    plugins: [
        vue(),
    ],
});
