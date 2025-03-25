import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from '../utils/LocalStorage';

export type UiTypes = {
    theme: string | null;
    sidebar: boolean;
    scrollPositions: Record<string, number>;
};

export const UI_PERSISTENT_STATE = 'uiData'; //для localStorage

const initialState: UiTypes = {
    theme: loadState<UiTypes>(UI_PERSISTENT_STATE)?.theme ?? null,
    sidebar: loadState<UiTypes>(UI_PERSISTENT_STATE)?.sidebar ?? true,
    scrollPositions: {},
};

const uiSlice = createSlice({
    name: 'uiSlice',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar;
        },
        setSidebar: (state, action: PayloadAction<boolean>) => {
            state.sidebar = action.payload;
        },
        setScrollPosition: (state, action: PayloadAction<{ page: string; position: number }>) => {
            const { page, position } = action.payload;
            state.scrollPositions[page] = position;
        },
        resetScrollPosition: (state, action: PayloadAction<string>) => {
            const page = action.payload;
            delete state.scrollPositions[page];
        },
    },
});
export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
