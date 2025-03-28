import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { CommentType } from '../../../entities/comment/types/commntsType'
import AddIcon from '@mui/icons-material/Add';

interface ExpandCommentsButtonProps {
    parentComment: Pick<CommentType, 'id' | 'post_id' | 'child_count'> ;
    loadMoreComments: () => void;
}

const ExpandCommentsButton: FC<ExpandCommentsButtonProps> = ({ parentComment, loadMoreComments }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Button
                sx={{ textTransform: 'lowercase', ml: '16px' }}
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

