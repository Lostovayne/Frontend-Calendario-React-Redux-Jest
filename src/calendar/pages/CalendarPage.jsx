/* eslint-disable no-unused-vars */
import { addHours } from "date-fns";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent, Navbar } from "../";
import { localizer, getMessages } from "../../helpers";

const myEventsList = [
    {
        title: "Cumpleaños del Jefe",
        notes: "Comprar el pastel",
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: "#fafafa",
        user: {
            _id: "123",
            name: "Epsaind",
        },
    },
];

export const CalendarPage = () => {
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: "#367CF7",
            borderRadius: "1px",
            opacity: 0.7,
            color: "white",
            with: "100%",
        };

        return {
            style: style,
        };
    };

    return (
        <>
            <Navbar />
            <Calendar
                culture="es"
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc(100vh - 80px)" }}
                messages={getMessages()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
            />
        </>
    );
};
