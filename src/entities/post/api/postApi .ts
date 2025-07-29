import { createApi } from '@reduxjs/toolkit/query/react';
import { API } from '../../../app/api/ApiConfig';
import { baseQueryWithReauth } from '../../../app/api/Utils';
import { Post, PostRequest, PostResponse } from '../types/PostTypes';

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['MainPost', 'ProfilePost', 'GroupPost'],
    endpoints: (builder) => ({
        getMainPosts: builder.query<PostResponse, PostRequest>({
            query: ({ limit = 7, offset = 0 }) => ({
                url: API.FEED,
                method: 'GET',
                params: {
                    limit: limit,
                    offset: offset,
                },
            }),
            providesTags: (result) =>
                result
                    ? [...result.results.map(({ id }) => ({ type: 'MainPost' as const, id })), 'MainPost']
                    : ['MainPost'],
        }),
        getProfilePosts: builder.query<PostResponse, PostRequest>({
            query: ({ profileOrGroupOwnerId, limit, offset }) => ({
                url: `/${API.PROFILE}${profileOrGroupOwnerId}/posts/`,
                method: 'GET',
                params: { limit, offset },
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.results.map(({ id }: { id: number }) => ({ type: 'ProfilePost' as const, id })),
                          'ProfilePost',
                      ]
                    : ['ProfilePost'],
        }),
        getGroupPosts: builder.query<PostResponse, PostRequest>({
            query: ({ profileOrGroupOwnerId, limit, offset }) => ({
                url: `${API.GROUP}${profileOrGroupOwnerId}/posts/`,
                method: 'GET',
                params: { limit, offset },
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.results.map(({ id }: { id: number }) => ({ type: 'GroupPost' as const, id })),
                          'GroupPost',
                      ]
                    : ['GroupPost'],
        }),
        updateViewsPost: builder.mutation<
            void,
            { author_id: number; postId: number; views: number; isGroupPost?: boolean; group_id?: number }
        >({
            query: ({ author_id, postId, views, group_id, isGroupPost }) => ({
                url: isGroupPost
                    ? `${API.GROUP}${group_id}/posts/${postId}/`
                    : `${API.PROFILE}${author_id}/posts/${postId}/`,
                method: 'PATCH',
                body: JSON.stringify({ views: views }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getOriginalPost: builder.query<Post, { id: number }>({
            query: ({ id }) => ({
                url: `${API.REPOST}${id}/`,
                method: 'GET',
            }),
        }),
        addProfilePost: builder.mutation<PostResponse, { author_id: number; data: FormData | string }>({
            query: ({ author_id, data }) => ({
                url: `${API.PROFILE}${author_id}/posts/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ProfilePost'],
        }),
        deleteProfilePost: builder.mutation<void, { postId: number; user_id: number }>({
            query: ({ postId, user_id }) => ({
                url: `${API.PROFILE}${user_id}/posts/${postId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ProfilePost'],
        }),
        updateProfilePost: builder.mutation<Post, { data: FormData; post_id: number; user_id: number }>({
            query: ({ data, post_id, user_id }) => ({
                url: `${API.PROFILE}${user_id}/posts/${post_id}/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['ProfilePost'],
        }),
        addGroupPost: builder.mutation<PostResponse, { group_id: number; data: FormData | string }>({
            query: ({ group_id, data }) => ({
                url: `${API.GROUP}${group_id}/posts/`,
                method: 'POST',
                body: data,
            }),

            invalidatesTags: ['GroupPost'],
        }),
        deleteGroupPost: builder.mutation<void, { postId: number; group_id: number }>({
            query: ({ postId, group_id }) => ({
                url: `${API.GROUP}${group_id}/posts/${postId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['GroupPost'],
        }),
        updateGroupPost: builder.mutation<Post, { data: FormData | string; post_id: number; group_id: number }>({
            query: ({ data, post_id, group_id }) => ({
                url: `${API.GROUP}${group_id}/posts/${post_id}/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['GroupPost'],
        }),
        updatePostLike: builder.mutation<
            {
                likes_count: number;
                dislikes_count: number;
                user_reaction: string | null;
            },
            {
                postId: number;
                user_id: number;
                reaction_type: 'like' | 'dislike' | null;
                isGroupPost?: boolean;
                group_id?: number;
            }
        >({
            query: ({ postId, reaction_type, user_id, isGroupPost, group_id }) => ({
                url: isGroupPost
                    ? `${API.GROUP}${group_id}/posts/${postId}/`
                    : `${API.PROFILE}${user_id}/posts/${postId}/`,
                method: 'PATCH',
                body: { like_action: reaction_type },
            }),
            transformResponse: (response: {
                likes_count: number;
                dislikes_count: number;
                user_reaction: string | null;
            }) => response,
        }),
    }),
});
export const {
    useGetMainPostsQuery,
    useGetProfilePostsQuery,
    useGetGroupPostsQuery,
    useUpdateViewsPostMutation,
    useUpdatePostLikeMutation,
    useGetOriginalPostQuery,
    useLazyGetOriginalPostQuery,
    useAddProfilePostMutation,
    useDeleteProfilePostMutation,
    useUpdateProfilePostMutation,
    useAddGroupPostMutation,
    useDeleteGroupPostMutation,
    useUpdateGroupPostMutation,
} = postApi;
