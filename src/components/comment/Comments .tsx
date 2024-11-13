import { Avatar, Box, Link, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { useGetUserByIdQuery } from '../../app/reducers/user/userApi';
import { getRelativeTime } from '../../app/util/Utils';

export const Comments: FC<CommentType> = memo((comment) => {
    const { data: user } = useGetUserByIdQuery({ id: comment.user.id });

    return (
        <Box
            sx={{ display: 'flex', padding: '1rem', flexDirection: 'column' }}
            data-id={`${comment?.postId}-${comment?.user.id}`}
        >
            <Box sx={{ display: 'flex' }}>
                <Box>
                    <Avatar src={user?.image} />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '1.25rem',
                    }}
                >
                    <Typography variant="body2" component="span">
                        {comment?.user?.fullName}
                    </Typography>
                    <Typography variant="body2" component="span">
                        {comment?.body} {comment?.id}-{comment?.parentId}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" component="span" sx={{ paddingLeft: 0 }}>
                            {getRelativeTime(comment?.data)}
                        </Typography>
                        <Link
                            variant="subtitle2"
                            sx={{
                                marginLeft: 1,
                                marginRight: 1,
                                cursor: 'pointer',
                            }}
                        >
                            Ответить
                        </Link>
                        <Link variant="subtitle2" sx={{ cursor: 'pointer' }}>
                            Поделится
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});
