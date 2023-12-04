/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent, CalendarModal, Navbar } from "../";
import { getMessages, localizer } from "../../helpers";
import { useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week");
    const { events, setActiveEvent } = useCalendarStore();
    const { openDateModal } = useUiStore();

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

    const onDobleClick = (event) => {
        openDateModal();
    };

    const onSelect = (event) => {
        // console.log({ onSelect: event });
        setActiveEvent(event);
    };

    const onViewChanged = (event) => {
        localStorage.setItem("lastView", event);
        setLastView(event);
    };

    return (
        <>
            <Navbar />
            <Calendar
                culture="es"
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc(100vh - 80px)" }}
                messages={getMessages()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onSelectEvent={onSelect}
                onDoubleClickEvent={onDobleClick}
                onView={onViewChanged}
            />

            <CalendarModal />
        </>
    );
};
