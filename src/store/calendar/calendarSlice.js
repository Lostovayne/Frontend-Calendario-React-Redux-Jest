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
    },
});

export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;
