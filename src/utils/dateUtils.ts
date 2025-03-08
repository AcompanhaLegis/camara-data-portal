import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const defaultDateFormat = "DD/MM/YYYY";
const defaultDateTimeFormat = "DD/MM/YYYY HH:mm";

export const formatDate = (
    date: string|Date,
    format = defaultDateFormat
) => dayjs(date).utc().format(format);

export const formatDateTime = (
    date: string|Date,
    format = defaultDateTimeFormat
) => formatDate(date, format);