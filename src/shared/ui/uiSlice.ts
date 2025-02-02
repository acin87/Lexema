import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from '../utils/LocalStorage';


 export type UiTypes  = {
    theme: string | null;
    sidebar?: boolean;
};

export const UI_PERSISTENT_STATE = 'uiData'; //для localStorage

const initialState: UiTypes = {
    theme: loadState<UiTypes>(UI_PERSISTENT_STATE)?.theme ?? null,
};

const uiSlice = createSlice({
    name: 'uiSlice',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        toggleSlidebar: (state, action: PayloadAction<boolean>) => {
            state.sidebar = action.payload;
        },
    },
});
export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
