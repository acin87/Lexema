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
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { forwardRef, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../app/routes/Config';
import { AppDispatch } from '../../../app/store/store';

import checkImages from '../../../shared/utils/ImageUtils';
import { checkUrl } from '../../../shared/utils/Utils';
import AddNewDialogue from '../../messenger/ui/AddNewDialogue';
import { removeFriends } from '../slices/friendsSlice';
import { Friend } from '../types/FriendTypes';

/**
 * Компонент для отображения друзей
 * @param friend - Друг
 * @param ref - Ссылка на элемент
 * @returns Компонент для отображения друзей
 */
const FriendView = forwardRef<HTMLDivElement, Friend>((friend, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const { mainImage } = checkImages(friend.profile_image);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState<Pick<Friend, 'friend_id' | 'avatar' | 'full_name' | 'last_login'> | undefined>();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const navigate = useNavigate();

    const handleOpen = (user: Pick<Friend, 'friend_id' | 'avatar' | 'full_name' | 'last_login'>) => {
        setOpenModal(true);
        setUser(user);
    };

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        dispatch(removeFriends(friend.friend_id));
        handleClose();
    };

    const friendsAvatars = friend.friend_friends_data.map((friends) => {
        if(friends.id === friend.friend_id) return null;
        return (
            <NavLink key={friends.id} to={`/${AppRoute.PROFILE}/${friends.id}`}>
                <Tooltip title={friends.full_name}>
                    <Avatar src={checkUrl(friends.avatar_image)} />
                </Tooltip>
            </NavLink>
        );
    });

    return (
        <>
            <Card
                sx={{ width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', p: 0 }}
                ref={ref}
            >
                <Box sx={{ position: 'relative' }}>
                    <Box
                        sx={{ width: '100%', maxWidth: '100%', height: 'auto', maxHeight: matches ? '80px' : '90px' }}
                        component="img"
                        src={mainImage}
                    />
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
                    <Avatar
                        sx={{ mt: '-4.75rem', width: '120px', height: '120px' }}
                        variant="circular"
                        src={friend.avatar && checkUrl(friend.avatar)}
                    />
                    <Box sx={{ pb: 2, pt: 2 }}>
                        <NavLink to={`/${AppRoute.PROFILE}/${friend.friend_id}`}>
                            {friend.isFilledProfile ? friend.full_name : friend.username }
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
                                {friend.groups_count} - {friend.friend_id}
                            </Typography>
                        </Box>
                    </Box>
                    <AvatarGroup sx={{ pt: 2, pb: 2, minHeight: '70px' }} max={5}>
                        {friendsAvatars}
                    </AvatarGroup>
                    <ButtonGroup variant="text" size="small">
                        <Button color="primary" aria-label="Написать сообщение" onClick={() => handleOpen(friend)}>
                            Сообщение
                        </Button>
                        <Button
                            color="primary"
                            aria-label="Открыть диалог"
                            onClick={() => navigate(`/${AppRoute.MESSENGER}/${friend.friend_id}`)}
                        >
                            В диалоги
                        </Button>
                    </ButtonGroup>
                </Box>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
                    <MenuItem onClick={handleClose}>Просмотреть друзей</MenuItem>
                    <MenuItem onClick={handleDelete}>Удалить из друзей</MenuItem>
                </Menu>
            </Card>
            <AddNewDialogue open={openModal} onClose={() => setOpenModal(false)} user={user} />
        </>
    );
});

export default memo(FriendView);
