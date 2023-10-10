import { describe, it } from "vitest";
import { mount } from "@vue/test-utils";

import AboutAcompanhaLegis from "../AboutAcompanhaLegis.vue";


describe("Test AboutAcompanhaLegis component", () => {
    const getWrapper = () => mount(AboutAcompanhaLegis);

    it("should mount", () => {
        const wrapper = getWrapper();
      
        expect(wrapper.vm).toBeDefined();
    });

    it("should match snapshot", () => {
        const wrapper = getWrapper();

        expect(wrapper.html()).toMatchSnapshot();
    });
});

