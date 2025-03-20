import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { FileUploadResponse, PostRequest, PostResponse, PostTypes } from '../types/PostTypes';

export const postApi = createApi({
    reducerPath: 'postsApi',
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
    tagTypes: ['Post', 'FeedPost'],
    endpoints: (builder) => ({
        getFeedPosts: builder.query<PostResponse, PostRequest>({
            query: ({ limit = 7, offset = 0 }) => ({
                url: API.FEED,
                method: 'GET',
                params: {
                    limit: limit,
                    offset: offset,
                },
            }),
            providesTags: (result) =>
                result ? [...result.results.map(({ id }) => ({ type: 'FeedPost' as const, id })), 'FeedPost'] : ['FeedPost'],
        }),

        getPostById: builder.query<PostTypes, number>({
            query: (id: number = 1) => ({
                url: `${API.POSTS}/${id}/`,
                method: 'GET',
            }),
        }),
        addPost: builder.mutation<FileUploadResponse, FormData>({
            query: (files: FormData) => ({
                url: API.POSTS,
                method: 'POST',
                body: files,
            }),
            invalidatesTags: ['Post'],
        }),
        deletePost: builder.mutation<PostTypes, { postId: number }>({
            query: ({ postId }) => ({
                url: `${API.POSTS}${postId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),
        updatePost: builder.mutation<PostTypes, { formData: FormData | object; post_id: number }>({
            query: ({ formData, post_id }) => ({
                url: `${API.POSTS}${post_id}/`,
                method: 'PATCH',
                body: JSON.stringify(formData),
            }),
            invalidatesTags: ['Post', 'FeedPost'],
        }),
        updateViewsPost: builder.mutation<PostTypes, { postId: number, views: number }>({
            query: ({ postId, views }) => ({
                url: `${API.POSTS}${postId}/`,
                method: 'PATCH',
                body: JSON.stringify({ views: views }),
            }),
        }),
       
    }),
});
export const {
    useGetPostByIdQuery,
    useGetFeedPostsQuery,
    useAddPostMutation,
    useDeletePostMutation,
    useUpdatePostMutation,
    useUpdateViewsPostMutation,
} = postApi;
