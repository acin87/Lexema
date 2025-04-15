import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { Message, MessagesResponse } from '../types/MessengerTypes';

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
        getMessagesBySenderId: builder.query<Message[], { sender_id: number | undefined }>({
            query: ({ sender_id }) => ({
                url: `${API.MESSENGER}/`,
                method: 'GET',
                params: {
                    sender_id,
                },
            }),
            providesTags: ['Messages'],
        }),
        sendMessage: builder.mutation<Message, { recipient_id: number | undefined; content: string }>({
            query: ({ recipient_id, content }) => ({
                url: `${API.MESSENGER}/send_message/`,
                method: 'POST',
                body: {
                    recipient_id,
                    content,
                },
            }),
            invalidatesTags: ['Messages'],
        }),
        deleteAllMessage: builder.mutation<void, { recipient_id: number }>({
            query: ({ recipient_id }) => ({
                url: `${API.MESSENGER}/delete_all_messages/`,
                method: 'DELETE',
                body: {
                        recipient_id : recipient_id,
                },
            }),
            invalidatesTags: ['Messages'],
        }),
        markAsReadMessages: builder.mutation<void, { message_id: number }>({
            query: ({ message_id }) => ({
                url: `${API.MESSENGER}/${message_id} /mark_as_read/`,
                method: 'POST',
            }),
            invalidatesTags: ['Messages'],
        }),        
    }),
});
export const {
    useGetDialoguesQuery,
    useGetMessagesBySenderIdQuery,
    useLazyGetMessagesBySenderIdQuery,
    useSendMessageMutation,
    useDeleteAllMessageMutation,
    useMarkAsReadMessagesMutation,
} = messengerApi;
