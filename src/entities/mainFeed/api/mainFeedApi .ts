import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { PostRequest, PostResponse, PostTypes } from '../types/PostTypes';

export const mainFeedApi = createApi({
    reducerPath: 'mainFeedApi',
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
    tagTypes: ['MainFeedPost'],
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
                result
                    ? [...result.results.map(({ id }) => ({ type: 'MainFeedPost' as const, id })), 'MainFeedPost']
                    : ['MainFeedPost'],
        }),

        updateViewsPost: builder.mutation<PostTypes, { author_id: number; postId: number; views: number }>({
            query: ({ author_id, postId, views }) => ({
                url: `${API.PROFILE}${author_id}/posts/${postId}/`,
                method: 'PATCH',
                body: JSON.stringify({ views: views }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});
export const { useGetFeedPostsQuery, useUpdateViewsPostMutation } = mainFeedApi;
