/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";
import { getMessages, localizer } from "../../helpers";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";
import { useEffect } from "react";

export const CalendarPage = () => {
    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week");
    const { events, setActiveEvent, hasEventSelected, startLoadingEvents } = useCalendarStore();
    const { openDateModal } = useUiStore();
    const { user } = useAuthStore();

    const eventStyleGetter = (event, start, end, isSelected) => {
        const isMyEvent = user.uid === event.user._id || user.uid === event.user.uid;

        const style = {
            backgroundColor: isMyEvent ? "#367CF7" : "#465660",
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

    useEffect(() => {
        startLoadingEvents();
    }, []);

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
            <FabAddNew />
            <FabDelete />
        </>
    );
};
