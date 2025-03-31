import { FC, memo } from 'react';
import useFeedPosts from '../../hooks/useFeedPosts';
import PostList from '../postList/PostList';
import { useParams } from 'react-router-dom';


const ProfileFeed: FC = ( ) => {
    const {id} = useParams()
    const { posts, isError, ref, isSuccess, totalCount, isLoading } = useFeedPosts('profile', Number(id));
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

export default memo(ProfileFeed);
