import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store/store';
import { useLazyGetChildCommentsQuery } from '../api/commentApi';
import { getCommentsByParentId, getExpandedById, setExpanded, updateComments } from '../slice/comment.Slice';
import { CommentType } from '../types/commntsType';

/**
 * Хук для получения дочерних комментариев
 *
 * @param parentComment - родительский комментарий
 * @returns объект с комментариями и функция для загрузки новых комментариев
 * */
const useChildComment = (parentComment: Pick<CommentType, 'id' | 'post_id' | 'child_count'>) => {
    const dispatch = useDispatch<AppDispatch>();

    const rawComments = useSelector((state: RootState) => getCommentsByParentId(state, parentComment.id.toString()));

    const rawExpanded = useSelector((state: RootState) => getExpandedById(state, parentComment.id.toString()));

    const comments = useMemo(() => rawComments || [], [rawComments]);
    const expanded = useMemo(() => rawExpanded, [rawExpanded]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [fetchComments, { data: lazyComments, isSuccess }] = useLazyGetChildCommentsQuery();

    const loadMoreComments = useCallback(() => {
      
        if (isLoading || expanded) return;

        setIsLoading(true);
        setError(null);
        fetchComments({
            parentId: parentComment.id,
            postId: parentComment.post_id,
        })
            .unwrap()
            .catch(() => setError('Ошибка загрузки'))
            .finally(() => {
                setIsLoading(false);
                dispatch(setExpanded({ commentId: parentComment.id.toString(), expanded: true }));
            });
    }, [isLoading, expanded, fetchComments, parentComment, dispatch]);

  
    const handleCollapseClick = useCallback(() => {
        dispatch(
            setExpanded({
                commentId: parentComment.id.toString(),
                expanded: !expanded,
            }),
        );
    }, [dispatch, expanded, parentComment.id]);


    useEffect(() => {
        if (expanded && !hasLoaded) {
            loadMoreComments();
        }
    }, [expanded, hasLoaded, loadMoreComments]);


    useEffect(() => {
        if (lazyComments && lazyComments.length > 0) {
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
        data: { comments, expanded },
        actions: { loadMoreComments, handleCollapseClick },
        state: { isSuccess, isLoading, error },
    };
};

export default useChildComment;
