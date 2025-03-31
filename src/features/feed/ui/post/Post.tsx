import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Typography } from '@mui/material';
import { FC, memo, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useGetOriginalPostQuery } from '../../../../entities/post/api/postApi ';
import { Post } from '../../../../entities/post/types/PostTypes';
import { isAuthorizedUser, selectUser } from '../../../../entities/user/slice/userSlice';
import Avatar from '../../../../shared/ui/avatar/Avatar';
import { usePostButtonAction } from '../../hooks/usePostButtonAction';
import { usePostViewsActions } from '../../hooks/usePostViewsActions';
import AddCommentButton from '../addCommentButton/AddCommentButton';
import AddPostModal from '../addPostModal/AddPostModal';
import RootComments from '../comments/RootComments';
import LikeActions from '../likeActions/LikeActions';
import PostImages from '../postImages/PostImages';
import PostMenu from '../postMenu/PostMenu';
import PostSkeleton from '../postSkeleton/PostSkeleton';
import RepostButton from '../repostButton/RepostButton';
import RepostContent from '../repostContent/RepostContent';
import styles from './Post.module.css';

interface PostProps {
    post: Post;
    context: 'profile' | 'group';
    group_id?: number;
}

const PostUI: FC<PostProps> = ({ post, context, group_id }) => {
    const [openModal, setOpenModal] = useState(false);
    const user_id = useSelector(selectUser).id;
    const Authorized = useSelector(isAuthorizedUser);
    const { data: originalPostData } = useGetOriginalPostQuery(
        { id: post.original_post! },
        { skip: !post.original_post },
    );
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
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    const isOwner = user_id === post.author.id;
    const isAuthorized = isOwner || Authorized;

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
        <Box ref={ref} className={styles.postContainer}>
            <Card className={styles.postCard}>
                <CardHeader
                    avatar={<Avatar src={post.author.avatar} />}
                    action={
                        <Box className={styles.postHeaderActions}>
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
                        <PostImages images={post.images?.map((img: { image: string }) => img.image) || []} />
                    </CardMedia>
                )}
                <CardActions className={styles.postActions}>
                    <LikeActions post={post} />
                </CardActions>
                <Divider />
                {post.comments_count > 0 && <RootComments postId={post.id} />}
                <AddCommentButton postId={post.id} />
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
        </Box>
    );
};

export default memo(PostUI);
