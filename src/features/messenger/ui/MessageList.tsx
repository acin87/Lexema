import { Box, Divider, List, Paper } from '@mui/material';
import { FC } from 'react';
import useCustomScrollBar from '../../../shared/hooks/useCustomScrollBar';
import { Message } from '../types/MessengerTypes';
import MessageListItem from './MessageListItem';

interface MessangerListProps {
    messages: Message[] | undefined;
    count: number | undefined;
}

const MessangerList: FC<MessangerListProps> = ({ messages }) => {
    const { contentRef, listRef, scrollBar } = useCustomScrollBar();

    return (
        <Paper sx={{ flex: '0 0 auto', width: '65%', py: 1, position: 'relative', boxShadow: 'none' }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pb: 3,
                    pt: 1,
                }}
            >
                {/*автоар с пагинацией */}+++++
            </Box>
            <Divider />
            <Box
                sx={{
                    position: 'relative',
                    flex: 1,
                    overflow: 'hidden',
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
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
                    <List
                        sx={{ display: 'inline-block', width: '100%', overflow: 'hidden', position: 'static' }}
                        ref={listRef}
                    >
                        {messages?.map((message) => (
                            <MessageListItem
                                key={message.id}
                                content={message.content}
                                sender={message.sender}
                                timestamp={message.timestamp}
                                avatar={message.sender.avatar}
                            />
                        ))}
                    </List>
                </Box>
                {scrollBar}
            </Box>
        </Paper>
    );
};

export default MessangerList;
