import ReplyIcon from '@mui/icons-material/Reply';
import { Box, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { PostTypes } from '../../../entities/mainFeed/types/PostTypes';
import Avatar from '../avatar/Avatar';
import PostImages from './PostImages';

/**
 * Пропсы для отображения репоста
 * @param originalPost - оригинальный пост
 */
interface RepostContentProps {
    originalPost: PostTypes;
}

/**
 * Компонент для отображения репоста
 * @param originalPost - оригинальный пост

 * @returns
 */
const RepostContent: FC<RepostContentProps> = ({ originalPost }) => {
    return (
        <Box sx={{ width: '100%' }}>
            {/* оригинальный пост */}
            <CardHeader
                sx={{ p: 0 }}
                avatar={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 3.5 }}>
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
