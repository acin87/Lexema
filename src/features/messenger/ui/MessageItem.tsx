import { Avatar, Box, Divider, Fade, Typography } from '@mui/material';
import cn from 'classnames';
import { FC, memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../entities/user/slice/userSlice';
import { User } from '../../../entities/user/types/UserTypes';
import { formatTimeAgo } from '../../../shared/utils/FormatTimeAgo';
import styles from './Chat.module.css';
import MessageSkeleton from './MessageSkeleton';

interface MessageItemProps {
    content: string | undefined;
    sender: Pick<User, 'id' | 'full_name'>;
    timestamp: string | undefined;
    avatar: string | undefined;
}


/**
 * Компонент для отображения сообщения в чате
 * @param content - текст сообщения
 * @param sender - отправитель сообщения
 * @param timestamp - время отправки сообщения
 * @param avatar - аватар отправителя
 * @returns JSX.Element
 */
const MessageItem: FC<MessageItemProps> = ({ content, sender, timestamp, avatar }) => {
    const user_id = useSelector(selectUserId);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isDeleting = false;

    useEffect(() => {
        setIsLoading(true);
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 300);
        return () => clearTimeout(timeout);
    }, []);
    const isSender = sender.id === user_id;

    if (isLoading) {
        return <MessageSkeleton sender={isSender} />;
    }

    return (
        <Fade in={!isDeleting} timeout={300}>
            <Box sx={{ display: 'flex', width: '100%', mb: 1, p: 3, gap: 2 }}>
                {isSender && (
                    <Box className={cn(styles.flex, styles.alignItemsStart)}>
                        <Avatar src={avatar} />
                    </Box>
                )}
                <Box
                    className={cn(styles.flex, styles.col, styles.justifyContentCenter, styles.chatMessageWrapper)}
                    sx={{ backgroundColor: 'secondary.light' }}
                >
                    <Box
                        className={cn(styles.flex, styles.alignItemsCenter, styles.justifyContentSpaceBetween)}
                        sx={{ width: '100%', p: 1, px: 2 }}
                    >
                        {isSender ? (
                            <>
                                <Typography variant="body2">{sender.full_name} </Typography>
                                <Typography variant="subtitle2">{timestamp && formatTimeAgo(timestamp)} </Typography>
                            </>
                        ) : (
                            <>
                                <Typography variant="subtitle2">{timestamp && formatTimeAgo(timestamp)} </Typography>
                                <Typography variant="body2">{sender.full_name} </Typography>
                            </>
                        )}
                    </Box>
                    <Divider variant="fullWidth" sx={{ borderColor: 'rgb(0 0 0 / 25%)', width: '100%' }} />
                    <Box sx={{ p: 2 }}>
                        <Typography variant="body2" component="p">
                            {content}
                        </Typography>
                    </Box>
                </Box>
                {!isSender && (
                    <Box
                        sx={{ display: 'flex', alignItems: 'flex-start' }}
                        className={cn(styles.flex, styles.alignItemsStart)}
                    >
                        <Avatar src={avatar} />
                    </Box>
                )}
            </Box>
        </Fade>
    );
};

export default memo(MessageItem);
