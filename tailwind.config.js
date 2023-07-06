/** @type {import("tailwindcss").Config} */
import colors from "tailwindcss/colors.js";
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    plugins: [],
    theme: {
        extend: {
            colors: {
                primary: "#3b82f6",
            }
        },
    },
};

