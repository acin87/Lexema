import { MoreVert as MoreVertIcon, Search as SearchIcon } from '@mui/icons-material';
import {
    Avatar,
    Badge,
    Box,
    Button,
    ButtonGroup,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    styled,
    Typography,
} from '@mui/material';
import { Fragment } from 'react';
import { useGetMutualFriendsQuery } from '../../friends/api/friendsApi';
import { useParams } from 'react-router-dom';

const friends = [
    { id: 1, name: 'Иван Иванов', avatar: '', mutualFriends: 5, online: true },
    { id: 2, name: 'Петр Петров', avatar: '', mutualFriends: 3, online: false },
    { id: 3, name: 'Сергей Сергеев', avatar: '', mutualFriends: 7, online: true },
    // ... другие друзья
];

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const FriendsList = () => {
    const {id} = useParams();

    
    const {data: mutualFriends} = useGetMutualFriendsQuery({friend_id: Number(id)});


    return (
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', marginBottom: 2 }}>
            {/* Заголовок и поиск */}
            <Box
                sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ display: 'flex', gap: 2 }}>
                   <ButtonGroup variant="text">
                        <Button>Все ({friends.length})</Button>
                        <Button>Онлайн ({friends.filter((friend) => friend.online).length})</Button>
                        <Button>Общие ({friends.filter((friend) => friend.mutualFriends > 0).length})</Button>
                    </ButtonGroup>
                </Box>

                <IconButton>
                    <SearchIcon />
                </IconButton>
            </Box>

            <Divider />

            {/* Список друзей */}
            <List sx={{ p: 0 }}>
                {friends.map((friend, index) => (
                    <Fragment key={friend.id}>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                },
                            }}
                        >
                            <ListItemAvatar>
                                <Box sx={{ position: 'relative' }}>
                                    {friend.online ? (
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                alt={friend.name}
                                                src={friend.avatar}
                                                sx={{ width: 50, height: 50 }}
                                            />
                                        </StyledBadge>
                                    ) : (
                                        <Avatar src={friend.avatar} alt={friend.name} sx={{ width: 50, height: 50 }} />
                                    )}
                                </Box>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography fontWeight="medium">{friend.name}</Typography>}
                                secondary={
                                    <Typography variant="body2" color="text.secondary">
                                        {friend.mutualFriends} общих друга
                                    </Typography>
                                }
                                sx={{ ml: 1 }}
                            />
                        </ListItem>
                        {index < friends.length - 1 && <Divider variant="inset" component="li" />}
                    </Fragment>
                ))}
            </List>
            <Divider />
            {/* Подвал (если нужно) */}
            <Box sx={{ p: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Показать всех друзей
                </Typography>
            </Box>
        </Paper>
    );
};

export default FriendsList;
