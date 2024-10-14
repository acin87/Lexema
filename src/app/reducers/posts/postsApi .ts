import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../../api/api';
import { PostResponse, PostTypes } from './postTypes';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: API.POSTS }),
    tagTypes: ['Posts'],
    endpoints: (bulder) => ({
        fetchAllPosts: bulder.query<PostResponse, { limit: number; skip: number }>({
            query: ({ limit = 7, skip = 0 }) => ({
                url: '/posts',
                params: {
                    limit: limit,
                    skip: skip,
                },
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCacheData, newItems) => {
                const updatedData = [
                    ...currentCacheData.posts.filter(
                        (existingItem) => !newItems.posts.some((newItem) => newItem.id === existingItem.id)
                    ),
                    ...newItems.posts,
                ];
                return {
                    posts: updatedData,
                    limit: newItems.limit,
                    skip: newItems.skip,
                };
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
    }),
});
export const { useFetchAllPostsQuery, useFetchPostByIdQuery } = postsApi;
