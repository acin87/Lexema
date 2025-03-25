import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../app/api/ApiConfig';
import { RootState } from '../../app/store/store';
import { PostResponse, PostTypes } from '../../entities/mainFeed/types/PostTypes';
import { ProfilePostRequest } from '../../entities/profile/types/ProfileTypes';
export const postsApi = createApi({
    reducerPath: 'postsApi',
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
    tagTypes: ['ProfilePost', 'GroupPost'],
    endpoints: (builder) => ({
        getProfilePosts: builder.query<PostResponse, ProfilePostRequest>({
            query: ({ id, limit, offset }) => ({
                url: `/${API.PROFILE}${id}/posts/`,
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
        addProfilePost: builder.mutation<PostResponse, { author_id: number; data: FormData | string }>({
            query: ({ author_id, data }) => ({
                url: `${API.PROFILE}${author_id}/posts/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ProfilePost'],
        }),
        deleteProfilePost: builder.mutation<void, { postId: number, user_id: number }>({
            query: ({ postId, user_id }) => ({
                url: `${API.PROFILE}${user_id}/posts/${postId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ProfilePost'],
        }),
        updateProfilePost: builder.mutation<PostTypes, { data: FormData; post_id: number; user_id: number }>({
            query: ({ data, post_id, user_id }) => ({
                url: `${API.PROFILE}${user_id}/posts/${post_id}/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['ProfilePost'],
        }),
        addGroupPost: builder.mutation<PostResponse, { author_id: number; data: FormData | string }>({
            query: ({ author_id, data }) => ({
                url: `${API.GROUP}${author_id}/posts/`,
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
        updateGroupPost: builder.mutation<PostTypes, { data: FormData | string; post_id: number; group_id: number }>({
            query: ({ data, post_id, group_id }) => ({
                url: `${API.GROUP}${group_id}/posts/${post_id}/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['GroupPost'],
        }),
    }),
});
export const {
    useAddProfilePostMutation,
    useDeleteProfilePostMutation,
    useUpdateProfilePostMutation,
    useAddGroupPostMutation,
    useDeleteGroupPostMutation,
    useUpdateGroupPostMutation,
    useGetProfilePostsQuery,
} = postsApi;
