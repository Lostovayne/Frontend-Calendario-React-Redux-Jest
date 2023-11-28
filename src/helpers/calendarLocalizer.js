import { format, getDay, parse, startOfWeek } from "date-fns";
import esEs from "date-fns/locale/es";
import { dateFnsLocalizer } from "react-big-calendar";
const locales = {
    es: esEs,
};

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
