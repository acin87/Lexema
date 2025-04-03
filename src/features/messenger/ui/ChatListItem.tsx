import { Avatar, Box, Chip, ListItem, Typography } from '@mui/material';
import { FC } from 'react';
import { formatTimeAgo } from '../../../shared/utils/FormatTimeAgo';
import { Message } from '../types/MessengerTypes';

interface ChatListItemProps {
    message: Message;
}

const ChatListItem: FC<ChatListItemProps> = ({ message }) => {
    return (
        <ListItem
            sx={{
                p: 0,
                marginBottom: '.25rem',
                ':hover': { backgroundColor: '#f2f2f2' },
                minWidth: 0,
                '&:not(:last-child)': { borderBottom: '1px solid #50b5ff' },
                transition: '.2s ease'
            }}
        >
            <Box
                sx={{
                    p: '.75rem .8rem',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderRadius: '.5rem',
                    minWidth: 0,
                    transition: '.2s ease',
                }}
            >
                <Avatar sizes="small" sx={{ mr: 1, width: '42px', height: '42px' }} ></Avatar>
                <Box sx={{ ml: '.5rem', display: 'flex', minWidth: 0, flex: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                        <Typography component="div" variant="subtitle1" sx={{ fontWeight: 500, mb: '.25rem' }}>
                            {message.sender.full_name}
                        </Typography>
                        <Typography
                            component="div"
                            variant="subtitle2"
                            sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                        >
                            {message.short_content}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexFlow: 'column', alignItems: 'flex-end', justifyContent: 'space-between', width: '4.5rem'}}>
                        <Typography variant='caption'>{formatTimeAgo(message.timestamp, false)} </Typography>
                        <Chip label={message.unread_count} size="small" color="primary" />
                    </Box>
                </Box>
            </Box>
        </ListItem>
    );
};

export default ChatListItem;
