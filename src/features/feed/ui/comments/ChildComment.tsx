import { Box, Collapse } from '@mui/material';
import { FC, Fragment, memo } from 'react';
import useChildComment from '../../../../entities/comment/hooks/useChildComment';
import { CommentType } from '../../../../entities/comment/types/commntsType';
import CollapseCommentsButton from './CollapseCommentsButton';
import Comment from './Comment';
import styles from './Comment.module.css';
import ExpandCommentsButton from './ExpandCommentsButton';
import SingleComment from './SingleComment';
/**
 * Пропсы компонента дочернего комментария
 */
interface ChildCommentProps {
    parentComment: Pick<CommentType, 'id' | 'post_id' | 'child_count'> & {
        replies?: CommentType[];
    };
    level: number;
}

/**
 * Мемоизированный компонент для рекурсивного отображения дочерних комментариев
 * @param comments - массив комментариев
 * @param level - уровень вложенности комментария
 * @returns JSX элементы для отображения комментариев
 */
const MemoizedComments = memo(({ comments, level }: { comments: CommentType[]; level: number }) => {
    return comments.map((comment) => (
        <Fragment key={comment.id}>
            <Comment comment={comment} user={comment.user} level={level} />
            {comment.replies?.length === 1 && comment.child_count >= 1 && (
                <ChildComment parentComment={comment} level={level + 1} />
            )}
        </Fragment>
    ));
});

/**
 * Компонент дочернего комментария
 *
 * @param parentComment - родительский комментарий
 * @param level - уровень вложенности комментария
 */
const ChildComment: FC<ChildCommentProps> = ({ parentComment, level }) => {
    const { data, actions } = useChildComment(parentComment);
    const { comments, expanded } = data;
    const { loadMoreComments, handleCollapseClick } = actions;
    // const { isSuccess, isLoading, error } = state;

    const replies = parentComment.replies || [];
    const hasReplies = replies.length > 0;

    const shouldShowExpandButton =
        parentComment.child_count > 0 && (parentComment.child_count > 1 || (hasReplies && replies[0].child_count > 0));

    if (shouldShowExpandButton && !expanded) {
        /*Если у родительского комментария есть один дочерний комментарий но количество дочерних комментариев больше 1,
         то показываем кнопку для раскрытия ветки
        и при нажатии на кнопку загружаем дочерние комментарии
             */
        return <ExpandCommentsButton parentComment={parentComment} loadMoreComments={loadMoreComments} />;
    }

    if (hasReplies && parentComment.child_count === 1 && !expanded) {
        /*Если у родительского комментария есть один дочерний комментарий и количество дочерних комментариев равно 1, 
            то показываем комментарий который уже загружен */
        return <SingleComment parentComment={parentComment} level={level} />;
    }
    //Если комментарии лениво загружены, то показываем ветку
    return (
        <Box className={expanded ? styles.childCommentContainer : styles.childCommentContainerCollapsed}>
            <CollapseCommentsButton
                expanded={expanded}
                handleCollapseClick={handleCollapseClick}
                child_count={parentComment.child_count}
                loadMoreComments={loadMoreComments}
            />
            <Collapse in={expanded} className={styles.childCommentContent} timeout="auto" unmountOnExit>
                <MemoizedComments comments={comments} level={level} />
            </Collapse>
        </Box>
    );
};

export default memo(ChildComment);
