import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { Profile, WallPostRequest } from '../types/ProfileTypes';
import { PostResponse } from '../../post/types/PostTypes';

export const profileApi = createApi({
    reducerPath: 'profileApi',
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
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getProfile: builder.query<Profile, { id: number }>({
            query: ({ id }) =>( {
              url:  `/${API.PROFILE}${id}/`,
              method: 'GET',
            }),
        }),
        getWallPosts: builder.query<PostResponse, WallPostRequest>({
            query: ({ id, limit, offset }) => ({
                url: `/${API.POSTS}`,
                method: 'GET',
                params: { id, limit, offset },
            }),
            providesTags: (result) =>
                result ? [...result.results.map(({ id }: { id: number }) => ({ type: 'Post' as const, id })), 'Post'] : ['Post'],
        }),
    }),
});

export const { useGetProfileQuery, useGetWallPostsQuery } = profileApi;
