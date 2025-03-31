import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { CommentType } from '../../../../entities/comment/types/commntsType';
import styles from './Comment.module.css';

interface ExpandCommentsButtonProps {
    parentComment: Pick<CommentType, 'id' | 'post_id' | 'child_count'>;
    loadMoreComments: () => void;
}

const ExpandCommentsButton: FC<ExpandCommentsButtonProps> = ({ parentComment, loadMoreComments }) => {
    return (
        <Box className={styles.expandButtonContainer}>
            <Button
                className={styles.expandButton}
                size="small"
                startIcon={<AddIcon />}
                onClick={() => loadMoreComments()}
            >
                раскрыть ветку ({parentComment.child_count})
            </Button>
        </Box>
    );
};

export default ExpandCommentsButton;
