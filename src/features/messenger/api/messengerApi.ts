import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { Message, MessagesResponse } from '../types/MessengerTypes';
import { send } from 'vite';

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
    tagTypes: ['Dialogues', 'Messages'],
    endpoints: (builder) => ({
        getDialogues: builder.query<MessagesResponse, void>({
            query: () => ({
                url: `${API.MESSENGER}-latest/`,
                method: 'GET',
            }),
            providesTags: ['Dialogues'],
        }),
        getMessagesBySenderId: builder.query<Message[], {sender_id: number | undefined}>({
            query: ({sender_id}) => ({
                url: `${API.MESSENGER}/`,
                method: 'GET',
                params: {
                    sender_id,
                },
            }),
            providesTags: ['Messages'],
        }),
        sendMessage: builder.mutation<Message, {recipient_id: number | undefined, content: string}>({
            query: ({recipient_id, content}) => ({
                url: `${API.MESSENGER}/send_message/`,
                method: 'POST',
                body: {
                    recipient_id,
                    content,
                },
            }),
            invalidatesTags: ['Messages'],
        }),
    }),
});
export const { useGetDialoguesQuery, useGetMessagesBySenderIdQuery, useLazyGetMessagesBySenderIdQuery, useSendMessageMutation } = messengerApi;
