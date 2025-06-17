import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUserId } from '../../../../entities/user/slice/userSlice';
import useFeedPosts from '../../hooks/useFeedPosts';
import PostList from '../postList/PostList';

const ProfileFeed: FC = () => {
    const { id } = useParams();
    const userId = useSelector(selectUserId);
    const isOwner = userId === Number(id);
    const { posts, isError, ref, isSuccess, totalCount, isLoading } = useFeedPosts(
        isOwner ? 'profile' : 'friend',
        Number(id),
    );
    return (
        <PostList
            posts={posts}
            isError={isError}
            ref={ref}
            isSuccess={isSuccess}
            totalCount={totalCount}
            context="profile"
            isProfile={true}
            isLoading={isLoading}
        />
    );
};

export default ProfileFeed;
