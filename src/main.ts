import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { pinia } from "@/stores";
import PrimeVue from "primevue/config";

import "./style.scss";
import "primeicons/primeicons.css";
import AcompanhaLegisPreset from "@/utils/AcompanhaLegisPreset";

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(PrimeVue, {
    theme: {
        preset: AcompanhaLegisPreset,
    },
    options: {
        prefix: "al",
        darkModeSelector: "system",
        cssLayer: {
            name: "prime",
            order: "tailwind-base, prime, tailwind-utilities",
        }
    },
});
app.mount("#app");
