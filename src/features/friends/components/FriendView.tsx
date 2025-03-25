import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    ButtonGroup,
    Card,
    Fade,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material';
import { forwardRef, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BASEURL } from '../../../app/api/ApiConfig';
import { AppRoute } from '../../../app/routes/Config';
import { AppDispatch } from '../../../app/store/store';
import { removeFriends } from '../../../entities/friends/slices/friendsSlice';
import { Friend, User } from '../../../entities/friends/types/FriendTypes';
import useCheckImages from '../../../shared/hooks/useCheckImages';

/**
 * Компонент для отображения друзей
 * @param friend - Друг
 * @param ref - Ссылка на элемент
 * @returns Компонент для отображения друзей
 */
const FriendView = forwardRef<HTMLDivElement, Friend>((friend, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const { avatarImage, mainImage } = useCheckImages(friend.profile?.images || []);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        dispatch(removeFriends(friend.friend));
        handleClose();
    };

    return (
        <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', p: 0 }} ref={ref}>
            <Box sx={{ position: 'relative' }}>
                <Box sx={{ width: '100%', maxWidth: '100%', height: 'auto' }} component="img" src={mainImage} />
                <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    flex: '1 1 auto',
                }}
            >
                <Avatar sx={{ mt: '-4.75rem', width: '120px', height: '120px' }} variant="circular" src={avatarImage} />
                <Box sx={{ pb: 2, pt: 2 }}>
                    <NavLink to={`/${AppRoute.PROFILE}/${friend.friend}`}>
                        {friend.profile
                            ? `${friend.profile.user.first_name}  ${friend.profile.user.last_name}`
                            : 'Профиль не заполнен'}
                    </NavLink>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: '100%',
                        '& > div': { textAlign: 'center' },
                    }}
                >
                    <Box>
                        <Typography variant="body2">Постов</Typography>
                        <Typography variant="subtitle2">{friend.posts_count}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2">Друзей</Typography>
                        <Typography variant="subtitle2">{friend.friends_count}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2">Подписок</Typography>
                        <Typography variant="subtitle2">
                            {friend.groups_count} - {friend.friend}
                        </Typography>
                    </Box>
                </Box>
                <AvatarGroup sx={{ pt: 2, pb: 2, minHeight: '70px' }} max={5}>
                    {friend.friends_avatars.map((user: User, index: number) => (
                        <NavLink key={index} to={`/${AppRoute.PROFILE}/${user.id}`}>
                            <Tooltip title={`${user.first_name} ${user.last_name}`}>
                                <Avatar src={BASEURL + user.avatar_image} />
                            </Tooltip>
                        </NavLink>
                    ))}
                </AvatarGroup>
                <ButtonGroup variant="text" size="small">
                    <Button color="primary" aria-label="Написать сообщение">
                        Сообщение
                    </Button>
                    <Button color="primary" aria-label="Открыть диалог">
                        В диалоги
                    </Button>
                </ButtonGroup>
            </Box>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
                <MenuItem onClick={handleClose}>Просмотреть друзей</MenuItem>
                <MenuItem onClick={handleDelete}>Удалить из друзей</MenuItem>
            </Menu>
        </Card>
    );
});

export default memo(FriendView);
