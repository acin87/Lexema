import ReplyIcon from '@mui/icons-material/Reply';
import { Box, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Post } from '../../../../entities/post/types/PostTypes';
import Avatar from '../../../../shared/ui/avatar/Avatar';
import PostImages from '../postImages/PostImages';
import styles from './RepostContent.module.css';

interface RepostContentProps {
    originalPost: Post;
}

const RepostContent: FC<RepostContentProps> = ({ originalPost }) => {
    return (
        <Box className={styles.repostContainer}>
            <CardHeader
                className={styles.repostHeader}
                avatar={
                    <Box className={styles.repostAuthor}>
                        <ReplyIcon sx={{ color: 'primary.main' }} /> <Avatar src={originalPost.author.avatar} />
                    </Box>
                }
                title={
                    <NavLink style={{ textDecoration: 'none' }} to={`/profile/${originalPost.author.id}`}>
                        {originalPost.author.first_name} {originalPost.author.last_name}
                    </NavLink>
                }
                subheader={
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{ height: originalPost.signature ? 'auto' : '20px' }}
                    >
                        {originalPost.signature}
                    </Typography>
                }
            />
            {originalPost.content && (
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {originalPost.content}
                    </Typography>
                </CardContent>
            )}
            {originalPost.images && originalPost.images.length > 0 && (
                <CardMedia>
                    <PostImages images={originalPost.images?.map((img) => img.image) || []} />
                </CardMedia>
            )}
        </Box>
    );
};

export default memo(RepostContent);
