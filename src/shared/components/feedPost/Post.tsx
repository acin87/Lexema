import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { FC, memo, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PostTypes } from '../../../entities/mainFeed/types/PostTypes';
import { isAuthorizedUser, selectUser } from '../../../entities/user/slice/userSlice';
import { useGetOriginalPostQuery } from '../../api/postsApi';
import { usePostButtonAction } from '../../hooks/usePostButtonAction';
import { usePostViewsActions } from '../../hooks/usePostViewsActions';
import AddPostModal from '../addPostButton/AddPostModal';
import Avatar from '../avatar/Avatar';
import SnackBar from '../snackbar/SnackBar';
import LikeActions from './LikeActions';
import PostImages from './PostImages';
import PostMenu from './PostMenu';
import PostSkeleton from './PostSkeleton';
import RepostButton from './RepostButton';
import RepostContent from './RepostContent';
import RootComments from '../comments/RootComments';

interface PostProps {
    post: PostTypes;
    context: 'profile' | 'group';
    group_id?: number;
}

const Post: FC<PostProps> = ({ post, context, group_id }) => {
    const [openModal, setOpenModal] = useState(false);
    const user_id = useSelector(selectUser).id;
    const isAuthorized = useSelector(isAuthorizedUser);
    const { data: originalPostData } = useGetOriginalPostQuery({ id: post.original_post! }, { skip: !post.original_post });
    const { ref, inView } = useInView({ triggerOnce: true });
    const { handleUpdateViews } = usePostViewsActions({
        postId: post.id,
        authorId: post.author.id,
        isOwner: user_id === post.author.id,
    });
    const { handleDeletePost } = usePostButtonAction({
        context,
        group_id,
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Показываем скелетон перед показом поста
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    const isOwner = user_id === post.author.id;
 

    useEffect(() => {
        if (inView && !isLoading && !isAuthorized) {
            handleUpdateViews();
        }
    }, [inView, handleUpdateViews, isLoading, isAuthorized]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    if (isLoading) {
        return <PostSkeleton />;
    }

    return (
        <Box ref={ref} sx={{ width: '100%' }}>
            <Card sx={{ width: '100%', height: 'calc(100% - 1rem)', marginBottom: '1rem' }}>
                <CardHeader
                    avatar={<Avatar src={post.author.avatar} />}
                    action={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {!isOwner && <RepostButton original_post_id={post.id} />}
                            <PostMenu
                                isAuthorized={isAuthorized}
                                onEdit={handleOpenModal}
                                onDelete={() => handleDeletePost(post.id, post.author.id)}
                            />
                        </Box>
                    }
                    title={
                        <NavLink style={{ textDecoration: 'none' }} to={`/profile/${post.author.id}`}>
                            {post.author.first_name} {post.author.last_name}
                        </NavLink>
                    }
                    subheader={
                        <Typography variant="caption" component="div" sx={{ height: post.signature ? 'auto' : '20px' }}>
                            {post.signature}
                        </Typography>
                    }
                />
                {originalPostData && <RepostContent originalPost={originalPostData} />}
                {post.content && (
                    <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {post.content}
                        </Typography>
                    </CardContent>
                )}
                {post.images && post.images.length > 0 && (
                    <CardMedia className="post-images">
                        <PostImages images={post.images?.map((img) => img.image) || []} />
                    </CardMedia>
                )}
                <CardActions sx={{ justifyContent: 'space-between', pr: '15px' }}>
                    <LikeActions post={post} />
                </CardActions>
                <Divider />
                <Box>{post.comments_count > 0 && <RootComments postId={post.id} />}</Box>
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

            <AddPostModal
                open={openModal}
                onClose={handleCloseModal}
                title="Редактировать пост"
                post={post}
                editMode={true}
                context={context}
                group_id={group_id}
            />
            <SnackBar message="" severity="success" open={false} onClose={() => {}} />
        </Box>
    );
};

export default memo(Post);
