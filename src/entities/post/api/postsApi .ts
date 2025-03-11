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
            }
            return headers;
        },
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllPosts: builder.query<PostResponse, PostRequest>({
            query: ({ limit = 7, offset = 0, author }) => ({
                url: API.POSTS,
                method: 'GET',
                params: {
                    author: author,
                    limit: limit,
                    offset: offset,
                },
            }),
            providesTags: (result) =>
                result ? [...result.results.map(({ id }) => ({ type: 'Post' as const, id })), 'Post'] : ['Post'],
        }),
        getPostById: builder.query<PostTypes, number>({
            query: (id: number = 1) => ({
                url: `${API.POSTS}/${id}/`,
                method: 'GET',
            }),
        }),
        createPost: builder.mutation<FileUploadResponse, FormData>({
            query: (files: FormData) => ({
                url: API.POSTS,
                method: 'POST',
                body: files,
                headers: {},
            }),
            invalidatesTags: ['Post'],
        }),
    }),
});
export const { useGetAllPostsQuery, useGetPostByIdQuery, useCreatePostMutation } = postApi;
