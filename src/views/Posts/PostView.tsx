import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShareIcon from '@mui/icons-material/Share';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    InputAdornment,
    Skeleton,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useFetchCommentByIdQuery } from '../../app/reducers/posts/postsApi ';
import { PostTypes } from '../../app/reducers/posts/postTypes';
import { useGetUserByIdQuery } from '../../app/reducers/user/userApi';

export const PostView = forwardRef<HTMLDivElement, PostTypes>((post: PostTypes, ref) => {
    const { data: userData, isLoading: loading } = useGetUserByIdQuery({ id: post.userId });
    const { data: commentData, isLoading } = useFetchCommentByIdQuery({ postId: post.id });

    const skeletonLoading = loading || isLoading;
    const getRelativeTime = (serverDateString: string): string => {
        if (serverDateString != undefined) {
            const parts = serverDateString.split(/[. ,:]/);
            const serverDate = new Date(
                parseInt(parts[2], 10), // Год
                parseInt(parts[1], 10) - 1, // Месяц
                parseInt(parts[0], 10), // День
                parseInt(parts[4], 10), // Часы
                parseInt(parts[5], 10), // Минуты
                parseInt(parts[6], 10), // Секунды
            );
            const currentDate = new Date();

            // Разница между текущим временем и временем создания коммента
            const diffInMs = currentDate.getTime() - serverDate.getTime();

            const seconds = Math.floor(diffInMs / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (days >= 1) {
                return serverDate.toLocaleDateString(); // Оставляем только дату, если разница больше суток
            } else if (hours >= 1) {
                return `${hours} час${hours === 1 ? '' : 'а'} назад`;//поправить окончания
            } else if (minutes >= 1) {
                return `${minutes} минут${minutes === 1 ? '' : 'у'} назад`;
            } else if (seconds > 0) {
                return `${seconds} секунд${seconds === 1 ? '' : 'у'} назад`;
            } else {
                return 'Только что';
            }
        }
        return 'error';
    };

    return (
        <Box ref={ref} className="post" sx={{ width: '100%' }}>
            <Card sx={{ width: '100%', height: 'calc(100% - 1rem)', paddingBottom: '1rem' }}>
                <CardHeader
                    avatar={
                        skeletonLoading ? (
                            <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        ) : (
                            <Avatar
                                sx={{ bgcolor: blue[500] }}
                                aria-label="Avatar"
                                src={userData?.image}
                            />
                        )
                    }
                    action={
                        skeletonLoading ? null : (
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        )
                    }
                    title={
                        skeletonLoading ? (
                            <Skeleton
                                animation="wave"
                                height={15}
                                width="80%"
                                style={{ marginBottom: 6 }}
                            />
                        ) : (
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to={`friends/user/${userData?.id}`}
                            >
                                {userData?.firstName} {userData?.lastName}
                            </NavLink>
                        )
                    }
                    subheader={
                        skeletonLoading ? (
                            <Skeleton animation="wave" height={15} width="40%" />
                        ) : (
                            `User ID - ${post.id}`
                        )
                    }
                ></CardHeader>
                <CardContent>
                    {skeletonLoading ? (
                        <React.Fragment>
                            <Skeleton
                                style={{ marginBottom: 6 }}
                                animation="wave"
                                height={15}
                                width="100%"
                            />
                            <Skeleton
                                style={{ marginBottom: 6 }}
                                animation="wave"
                                height={15}
                                width="100%"
                            />
                            <Skeleton
                                style={{ marginBottom: 6 }}
                                animation="wave"
                                height={15}
                                width="100%"
                            />
                        </React.Fragment>
                    ) : (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {post.body}
                        </Typography>
                    )}
                </CardContent>
                {skeletonLoading ? (
                    <Skeleton animation="wave" variant="rectangular" height={194} />
                ) : (
                    <CardMedia
                        component="img"
                        height="194"
                        width="100%"
                        image="../../src/assets/images/1361476761_621333142.jpg"
                        alt="Paella dish"
                    />
                )}

                <CardActions sx={{ justifyContent: 'space-between' }}>
                    {skeletonLoading ? null : (
                        <React.Fragment>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Button size="small">
                                        <FavoriteIcon />
                                        <span style={{ marginLeft: '0.5rem' }}>
                                            {post.reactions.likes}
                                        </span>
                                    </Button>
                                </Box>
                                <Box sx={{ paddingLeft: 1, paddingRight: 1, display: 'flex' }}>
                                    <Button size="small">
                                        <CommentOutlinedIcon />
                                        <span style={{ marginLeft: '0.5rem' }}>22</span>
                                    </Button>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Button size="small">
                                        <ShareIcon />
                                        <span style={{ marginLeft: '0.5rem' }}>
                                            {post.reactions.dislikes}
                                        </span>
                                    </Button>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title={`Посмотрели ${post.views} человек`}>
                                    <RemoveRedEyeOutlinedIcon fontSize="small"></RemoveRedEyeOutlinedIcon>
                                </Tooltip>
                                <Typography
                                    variant="body2"
                                    component="span"
                                    sx={{ marginLeft: '0.5rem' }}
                                >
                                    {post.views}
                                </Typography>
                            </Box>
                        </React.Fragment>
                    )}
                </CardActions>
                <Divider />
                <Box>
                    {commentData?.comments.map((key, index) => {
                        if (index > 1) {
                            return '';
                        }
                        return (
                            <Box
                                sx={{ display: 'flex', padding: '1rem' }}
                                id={`${post.id}-${index}`}
                                key={index}
                            >
                                <Box>
                                    <Avatar src="../../src/assets/icons/avatar.jpg" />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginLeft: '1.25rem',
                                    }}
                                >
                                    <Typography variant="body2" component="span">
                                        {key.user.fullName}
                                    </Typography>
                                    <Typography variant="body2" component="span">
                                        {key.body}
                                    </Typography>
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            sx={{ paddingLeft: 0 }}
                                        >
                                            {getRelativeTime(key.data)}
                                        </Typography>
                                        <Button>Поделится</Button>
                                        <Button>Перевести</Button>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
                {skeletonLoading ? null : (
                    <Box sx={{ p: 2 }}>
                        <TextField
                            placeholder="Написать коментарий"
                            fullWidth
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CommentOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="outlined"
                            size="small"
                        />
                    </Box>
                )}
            </Card>
        </Box>
    );
});
