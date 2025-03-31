import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { Friend } from '../../friends/types/FriendTypes';
import { Profile } from '../types/ProfileTypes';

export const profileApi = createApi({
    reducerPath: 'profileApi',
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
    tagTypes: ['ProfilePost', 'Post', 'Profile'],
    endpoints: (builder) => ({
        getProfile: builder.query<Profile, { id: number }>({
            query: ({ id }) => ({
                url: `/${API.PROFILE}${id}/`,
                method: 'GET',
            }),
            providesTags: (result) => [{ type: 'Profile', id: result?.id }],
        }),
        getMyProfile: builder.query<Profile, { accessToken: string }>({
            query: ({ accessToken }) => ({
                url: `/${API.ME}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            providesTags: (result) => [{ type: 'Profile', id: result?.id }],
        }),
        addFriend: builder.mutation<Friend, { id: number }>({
            query: ({ id }) => ({
                url: `${API.FRIENDS}`,
                method: 'POST',
                body: {
                    friend_id: id,
                },
            }),
            invalidatesTags: ['Profile'],
        }),
        removeFriend: builder.mutation<void, { id: number }>({
            query: ({ id }) => ({
                url: `${API.FRIENDS}${id}/remove_friend/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Profile'],
        }),
        cancelFriendRequest: builder.mutation<void, { id: number }>({
            query: ({ id }) => ({
                url: `${API.FRIENDS}${id}/cancel_request/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Profile'],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useGetMyProfileQuery,
    useAddFriendMutation,
    useRemoveFriendMutation,
    useCancelFriendRequestMutation,
} = profileApi;
