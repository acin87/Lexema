import { Box, CircularProgress, CssThemeVariables } from '@mui/material';
import { FC, Fragment, memo } from 'react';
import { PostTypes } from '../../../entities/post/types/PostTypes';
import AddPostButton from './AddPostButton';
import Post from './Post';

type PostListProps = {
    posts: PostTypes[];
    isLoading: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    totalCount: number;
    ref: (node?: Element | null) => void;
};

const postListStyles: CssThemeVariables = {
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

const circularProgressStyles: CssThemeVariables = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    width: '100%',
    margin: 0,
    padding: 0,
};

// Мемоизированный компонент для отдельного поста
const MemoizedPost = memo(({ post, loading }: { post: PostTypes; loading: boolean }) => (
    <Post post={post} loading={loading} />
));

const PostList: FC<PostListProps> = ({ posts, isLoading, isSuccess, totalCount, ref, isError }) => {
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Box sx={{ ...postListStyles }} className="post-list">
            <AddPostButton />
            {posts.map((post, index) => {
                const isLastPost = index + 1 === posts.length;
                const isNewPost = index >= posts.length - 5; // Предполагаем, что загружаем по 5 постов

                return (
                    <Fragment key={post.id}>
                        <MemoizedPost post={post} loading={isNewPost ? isLoading : false} />
                        {isLastPost && isSuccess && index + 1 !== totalCount && (
                            <Box sx={{ ...circularProgressStyles }} ref={ref}>
                                <CircularProgress />
                            </Box>
                        )}
                        {isLastPost && isSuccess && index + 1 === totalCount && (
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
