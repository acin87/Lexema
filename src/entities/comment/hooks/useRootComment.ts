import { useEffect, useState } from 'react';
import { useGetRootCommentsQuery, useLazyGetRootCommentsQuery } from '../api/commentApi';
import { CommentType } from '../types/commntsType';


/**
 * Хук для получения корневых комментариев
 * 
 * @param postId - id поста
 * @returns объект с комментариями и функция для загрузки новых комментариев
 */
const useRootComment = (postId: number) => {
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;
    const [comments, setComments] = useState<CommentType[]>([]);
    const { data: resultOnLoad, isSuccess } = useGetRootCommentsQuery({
        postId: postId,
        page: 1,
        limit: 2,
    });
    const [trigger, resultOnLazy] = useLazyGetRootCommentsQuery();

    useEffect(() => {
        if (isSuccess) {
            setComments([...resultOnLoad.comments]);
        }
    }, [isSuccess]); //eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (resultOnLazy.isSuccess) {
            const newComments = resultOnLazy.data.comments.filter((comment) => !comments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setComments([...comments, ...newComments]);
        }
    }, [resultOnLazy]); //eslint-disable-line react-hooks/exhaustive-deps

    const loadMoreComments = () => {
        trigger({ postId: postId, page: currentPage + 1, limit: limit });
        setCurrentPage((prevPage) => prevPage + 1);
    };
    return { comments, loadMoreComments };
};

export default useRootComment;
