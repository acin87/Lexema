import { Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { CommentType } from '../../../entities/comment/types/commntsType';
import { selectUser } from '../../../entities/user/slice/userSlice';
import { User } from '../../../entities/user/types/UserTypes';
import Avatar from '../../../shared/components/avatar/Avatar';
import { formatTimeAgo } from '../../../shared/utils/FormatTimeAgo';
import CommentActionButton from './CommentActionButton';
import CreateCommentButton from './CreateCommentButton';

/**
 * Пропсы для компонента комментария
 */
interface CommentProps {
    comment: CommentType;
    user: User;
}
/**
 * Компонент комментария
 *
 * @param comment - комментарий
 */
const Comment: FC<CommentProps> = ({ comment, user }) => {
    const currentUser = useSelector(selectUser);
    const isOwner = currentUser.id === user.id;

    const isEditor = currentUser.is_staff;

    const isAdmin = currentUser.is_superuser;

    const isAuthorized = isOwner || isEditor || isAdmin;

    return (
        <Fragment>
            <Card sx={{ boxShadow: 'none', width: '100%', paddingBottom: 0 }}>
                <CardHeader
                    sx={{ paddingBottom: 0 }}
                    avatar={<Avatar src={user?.avatar} />}
                    action={isAuthorized && <CommentActionButton commentId={comment.id} content={comment.content} />}
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
                    <Typography variant="body2" component="div">
                        {comment.content}
                    </Typography>
                    {comment.images && comment.images.map((image) => <img src={image} alt="comment" />)}
                </CardContent>
                <CardActions sx={{ p: 0 }} disableSpacing>
                    <CreateCommentButton postId={comment.post_id} parent_id={comment.id} title="Ответить" />
                </CardActions>
            </Card>
            <Divider variant="middle" />
        </Fragment>
    );
};

export default Comment;
