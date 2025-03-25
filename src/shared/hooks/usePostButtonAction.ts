import { useCallback } from 'react';
import {
    useAddGroupPostMutation,
    useAddProfilePostMutation,
    useUpdateGroupPostMutation,
    useUpdateProfilePostMutation,
} from '../api/postsApi';


/**
 * Пропсы для компонента usePostButtonAction
 * @param {string} context - Контекст поста (профиль или группа)
 * @param {number} group_id - ID группы
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


    const handleCreatePost = useCallback(
        async (content: string, files: File[], user_id: number) => {
            const data = new FormData();
            data.append('content', content);
            files.forEach((file) => data.append('images', file));

            if (context === 'profile') {
                return addProfilePost({ author_id: user_id, data: data });
            } else if (context === 'group' && group_id) {
                console.log('group_id', group_id);
                return addGroupPost({ author_id: user_id, data: data });
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

    return { handleCreatePost, handleUpdatePost };
};
