import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { PostResponse, PostTypes, FileUploadResponse } from '../types/PostTypes';

export const postApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllPosts: builder.query<PostResponse, { limit: number; start: number }>({
            query: ({ limit = 7, start = 0 }) => ({
                url: API.POSTS,
                params: {
                    _limit: limit,
                    _start: start,
                },
            }),
            providesTags: (result) =>
                result ? [...result.posts.map(({ id }) => ({ type: 'Post' as const, id })), 'Post'] : ['Post'],
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCacheData, newItems) => {
                const updatedData = [
                    ...currentCacheData.posts.filter(
                        (existingItem) => !newItems.posts.some((newItem) => newItem.id === existingItem.id),
                    ),
                    ...newItems.posts,
                ];
                return { posts: updatedData };
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
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
