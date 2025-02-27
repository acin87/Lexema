import { Box, CircularProgress, CssThemeVariables } from '@mui/material';
import { FC, Fragment, memo } from 'react';
import usePosts from '../../../entities/post/hooks/usePosts';
import CreatePosts from './CreatePosts';
import Post from './Post';

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
/**
 * Компонент списка постов
 *
 * @returns
 */
const PostList: FC = () => {
    const { isError, posts, ref, isSuccess, totalCount } = usePosts();

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Box sx={{ ...postListStyles }}>
            <CreatePosts />
            {posts.map((post, index) => {
                if (index + 1 === posts.length) {
                    return (
                        <Fragment key={post.id}>
                            <Post {...post} />
                            {isSuccess && index + 1 != totalCount && (
                                <Box sx={{ ...circularProgressStyles }} ref={ref}>
                                    <CircularProgress />
                                </Box>
                            )}
                            {isSuccess && index + 1 == totalCount && (
                                <Box sx={{ ...circularProgressStyles }}>
                                    <Box component="h2">Поздравляем, Вы просмотрели все посты</Box>
                                </Box>
                            )}
                        </Fragment>
                    );
                }
                return <Post key={post.id} {...post}></Post>;
            })}
        </Box>
    );
};
export default memo(PostList);
