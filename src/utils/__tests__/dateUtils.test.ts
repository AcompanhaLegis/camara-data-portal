import { describe, it, expect } from "vitest";

import { formatDate, formatDateTime } from "@/utils/dateUtils";

describe("formatDate", () => {
    it("should format date", () => {
        const date = new Date("2021-01-01T00:00:00Z");
        expect(formatDate(date)).toBe("01/01/2021");
    });

    it("should format date with custom format", () => {
        const date = new Date("2021-01-01T00:00:00Z");
        expect(formatDate(date, "YYYY-MM-DD")).toBe("2021-01-01");
    });
});

describe("formatDateTime", () => {
    it("should format date and time", () => {
        const date = new Date("2021-01-01T00:00:00Z");
        expect(formatDateTime(date)).toBe("01/01/2021 00:00");
    });

    it("should format date and time with custom format", () => {
        const date = new Date("2021-01-01T00:00:00Z");
        expect(formatDateTime(date, "YYYY-MM-DD HH:mm"))
            .toBe("2021-01-01 00:00");
    });
});