import { FC } from 'react';
import { useParams } from 'react-router-dom';
import useFeedPosts from '../../feed/hooks/useFeedPosts';
import PostList from '../../feed/ui/postList/PostList';

interface GroupFeedProps {
    groupId: number;
}

const GroupFeed: FC<GroupFeedProps> = ({groupId}) => {
    const { id } = useParams();
    const { posts, isError, ref, isSuccess, totalCount, isLoading } = useFeedPosts(
       'group',
        Number(id),
    );
    return (
        <PostList
            posts={posts}
            isError={isError}
            ref={ref}
            isSuccess={isSuccess}
            totalCount={totalCount}
            context="group"
            isProfile={false}
            isLoading={isLoading}
            group_id={groupId}
        />
    );
};

export default GroupFeed;
