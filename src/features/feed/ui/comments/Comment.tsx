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
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CommentType } from '../../../../entities/comment/types/commntsType';
import { selectUser } from '../../../../entities/user/slice/userSlice';
import { User } from '../../../../entities/user/types/UserTypes';
import Avatar from '../../../../shared/ui/avatar/Avatar';
import { formatTimeAgo } from '../../../../shared/utils/FormatTimeAgo';
import styles from './Comment.module.css';
import CommentActionButton from './CommentActionButton';
import CommentSkeleton from './CommentSkeleton';
import ReplyCommentButton from './ReplyCommentButton';
import PostImages from '../postImages/PostImages';
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

    const isEdited = useMemo(() => {
        if (comment?.updated_at && comment?.created_at !== comment?.updated_at) {
            return (
                <Box className={styles.commentTimeContainer}>
                    <Typography variant="subtitle2" component="div">
                        {formatTimeAgo(comment?.created_at)}
                    </Typography>
                    <Typography variant="subtitle2" component="div" className={styles.commentTimeEdited} fontSize={11}>
                        <Typography component="span" className={styles.commentTimeBadge} fontSize={10}>
                            отредактировано
                        </Typography>
                        {formatTimeAgo(comment?.updated_at)}
                    </Typography>
                </Box>
            );
        }
        return (
            <Typography variant="subtitle2" component="div">
                {formatTimeAgo(comment?.created_at)}
            </Typography>
        );
    }, [comment?.created_at, comment?.updated_at]);

    const isOwner = currentUser.id === user.id;

    const isEditor = currentUser.is_staff;

    const isAdmin = currentUser.is_superuser;

    const isAuthorized = isOwner || isEditor || isAdmin;

    useEffect(() => {
        setIsLoading(true);
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    if (isLoading) {
        return <CommentSkeleton />;
    }

    const handleDeleteStart = () => {
        setIsDeleting(true);
    };

    return (
        <Collapse in={!isDeleting} timeout={1000} sx={{ mt: 2 }}>
            <Card className={styles.commentContainer} sx={{ boxShadow: 'none', pb: 0 }}>
                <CardHeader
                    className={styles.commentHeader}
                    avatar={<Avatar src={user?.avatar} />}
                    title={
                        <Link to={`/profile/${user?.id}`}>
                            <Typography variant="body2" component="span">
                                {user?.first_name} {user?.last_name} id - {comment.id}
                            </Typography>
                        </Link>
                    }
                    subheader={
                        <Typography variant="subtitle2" component="div">
                            {isEdited}
                        </Typography>
                    }
                />
                <CardContent className={styles.commentContent} sx={{ pt: 0 }}>
                    <Typography variant="body2" component="p" className={styles.commentText}>
                        {comment.content}
                    </Typography>
                </CardContent>
                <CardMedia>
                    {comment.images && comment.images?.length > 0 && (
                        <PostImages images={comment.images?.map((img) => img.image) || []} />
                    )}
                </CardMedia>
                <CardActions
                    className={`${styles.commentActions} ${
                        level >= 3 ? styles.commentActionsMobile : styles.commentActionsDesktop
                    }`}
                >
                    <ReplyCommentButton postId={comment.post_id} parent_id={comment.id} title="Ответить" />
                    {isAuthorized && (
                        <CommentActionButton
                            commentId={comment.id}
                            content={comment.content}
                            onUpdateStart={() => setIsLoading(true)}
                            onUpdateEnd={() => setIsLoading(false)}
                            onDeleteStart={handleDeleteStart}
                        />
                    )}
                </CardActions>
            </Card>
            <Divider variant="middle" />
        </Collapse>
    );
};

export default Comment;
