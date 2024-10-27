import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../api/api';
import { CommentResponse, PostResponse, PostTypes } from './postTypes';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: API.POSTS }),
    tagTypes: ['Post', 'Comment'],
    endpoints: (bulder) => ({
        fetchAllPosts: bulder.query<PostResponse, { limit: number; start: number }>({
            query: ({ limit = 7, start = 0 }) => ({
                url: '/posts',
                params: {
                    _limit: limit,
                    _start: start,
                },
            }),
            // providesTags: (result) =>
            //     result
            //         ? [...result.posts.map(({ id }) => ({ type: 'Post' as const, id })), 'Post']
            //         : ['Post'],
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCacheData, newItems) => {
                const updatedData = [
                    ...currentCacheData.posts.filter(
                        (existingItem) =>
                            !newItems.posts.some((newItem) => newItem.id === existingItem.id),
                    ),
                    ...newItems.posts,
                ];
                return { posts: updatedData };
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
        fetchPostById: bulder.query<PostTypes, number>({
            query: (id: number = 1) => ({
                url: `/posts/${id}`,
            }),
        }),
        fetchCommentById: bulder.query<CommentResponse, { postId: number | undefined }>({
            query: ({ postId = 1 }) => ({
                url: `/comments/post/${postId}`,
            }),
        }),
    }),
});
export const { useFetchAllPostsQuery, useFetchPostByIdQuery, useFetchCommentByIdQuery } = postsApi;
