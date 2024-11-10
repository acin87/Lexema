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
import React, { forwardRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { PostTypes } from '../../app/reducers/posts/postTypes';
import { useGetUserByIdQuery } from '../../app/reducers/user/userApi';
import CommentsTree from '../../components/comment/CommentTree';

export const PostView = forwardRef<HTMLDivElement, PostTypes>((post: PostTypes, ref) => {
    const [commentsLimit, setCommentsLimit] = useState('parents');
    const { data: userData, isLoading: loading } = useGetUserByIdQuery({ id: post.userId });

    const skeletonLoading = loading;
    return (
        <Box ref={ref} className="post" sx={{ width: '100%' }}>
            <Card sx={{ width: '100%', height: 'calc(100% - 1rem)', paddingBottom: '1rem' }}>
                <CardHeader
                    avatar={
                        skeletonLoading ? (
                            <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        ) : (
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="Avatar" src={userData?.image} />
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
                            <Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 6 }} />
                        ) : (
                            <NavLink style={{ textDecoration: 'none' }} to={`friends/user/${userData?.id}`}>
                                {userData?.firstName} {userData?.lastName}
                            </NavLink>
                        )
                    }
                    subheader={
                        skeletonLoading ? <Skeleton animation="wave" height={15} width="40%" /> : `User ID - ${post.id}`
                    }
                ></CardHeader>
                <CardContent>
                    {skeletonLoading ? (
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
                    <CommentsTree postId={post.id} />

                    {/* {commentData?.comments.map((comment) => {
                        let child: JSX.Element | undefined | null = null;
                        if (comment.children != null) {
                            child = (
                                <Box id="child-comments" sx={{ paddingLeft: 8 }}>
                                    <ChildCommentLink
                                        {...comment.children[0]}
                                        childCount={comment.childCount}
                                    />
                                </Box>
                            );
                        }

                        return (
                            <React.Fragment key={comment.id}>
                                <Comment {...comment} />
                                {child}
                            </React.Fragment>
                        );
                    })} */}
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
