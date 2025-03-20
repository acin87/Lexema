import { memo } from 'react';
import PostList from '../../../features/feed/components/PostList';
import useWallPosts from '../hooks/useWallPosts';

interface WallProps {
    id: number;
}

const Wall = ({ id }: WallProps) => {
    const { posts, isError, ref, isSuccess, totalCount, isFetching, isLoading } = useWallPosts({ id });
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

export default memo(Wall);
