/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { onAddNewEvent, onSetActiveEvent } from "../store";
export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        // TODO: realizar una petecion http para guardar el evento
        if (calendarEvent.id) {
            // actualizar
        } else {
            // creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    };

    return {
        //* propiedades
        events,
        activeEvent,

        //* metodos
        setActiveEvent,
        startSavingEvent,
    };
};
