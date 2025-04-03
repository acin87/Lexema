import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { MessagesResponse } from '../types/MessengerTypes';

export const messengerApi = createApi({
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
    reducerPath: 'messengerApi',
    tagTypes: ['Dialogues'],
    endpoints: (builder) => ({
        getDialogues: builder.query<MessagesResponse, void>({
            query: () => ({
                url: `${API.MESSENGER}-latest/`,
                method: 'GET',
            }),
            providesTags: ['Dialogues'],
        }),
    }),
});
export const { useGetDialoguesQuery } = messengerApi;
