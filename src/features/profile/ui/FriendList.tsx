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
import { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { checkUrl } from '../../../shared/utils/Utils';
import { useGetMutualFriendsQuery } from '../../friends/api/friendsApi';

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
    const { id } = useParams();
    const [filter, setFilter] = useState<'all' | 'online' | 'mutual'>('all');
    const navigate = useNavigate();
    const { data: response } = useGetMutualFriendsQuery({ friend_id: Number(id) });

    if (!response) {
        return null;
    }

    const friends = () => {
        if (filter === 'all') {
            return response.friends;
        } else if (filter === 'online') {
            return response.friends.filter((friend) => friend.is_online);
        } else if (filter === 'mutual') {
            return response.friends.filter((friend) => friend.is_mutual);
        }
    };

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
                        <Button onClick={() => setFilter('all')} disabled={filter === 'all'}>
                            Все ({response.stats.total_friends})
                        </Button>
                        <Button onClick={() => setFilter('online')} disabled={filter === 'online'}>
                            Онлайн ({response.stats.online_friends})
                        </Button>
                        <Button onClick={() => setFilter('mutual')} disabled={filter === 'mutual'}>
                            Общие ({response.stats.mutual_friends})
                        </Button>
                    </ButtonGroup>
                </Box>

                <IconButton>
                    <SearchIcon />
                </IconButton>
            </Box>

            <Divider />

            {/* Список друзей */}
            <List sx={{ p: 0 }}>
                {friends()?.map((friend, index) => (
                    <Fragment key={friend.friend_id}>
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
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate(`/profile/${friend.friend_id}`, { replace: true })}
                        >
                            <ListItemAvatar>
                                <Box sx={{ position: 'relative' }}>
                                    {friend.is_online ? (
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                alt={friend.full_name! || friend.username}
                                                src={friend.avatar as string}
                                                sx={{ width: 50, height: 50 }}
                                            />
                                        </StyledBadge>
                                    ) : (
                                        <Avatar
                                            src={checkUrl(friend.avatar as string)}
                                            alt={friend.full_name! || friend.username}
                                            sx={{ width: 50, height: 50 }}
                                        />
                                    )}
                                </Box>
                            </ListItemAvatar>
                            
                            <ListItemText
                                primary={
                                    <Typography fontWeight="medium">{friend.full_name || friend.username}</Typography>
                                }
                                secondary={
                                    <Typography variant="body2" color="text.secondary">
                                        {friend.friend_friends_data?.length} общих друга
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

            <Box sx={{ p: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Показать всех друзей
                </Typography>
            </Box>
        </Paper>
    );
};

export default FriendsList;
