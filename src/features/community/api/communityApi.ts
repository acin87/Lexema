import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../../app/api/Utils';
import { API } from '../../../app/api/ApiConfig';
import { CommunitiesResponse, Community } from '../types/communityTypes';
import { Friend } from '../../friends/types/FriendTypes';

export const communitiesApi = createApi({
    reducerPath: 'communitiesApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Community'],
    endpoints: (builder) => ({
        getCommunities: builder.query<CommunitiesResponse, void>({
            query: () => ({
                url: API.COMMUNITIES,
                method: 'GET',
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.results.map(({ id }) => ({ type: 'Community' as const, id })),
                          { type: 'Community', id: 'LIST' },
                      ]
                    : [{ type: 'Community', id: 'LIST' }],
        }),
        getCommunity: builder.query<Community, number>({
            query: (id) => ({
                url: `${API.COMMUNITIES}${id}`,
                method: 'GET',
            }),
            providesTags: (result) => [{ type: 'Community', id: result?.id }],
        }),
        createCommunity: builder.mutation<Community, FormData>({
            query: (formData) => ({
                url: API.COMMUNITIES,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: [{ type: 'Community', id: 'LIST' }],
        }),
        joinCommunity: builder.mutation<void, { communityId: number }>({
            query: ({ communityId }) => ({
                url: `${API.COMMUNITIES}${communityId}/join/`,
                method: 'POST',
            }),
            invalidatesTags: ['Community'],
        }),
        leaveCommunity: builder.mutation<void, { communityId: number }>({
            query: ({ communityId }) => ({
                url: `${API.COMMUNITIES}${communityId}/leave/`,
                method: 'POST',
            }),
            invalidatesTags: ['Community'],
        }),
        getCommunityMembers: builder.query<Friend[], number>({
            query: (communityId) => `${API.COMMUNITIES}${communityId}/members/`,
        }),
        deleteCommunity: builder.mutation<void, number>({
            query: (communityId) => ({
                url: `${API.COMMUNITIES}${communityId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Community'],
        }),
    }),
});

export const {
    useGetCommunitiesQuery,
    useCreateCommunityMutation,
    useJoinCommunityMutation,
    useLeaveCommunityMutation,
    useGetCommunityQuery,
    useGetCommunityMembersQuery,
    useDeleteCommunityMutation,
} = communitiesApi;
