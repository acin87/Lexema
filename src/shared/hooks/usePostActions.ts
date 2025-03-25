import { useCallback } from 'react';
import { useUpdateViewsPostMutation } from '../../entities/mainFeed/api/mainFeedApi ';
import { useDeleteGroupPostMutation, useDeleteProfilePostMutation } from '../api/postsApi';

interface UsePostActionsProps {
    postId: number;
    authorId: number;
    isOwner: boolean;
    context: 'profile' | 'group';
    group_id?: number;
}
/** Хук для обновления счетчика просмотров и удаления поста
 * @param postId - id поста
 * @param authorId - id автора поста
 * @param isOwner - является ли пользователь владельцем поста
 * @param context - контекст поста (профиль или группа)
 * @param group_id - id группы
 * @returns
 */
export const usePostActions = ({ postId, authorId, isOwner, context, group_id }: UsePostActionsProps) => {
    const [updateViews] = useUpdateViewsPostMutation();
    const [deleteGroupPost] = useDeleteGroupPostMutation();
    const [deleteProfilePost] = useDeleteProfilePostMutation();

    const handleUpdateViews = useCallback(async () => {
        if (!isOwner) {
            await updateViews({ author_id: authorId, postId, views: 1 });
        }
    }, [updateViews, postId, authorId, isOwner]);

    const handleDeletePost = useCallback(async () => {
        if (context === 'profile') {
            await deleteProfilePost({ postId, user_id: authorId });
        } else if (context === 'group' && group_id) {
            await deleteGroupPost({ postId: postId, group_id: group_id! });
        }
    }, [deleteProfilePost, deleteGroupPost, postId, context, group_id, authorId]);

    return { handleUpdateViews, handleDeletePost };
};
