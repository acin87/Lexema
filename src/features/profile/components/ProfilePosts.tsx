import { FC, memo } from 'react';
import useProfilePosts from '../../../entities/profile/hooks/useProfilePosts';
import PostList from '../../../shared/components/feedPost/PostList';

interface ProfilePostsProps {
    id: number;
}

const ProfilePosts: FC<ProfilePostsProps> = ({ id }) => {
    const { posts, isError, ref, isSuccess, totalCount, isFetching, isLoading } = useProfilePosts({ id });
    return (
        <PostList
            posts={posts}
            isError={isError}
            ref={ref}
            isSuccess={isSuccess}
            totalCount={totalCount}
            isFetching={isFetching}
            isLoading={isLoading}
            context="profile"
        />
    );
};

export default memo(ProfilePosts);
