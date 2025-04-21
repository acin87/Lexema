import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material';
import cn from 'classnames';
import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../app/store/store';
import { selectUserId } from '../../../entities/user/slice/userSlice';
import useCustomScrollBar from '../../../shared/hooks/useCustomScrollBar';
import { selectNotificationsBySenderId } from '../../notifications/slice/notificationsSlice';
import { useGetMessagesBySenderIdQuery } from '../api/messengerApi';
import { useLabelDay } from '../hooks/useLabelDay';
import { useMessageActions } from '../hooks/useMessageActions';
import AddMessage from './AddMessage';
import styles from './Chat.module.css';
import MessageItem from './MessageItem';

/**
 * Компонент сообщений чата
 * @returns JSX.Element
 */
const ChatMessageList: FC = () => {
    const { dialoguesId } = useParams();
    const { contentRef, listRef, scrollBar } = useCustomScrollBar();
    const getDayLabel = useLabelDay();
    const navigate = useNavigate();
    const notifications = useSelector((state: RootState) => selectNotificationsBySenderId(state, Number(dialoguesId)));
    const { data: messages, refetch } = useGetMessagesBySenderIdQuery({
        sender_id: Number(dialoguesId),
    });
    const userId = useSelector(selectUserId);

    const { markAllMessagesAsRead } = useMessageActions();

    useEffect(() => {
        // Прокручиваем вниз при первой загрузке сообщений
        if (contentRef.current && listRef.current && messages) {
            contentRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [contentRef, messages, listRef]);

    useEffect(() => {
        // Если есть непрочитанные сообщения, помечаем их как прочитанные
        if (dialoguesId) {
            const unreadMessages = messages?.filter((message) => !message.is_read && message.sender.id !== userId);
            if (unreadMessages && unreadMessages.length > 0) {
                markAllMessagesAsRead(Number(dialoguesId));
            }
        }
    }, [dialoguesId, markAllMessagesAsRead, messages, userId]);

    useEffect(() => {
        // Если есть новые уведомления, обновляем сообщения
        // и прокручиваем вниз
        if (notifications && notifications.length > 0) {
            const unreadNotifications = notifications.filter(
                (notification) => notification.notification_type.code === 'new_message',
            );
            if (unreadNotifications.length > 0) {
                refetch();
            }
        }
    }, [notifications, refetch]);

    return (
        <>
            <Box
                className={cn(
                    styles.flex,
                    styles.alignItemsCenter,
                    styles.justifyContentSpaceBetween,
                    styles.chatFeature__header,
                )}
                component={'header'}
            >
                <CloseIcon sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={() => navigate('/messenger/')} />
                <Box
                    className={cn(styles.flex, styles.alignItemsCenter, styles.justifyContentStart)}
                    sx={{ gap: 1, flexGrow: 1, ml: 2 }}
                >
                    <Avatar
                        src={messages && messages[0] ? messages[0].sender.avatar : ''}
                        sx={{ width: 42, height: 42, mr: 1 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Typography component="span" fontSize=".875rem">
                                {messages && messages[0] ? messages[0].sender.full_name : ''}
                            </Typography>
                            <Typography component="span" fontSize=".875rem" color="text.secondary">
                                ({messages && messages[0] ? messages[0].sender.username : ''})
                            </Typography>
                        </Box>
                        <Typography
                            component="span"
                            fontSize="0.875rem"
                            color="text.secondary"
                            className={styles.typing}
                        >
                            печатает
                            <Box className={styles.typingDots}>
                                <span>.</span>
                                <span>.</span>
                                <span>.</span>
                            </Box>
                        </Typography>
                    </Box>
                </Box>

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

export default ChatMessageList;
