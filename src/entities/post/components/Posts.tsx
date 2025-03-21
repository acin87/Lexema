import PostList from '../../../features/feed/components/PostList';
import useFeedPosts from '../hooks/useFeedPosts';
const Posts = () => {
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
        />
    );
};

export default Posts;
