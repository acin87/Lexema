import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { Profile } from '../types/ProfileTypes';

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
    tagTypes: ['ProfilePost', 'Post'],
    endpoints: (builder) => ({
        getProfile: builder.query<Profile, { id: number }>({
            query: ({ id }) => ({
                url: `/${API.PROFILE}${id}/`,
                method: 'GET',
            }),
        }),
        getMyProfile: builder.query<Profile, { accessToken: string }>({
            query: ({ accessToken }) => ({
                url: `/${API.ME}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),
    }),
});

export const { useGetProfileQuery, useGetMyProfileQuery } = profileApi;
