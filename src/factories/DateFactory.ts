import DayJsAdapter, { type IDateAdapter } from "@/adapters/DayJsAdapter";
import { InjectionKey } from "vue";

export type DateLibrary = "dayjs";

export const DateLibKey: InjectionKey<IDateAdapter> = Symbol("DateLibKey");

export default class DateFactory {
    static create(library: DateLibrary): IDateAdapter {
        switch (library) {
        case "dayjs":
            return new DayJsAdapter();
        default:
            throw new Error(`Date library ${library} is not supported.`);
        }
    }
}