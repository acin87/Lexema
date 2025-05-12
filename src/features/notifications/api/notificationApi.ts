import { createApi } from '@reduxjs/toolkit/query/react';
import { API } from '../../../app/api/ApiConfig';
import { baseQueryWithReauth } from '../../../app/api/Utils';
import { Notifications } from '../types/NotificationsTypes';

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Notifications'],
    endpoints: (builder) => ({
        getUnreadNotifications: builder.query<Notifications[], void>({
            query: () => ({
                url: `${API.NOTIFICATIONS}unread/`,
                method: 'GET',
            }),
            providesTags: ['Notifications'],
        }),
        markAsRead: builder.mutation<void, { id: number }>({
            query: ({ id }) => ({
                url: `${API.NOTIFICATIONS}${id}/mark_as_read/`,
                method: 'POST',
            }),
            invalidatesTags: ['Notifications'],
        }),
    }),
});

export const { useGetUnreadNotificationsQuery, useMarkAsReadMutation } = notificationApi;
