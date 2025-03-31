import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdatePostLikeMutation } from '../../../entities/post/api/postApi ';
import { Post } from '../../../entities/post/types/PostTypes';
import { selectUserId } from '../../../entities/user/slice/userSlice';

const useLikeActions = (post: Post) => {
    const [updateReaction] = useUpdatePostLikeMutation();
    const user_id = useSelector(selectUserId);
    const [reaction, setReaction] = useState({
        likes: post.likes_count,
        dislikes: post.dislikes_count,
        current: post.user_reaction,
    });

    const isOwner = user_id === post.author.id;

    const handleReaction = async (newReaction: 'like' | 'dislike') => {
        let newLikes = reaction.likes;
        let newDislikes = reaction.dislikes;
        let finalReaction: 'like' | 'dislike' | null = newReaction;

        // Логика переключения реакций
        if (reaction.current === newReaction) {
            // Клик на активную реакцию - снимаем её
            finalReaction = null;
            if (newReaction === 'like') {
                newLikes -= 1;
            } else {
                newDislikes -= 1;
            }
        } else {
            // Клик на другую реакцию
            if (reaction.current === 'like') {
                newLikes -= 1;
            }
            if (reaction.current === 'dislike') {
                newDislikes -= 1;
            }

            if (newReaction === 'like') {
                newLikes += 1;
            } else {
                newDislikes += 1;
            }
        }

        setReaction({
            likes: newLikes,
            dislikes: newDislikes,
            current: finalReaction,
        });

        try {
            await updateReaction({
                postId: post.id,
                user_id: post.author.id,
                reaction_type: newReaction,
            }).unwrap();
        } catch (error) {
            // Откатываем при ошибке
            setReaction({
                likes: post.likes_count,
                dislikes: post.dislikes_count,
                current: post.user_reaction,
            });
        }
    };

    const handleLike = () => {
        if (isOwner) return;
        handleReaction('like');
    };
    const handleDislike = () => {
        if (isOwner) return;
        handleReaction('dislike');
    };

    return { reaction, handleLike, handleDislike, isOwner };
};

export default useLikeActions;
