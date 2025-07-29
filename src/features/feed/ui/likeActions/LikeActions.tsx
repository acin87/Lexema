import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Tooltip, Typography } from '@mui/material';
import { FC } from 'react';
import { Post } from '../../../../entities/post/types/PostTypes';
import useLikeActions from '../../hooks/useLikeActions';
import styles from './LikeActions.module.css';
import LikeButton from './LikeButton';
/**
 * Пропсы для компонента LikeActions
 * @param {PostTypes} post - Пост
 */
interface LikeActionsProps {
    post: Post;
    group_id?: number;
}

/**
 * Компонент для отображения действий поста
 * @param LikeActionsProps props - Пропсы для компонента LikeActions
 * @returns JSX.Element - Элемент JSX
 */
const LikeActions: FC<LikeActionsProps> = ({ post, group_id }) => {
    const { reaction, handleLike, handleDislike, isOwner } = useLikeActions(post, group_id);
    const isLike = reaction.current === 'like';
    const isDislike = reaction.current === 'dislike';

    return (
        <>
            <Box className={styles.likeActionsContainer}>
                <LikeButton reactionCurrent={isLike} currentIcon="like" isOwner={isOwner} likes={reaction.likes} handleLike={handleLike} />
                    <LikeButton reactionCurrent={isDislike} currentIcon="dislike" isOwner={isOwner} likes={reaction.dislikes} handleLike={handleDislike} />
                <Box className={styles.actionCount}>
                    <Tooltip title={`Комментариев: ${post.comments_count}`}>
                        <Box className={styles.actionIcon}>
                            <CommentOutlinedIcon fontSize="small" color="primary" />
                            <Box className={styles.actionCountText} component="span" color='primary.main'>
                                {post.comments_count}
                            </Box>
                        </Box>
                    </Tooltip>
                </Box>

                <Box className={styles.actionCount}>
                    <Tooltip title={`Репостов: ${post.reposts_count}`}>
                        <Box className={styles.actionIcon}>
                            <ShareIcon fontSize="small" color="primary" />
                            <Box className={styles.actionCountText} component="span" color='primary.main'>
                                {post.reposts_count}
                            </Box>
                        </Box>
                    </Tooltip>
                </Box>
            </Box>

            <Box className={styles.viewsContainer}>
                <Tooltip title={`Просмотров: ${post.views}`}>
                    <RemoveRedEyeOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
                </Tooltip>
                <Typography variant="body2" component="span" className={styles.viewsCount} fontSize={12}>
                    {post.views}
                </Typography>
            </Box>
        </>
    );
};

export default LikeActions;
