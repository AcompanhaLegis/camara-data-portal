/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            provider: "v8",
            all: true,
            reporter: ["text", "html"],
            extension: [".vue", ".ts", ".js"],
            include: ["src/**/*.*"],
            exclude: [
                "src/test-utils/**/*.*",
                "src/types/**/*.ts",
                "src/**/*.d.ts"
            ],
        },
        alias: {
            "@/": new URL("./src/", import.meta.url).pathname,
        },
        setupFiles: "./src/test-utils/setup.vitest",
    },
    plugins: [
        vue(),
    ],
});
