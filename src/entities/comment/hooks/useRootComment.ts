import { useCallback, useEffect, useMemo, useState } from 'react';
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

    // Основной запрос
    const { data: resultOnLoad, isSuccess } = useGetRootCommentsQuery({
        postId,
        offset: 0, // Всегда начинаем с 0 для первоначальной загрузки
        limit,
    });

    // Ленивая загрузка
    const [lazyLoadComments, { data: lazyData, isSuccess: isLazySuccess, isLoading: isLazyLoading }] =
        useLazyGetRootCommentsQuery();

    // Мемоизированное значение count
    const count = useMemo(() => resultOnLoad?.count || 0, [resultOnLoad]);

    // Обработка первоначальной загрузки
    useEffect(() => {
        if (isSuccess && resultOnLoad) {
            setComments(resultOnLoad.results);
            setOffset(limit); // Устанавливаем offset для следующей загрузки
        }
    }, [isSuccess, resultOnLoad, limit]);

    // Обработка ленивой загрузки
    useEffect(() => {
        if (isLazySuccess && lazyData) {
            setComments((prev) => {
                // Фильтрация дубликатов через Set
                const existingIds = new Set(prev.map((c) => c.id));
                const newComments = lazyData.results.filter((comment) => !existingIds.has(comment.id));
                return [...prev, ...newComments];
            });
            setOffset((prev) => prev + limit);
        }
    }, [isLazySuccess, lazyData, limit]);

    // Оптимизированная загрузка дополнительных комментариев
    const loadMoreComments = useCallback(() => {
        if (comments.length < count) {
            lazyLoadComments({ postId, offset, limit });
        }
    }, [postId, offset, limit, count, comments.length, lazyLoadComments]);

    return {
        data: { comments },
        actions: { loadMoreComments },
        meta: { count, hasMore: count, isLoading: isLazyLoading },
    };
};

export default useRootComment;
