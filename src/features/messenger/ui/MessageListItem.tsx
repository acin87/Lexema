import { Avatar, Box, Divider, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { User } from '../../../entities/user/types/UserTypes';
import { formatTimeAgo } from '../../../shared/utils/FormatTimeAgo';

interface MessageListItemProps {
    content: string | undefined;
    sender: Pick<User, 'id' | 'full_name'>;
    timestamp: string | undefined;
    avatar: string | undefined;
}

const MessageListItem: FC<MessageListItemProps> = ({ content, sender, timestamp }) => {
    const [show, setShow] = useState(false);
    return (
        <Box onClick={() => setShow(true)} sx={{ display: 'flex', width: '100%', mb: 1, p: 3, gap: 2 }}>
            {/*Загружать профиль*/}
            <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
                <Avatar />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'secondary.light',
                    borderRadius: '5px',
                }}
            >
                <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', p: 1, px: 2 }}
                >
                    <Typography variant="body2">{sender.full_name} </Typography>
                    <Typography variant="body2">{timestamp && formatTimeAgo(timestamp)} </Typography>
                </Box>
                <Divider variant="fullWidth" sx={{ borderColor: 'rgb(0 0 0 / 25%)', width: '100%' }} />
                <Box sx={{ p: 2 }}>
                    <Typography variant="body2" component="p">
                        {content}
                    </Typography>
                </Box>
            </Box>

            {/* <StyledMessageDetails
                sx={
                    !show
                        ? {
                              visibility: 'hidden',

                              transform: 'translateX(100%)',
                              transition: 'all 0.3s ease-in-out',
                          }
                        : {
                              visibility: 'visible',
                              opacity: 1,
                              transform: 'translateX(0)',
                              transition: 'all 0.3s ease-in-out',
                          }
                }
            >
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        setShow(false);
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
            </StyledMessageDetails> */}
        </Box>
    );
};

export default MessageListItem;
