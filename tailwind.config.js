import tailwindcssPrimeui from "tailwindcss-primeui";

/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    plugins: [tailwindcssPrimeui],
    theme: {
        extend: {
            colors: {
                primary: {
                    default: "#3b82f6",
                    700: "#2563eb",
                },
                primaryDark: "#2563eb",
            }
        },
    },
};

