import { Box } from '@mui/material';
import { FC, memo } from 'react';
import usePosts from '../../../entities/post/hooks/usePosts';
import style from '../../../shared/styles/Post.module.css';
import CreatePosts from './CreatePosts';
import Post from './Post';

/**
 * Компонент списка постов
 *
 * @returns
 */
const PostList: FC = () => {
    const { isError, posts, ref } = usePosts();

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Box className={style.postList}>
            <CreatePosts />
            {posts.map((post, index) => {
                if (index + 1 === posts.length) {
                    return <Post key={post.id} {...post} ref={ref} className="show"></Post>;
                }
                return <Post key={post.id} {...post}></Post>;
            })}
        </Box>
    );
};
export default memo(PostList);
