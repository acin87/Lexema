import { createApi } from '@reduxjs/toolkit/query/react';
import { API } from '../../../app/api/ApiConfig';
import { baseQueryWithReauth } from '../../../app/api/Utils';
import { GalleryResponse, Profile } from '../types/ProfileTypes';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['ProfilePost', 'Post', 'Profile'],
    endpoints: (builder) => ({
        getProfile: builder.query<Profile, { id: number }>({
            query: ({ id }) => ({
                url: `/${API.PROFILE}${id}/`,
                method: 'GET',
            }),
            providesTags: (result) => [{ type: 'Profile', id: result?.id }],
        }),
        getMyProfile: builder.query<Profile, { accessToken: string }>({
            query: ({ accessToken }) => ({
                url: `/${API.ME}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
            providesTags: (result) => [{ type: 'Profile', id: result?.id }],
        }),
        updateProfile: builder.mutation<Profile, { id: number; data: FormData }>({
            query: ({ id, data }) => ({
                url: `/${API.PROFILE}${id}/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Profile'],
        }),
        getGalleryItems: builder.query<GalleryResponse, void>({
            query: () => ({
                url: `/${API.GALLERY}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetProfileQuery, useGetMyProfileQuery, useUpdateProfileMutation, useGetGalleryItemsQuery } =
    profileApi;
