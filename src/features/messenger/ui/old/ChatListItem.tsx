import { Avatar, Box, Chip, ListItem, Typography } from '@mui/material';
import { FC } from 'react';
import { User } from '../../../../entities/user/types/UserTypes';
import { formatTimeAgo } from '../../../../shared/utils/FormatTimeAgo';

interface ChatListItemProps {
    short_content: string | undefined;
    sender: Pick<User, 'id' | 'full_name'>;
    timestamp: string | undefined;
    avatar: string | undefined;
    unread_count: number;
    onClick: (sender_id: number, avatar: string | undefined) => void;
}

const ChatListItem: FC<ChatListItemProps> = ({ short_content, sender, timestamp, avatar, unread_count, onClick }) => {
    return (
        <ListItem
            sx={{
                p: 0,
                marginBottom: '.25rem',
                ':hover': { backgroundColor: 'secondary.light' },
                minWidth: 0,
                '&:not(:last-child)': { borderBottom: '1px solid #50b5ff' },
                transition: '.2s ease',
            }}
            onClick={() => onClick(sender.id, avatar)}
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
                <Avatar
                    sizes="small"
                    sx={{ mr: 1, width: '42px', height: '42px' }}
                    src={avatar}
                    alt={sender.full_name}
                ></Avatar>
                <Box sx={{ ml: '.5rem', display: 'flex', minWidth: 0, flex: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                        <Typography component="div" variant="subtitle1" sx={{ fontWeight: 500, mb: '.25rem' }}>
                            {sender.full_name}
                        </Typography>
                        <Typography
                            component="div"
                            variant="subtitle2"
                            sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                        >
                            {short_content}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexFlow: 'column',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            width: '4.5rem',
                        }}
                    >
                        <Typography variant="caption">{timestamp && formatTimeAgo(timestamp, false)} </Typography>
                        <Chip label={unread_count} size="small" color="primary" />
                    </Box>
                </Box>
            </Box>
        </ListItem>
    );
};

export default ChatListItem;
