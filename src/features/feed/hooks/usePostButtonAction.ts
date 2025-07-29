import { useCallback } from 'react';
import {
    useAddGroupPostMutation,
    useAddProfilePostMutation,
    useDeleteGroupPostMutation,
    useDeleteProfilePostMutation,
    useUpdateGroupPostMutation,
    useUpdateProfilePostMutation,
} from '../../../entities/post/api/postApi ';

/**
 * Пропсы для компонента usePostButtonAction
 * @param string context - Контекст поста (профиль или группа)
 * @param number group_id - ID группы
 */
interface UsePostActionsProps {
    context: 'profile' | 'group';
    group_id?: number;
}

/**
 * Хук для создания и обновления постов
 * @param {UsePostActionsProps} props - Пропсы для хука
 * @returns {Object} - Объект с функциями для действий с постами
 */
export const usePostButtonAction = ({ context, group_id }: UsePostActionsProps) => {
    const [addProfilePost] = useAddProfilePostMutation();
    const [addGroupPost] = useAddGroupPostMutation();
    const [updateProfilePost] = useUpdateProfilePostMutation();
    const [updateGroupPost] = useUpdateGroupPostMutation();
    const [deleteGroupPost] = useDeleteGroupPostMutation();
    const [deleteProfilePost] = useDeleteProfilePostMutation();

    const handleCreatePost = useCallback(
        async (user_id: number, content?: string, files?: File[], original_post_id?: number) => {
            const data = new FormData();
            if (content) {
                data.append('content', content);
            }
            if (files) {
                files.forEach((file) => data.append('images', file));
            }
            if (original_post_id) {
                data.append('original_post', original_post_id.toString());
            }
            if (context === 'profile') {
                return addProfilePost({ author_id: user_id, data: data });
            } else if (context === 'group' && group_id) {
                return addGroupPost({ group_id: group_id, data: data });
            }
            console.error('Не указан group_id для поста в группе');
        },
        [context, group_id, addProfilePost, addGroupPost],
    );

    const handleUpdatePost = useCallback(
        async (post_id: number, content: string, files: File[], user_id: number) => {
            const data = new FormData();
            data.append('content', content);
            files.forEach((file) => data.append('new_images', file));

            if (context === 'profile') {
                return updateProfilePost({ data: data, post_id: post_id, user_id: user_id! });
            } else if (context === 'group' && group_id) {
                return updateGroupPost({ data: data, post_id: post_id, group_id: group_id! });
            }
            console.error('Не указан group_id для поста в группе');
        },
        [context, group_id, updateProfilePost, updateGroupPost],
    );

    const handleDeletePost = useCallback(
        async (postId: number, authorId: number) => {
            if (context === 'profile') {
                return deleteProfilePost({ postId, user_id: authorId });
            } else if (context === 'group' && group_id) {
                return deleteGroupPost({ postId: postId, group_id: group_id! });
            }
        },
        [deleteProfilePost, deleteGroupPost, context, group_id],
    );

    return { handleCreatePost, handleUpdatePost, handleDeletePost };
};
