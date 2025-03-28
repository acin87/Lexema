import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { PostTypes } from '../../../entities/mainFeed/types/PostTypes';
import { useUpdatePostLikeMutation } from '../../../shared/api/postsApi';

/**
 * Пропсы для компонента LikeActions
 * @param {PostTypes} post - Пост
 */
interface LikeActionsProps {
    post: PostTypes;
}

/**
 * Компонент для отображения действий поста
 * @param LikeActionsProps props - Пропсы для компонента LikeActions
 * @returns JSX.Element - Элемент JSX
 */
const LikeActions: FC<LikeActionsProps> = ({ post }) => {
    const [updateReaction] = useUpdatePostLikeMutation();
    const [reaction, setReaction] = useState({
        likes: post.likes_count,
        dislikes: post.dislikes_count,
        current: post.user_reaction,
    });

    const handleReaction = async (newReaction: 'like' | 'dislike') => {
        let newLikes = reaction.likes;
        let newDislikes = reaction.dislikes;
        let finalReaction: 'like' | 'dislike' | null = newReaction;

        // Логика переключения реакций
        if (reaction.current === newReaction) {
            // Клик на активную реакцию - снимаем её
            finalReaction = null;
            if (newReaction === 'like') {
                newLikes -= 1;
            } else {
                newDislikes -= 1;
            }
        } else {
            // Клик на другую реакцию
            if (reaction.current === 'like') {
                newLikes -= 1;
            }
            if (reaction.current === 'dislike') {
                newDislikes -= 1;
            }

            if (newReaction === 'like') {
                newLikes += 1;
            } else {
                newDislikes += 1;
            }
        }

        setReaction({
            likes: newLikes,
            dislikes: newDislikes,
            current: finalReaction,
        });

        try {
            await updateReaction({
                postId: post.id,
                user_id: post.author.id,
                reaction_type: newReaction,
            }).unwrap();
        } catch (error) {
            // Откатываем при ошибке
            setReaction({
                likes: post.likes_count,
                dislikes: post.dislikes_count,
                current: post.user_reaction,
            });
        }
    };

    const handleLike = () => handleReaction('like');
    const handleDislike = () => handleReaction('dislike');

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                {/* Кнопка лайка */}
                <Box sx={{ display: 'flex' }}>
                    <Tooltip title={`Понравилось:  ${reaction.likes} `}>
                        <Button
                            startIcon={reaction.current === 'like' ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                            onClick={handleLike}
                            color={reaction.current === 'like' ? 'error' : 'primary'}
                            sx={{
                                '&:hover': {
                                    color: 'error.main',
                                },
                            }}
                        >
                            <span>{reaction.likes}</span>
                        </Button>
                    </Tooltip>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Tooltip title={`Не понравилось:  ${reaction.dislikes}`}>
                        <Button
                            startIcon={reaction.current === 'dislike' ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                            onClick={handleDislike}
                            color={reaction.current === 'dislike' ? 'error' : 'primary'}
                            sx={{
                                '&:hover': {
                                    color: 'error.main',
                                },
                            }}
                        >
                            <span>{reaction.dislikes}</span>
                        </Button>
                    </Tooltip>
                </Box>

                {/* Комментарии */}
                <Box sx={{ display: 'flex', width: '64px', px: 1 }}>
                    <Tooltip title={`Комментариев: ${post.comments_count}`}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CommentOutlinedIcon fontSize="small" color="primary" />
                            <Box sx={{ marginLeft: 1 }} component="span" color="primary.main">
                                {post.comments_count}
                            </Box>
                        </Box>
                    </Tooltip>
                </Box>

                {/* Репосты */}
                <Box sx={{ display: 'flex', width: '64px', px: 1 }}>
                    <Tooltip title={`Репостов: ${post.reposts_count}`}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ShareIcon fontSize="small" color="primary" />
                            <Box sx={{ marginLeft: 1 }} component="span" color="primary.main">
                                {post.reposts_count}
                            </Box>
                        </Box>
                    </Tooltip>
                </Box>
            </Box>

            {/* Просмотры */}
            <Box sx={{ display: 'flex' }}>
                <Tooltip title={`Просмотров: ${post.views}`}>
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
