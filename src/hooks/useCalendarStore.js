/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        // TODO: realizar una petecion http para guardar el evento
        if (calendarEvent._id) {
            // actualizar

            dispatch(onUpdateEvent(calendarEvent));
        } else {
            // creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    };

    const startdeletingEvent = () => {
        try {
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error.message);
        }
    };

    return {
        //* propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* metodos
        setActiveEvent,
        startSavingEvent,
        startdeletingEvent,
    };
};
