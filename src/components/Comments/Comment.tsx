import EditNoteIcon from '@mui/icons-material/EditNote';
import { Avatar, Card, CardActions, CardHeader, IconButton, Tooltip, Typography } from '@mui/material';
import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { useGetUserByIdQuery } from '../../app/reducers/user/userApi';
import { formatTimeAgo } from '../../app/util/Utils';
type Props = {
    comment: CommentType;
} & ComponentPropsWithoutRef<'div'>;

export const Comment: FC<Props> = memo((props) => {
    const { data: user } = useGetUserByIdQuery({ id: props.comment.user.id });

    return (
        <Card sx={{ boxShadow: 'none', width: '100%' }}>
            <CardHeader
                sx={{ paddingBottom: 0 }}
                avatar={<Avatar src={user?.image} />}
                title={
                    <Typography variant="body2" component="span">
                        {props.comment?.user?.fullName} {props.comment.id}
                    </Typography>
                }
                subheader={
                    <Typography variant="body2" component="div">
                        {props.comment?.body}
                    </Typography>
                }
            />
            <CardActions sx={{ paddingLeft: 8 }} disableSpacing>
                <Tooltip title={formatTimeAgo(props.comment?.createdAt)} placement="top">
                    <IconButton>
                        <EditNoteIcon />
                    </IconButton>
                </Tooltip>
                <Typography variant="subtitle2" component="span">
                    {formatTimeAgo(props.comment?.createdAt)}
                </Typography>
            </CardActions>
        </Card>
    );
});
