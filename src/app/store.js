import { configureStore } from "@reduxjs/toolkit";
import loggerReducer from '../features/loggerSlice.js';

export const store = configureStore({
    reducer: {
        Log: loggerReducer
    }
})