import { FC } from 'react';
import useFeedPosts from '../../hooks/useFeedPosts';
import PostList from '../postList/PostList';

/**
 * Пропсы для компонента Posts
 */
interface PostsProps {
    context: 'profile' | 'group';
}
/**
 * Компонент для отображения списка постов
 * @param context - Контекст (профиль или группа)
 * @returns Список постов
 */
const MainFeed: FC<PostsProps> = ({ context }) => {
    const { posts, isError, ref, isSuccess, totalCount, isLoading } = useFeedPosts('main');
    return (
        <PostList
            posts={posts}
            isError={isError}
            ref={ref}
            isSuccess={isSuccess}
            totalCount={totalCount}
            context={context}
            isLoading={isLoading}
        />
    );
};

export default MainFeed;
