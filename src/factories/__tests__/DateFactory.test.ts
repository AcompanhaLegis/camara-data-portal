import { describe, it, expect } from "vitest";
import DayJsAdapter, { type IDateAdapter} from "@/adapters/DayJsAdapter";
import DateFactory, { type DateLibrary } from "../DateFactory";

describe("DateFactory", () => {
    it("should create an instance of DayJSAdapter", () => {
        const adapter: IDateAdapter = DateFactory.create("dayjs" as DateLibrary);
        expect(adapter).toBeInstanceOf(DayJsAdapter);
    });

    it("should throw an error when an invalid library is provided", () => {
        expect(() => DateFactory.create("invalidLib" as any))
            .toThrow("Date library invalidLib is not supported.");
    });
});