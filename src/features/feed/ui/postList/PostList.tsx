import { Box, CircularProgress } from '@mui/material';
import { FC, Fragment, memo, useCallback, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '../../../../app/api/Utils';
import { Post as PostType } from '../../../../entities/post/types/PostTypes';
import { selectUserId } from '../../../../entities/user/slice/userSlice';
import { WelcomeBanner } from '../../../../shared/ui/welcomeBanner/WelcomeBanner';
import AddPostButton from '../addPostButton/AddPostButton';
import Post from '../post/Post';
import styles from './PostList.module.css';

type PostListProps = {
    posts: PostType[];
    isSuccess: boolean;
    isError: boolean;
    totalCount: number;
    ref: (node?: Element | null) => void;
    context: 'profile' | 'group';
    isProfile?: boolean;
    group_id?: number;
    isLoading: boolean;
    error?: ApiError | undefined;
};

const MemoizedPost = memo(
    ({ post, context, group_id }: { post: PostType; context: 'profile' | 'group'; group_id?: number }) => (
        <Post post={post} context={context} group_id={group_id} />
    ),
);

const PostList: FC<PostListProps> = ({
    posts,
    isSuccess,
    totalCount,
    ref,
    isError,
    context,
    group_id,
    isProfile,
    isLoading,
    error,
}) => {
    const navigate = useNavigate();
    const user_id = useSelector(selectUserId);

    const isOwner = useCallback(() => {
        if (posts.length === 0) return false;
        return user_id === posts[0].author.id;
    }, [posts, user_id]);

    useLayoutEffect(() => {
        if (isError) {
            if (error && error.status === 401) {
                navigate('/auth');
            } else {
                navigate('/error');
            }
        }
    }, [isError, navigate, error]);

    if (posts.length === 0 && !isProfile && !isLoading) {
        return <WelcomeBanner />;
    }

    return (
        <Box className={styles.postList}>
            {isOwner() && <AddPostButton context={context} group_id={group_id} />}
            {posts.map((post, index) => {
                const isLastPost = index + 1 === posts.length;

                return (
                    <Fragment key={post.id}>
                        <MemoizedPost post={post} context={context} group_id={group_id} />
                        {isLastPost && isSuccess && index + 1 !== totalCount && (
                            <Box className={styles.loadingContainer} ref={ref}>
                                <CircularProgress />
                            </Box>
                        )}
                        {isLastPost && isSuccess && index + 1 === totalCount && totalCount > 1 && (
                            <Box className={styles.loadingContainer}>
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
