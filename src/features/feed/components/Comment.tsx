import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Typography,
} from '@mui/material';
import { FC, Fragment } from 'react';
import { CommentType } from '../../../entities/comment/types/commntsType';
import { useGetUserByIdQuery } from '../../../entities/friends/api/friendsApi';
import { formatTimeAgo } from '../../../shared/utils/Utils';

interface CommentProps {
    comment: CommentType;
}
/**
 * Компонент комментария
 *
 * @param comment - комментарий
 */
const Comment: FC<CommentProps> = ({ comment }) => {
    const { data: user } = useGetUserByIdQuery({ id: comment.user.id });
    return (
        <Fragment>
            <Card sx={{ boxShadow: 'none', width: '100%', paddingBottom: 0 }}>
                <CardHeader
                    sx={{ paddingBottom: 0 }}
                    avatar={<Avatar src={user?.image} />}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertOutlinedIcon />
                        </IconButton>
                    }
                    title={
                        <Typography variant="body2" component="span">
                            {comment?.user?.fullName} id - {comment.id}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2" component="div">
                            {formatTimeAgo(comment?.createdAt)}
                        </Typography>
                    }
                />
                <CardContent sx={{ p: '16px 20px 5px 20px', '&:last-child': { pb: 0 } }}>
                    <Typography variant="body2" component="div">
                        {comment.body}
                    </Typography>
                </CardContent>
                <CardActions sx={{ p: 0 }} disableSpacing>
                    <Button sx={{ textTransform: 'lowercase', ml: '16px' }} size="small">
                        ответить
                    </Button>
                </CardActions>
            </Card>
            <Divider variant="middle" />
        </Fragment>
    );
};

export default Comment;
