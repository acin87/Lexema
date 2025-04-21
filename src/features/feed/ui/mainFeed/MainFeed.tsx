import { FC } from 'react';
import useFeedPosts from '../../hooks/useFeedPosts';
import PostList from '../postList/PostList';
import { isApiError } from '../../../../app/api/Utils';


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
    const { posts, isError, ref, isSuccess, totalCount, isLoading, error} = useFeedPosts('main');
    return (
        <PostList
            posts={posts}
            isError={isError}
            ref={ref}
            isSuccess={isSuccess}
            totalCount={totalCount}
            context={context}
            isLoading={isLoading}
            error={isApiError(error) ? error : undefined} // Проверка на ошибку API
        />
    );
};

export default MainFeed;
