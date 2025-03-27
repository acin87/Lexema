import { Box, Button, Divider } from '@mui/material';
import { FC, memo } from 'react';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddIcon from '@mui/icons-material/Add';

interface ExpandCommentsButtonProps {
    expanded: boolean;
    handleCollapseClick: () => void;
    child_count: number;
    loadMoreComments: () => void;
}
const ExpandCommentsButton: FC<ExpandCommentsButtonProps> = ({ expanded, handleCollapseClick, child_count, loadMoreComments }) => {
    return expanded ? (
        //Если ветка раскрыта, то показываем кнопку для скрытия ветки
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '40px',
                paddingBottom: 4,
                lineHeight: '22px',
                paddingLeft: '15px',
            }}
        >
            <Button
                sx={{ textTransform: 'lowercase', '& .MuiButton-startIcon': { marginRight: '0px' } }}
                size="small"
                onClick={handleCollapseClick}
                startIcon={<IndeterminateCheckBoxOutlinedIcon sx={{ marginRight: 0 }} />}
            ></Button>
            <Divider orientation="vertical" />
        </Box>
    ) : (
        //Если ветка скрыта, то показываем кнопку для раскрытия ветки
        <Box sx={{ display: 'flex' }}>
            <Button
                sx={{ textTransform: 'lowercase', ml: '16px', lineHeight: '22px' }}
                size="small"
                startIcon={<AddIcon />}
                onClick={loadMoreComments}
            >
                раскрыть ветку ({child_count})
            </Button>
        </Box>
    );
};

export default memo(ExpandCommentsButton);
