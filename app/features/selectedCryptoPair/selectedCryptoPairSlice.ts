"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface selectedCryptoPairState {
    value: string;
}

const initialState: selectedCryptoPairState = {
    value: "BTCUSDT",
};

export const selectedCryptoPairSlice = createSlice({
    name: "selectedCryptoPair",
    initialState,
    reducers: {
        setSelectedCryptoPair: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setSelectedCryptoPair } = selectedCryptoPairSlice.actions;

export default selectedCryptoPairSlice.reducer;
