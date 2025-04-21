import { createApi } from '@reduxjs/toolkit/query/react';
import { API } from '../../../app/api/ApiConfig';
import { baseQueryWithReauth } from '../../../app/api/Utils';
import { Notifications } from '../types/NotificationsTypes';

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getUnreadNotifications: builder.query<Notifications[], void>({
            query: () => ({
                url: `${API.NOTIFICATIONS}unread/`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetUnreadNotificationsQuery } = notificationApi;
