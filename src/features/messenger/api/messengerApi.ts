import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { User } from '../../friends/types/User';
import { DialoguesResponse } from '../types/MessengerTypes';

export const messengerApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
    reducerPath: 'messengerApi',
    tagTypes: ['Dialogues'],
    endpoints: (builder) => ({
        getDialogues: builder.query<DialoguesResponse, Pick<User, 'id'>>({
            query: ({ id }) => ({
                url: API.MESSENGER,
                params: {
                    id,
                },
                method: 'GET',
            }),
            providesTags: ['Dialogues'],
        }),
    }),
});
export const { useGetDialoguesQuery } = messengerApi;
