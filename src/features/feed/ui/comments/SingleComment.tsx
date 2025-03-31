import { Box, Divider } from '@mui/material';
import { CommentType } from '../../../../entities/comment/types/commntsType';
import ChildComment from './ChildComment';
import Comment from './Comment';

/**
 * Пропсы компонента отображения одного комментария
 */
interface SingleCommentProps {
    parentComment: Pick<CommentType, 'id' | 'post_id' | 'child_count'> & {
        replies?: CommentType[];
    };
    level: number;
}

/**
 * Компонент для отображения одного комментария
 * @param parentComment - родительский комментарий
 * @param level - уровень вложенности комментария
 */
const SingleComment = ({ parentComment, level }: SingleCommentProps) => {
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
                {parentComment.replies && parentComment.replies[0] && (
                    <>
                        <Comment
                            comment={parentComment.replies[0]}
                            user={parentComment.replies[0].user}
                            level={level}
                        />
                        {parentComment.replies[0].child_count > 0 && (
                            <ChildComment parentComment={parentComment.replies[0]} level={level + 1} />
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default SingleComment;
