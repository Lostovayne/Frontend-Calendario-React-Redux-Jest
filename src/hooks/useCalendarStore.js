/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarApi from "./../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        // TODO: realizar una petecion http para guardar el evento

        try {
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user })); //* Actualizar en local
                return;
            } else {
                const { data } = await calendarApi.post("/events", calendarEvent); //* Creando el Evento
                dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg,
            });
        }
    };

    const startdeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            dispatch(onDeleteEvent());
        } catch (error) {
            Swal.fire("Error", "Error al intentar eliminar", "error");
        }
    };

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get("/events");
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
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
        startLoadingEvents,
    };
};
