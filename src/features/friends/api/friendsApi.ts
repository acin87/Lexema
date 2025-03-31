import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { Friend, FriendRequest, UpcomingBirthdaysResponse } from '../types/FriendTypes';

export const friendsApi = createApi({
    reducerPath: 'friendsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL,
        prepareHeaders: (headers, { getState }) => {
            const accessToken = (getState() as RootState).auth.access;
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
                headers.set('Content-Type', 'application/json');
            }
            return headers;
        },
    }),
    tagTypes: ['Friend', 'Profile'],
    endpoints: (builder) => ({
        getAllFriends: builder.query<Friend[], FriendRequest>({
            query: ({ limit, start = 0 }) => ({
                url: API.FRIENDS,
                params: { limit: limit, offset: start },
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }: { id: number }) => ({ type: 'Friend' as const, id })), 'Friend']
                    : ['Friend'],
        }),
        getUpcomingBirthdays: builder.query<UpcomingBirthdaysResponse[], void>({
            query: () => ({
                url: `${API.UPCOMING_BIRTHDAYS}`,
                method: 'GET',
            }),
        }),
    }),
});
export const { useGetAllFriendsQuery, useGetUpcomingBirthdaysQuery } = friendsApi;
