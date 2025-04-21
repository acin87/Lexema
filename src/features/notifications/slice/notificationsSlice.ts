import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store/store';
import { Notifications } from '../types/NotificationsTypes';
interface NotificationsState {
    notifications: Notifications[] | undefined;
}

const initialState: NotificationsState = {
    notifications: [],
};

const NotificationsSlice = createSlice({
    name: 'notifications',
    initialState: initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<Notifications[]>) => {
            state.notifications = action.payload;
        },
    },
});

export const { setNotifications } = NotificationsSlice.actions;

export const selectMessagesNotifications = (state: RootState) => {
    return (
        state.notifications.notifications?.filter(
            (notification) => notification.notification_type.code === 'new_message',
        ) || []
    );
};
export const selectFriendshipNotifications = (state: RootState) => {
    return (
        state.notifications.notifications?.filter(
            (notification) =>
                notification.notification_type.code === 'friend_request' ||
                notification.notification_type.code === 'friend_accepted',
        ) || []
    );
};
export const selectAllNotifications = (state: RootState) => state.notifications.notifications;

export const selectNotifications = (state: RootState) => state.notifications.notifications;

export const selectNotificationsByType = createSelector(
    [selectNotifications, (_: RootState, types: string[]) => types],
    (notifications, types) =>
        notifications?.filter((notification) => types.includes(notification.notification_type.code)),
);

export const selectNotificationsBySenderId = createSelector(
    [selectNotifications, (_: RootState, senderId: number) => senderId],
    (notifications, senderId) =>
        notifications?.filter((notification) => notification.sender_info.id === senderId),
);

export default NotificationsSlice.reducer;
