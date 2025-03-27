import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { PostTypes } from '../../../entities/mainFeed/types/PostTypes';
import { useUpdateProfilePostLikeMutation } from '../../../shared/api/postsApi';
/**
 * Пропсы для компонента LikeActions
 * @param {PostTypes} post - Пост
 */
interface LikeActionsProps {
    post: PostTypes;
}

/**
 * Компонент для отображения действий поста
 * @param {LikeActionsProps} props - Пропсы для компонента LikeActions
 * @returns {JSX.Element} - Элемент JSX
 */
const LikeActions: FC<LikeActionsProps> = ({ post }) => {
    const [updateLike] = useUpdateProfilePostLikeMutation();
    const [like, setLike] = useState(post.likes);

    const handleLike = async () => {
        try {
            await updateLike({
                postId: post.id,
                user_id: post.author.id,
                likes: like + 1,
            }).unwrap();

            setLike((prev: number) => prev + 1);
        } catch (error) {
            console.error('Ошибка при обновлении лайка:', error);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex' }}>
                    <Tooltip title={`Поставили лайк ${like} человек`}>
                        <Button
                            size="small"
                            onClick={handleLike}
                            sx={{
                                color: 'primary.main',
                                '&:hover': {
                                    color: 'error.main',
                                },
                            }}
                        >
                            <FavoriteBorderIcon />
                            <span style={{ marginLeft: '0.5rem' }}>{like}</span>
                        </Button>
                    </Tooltip>
                </Box>
                <Box sx={{ paddingLeft: 1, paddingRight: 1, display: 'flex' }}>
                    <Tooltip title={`Комментировали ${post.comments_count} человек`}>
                        <Button
                            size="small"
                            sx={{
                                color: 'primary.main',
                                '&:hover': {
                                    color: 'error.main',
                                },
                            }}
                        >
                            <CommentOutlinedIcon />
                            <span style={{ marginLeft: '0.5rem' }}>{post.comments_count}</span>
                        </Button>
                    </Tooltip>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Tooltip title={`Сделали репост ${post.reposts} человек`}>
                        <Button
                            size="small"
                            sx={{
                                color: 'primary.main',
                                '&:hover': {
                                    color: 'error.main',
                                },
                            }}
                        >
                            <ShareIcon />
                            <span style={{ marginLeft: '0.5rem' }}>{post.reposts}</span>
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title={`Посмотрели ${post.views} человек`}>
                    <RemoveRedEyeOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
                </Tooltip>
                <Typography variant="body2" component="span" sx={{ marginLeft: '0.5rem' }}>
                    {post.views}
                </Typography>
            </Box>
        </>
    );
};

export default LikeActions;
