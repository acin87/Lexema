import { useCallback } from 'react';
import {
    useDeleteAllMessageMutation,
    useMarkAsReadAllMessagesMutation,
    useMarkAsReadMessagesMutation,
    useSendMessageMutation,
} from '../api/messengerApi';

export const useMessageActions = () => {
    const [uploadMessage] = useSendMessageMutation();
    const [deleteMessages] = useDeleteAllMessageMutation();
    const [markAsRead] = useMarkAsReadMessagesMutation();
    const [markAsReadAll] = useMarkAsReadAllMessagesMutation();

    const deleteAllMessages = useCallback(
        async (userId: number) => {
            try {
                await deleteMessages({ recipient_id: userId });
            } catch (error) {
                console.error('Failed to delete all messages:', error);
            }
        },
        [deleteMessages],
    );

    const sendMessage = useCallback(
        async (userId: number, content: string) => {
            try {
                await uploadMessage({ recipient_id: userId, content });
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        },
        [uploadMessage],
    );

    const markMessageAsRead = useCallback(
        async (messageId: number) => {
            try {
                await markAsRead({ message_id: messageId });
            } catch (error) {
                console.error('Failed to mark message as read:', error);
            }
        },
        [markAsRead],
    );

    const markAllMessagesAsRead = useCallback(
        async (userId: number) => {
            try {
                await markAsReadAll({ sender_id: userId });
            } catch (error) {
                console.error('Failed to mark all messages as read:', error);
            }
        },
        [markAsReadAll],
    );

    return {
        deleteAllMessages,
        sendMessage,
        markMessageAsRead,
        markAllMessagesAsRead,
    };
};
