import { Avatar, Box, Link, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { useGetUserByIdQuery } from '../../app/reducers/user/userApi';

type CommentProps = {
    expand: (commentId:number | undefined) => void;
    margin: number;

} & CommentType ;

export const ExpandMoreComments: FC<CommentProps> = memo((comment) => {
    const { data: userData } = useGetUserByIdQuery({ id: comment.user.id });

    const avatarSize = 25;

    return (
        <Box sx={{ display: 'flex', padding: '0 1rem', marginLeft: comment.margin }} data-id={`${comment.postId}-${comment.user.id}`}>
            <Box>
                <Avatar src={userData?.image} sx={{ width: avatarSize, height: avatarSize }} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '.5rem',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="body2" component="span">
                    <Link
                        variant="subtitle2"
                        sx={{ cursor: 'pointer', textDecoration: 'none' }}
                        onClick={()=> comment.expand(comment.parentId)}
                    >
                        {comment.user?.fullName} ответил(а) и еще {comment.childCount} коментариея
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
});
