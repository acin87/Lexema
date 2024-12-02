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
        <Card sx={{ boxShadow: 'none'}}>
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
    // return (
    //     <Box
    //         sx={{...{ display: 'flex', padding: '1rem', flexDirection: 'column'}, ...props.sx}}
    //         data-id={`${props.comment?.postId}-${props.comment?.user.id}`}
    //     >
    //         <Box sx={{ display: 'flex' }}>
    //             <Box>
    //                 <Avatar src={user?.image} />
    //             </Box>
    //             <Box
    //                 sx={{
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     marginLeft: '1.25rem',
    //                 }}
    //             >
    //                 <Typography variant="body2" component="span">
    //                     {props.comment?.user?.fullName}
    //                 </Typography>
    //                 <Typography variant="body2" component="span">
    //                     {props.comment?.body} id={props.comment?.id}, parentId={props.comment?.parentId}
    //                 </Typography>
    //                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //                     <Typography variant="subtitle2" component="span" sx={{ paddingLeft: 0 }}>
    //                         {getRelativeTime(props.comment?.data)}
    //                     </Typography>
    //                     <Link
    //                         variant="subtitle2"
    //                         sx={{
    //                             marginLeft: 1,
    //                             marginRight: 1,
    //                             cursor: 'pointer',
    //                         }}
    //                     >
    //                         Ответить
    //                     </Link>
    //                     <Link variant="subtitle2" sx={{ cursor: 'pointer' }}>
    //                         Поделится
    //                     </Link>
    //                 </Box>
    //             </Box>
    //         </Box>
    //     </Box>
    // );
});
