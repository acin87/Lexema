import { FC } from 'react';
import useFeedPosts from '../../../entities/mainFeed/hooks/useFeedPosts';
import PostList from '../../../shared/components/feedPost/PostList';

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
const MainFeedPosts: FC<PostsProps> = ({ context }) => {
    const { posts, isError, ref, isSuccess, totalCount, isFetching, isLoading } = useFeedPosts();
    return (
        <PostList
            posts={posts}
            isError={isError}
            ref={ref}
            isSuccess={isSuccess}
            totalCount={totalCount}
            isFetching={isFetching}
            isLoading={isLoading}
            context={context}
        />
    );
};

export default MainFeedPosts;
