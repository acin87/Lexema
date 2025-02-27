import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { PostResponse, PostTypes, FileUploadResponse, PostRequest } from '../types/PostTypes';

export const postApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllPosts: builder.query<PostResponse, PostRequest>({
            query: ({ limit = 7, start = 0 }) => ({
                url: API.POSTS,
                params: {
                    _limit: limit,
                    _start: start,
                },
            }),
            providesTags: (result) =>
                result ? [...result.posts.map(({ id }) => ({ type: 'Post' as const, id })), 'Post'] : ['Post'],
        }),
        getPostById: builder.query<PostTypes, number>({
            query: (id: number = 1) => ({
                url: `${API.POSTS}/${id}`,
            }),
        }),
        createPost: builder.mutation<FileUploadResponse, FormData>({
            query: (files: FormData) => ({
                url: API.FILES,
                method: 'POST',
                body: files,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
        }),
    }),
});
export const { useGetAllPostsQuery, useGetPostByIdQuery, useCreatePostMutation } = postApi;
