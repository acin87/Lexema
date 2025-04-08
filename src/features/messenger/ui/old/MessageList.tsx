import { Avatar, Box, Divider } from '@mui/material';
import cn from 'classnames';
import { FC, memo, ReactNode, useCallback, useEffect } from 'react';
import useCustomScrollBar from '../../../../shared/hooks/useCustomScrollBar';
import { loadState } from '../../../../shared/utils/LocalStorage';
import { useGetMessagesBySenderIdQuery } from '../../api/messengerApi';
import { MESSANGER_STORAGE_KEY, MessengerState } from '../../types/MessengerTypes';
import AddMessage from '../AddMessage';
import MessageItem from '../MessageItem';
import styles from './Chat.module.css';

interface MessangerListProps {
    userId: number;
    avatar: string | undefined;
}

const MessangerList: FC<MessangerListProps> = ({ userId, avatar }) => {
    const { contentRef, listRef, scrollBar } = useCustomScrollBar();
    const { data: messages } = useGetMessagesBySenderIdQuery({
        sender_id: userId || loadState<MessengerState>(MESSANGER_STORAGE_KEY)?.lastDialoguesSenderId,
    });
    useEffect(() => {
        if (contentRef.current && messages) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [contentRef, messages]);

    const getDayLabel = useCallback((timestamp: string | Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const messageDate = new Date(timestamp);
        messageDate.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - messageDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Сегодня';
        if (diffDays === 1) return 'Вчера';

        return messageDate.toLocaleDateString();
    }, []);

    return (
        <Box sx={{ flex: '0 0 auto', width: '65%', py: 1, position: 'relative' }}>
            <Box
                className={cn(styles.flex, styles.justifyContentStart, styles.alignItemsCenter)}
                sx={{ width: '100%', py: 1, px: 2 }}
            >
                <Avatar src={avatar || loadState<MessengerState>(MESSANGER_STORAGE_KEY)?.avatarUrl} />
            </Box>
            <Divider />
            <Box className={styles.chatScrollWrapper} sx={{ '& > div': { pb: '110px' } }}>
                <Box className={styles.chatScrollContainer} ref={contentRef}>
                    <Box ref={listRef} sx={{ width: '100%', overflow: 'hidden', position: 'static' }} className="list">
                        {messages?.reduce<ReactNode[]>((acc, message, index, array) => {
                            const currentDate = new Date(message.timestamp).toDateString();
                            const prevDate = index > 0 ? new Date(array[index - 1].timestamp).toDateString() : null;

                            if (index === 0 || currentDate !== prevDate) {
                                acc.push(
                                    <Divider key={`divider-${message.id}`}>{getDayLabel(message.timestamp)}</Divider>,
                                );
                            }
                            acc.push(
                                <MessageItem
                                    key={message.id}
                                    content={message.content}
                                    sender={message.sender}
                                    timestamp={message.timestamp}
                                    avatar={message.sender.avatar}
                                />,
                            );
                            return acc;
                        }, [])}
                    </Box>
                </Box>

                {scrollBar}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'background.paper',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    borderTop: '1px solid',
                    borderTopColor: 'secondary.light',
                }}
            >
                <AddMessage recipient_id={userId} />
            </Box>
        </Box>
    );
};

export default memo(MessangerList);
