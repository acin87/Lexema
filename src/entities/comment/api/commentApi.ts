import { createApi } from '@reduxjs/toolkit/query/react';
import { API } from '../../../app/api/ApiConfig';
import { baseQueryWithReauth } from '../../../app/api/Utils';
import { CommentResponse, CommentType } from '../types/commntsType';

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Post', 'Comment', 'CommentList'],
    endpoints: (builder) => ({
        getRootComments: builder.query<CommentResponse, { postId: number; offset: number; limit: number }>({
            query: ({ postId, offset, limit }) => ({
                url: `${API.ROOT_COMMENTS}${postId}/`,
                params: {
                    offset: offset,
                    limit: limit,
                },
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: (result, _error, { postId }) =>
                result
                    ? [
                          ...result.results.map(({ id }: { id: number }) => ({ type: 'Comment' as const, id })),
                          { type: 'Post' as const, id: postId },
                      ]
                    : [{ type: 'Post' as const, id: postId }],
        }),

        getChildComments: builder.query<CommentType[], { parentId: number | undefined; postId: number }>({
            query: ({ parentId, postId }) => ({
                url: `${API.CHILD_COMMENTS}${postId}/${parentId}`,
                method: 'GET',
            }),
            providesTags: (result, _error, { postId }) =>
                result
                    ? [
                          ...result.map(({ id }: { id: number }) => ({ type: 'Comment' as const, id })),
                          { type: 'Post' as const, id: postId },
                      ]
                    : [{ type: 'Post' as const, id: postId }],
        }),
        addComment: builder.mutation<CommentResponse, { fromData: FormData }>({
            //{fromData: {parent_id?: 1, post_id: 1, content: 'test'}}
            query: ({ fromData }) => ({
                url: `${API.COMMENT}`,
                method: 'POST',
                body: fromData,
            }),
            invalidatesTags: (_, __, { fromData }) => {
                const postId = Number(fromData.get('post_id')); // Преобразуем строку в число
                const parentId = fromData.get('parent_id'); // Может быть строкой или null/undefined

                if (!parentId) {
                    // Добавляем комментарий к корневому уровню
                    return [
                        { type: 'Post' as const, id: postId },
                        { type: 'Comment' as const, id: 'ROOT' },
                    ];
                } else {
                    // Добавляем комментарий к дочернему уровню
                    return [
                        { type: 'Post' as const, id: postId },
                        { type: 'Comment' as const, id: Number(parentId) }, // Преобразуем строку в число
                    ];
                }
            },
        }),
        updateComment: builder.mutation<CommentResponse, { fromData: FormData; commentId: number }>({
            query: ({ fromData, commentId }) => ({
                url: `${API.COMMENT}${commentId}/`,
                method: 'PATCH',
                body: fromData,
            }),
            invalidatesTags: ['Comment'],
        }),
        deleteComment: builder.mutation<CommentResponse, { commentId: number }>({
            query: ({ commentId }) => ({
                url: `${API.COMMENT}${commentId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Comment'],
        }),
    }),
});

export const {
    useGetRootCommentsQuery,
    useLazyGetChildCommentsQuery,
    useLazyGetRootCommentsQuery,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = commentsApi;
