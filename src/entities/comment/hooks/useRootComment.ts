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
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [comments, setComments] = useState<CommentType[]>([]);
    const { data: resultOnLoad, isSuccess } = useGetRootCommentsQuery({
        postId: postId,
        offset: offset,
        limit: limit,
    });
    const [lazyLoadComments, resultOnLazy] = useLazyGetRootCommentsQuery();

    const count = resultOnLoad ? resultOnLoad.count : 0;

    useEffect(() => {
        if (isSuccess) {
            setComments([...resultOnLoad.results]);
        }
    }, [isSuccess, resultOnLoad]); 


    useEffect(() => {
        if (resultOnLazy.isSuccess) {
            const newComments = resultOnLazy.data.results.filter((comment) => !comments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setComments([...comments, ...newComments]);
        }
    }, [resultOnLazy, comments]); 

    const loadMoreComments = () => {
        lazyLoadComments({ postId: postId, offset: offset + limit, limit: limit });
        setOffset((prevOffset) => prevOffset + limit);
    };
    return { comments, loadMoreComments, count };
};

export default useRootComment;
