import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Button, Skeleton, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { PostTypes } from '../../../entities/mainFeed/types/PostTypes';

/**
 * Пропсы для компонента LikeActions
 * @param {PostTypes} post - Пост
 * @param {boolean} isLoading - Флаг загрузки
 */
interface LikeActionsProps {
    post: PostTypes;
    isLoading: boolean;
}

/**
 * Компонент для отображения действий поста
 * @param {LikeActionsProps} props - Пропсы для компонента LikeActions
 * @returns {JSX.Element} - Элемент JSX
 */
const LikeActions: FC<LikeActionsProps> = ({ post, isLoading }) => {
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', px: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, width: '40%', justifyContent: 'space-around' }}>
                    <Skeleton animation="wave" variant="circular" height={30} width={30} />
                    <Skeleton animation="wave" variant="circular" height={30} width={30} />
                    <Skeleton animation="wave" variant="circular" height={30} width={30} />
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Skeleton animation="wave" variant="circular" height={30} width={30} />
                </Box>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex' }}>
                    <Tooltip title={`Поставили лайк ${post.likes - post.dislikes} человек`}>
                        <Button size="small">
                            <FavoriteIcon />
                            <span style={{ marginLeft: '0.5rem' }}>{post.likes - post.dislikes}</span>
                        </Button>
                    </Tooltip>
                </Box>
                <Box sx={{ paddingLeft: 1, paddingRight: 1, display: 'flex' }}>
                    <Tooltip title={`Комментировали ${post.comments_count} человек`}>
                        <Button size="small">
                            <CommentOutlinedIcon />
                            <span style={{ marginLeft: '0.5rem' }}>{post.comments_count }</span>
                        </Button>
                    </Tooltip>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Tooltip title={`Сделали репост ${post.reposts} человек`}>
                        <Button size="small">
                            <ShareIcon />
                            <span style={{ marginLeft: '0.5rem' }}>{post.reposts}</span>
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title={`Посмотрели ${post.views} человек`}>
                    <RemoveRedEyeOutlinedIcon fontSize="small"></RemoveRedEyeOutlinedIcon>
                </Tooltip>
                <Typography variant="body2" component="span" sx={{ marginLeft: '0.5rem' }}>
                    {post.views}
                </Typography>
            </Box>
        </>
    );
};

export default LikeActions;
