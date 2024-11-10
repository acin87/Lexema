import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../api/api';
import { CommentResponse } from './commntsType';

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
    tagTypes: ['Comment'],
    endpoints: (builder) => ({
        getRootComments: builder.query<CommentResponse, { postId: number }>({
            query: ({ postId }) => ({
                url: `${API.COMMENTS}/post/${postId}`,
                method: 'GET',
                //transformResponse: (response: CommentResponse) => response.comments,
                providesTags: ['Comment'],
            }),
            providesTags: (result) =>
                result
                  ? [...result.comments.map(({ id }) => ({ type: 'Comment' as const, id })), 'Comment']
                  : ['Comment'],
        }),
        getAllRootComments: builder.query<CommentResponse, { postId: number; page: number; limit: number }>({
            query: ({ postId, page, limit }) => ({
                url: `${API.COMMENTS}/post/${postId}`,
                params: {
                    _page: page,
                    _limit: limit,
                },
                method: 'GET',
                providesTags: ['Comment'],
            }),
            providesTags: (result) =>
                result
                  ? [...result.comments.map(({ id }) => ({ type: 'Comment' as const, id })), 'Comment']
                  : ['Comment'],
        }),

        getAllRootCommentsByPostId: builder.query<CommentResponse, { postId: number; page: number }>({
            query: ({ postId }) => ({
                url: `${API.COMMENTS}/post/${postId}`,
                method: 'GET',
                //transformResponse: (response: CommentResponse) => response.comments,
                providesTags: ['Comment'],
            }),
        }),

        getChildComments: builder.query<CommentResponse, { parentId: number; postId: number }>({
            query: ({ parentId, postId }) => ({
                url: `${API.COMMENTS}/post/${postId}`,
                params: {
                    parentId: parentId,
                },
                method: 'GET',
                providesTags: ['Comment'],
            }),
        }),

        getCommentById: builder.query<CommentResponse, { postId: number | undefined }>({
            query: ({ postId = 1 }) => ({
                url: `${API.COMMENTS}/post/${postId}`,
            }),
        }),
        getChildCommentsByPostId: builder.query<CommentResponse, { postId: number; commentId: number }>({
            query: ({ postId = 1, commentId }) => ({
                url: `${API.COMMENTS}/post/${postId}/child`,
                params: {
                    commentId: commentId,
                },
            }),
            providesTags: (result) =>
                result
                    ? [...result.comments.map(({ id }) => ({ type: 'Comment' as const, id })), 'Comment']
                    : ['Comment'],
        }),
        getRootCommentsByPostId: builder.query<CommentResponse, { postId: number }>({
            query: ({ postId = 1 }) => ({
                url: `${API.COMMENTS}/post/${postId}/root`,
            }),
        }),
    }),
});
export const {
    useGetRootCommentsByPostIdQuery,
    useGetRootCommentsQuery,
    useLazyGetChildCommentsQuery,
    useLazyGetAllRootCommentsQuery,
} = commentsApi;
