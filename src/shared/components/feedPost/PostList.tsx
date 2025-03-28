import { Box, CircularProgress, SxProps } from '@mui/material';
import { FC, Fragment, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostTypes } from '../../../entities/mainFeed/types/PostTypes';
import AddPostButton from '../addPostButton/AddPostButton';
import { WelcomeBanner } from '../welcomeBanner/WelcomeBanner';
import Post from './Post';
/**
 * Пропсы для компонента PostList
 * @param {PostTypes[]} posts - Массив постов
 * @param {boolean} isSuccess - Флаг успешности
 * @param {boolean} isError - Флаг ошибки
 * @param {number} totalCount - Количество постов
 * @param {function} ref - Ссылка на элемент
 * @param {string} context - Контекст
 * @param {number} group_id - ID группы
 */
type PostListProps = {
    posts: PostTypes[];
    isSuccess: boolean;
    isError: boolean;
    totalCount: number;
    ref: (node?: Element | null) => void;
    context: 'profile' | 'group';
    isProfile?: boolean;
    group_id?: number;
    isLoading: boolean;
};

const postListStyles: SxProps = {
    '@media (max-width: 992px)': {
        flexShrink: 0,
        width: '100%',
        maxWidth: '100%',
    },
    '@media (min-width: 992px)': {
        display: 'flex',
        flex: '0 0 auto',
        width: '66.66667%',
        flexWrap: 'wrap',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
    },
};

const circularProgressStyles: SxProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    width: '100%',
    margin: 0,
    padding: 0,
};

/**
 * Мемоизированный компонент для отдельного поста
 * @param {PostTypes} post - Пост
 * @param {boolean} loading - Флаг загрузки
 * @param {string} context - Контекст
 * @param {number} group_id - ID группы
 */
const MemoizedPost = memo(
    ({ post, context, group_id }: { post: PostTypes; context: 'profile' | 'group'; group_id?: number }) => (
        <Post post={post} context={context} group_id={group_id} />
    ),
);

/**
 * Компонент для отображения списка постов
 * @param PostListProps props - Пропсы для компонента PostList
 * @returns JSX.Element - Элемент JSX
 */
const PostList: FC<PostListProps> = ({
    posts,
    isSuccess,
    totalCount,
    ref,
    isError,
    context,
    group_id,
    isProfile,
    isLoading,
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            navigate('/error', { replace: true });
        }
    }, [isError, navigate]);

    if (posts.length === 0 && !isProfile && !isLoading) {
        return <WelcomeBanner />;
    }

    return (
        <Box sx={{ ...postListStyles }} className="post-list">
            <AddPostButton context={context} group_id={group_id} />
            {posts.map((post, index) => {
                const isLastPost = index + 1 === posts.length;

                return (
                    <Fragment key={post.id}>
                        <MemoizedPost post={post} context={context} group_id={group_id} />
                        {isLastPost && isSuccess && index + 1 !== totalCount && (
                            <Box sx={{ ...circularProgressStyles }} ref={ref}>
                                <CircularProgress />
                            </Box>
                        )}
                        {isLastPost && isSuccess && index + 1 === totalCount &&  totalCount > 1 && (
                            <Box sx={{ ...circularProgressStyles }}>
                                <Box component="h2">Поздравляем, Вы просмотрели все посты</Box>
                            </Box>
                        )}
                    </Fragment>
                );
            })}
        </Box>
    );
};

export default memo(PostList);
