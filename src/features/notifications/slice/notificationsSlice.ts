import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notification: null,
};

const NotificationsSlice = createSlice({
    name: 'notifications',
    initialState : initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notification = action.payload;
        },
    },
});

export const { setNotifications } = NotificationsSlice.actions;
export default NotificationsSlice.reducer;
