import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export interface IDateAdapter {
    formatDate(data: Date | string, format?: string): string;
    formatDateTime(data: Date | string, format?: string): string;
}

export default class DayJsAdapter implements IDateAdapter {
    private defaultDateFormat = "DD/MM/YYYY";
    private defaultDateTimeFormat = "DD/MM/YYYY HH:mm";

    formatDate( date: Date | string, format = this.defaultDateFormat) {
        return dayjs(date).utc().format(format);
    }

    formatDateTime( date: Date | string, format = this.defaultDateTimeFormat ) {
        return this.formatDate(date, format);
    }
}