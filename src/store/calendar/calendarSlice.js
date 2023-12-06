import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const temEvent = {
    _id: new Date().getTime(),
    title: "Ver mr robot",
    notes: "Transmitido en Twitch, no faltes!",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
        _id: "123",
        name: "Epsaind",
    },
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        events: [temEvent],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },

        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },

        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map((event) => {
                if (event._id === payload._id) {
                    return payload;
                }
                return event;
            });
        },

        onDeleteEvent: (state) => {
            state.events = state.events.filter((event) => event._id !== state.activeEvent._id);
            state.activeEvent = null;
        },
    },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
