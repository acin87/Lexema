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
    CssThemeVariables,
    Divider,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Skeleton,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { FC, Fragment, memo, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BASEURL } from '../../../app/api/ApiConfig';
import { getUser } from '../../../entities/auth/slice/authSlice';
import { useDeletePostMutation, useUpdateViewsPostMutation } from '../../../entities/post/api/postsApi ';
import { PostTypes } from '../../../entities/post/types/PostTypes';
import ImageCarousel from '../../../shared/components/imageCarousel/ImageCarousel';
import SnackBar from '../../../shared/components/snackbar/SnackBar';
import { isApiError, checkUrl } from '../../../shared/utils/Utils';
import AddPostModal from './AddPostModal';
import styles from './Post.module.css'; 

type PostProps = {
    post: PostTypes;
    loading: boolean;
};

const imageWrapper: CssThemeVariables = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: '3px',
    '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
};
/**
 * Компонент поста
 *
 * @param post - объект пост
 * @param ref - реф ссылка на компонент
 */
const Post: FC<PostProps> = ({ post, loading }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openEditPostModal, setEditPostModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const hasUpdated = useRef(false);
    const { user_id, is_stuff, is_superuser } = useSelector(getUser);

    const isOwner = user_id === post.author.id;

    const isEditor = is_stuff || is_superuser;

    const isAuthorized = isOwner || isEditor;

    const [updateViews, { isError: isErrorUpdatePost, error: errorUpdatePost }] = useUpdateViewsPostMutation();
    const [deletePost, { isError: isErrorDeletePost, isSuccess: isSuccessDeletePost, error: errorDeletePost }] =
        useDeletePostMutation();

    const isLoading = loading;

    const { inView, ref } = useInView({
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView && !hasUpdated.current && !isOwner) {
            const views = post.views + 1;
            const update = async () => {
                await updateViews({ postId: post.id, views: views });
            };
            update();
        }
    }, [inView, updateViews, post, isOwner]);

    useEffect(() => {
        if (isErrorUpdatePost || isErrorDeletePost) {
            if (isErrorUpdatePost && isApiError(errorUpdatePost)) {
                setOpenSnackbar(true);
                setSeverity('error');
                setErrorMessage(errorUpdatePost.data.detail as string);
            } else if (isErrorDeletePost && isApiError(errorDeletePost)) {
                setOpenSnackbar(true);
                setSeverity('error');
                setErrorMessage(errorDeletePost.data.detail as string);
            }
        }
    }, [isErrorUpdatePost, isErrorDeletePost, errorUpdatePost, errorDeletePost]);

    useEffect(() => {
        if (isSuccessDeletePost) {
            setOpenSnackbar(true);
            setSeverity('success');
            setErrorMessage('Post deleted successfully');
        }
    }, [isSuccessDeletePost]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenEditPostModal = () => {
        setEditPostModal(true);
    };
    const handleCloseEditPostModal = () => {
        setEditPostModal(false);
        handleClose();
    };
    const handleDeletePost = async () => {
        console.log(post.id);
        await deletePost({ postId: post.id });
        handleClose();
    };
    const handleOpenSnackbar = () => {
        setOpenSnackbar(false);
    };
    //TODO: фнкция для проверки в url картинки хоста, если нет то добавляем http://localhost:8000/. Решение временное


    const images: string[] | undefined = post.images?.map((url) => checkUrl(url.image));

    const postImages = images?.map((url, index) => {
        return (
            <Box key={index} sx={{ ...imageWrapper }}>
                <img src={checkUrl(url)} alt={`preview-${index}`} />
            </Box>
        );
    });

    return (
        <Box ref={ref} className="post" sx={{ width: '100%' }}>
            <Card sx={{ width: '100%', height: 'calc(100% - 1rem)', marginBottom: '1rem' }}>
                <CardHeader
                    avatar={
                        loading ? (
                            <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        ) : (
                            <Avatar
                                sx={{ bgcolor: blue[500] }}
                                aria-label="Avatar"
                                src={`${BASEURL}${post.author.avatar}`}
                            />
                        )
                    }
                    action={
                        loading ? null : (
                            <Fragment>
                                {isAuthorized && (
                                    <IconButton
                                        aria-label="post settings"
                                        onClick={handleClick}
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                )}
                            </Fragment>
                        )
                    }
                    title={
                        isLoading ? (
                            <Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 6 }} />
                        ) : (
                            <NavLink style={{ textDecoration: 'none' }} to={`/profile/${post.author.id}`}>
                                {post.author.first_name} {post.author.last_name}
                            </NavLink>
                        )
                    }
                    subheader={
                        isLoading ? <Skeleton animation="wave" height={15} width="40%" /> : `post ID - ${post.id}`
                    }
                ></CardHeader>
                <CardContent>
                    {isLoading ? (
                        <React.Fragment>
                            <Skeleton style={{ marginBottom: 6 }} animation="wave" height={15} width="100%" />
                            <Skeleton style={{ marginBottom: 6 }} animation="wave" height={15} width="100%" />
                            <Skeleton style={{ marginBottom: 6 }} animation="wave" height={15} width="100%" />
                        </React.Fragment>
                    ) : (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {post.content}
                        </Typography>
                    )}
                </CardContent>
                {isLoading ? (
                    <Skeleton animation="wave" variant="rectangular" height={194} />
                ) : (
                    <Box className={styles.imageContainer}>
                        {images && images?.length < 5 && postImages}
                        {images && images?.length >= 5 && <ImageCarousel images={images} />}{' '}
                    </Box>
                )}
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    {isLoading ? null : (
                        <React.Fragment>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Button size="small">
                                        <FavoriteIcon />
                                        <span style={{ marginLeft: '0.5rem' }}>{post.likes_count}</span>
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
                                        <span style={{ marginLeft: '0.5rem' }}>{post.dislikes_count}</span>
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
                <Box>{/* <RootComments postId={post.id} /> */}</Box>
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
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
            >
                {isAuthorized && (
                    <Box>
                        <MenuItem onClick={handleOpenEditPostModal}>Редактировать</MenuItem>
                        <MenuItem onClick={handleDeletePost}>Удалить</MenuItem>
                    </Box>
                )}
            </Menu>
            <AddPostModal
                open={openEditPostModal}
                onClose={handleCloseEditPostModal}
                title="Редактировать пост"
                editMode={true}
                post={post}
            />
            {openSnackbar && (
                <SnackBar message={errorMessage} severity={severity} open={openSnackbar} onOpen={handleOpenSnackbar} />
            )}
        </Box>
    );
};

export default memo(Post);
