import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { FriendsResponse, MeResponse, User, UserRequest, UpcomingBirthdaysResponse } from '../types/FriendTypes';

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
    tagTypes: ['Friend'],
    endpoints: (builder) => ({
        getMe: builder.query<MeResponse, User>({
            query: () => ({
                url: `${API.ME}/me`,
                method: 'GET',
            }),
        }),
        getAllFriends: builder.query<FriendsResponse, UserRequest>({
            query: ({ limit, start = 0 }) => ({
                url: API.FRIENDS,
                params: { limit: limit, offset: start },
            }),
            providesTags: (result) =>
                result
                    ? [...result.results.map(({ id }: { id: number }) => ({ type: 'Friend' as const, id })), 'Friend']
                    : ['Friend'],
        }),
        getUserById: builder.query<User, { id: number | undefined }>({
            query: ({ id }) => ({
                url: `${API.FRIENDS}${id}`,
                method: 'GET',
            }),
        }),
        getUpcomingBirthdays: builder.query<UpcomingBirthdaysResponse[], void>({
            query: () => ({
                url: `${API.UPCOMING_BIRTHDAYS}`,
                method: 'GET',
            }),
        }),
    }),
});
export const {
    useGetMeQuery,
    useGetAllFriendsQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useGetUpcomingBirthdaysQuery,
} = friendsApi;
