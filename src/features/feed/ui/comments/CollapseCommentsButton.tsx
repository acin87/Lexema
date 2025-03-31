import AddIcon from '@mui/icons-material/Add';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { Box, Button, Divider, Typography } from '@mui/material';
import { FC, memo } from 'react';
import styles from './Comment.module.css';

/**
 * Пропсы компонента кнопки для скрытия ветки
 */
interface CollapseCommentsButtonProps {
    expanded: boolean;
    handleCollapseClick: () => void;
    child_count: number;
    loadMoreComments: () => void;
}

/**
 * Компонент для кнопки скрытия ветки
 * @param expanded - флаг, указывающий, раскрыта ли ветка
 * @param handleCollapseClick - функция для скрытия ветки
 * @param child_count - количество дочерних комментариев
 * @param loadMoreComments - функция для загрузки дочерних комментариев
 */
const CollapseCommentsButton: FC<CollapseCommentsButtonProps> = ({
    expanded,
    handleCollapseClick,
    child_count,
    loadMoreComments,
}) => {
    return expanded ? (
        //Если ветка раскрыта, то показываем кнопку для скрытия ветки
        <Box className={styles.collapseButtonContainer}>
            <Button
                className={styles.collapseButton}
                size="small"
                onClick={handleCollapseClick}
                startIcon={<IndeterminateCheckBoxOutlinedIcon className={styles.collapseButtonIcon} />}
                sx={{ '& .MuiButton-startIcon': { mr: 0, ml: 0 } }}
            ></Button>
            <Divider orientation="vertical" />
        </Box>
    ) : (
        //Если ветка скрыта, то показываем кнопку для раскрытия ветки
        <Box sx={{ display: 'flex', '& > button': { alignItems: 'flex-start' } }}>
            <Button size="small" startIcon={<AddIcon />} onClick={loadMoreComments} sx={{ fontSize: '.720rem' }}>
                <Typography component="span" className={styles.collapseButtonText}>
                    раскрыть ветку ({child_count})
                </Typography>
            </Button>
        </Box>
    );
};

export default memo(CollapseCommentsButton);
