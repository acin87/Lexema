import { memo } from 'react';
import useFeedPosts from '../hooks/useFeedPosts';
import PostList from '../../../features/feed/components/PostList';
const Posts = () => {
    const { posts, isError, ref, isSuccess, totalCount, isFetching, isLoading } = useFeedPosts();
    return <PostList posts={posts} isError={isError} ref={ref} isSuccess={isSuccess} totalCount={totalCount} isFetching={isFetching} isLoading={isLoading} />;
};

export default memo(Posts);
