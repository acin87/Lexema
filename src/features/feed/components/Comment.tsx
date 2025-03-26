import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    Divider,
    Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { CommentType } from '../../../entities/comment/types/commntsType';
import { selectUser } from '../../../entities/user/slice/userSlice';
import { User } from '../../../entities/user/types/UserTypes';
import Avatar from '../../../shared/components/avatar/Avatar';
import PostImages from '../../../shared/components/feedPost/PostImages';
import { formatTimeAgo } from '../../../shared/utils/FormatTimeAgo';
import CommentActionButton from './CommentActionButton';
import CommentSkeleton from './CommentSkeleton';
import CreateCommentButton from './CreateCommentButton';

/**
 * Пропсы для компонента комментария
 */
interface CommentProps {
    comment: CommentType;
    user: User;
    level: number;
}
/**
 * Компонент комментария
 *
 * @param comment - комментарий
 */
const Comment: FC<CommentProps> = ({ comment, user, level }) => {
    const currentUser = useSelector(selectUser);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const isOwner = currentUser.id === user.id;

    const isEditor = currentUser.is_staff;

    const isAdmin = currentUser.is_superuser;

    const isAuthorized = isOwner || isEditor || isAdmin;

    if (isLoading) {
        return <CommentSkeleton />;
    }

    const handleDeleteStart = () => {
        setIsDeleting(true);
    };

    const handleDeleteEnd = () => {
        setIsDeleting(false);
    };

    return (
        <Collapse in={!isDeleting} timeout={500}>
            <Box>
                <Card sx={{ boxShadow: 'none', width: '100%', paddingBottom: 0 }}>
                    <CardHeader
                        sx={{ paddingBottom: 0 }}
                        avatar={<Avatar src={user?.avatar} />}
                        title={
                            <Typography variant="body2" component="span">
                                {user?.first_name} {user?.last_name} id - {comment.id}
                            </Typography>
                        }
                        subheader={
                            <Typography variant="body2" component="div">
                                {formatTimeAgo(comment?.created_at)}
                            </Typography>
                        }
                    />
                    <CardContent sx={{ p: '16px 20px 5px 20px', '&:last-child': { pb: 0 } }}>
                        <Typography variant="body2" component="span" sx={{ wordBreak: 'break-word' }}>
                            {comment.content}
                        </Typography>
                    </CardContent>
                    <CardMedia>
                        {comment.images && comment.images?.length > 0 && (
                            <PostImages images={comment.images?.map((img) => img.image) || []} loading={isLoading} />
                        )}
                    </CardMedia>
                    <CardActions
                        sx={{
                            p: 0,
                            '@media (max-width: 600px)': {
                                flexDirection: level >= 3 ? 'column' : 'row',
                                alignItems: level >= 3 ? 'flex-end' : 'center',
                            },
                        }}
                    >
                        <CreateCommentButton postId={comment.post_id} parent_id={comment.id} title="Ответить" />
                        {isAuthorized && (
                            <CommentActionButton
                                commentId={comment.id}
                                content={comment.content}
                                onUpdateStart={() => setIsLoading(true)}
                                onUpdateEnd={() => setIsLoading(false)}
                                onDeleteStart={handleDeleteStart}
                                onDeleteEnd={handleDeleteEnd}
                            />
                        )}
                    </CardActions>
                </Card>
                <Divider variant="middle" />
            </Box>
        </Collapse>
    );
};

export default Comment;
