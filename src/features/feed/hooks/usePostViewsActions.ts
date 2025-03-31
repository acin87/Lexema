import { useCallback } from 'react';
import { useUpdateViewsPostMutation } from '../../../entities/post/api/postApi ';

interface UsePostViewsActionsProps {
    postId: number;
    authorId: number;
    isOwner: boolean;
}
/** Хук для обновления счетчика просмотров поста
 * @param postId - id поста
 * @param authorId - id автора поста
 * @param isOwner - является ли пользователь владельцем поста
 * @returns
 */
export const usePostViewsActions = ({ postId, authorId, isOwner }: UsePostViewsActionsProps) => {
    const [updateViews] = useUpdateViewsPostMutation();

    const handleUpdateViews = useCallback(async () => {
        if (!isOwner) {
            await updateViews({ author_id: authorId, postId, views: 1 });
        }
    }, [updateViews, postId, authorId, isOwner]);

    return { handleUpdateViews };
};
