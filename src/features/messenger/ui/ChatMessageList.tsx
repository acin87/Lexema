import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider, IconButton } from '@mui/material';
import cn from 'classnames';
import { memo, ReactNode, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCustomScrollBar from '../../../shared/hooks/useCustomScrollBar';
import { useGetMessagesBySenderIdQuery } from '../api/messengerApi';
import AddMessage from './AddMessage';
import styles from './Chat.module.css';
import MessageItem from './MessageItem';

/**
 * Компонент сообщений чата
 * @returns JSX.Element
 */
const ChatMessageList = () => {
    const { dialoguesId } = useParams();
    const { contentRef, listRef, scrollBar } = useCustomScrollBar();
    const navigate = useNavigate();
    const { data: messages } = useGetMessagesBySenderIdQuery({
        sender_id: Number(dialoguesId),
    });
    useEffect(() => {
        if (contentRef.current && listRef.current && messages) {
            contentRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [contentRef, messages, listRef]);

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
        <>
            <Box
                className={cn(
                    styles.flex,
                    styles.alignItemsCenter,
                    styles.justifyContentSpaceBetween,
                    styles.chatFeature__header,
                )}
            >
                <CloseIcon sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={() => navigate('/messenger/')} />

                <IconButton size="small">
                    <AddCircleIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
                </IconButton>
            </Box>
            <Divider variant="fullWidth" component="div" />
            <Box className={cn(styles.chatScrollWrapper)}>
                <Box className={styles.chatScrollContainer} ref={contentRef}>
                    <Box ref={listRef} sx={{ width: '100%', overflow: 'hidden' }} className="list">
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
                <AddMessage recipient_id={Number(dialoguesId)} />
            </Box>
        </>
    );
};

export default memo(ChatMessageList);
