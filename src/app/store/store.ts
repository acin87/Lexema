import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducers/auth/authSlice";

const Store = configureStore({
    reducer: {
        auth: authSlice,
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispath = typeof Store.dispatch;
export default Store;