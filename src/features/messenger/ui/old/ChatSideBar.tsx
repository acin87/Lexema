import { Avatar, AvatarGroup, Box, List, Typography } from '@mui/material';
import cn from 'classnames';
import { FC, memo } from 'react';
import useCustomScrollBar from '../../../../shared/hooks/useCustomScrollBar';
import { MessagesResponse } from '../../types/MessengerTypes';
import styles from './Chat.module.css';
import ChatListItem from './ChatListItem';

interface ChatSideBarProps {
    onLoadMessages: (sender_id: number, avatar: string | undefined) => void;
    dialogues: MessagesResponse | undefined;
}

const ChatSideBar: FC<ChatSideBarProps> = ({ onLoadMessages, dialogues }) => {
    const { contentRef, listRef, scrollBar } = useCustomScrollBar();

    return (
        <Box className={cn(styles.flex, styles.col, styles.chatSidebar)}>
            <Box
                className={cn(
                    styles.flex,
                    styles.justifyContentStart,
                    styles.alignItemsCenter,
                    styles.chatSidebar__header,
                )}
            >
                <Typography variant="h6">Чат</Typography>
            </Box>
            <Box className={styles.chatScrollWrapper}>
                <Box className={styles.chatScrollContainer} ref={contentRef}>
                    <Box ref={listRef}>
                        <Box className={cn(styles.flex, styles.col)}>
                            <Typography fontSize=".825rem" color="primary.main" fontWeight="500" sx={{ mb: 1 }}>
                                Частые контакты
                            </Typography>
                            <Box
                                className={cn(styles.flex, styles.alignItemsCenter, styles.justifyContentCenter)}
                                sx={{ mb: 1 }}
                            >
                                <AvatarGroup max={5} spacing={1}>
                                    <Avatar alt="Remy Sharp" src="/public/user/1.jpg" />
                                    <Avatar alt="Travis Howard" src="/public/user/02.jpg" />
                                    <Avatar alt="Cindy Baker" src="/public/user/03.jpg" />
                                    <Avatar alt="Cindy Baker" src="/public/user/4.jpg" />
                                    <Avatar alt="Cindy Baker" src="/public/user/05.jpg" />
                                </AvatarGroup>
                            </Box>
                        </Box>

                        <List className={cn(styles.flex, styles.col)} sx={{ margin: '0 -0.8rem' }}>
                            {dialogues?.results.map((message) => (
                                <ChatListItem
                                    key={message.id}
                                    sender={message.sender}
                                    short_content={message.short_content}
                                    timestamp={message.timestamp}
                                    avatar={message.sender.avatar}
                                    unread_count={message.unread_count}
                                    onClick={onLoadMessages}
                                />
                            ))}
                        </List>
                    </Box>
                </Box>
                {scrollBar}
            </Box>
        </Box>
    );
};

export default memo(ChatSideBar);
