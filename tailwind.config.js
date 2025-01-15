import tailwindcssPrimeui from "tailwindcss-primeui";

/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    plugins: [tailwindcssPrimeui],
    theme: {},
};

