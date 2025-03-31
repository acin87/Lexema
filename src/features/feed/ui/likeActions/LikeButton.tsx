import { Box, Button, Tooltip } from '@mui/material';
import { FC } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import styles from './LikeActions.module.css';

/**
 * Пропсы для компонента LikeButton
 */
interface LikeButtonProps {
    reactionCurrent: boolean
    currentIcon: 'like' | 'dislike';
    isOwner: boolean;
    likes: number;
    handleLike: () => void;
}

/**
 * Компонент для отображения кнопки лайка
 * @param LikeButtonProps props - Пропсы для компонента LikeButton
 * @returns JSX.Element - Элемент JSX
 */
const LikeButton: FC<LikeButtonProps> = ({ reactionCurrent, currentIcon, isOwner, likes, handleLike }) => {
    const IconLike = reactionCurrent ? ThumbUpIcon : ThumbUpOffAltIcon;
    const IconDislike = reactionCurrent ? ThumbDownIcon : ThumbDownOffAltIcon;
    const color = reactionCurrent ? 'error' : 'primary';
    const title = currentIcon === 'like' ? `Понравилось:  ${likes} ` : `Не понравилось:  ${likes} `;

    return (
        <Box className={styles.likeButton}>
            <Tooltip title={title} disableTouchListener={isOwner}>
                <Button
                    startIcon={currentIcon === 'like' ? <IconLike /> : <IconDislike />}
                    onClick={handleLike}
                    color={color}
                    className={styles.likeButton}
                    sx={{ '&:hover': { color: 'error.main' } }}
                >
                    <span className={styles.likeButtonText}>{likes}</span>
                </Button>
            </Tooltip>
        </Box>
    );
};

export default LikeButton;
