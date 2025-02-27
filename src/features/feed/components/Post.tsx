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
import { PostTypes } from '../../../entities/post/types/PostTypes';
import { useGetUserByIdQuery } from '../../../entities/user/api/userApi';
import RootComments from './RootComments';


/**
 * Компонент поста
 * 
 * @param post - объект пост 
 * @param ref - реф ссылка на компонент
 */
const Post = forwardRef<HTMLDivElement, PostTypes>((post: PostTypes, ref) => {
    const { data: userData, isLoading: loading } = useGetUserByIdQuery({ id: post.userId });

    return (
        <Box ref={ref} className="post" sx={{ width: '100%' }}>
            <Card sx={{ width: '100%', height: 'calc(100% - 1rem)', paddingBottom: '1rem' }}>
                <CardHeader
                    avatar={
                        loading ? (
                            <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        ) : (
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="Avatar" src={userData?.image} />
                        )
                    }
                    action={
                        loading ? null : (
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        )
                    }
                    title={
                        loading ? (
                            <Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 6 }} />
                        ) : (
                            <NavLink style={{ textDecoration: 'none' }} to={`/user/${userData?.id}`}>
                                {userData?.firstName} {userData?.lastName}
                            </NavLink>
                        )
                    }
                    subheader={loading ? <Skeleton animation="wave" height={15} width="40%" /> : `User ID - ${post.id}`}
                ></CardHeader>
                <CardContent>
                    {loading ? (
                        <React.Fragment>
                            <Skeleton style={{ marginBottom: 6 }} animation="wave" height={15} width="100%" />
                            <Skeleton style={{ marginBottom: 6 }} animation="wave" height={15} width="100%" />
                            <Skeleton style={{ marginBottom: 6 }} animation="wave" height={15} width="100%" />
                        </React.Fragment>
                    ) : (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {post.body}
                        </Typography>
                    )}
                </CardContent>
                {loading ? (
                    <Skeleton animation="wave" variant="rectangular" height={194} />
                ) : (
                    <CardMedia sx={{padding: 2}} component="img" height="194" width="100%" image="../../src/assets/images/1361476761_621333142.jpg" alt="Paella dish" />
                )}
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    {loading ? null : (
                        <React.Fragment>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Button size="small">
                                        <FavoriteIcon />
                                        <span style={{ marginLeft: '0.5rem' }}>{post.reactions.likes}</span>
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
                                        <span style={{ marginLeft: '0.5rem' }}>{post.reactions.dislikes}</span>
                                    </Button>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Tooltip title={`Посмотрели ${post.views} человек`}>
                                    <RemoveRedEyeOutlinedIcon fontSize="small"></RemoveRedEyeOutlinedIcon>
                                </Tooltip>
                                <Typography variant="body2" component="span" sx={{ marginLeft: '0.5rem' }}>
                                    {post.views}
                                </Typography>
                            </Box>
                        </React.Fragment>
                    )}
                </CardActions>
                <Divider />
                <Box>
                    <RootComments postId={post.id} />
                </Box>
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
            </Card>
        </Box>
    );
});

export default Post;
