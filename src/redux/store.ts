import { configureStore } from "@reduxjs/toolkit";

import newReducer from "./newsReducer"

export const store = configureStore({
    reducer: ({
        news: newReducer,
    })
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch