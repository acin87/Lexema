import AddIcon from '@mui/icons-material/Add';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { Box, Button, Collapse, Divider } from '@mui/material';
import { FC, Fragment, memo } from 'react';
import useChildComment from '../../../entities/comment/hooks/useChildComment';
import { CommentType } from '../../../entities/comment/types/commntsType';
import Comment from './Comment';

/**
 * Пропсы компонента дочернего комментария
 */
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
    const { comments, isSuccess, expanded, loadMoreComments, handleCollapseClick } = useChildComment(parentComment);
   
    const MemoizedComments = memo(() => {
        return comments.map((comment) => (
            <Fragment key={comment.id}>
                <Comment comment={comment} user={comment.user} />
                {comment.replies?.length === 1 && comment.child_count >= 1 && (
                    <ChildComment parentComment={comment} level={level + 1} />
                )}
            </Fragment>
        ));
    });

    const renderComment = () => {
        
        if (parentComment.replies?.length === 1 && parentComment.child_count > 1 && !expanded) {
            //Если у родительского комментария есть один дочерний комментарий но количество дочерних комментариев больше 1, то показываем кнопку для раскрытия ветки
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Button
                        sx={{ textTransform: 'lowercase', ml: '16px' }}
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={loadMoreComments}
                    >
                        раскрыть ветку ({parentComment.child_count})
                    </Button>
                </Box>
            );
            
        } else if (parentComment.replies?.length === 1 && parentComment.child_count === 1 && !isSuccess) {
            //Если у родительского комментария есть один дочерний комментарий и количество дочерних комментариев равно 1, то показываем комментарий
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
                        <Comment comment={parentComment.replies[0]} user={parentComment.replies[0].user} />
                    </Box>
                </Box>
            );
          
        } else if (isSuccess) {
          //Если комментарии лениво загружены, то показываем ветку
            return (
                <Box sx={{ display: 'flex', flexDirection: `${expanded ? 'row' : 'column'}` }}>
                    {expanded ? (
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
                                раскрыть ветку ({parentComment.child_count})
                            </Button>
                        </Box>
                    )}

                    <Collapse
                        in={expanded}
                        sx={{ marginLeft: `${!expanded ? '40px' : '0'}`, width: 'calc(100% - 40px)' }}
                        timeout="auto"
                        unmountOnExit
                    >
                        <MemoizedComments />
                    </Collapse>
                </Box>
            );
        }
    };

    return renderComment();
};

export default ChildComment;
