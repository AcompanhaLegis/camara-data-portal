import { describe, it, expect, beforeEach } from "vitest";
import DayJsAdapter from "../DayJsAdapter";

describe.concurrent("DayJsAdapter", () => {
    let dateAdapter: DayJsAdapter;

    beforeEach(() => {
        dateAdapter = new DayJsAdapter();
    });

    it("should format a date with default format", () => {
        const date = new Date("2025-03-22T00:00:00Z");
        const formatted = dateAdapter.formatDate(date);
        expect(formatted).toBe("22/03/2025");
    });

    it("should format a date with time using default format", () => {
        const date = new Date("2025-03-22T14:30:00Z");
        const formatted = dateAdapter.formatDateTime(date);
        expect(formatted).toBe("22/03/2025 14:30");
    });

    it("should format a date with custom format", () => {
        const date = new Date("2025-03-22T00:00:00Z");
        const formatted = dateAdapter.formatDate(date, "YYYY-MM-DD");
        expect(formatted).toBe("2025-03-22");
    });

    it("should format a datetime with custom format", () => {
        const date = new Date("2025-03-22T14:30:00Z");
        const formatted = dateAdapter.formatDateTime(date, "YYYY-MM-DD HH:mm");
        expect(formatted).toBe("2025-03-22 14:30");
    });
});