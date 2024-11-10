import { Avatar, Box, Link, Typography } from '@mui/material';
import { FC } from 'react';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { useGetUserByIdQuery } from '../../app/reducers/user/userApi';

type CommentProps = {
    childCount: number | undefined;
    expand: (commentId:number) => void;
} & CommentType;

export const ChildCommentLink: FC<CommentProps> = (comment) => {
    const { data: userData } = useGetUserByIdQuery({ id: comment.user.id });

    const avatarSize = 25;

    return (
        <Box sx={{ display: 'flex', padding: '0 1rem' }} data-id={`${comment.postId}-${comment.user.id}`}>
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
                        onClick={()=> comment.expand(comment.id)}
                    >
                        {comment.user?.fullName} ответил(а) и еще {comment.childCount} коментариев
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};
