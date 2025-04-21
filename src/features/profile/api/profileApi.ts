import { createApi } from '@reduxjs/toolkit/query/react';
import { API } from '../../../app/api/ApiConfig';
import { baseQueryWithReauth } from '../../../app/api/Utils';
import { Friend } from '../../friends/types/FriendTypes';
import { Profile } from '../types/ProfileTypes';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: baseQueryWithReauth,
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
