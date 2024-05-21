"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AddModalState {
    value: boolean
}

const initialState: AddModalState = {
    value: false
}

export const addModalSlice = createSlice({
    name: "addModal",
    initialState,
    reducers: {
        setAddModal: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
});

export const { setAddModal } = addModalSlice.actions;

export default addModalSlice.reducer;