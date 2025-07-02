import { createApi } from '@reduxjs/toolkit/query/react';
import { API } from '../../../app/api/ApiConfig';
import { baseQueryWithReauth } from '../../../app/api/Utils';
import { Friend, FriendRequest, MutualFriendsRespoonse, UpcomingBirthdaysResponse } from '../types/FriendTypes';

export const friendsApi = createApi({
    reducerPath: 'friendsApi',
    baseQuery: baseQueryWithReauth,
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
        acceptFriendRequest: builder.mutation<void, { id: number }>({
            query: ({ id }) => ({
                url: `${API.FRIENDS}${id}/update_status/`,
                method: 'PATCH',
                body: {
                    status: 'accepted',
                },
            }),
        }),
        getMutualFriends: builder.query<MutualFriendsRespoonse, { friend_id: number }>({
            query: ({ friend_id }) => ({
                url: `${API.FRIENDS}${friend_id}/mutual_friends/`,
                method: 'GET',
            }),
        }),
        checkFriendStatus: builder.query<Friend, { friend_id: number }>({
            query: ({ friend_id }) => ({
                url: `${API.FRIENDS}${friend_id}/check_friendship/`,
                method: 'GET',
            }),
        }),
    }),
});
export const {
    useGetAllFriendsQuery,
    useGetUpcomingBirthdaysQuery,
    useAddFriendMutation,
    useRemoveFriendMutation,
    useCancelFriendRequestMutation,
    useAcceptFriendRequestMutation,
    useGetMutualFriendsQuery,
    useCheckFriendStatusQuery,
} = friendsApi;
