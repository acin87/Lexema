import AddIcon from '@mui/icons-material/Add';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { Box, Button, Collapse, Divider } from '@mui/material';
import { FC, Fragment } from 'react';
import useChildComment from '../../../entities/comment/hooks/useChildComment';
import { CommentType } from '../../../entities/comment/types/commntsType';
import Comment from './Comment';

interface ChildCommentProps {
    parentComment: CommentType;
    level: number;
}
/**
 * Компонент дочернего комментария
 * 
 * @param parentComment - родительский комментарий
 * @param level - уровень вложенности комментария
 */
const ChildComment: FC<ChildCommentProps> = ({ parentComment, level }) => {
    const { comments, isSuccess, expanded, loadMoreComments, handleExpandClick } = useChildComment(parentComment);

    const renderComment = () => {
        if (parentComment.children?.length === 1 && parentComment.childCount > 1 && !isSuccess) {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Button sx={{ textTransform: 'lowercase', ml: '16px' }} size="small" startIcon={<AddIcon />} onClick={loadMoreComments}>
                        раскрыть ветку ({parentComment.childCount})
                    </Button>
                </Box>
            );
        } else if (parentComment.children?.length === 1 && parentComment.childCount === 1 && !isSuccess) {
            return (
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '40px',
                            height: '100%',
                            paddingBottom: 4,
                            paddingLeft: '15px',
                        }}
                    >
                        <Divider orientation="vertical" />
                    </Box>
                    <Box sx={{ width: 'calc(100% - 40px)' }}>
                        <Comment comment={parentComment.children[0]} />
                    </Box>
                </Box>
            );
        } else if (isSuccess) {
            return (
                <Box sx={{ display: 'flex', flexDirection: `${expanded ? 'row' : 'column'}` }}>
                    {expanded ? (
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
                                onClick={handleExpandClick}
                                startIcon={<IndeterminateCheckBoxOutlinedIcon sx={{ marginRight: 0 }} />}
                            ></Button>
                            <Divider orientation="vertical" />
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex' }}>
                            <Button
                                sx={{ textTransform: 'lowercase', ml: '16px', lineHeight: '22px' }}
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={loadMoreComments}
                            >
                                раскрыть ветку ({parentComment.childCount})
                            </Button>
                        </Box>
                    )}

                    <Collapse
                        in={expanded}
                        sx={{ marginLeft: `${!expanded ? '40px' : '0'}`, width: 'calc(100% - 40px)' }}
                        timeout="auto"
                        unmountOnExit
                    >
                        {comments.map((comment) => (
                            <Fragment key={comment.id}>
                                <Comment comment={comment} />
                                {comment.children?.length === 1 && comment.childCount >= 1 && (
                                    <ChildComment parentComment={comment} level={level + 1} />
                                )}
                            </Fragment>
                        ))}
                    </Collapse>
                </Box>
            );
        }
    };

    return renderComment();
};

export default ChildComment;
