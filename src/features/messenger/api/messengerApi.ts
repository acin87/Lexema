import { createApi } from '@reduxjs/toolkit/query/react';
import { API } from '../../../app/api/ApiConfig';
import { baseQueryWithReauth } from '../../../app/api/Utils';
import { Message, MessagesResponse } from '../types/MessengerTypes';

export const messengerApi = createApi({
    baseQuery: baseQueryWithReauth,
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
            providesTags: ['Messages', 'Dialogues'],
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
            invalidatesTags: ['Dialogues', 'Messages'],
        }),
        deleteAllMessage: builder.mutation<void, { recipient_id: number }>({
            query: ({ recipient_id }) => ({
                url: `${API.MESSENGER}/delete_all_messages/`,
                method: 'DELETE',
                body: {
                    recipient_id: recipient_id,
                },
            }),
            invalidatesTags: ['Dialogues', 'Messages'],
        }),
        markAsReadMessages: builder.mutation<void, { message_id: number }>({
            query: ({ message_id }) => ({
                url: `${API.MESSENGER}/${message_id} /mark_as_read/`,
                method: 'POST',
            }),
            invalidatesTags: ['Messages'],
        }),
        markAsReadAllMessages: builder.mutation<void, { sender_id: number }>({
            query: ({ sender_id }) => ({
                url: `${API.MESSENGER}/mark_as_read_all_messages/`,
                method: 'POST',
                body: {
                    sender_id: sender_id,
                },
            }),
            invalidatesTags: ['Dialogues'],
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
    useMarkAsReadAllMessagesMutation,
} = messengerApi;
