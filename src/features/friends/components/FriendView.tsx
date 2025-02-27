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
    Link,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { forwardRef, memo, useEffect, useState } from 'react';
import { User } from '../../../entities/user/types/User';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store/store';
import { removeFriends } from '../../../entities/user/slices/friendsSlice';

const bgImage = [
    'profile-bg1.jpg',
    'profile-bg2.jpg',
    'profile-bg3.jpg',
    'profile-bg4.jpg',
    'profile-bg5.jpg',
    'profile-bg6.jpg',
    'profile-bg7.jpg',
    'profile-bg8.jpg',
    'profile-bg9.jpg',
];

const FriendView = forwardRef<HTMLDivElement, User>((user, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const [image, setImage] = useState(' ');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        dispatch(removeFriends(user.id));
        handleClose();
    };

    //временное решение
    useEffect(() => {
        const randomBgImage = bgImage[Math.floor(Math.random() * bgImage.length)];
        setImage(`./src/assets/images/${randomBgImage}`);
    }, []);

    return (
        <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', p: 0 }} ref={ref}>
            <Box sx={{ position: 'relative' }}>
                <Box sx={{ width: '100%', maxWidth: '100%', height: 'auto' }} component="img" src={image} />
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
                <Avatar sx={{ mt: '-4.75rem', width: '120px', height: '120px' }} variant="circular" src={user.image} />
                <Box sx={{ pb: 2, pt: 2 }}>
                    <Link component="a" href={`/user/${user.id}`}>
                        {user.firstName} {user.lastName}{' '}
                    </Link>
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
                        <Typography variant="subtitle2">556</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2">Друзей</Typography>
                        <Typography variant="subtitle2">125</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2">Подписок</Typography>
                        <Typography variant="subtitle2">182 - {user.id} </Typography>
                    </Box>
                </Box>
                <AvatarGroup sx={{ pt: 2, pb: 2 }} max={5}>
                    <Avatar sx={{ width: 32, height: 32 }} src={user.image} />
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