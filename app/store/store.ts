"use client";
import { configureStore } from "@reduxjs/toolkit";
import addModalReducer from "../features/addModal/addModalSlice";
import selectedCryptoPairReducer from "../features/selectedCryptoPair/selectedCryptoPairSlice";

export const store = configureStore({
    reducer: {
        addModal: addModalReducer,
        selectedCryptoPair: selectedCryptoPairReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
