import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store/store';
import { useLazyGetChildCommentsQuery } from '../api/commentApi';
import { getCommentsByParentId, getExpandedById, setExpanded, updateComments } from '../slice/comment.Slice';
import { CommentType } from '../types/commntsType';
/**
 * Хук для получения дочерних комментариев
 *
 * @param parentComment - родительский комментарий
 * @returns объект с комментариями и функция для загрузки новых комментариев
 * */
const useChildComment = (parentComment: CommentType) => {
    const comments = useSelector((state: RootState) => getCommentsByParentId(state, parentComment.id.toString())) || [];
    const expanded = useSelector((state: RootState) => getExpandedById(state, parentComment.id.toString()));
    const [hasLoaded, setHasLoaded] = useState(false);
    const dispatch = useDispatch();
    const [fetchComments, { data: lazyComments, isSuccess }] = useLazyGetChildCommentsQuery();
    const loadMoreComments = () => {
        if (!expanded) {
            fetchComments({ parentId: parentComment.id, postId: parentComment.post_id });
        }
        dispatch(setExpanded({ commentId: parentComment.id.toString(), expanded: true }));
    };

    //Функция для скрытия ветки
    const handleCollapseClick = useCallback(() => {
        dispatch(
            setExpanded({
                commentId: parentComment.id.toString(),
                expanded: !expanded,
            }),
        );
    }, [dispatch, expanded, parentComment.id]);

    //При первом раскрытии или если комментарии еще не загружены
    useEffect(() => {
        if (expanded && !hasLoaded) {
            fetchComments({ parentId: parentComment.id, postId: parentComment.post_id });
        }
    }, [expanded, fetchComments, parentComment.id, parentComment.post_id, hasLoaded]);

    // Обновляем комментарии только если lazyComments есть и это не инвалидация
    useEffect(() => {
        if (lazyComments) {
            setHasLoaded(true);
            dispatch(
                updateComments({
                    parentId: parentComment.id.toString(),
                    comments: lazyComments,
                }),
            );
        }
    }, [lazyComments, dispatch, parentComment.id]);

    return {
        comments,
        isSuccess,
        expanded,
        loadMoreComments,
        handleCollapseClick,
    };
};

export default useChildComment;
