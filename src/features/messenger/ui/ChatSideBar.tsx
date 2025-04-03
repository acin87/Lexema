import { Avatar, AvatarGroup, Box, List, SxProps, Typography } from '@mui/material';
import { FC } from 'react';
import useCustomScrollBar from '../../../shared/hooks/useCustomScrollBar';
import { Message } from '../types/MessengerTypes';
import MessagePanelItem from './ChatListItem';

const dialoguePanel: SxProps = {
    borderRight: '1px solid #eaeaea',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
    height: '100%',
    flexShrink: 0,
    width: '35%',
    zIndex: 1,
};

interface MessangerPanelProps {
    messages: Message[] | undefined;
    count: number | undefined;
}

const MessangerPanel: FC<MessangerPanelProps> = ({ messages }) => {
    const { contentRef, listRef, scrollBar } = useCustomScrollBar();

    return (
        <Box sx={{ ...dialoguePanel }}>
            <Box
                component="header"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '65px',
                    p: '0 1.25rem',
                    borderBottom: '1px solid #eaeaea',
                }}
            >
                <Typography variant="h6">Чат</Typography>
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    flex: 1,
                    overflow: 'hidden',
                    p: '1.25rem',
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        p: '17.5px',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden scroll',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                    ref={contentRef}
                >
                    <Box ref={listRef}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                component="span"
                                fontSize=".825rem"
                                color="primary.main"
                                fontWeight="500"
                                sx={{ mb: 1 }}
                            >
                                Частые контакты
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    mb: 1,
                                }}
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

                        <List sx={{ display: 'flex', flexDirection: 'column', margin: '0 -0.8rem' }}>
                            {messages?.map((message) => <MessagePanelItem key={message.id} message={message} />)}
                        </List>
                    </Box>
                </Box>
                {scrollBar}
            </Box>
        </Box>
    );
};

export default MessangerPanel;
