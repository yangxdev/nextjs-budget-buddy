"use client";
import { configureStore } from "@reduxjs/toolkit";
import addModalReducer from "../features/addModal/addModalSlice";

export const store = configureStore({
    reducer: {
        addModal: addModalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
