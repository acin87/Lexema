import { createApi, fetchBaseQuery, TagDescription } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { CommentResponse, CommentType } from '../types/commntsType';
import { getParentId } from '../hooks/useChildComment';




/**
 * Функция для получения родительского ID комментария
 * 
 * @param id - ID комментария
 * @param comments - массив комментариев
 * @returns родительский ID комментария или undefined, если комментарий не найден
 */

export const getParentId = (id: string, comments: CommentType[]) => {
    const parentId = comments.find((comment) => comment.id === Number(id));
    return parentId?.parent_id;
};


export const commentsApi = createApi({
    reducerPath: 'commentsApi',
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
    tagTypes: ['Post', 'Comment'],
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
                providesTags: (result: CommentType[]) =>
                    result
                      ? [
                          ...result.map(({ id }: { id: number }) => ({ type: 'Comment' as const, id })),
                          { type: 'Post' as const, id: postId },
                        ]
                      : [{ type: 'Post' as const, id: postId }],
            }),
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
                let parentId = fromData.get('parent_id'); // Может быть строкой или null/undefined


                const tagsToInvalidate = [];
        
                if (parentId) {
                  // Рекурсивно идём вверх по дереву комментариев, чтобы инвалидировать все предки
                  tagsToInvalidate.push({ type: 'Comment' as const, id: Number(parentId) });
                  while (parentId !== null && typeof parentId === 'string') {
                    const currentParentId:string = parentId;
                    parentId = getParentId(currentParentId); // Предполагаем, что такая функция существует
                    if (parentId !== null) {
                      tagsToInvalidate.push({ type: 'Comment' as const, id: Number(parentId) });
                    }
                  }
                }
        
                // Всегда инвалируем пост и корень комментариев
                tagsToInvalidate.push({ type: 'Post' as const, id: postId });
                tagsToInvalidate.push({ type: 'Comment' as const, id: 'ROOT' });
        
                return tagsToInvalidate;
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
