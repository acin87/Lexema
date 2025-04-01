import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { Notifications } from '../types/NotificationsTypes';

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL,
        prepareHeaders: (headers, { getState }) => {
            const accessToken = (getState() as RootState).auth.access;
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }
            return headers;
        },
    }),
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
