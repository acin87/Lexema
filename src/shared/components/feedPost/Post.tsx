import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PostTypes } from '../../../entities/mainFeed/types/PostTypes';
import { selectUser } from '../../../entities/user/slice/userSlice';
import { usePostActions } from '../../hooks/usePostActions';
import AddPostModal from '../addPostButton/AddPostModal';
import Avatar from '../avatar/Avatar';
import SnackBar from '../snackbar/SnackBar';
import LikeActions from './LikeActions';
import PostImages from './PostImages';
import PostMenu from './PostMenu';
import RootComments from '../../../features/feed/components/RootComments';
interface PostProps {
    post: PostTypes;
    loading: boolean;
    context: 'profile' | 'group';
    group_id?: number;
}

const Post: FC<PostProps> = ({ post, loading, context, group_id }) => {
    const [openModal, setOpenModal] = useState(false);
    const { id: user_id, is_staff, is_superuser } = useSelector(selectUser);
    const isOwner = user_id === post.author.id;
    const isEditor = is_staff || is_superuser;
    const isAuthorized = isOwner || isEditor;

    const { ref, inView } = useInView({ triggerOnce: true });
    const { handleUpdateViews, handleDeletePost } = usePostActions({
        postId: post.id,
        authorId: post.author.id,
        isOwner,
        context,
        group_id,
    });

    useEffect(() => {
        if (inView) {
            handleUpdateViews();
        }
    }, [inView, handleUpdateViews]);


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Box ref={ref} sx={{ width: '100%' }}>
            <Card sx={{ width: '100%', height: 'calc(100% - 1rem)', marginBottom: '1rem' }}>
                <CardHeader
                    avatar={<Avatar src={post.author.avatar} loading={loading} />}
                    action={<PostMenu isAuthorized={isAuthorized} onEdit={handleOpenModal} onDelete={handleDeletePost} />}
                    title={
                        <NavLink style={{ textDecoration: 'none' }} to={`/profile/${post.author.id}`}>
                            {post.author.first_name} {post.author.last_name}
                        </NavLink>
                    }
                    subheader={`post ID - ${post.id}`}
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {post.content}
                    </Typography>
                </CardContent>
                <PostImages images={post.images?.map((img) => img.image) || []} loading={loading} />
                <CardActions sx={{ justifyContent: 'space-between' ,pr: '15px' }}>
                    <LikeActions post={post} isLoading={loading} />
                </CardActions>
                <Divider />
                <Box><RootComments postId={post.id} /> </Box>
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

export default Post;
