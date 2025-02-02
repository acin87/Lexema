import { useEffect, useState } from 'react';
import { useLazyGetChildCommentsQuery } from '../api/commentApi';
import { CommentType } from '../types/commntsType';

/**
 * Хук для получения дочерних комментариев
 * 
 * @param parentComment - родительский комментарий
 * @returns объект с комментариями и функция для загрузки новых комментариев
 * */
const useChildComment = (parentComment: CommentType) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [fetchComments, { data: lazyComments, isSuccess }] = useLazyGetChildCommentsQuery();

    const loadMoreComments = () => {
        setExpanded(true);
        fetchComments({ parentId: parentComment.id, postId: parentComment.postId });
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        setComments(parentComment.children || []);
    }, [parentComment]);

    useEffect(() => {
        if (isSuccess) {
            const newComments = lazyComments.comments.filter((comment) => !comments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setComments([...comments, ...newComments]);
        }
    }, [lazyComments]); // eslint-disable-line react-hooks/exhaustive-deps

    return { comments, isSuccess, expanded, loadMoreComments, handleExpandClick };
};
export default useChildComment;
