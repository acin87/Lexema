import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store/store';

import { addPosts, setPosts, setSkipPost } from '../slices/profileSlice';
import { useGetProfilePostsQuery } from '../../../entities/post/api/postApi ';

interface UseProfilePostsProps {
    profileOwnerId: number;
}

const useProfilePosts = ({ profileOwnerId }: UseProfilePostsProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const posts = useSelector((state: RootState) => state.profile.posts);
    const skipPost = useSelector((state: RootState) => state.profile.skipPost);

    const {
        data: response,
        isError,
        isSuccess,
        isFetching,
        isLoading,
    } = useGetProfilePostsQuery({ profileOrGroupOwnerId: profileOwnerId, limit: 5, offset: skipPost });

    const { ref, inView } = useInView({ threshold: 0.8, rootMargin: '0px 0px 200px 0px' }); //react-intersection-observer

    const totalCount = response ? response.count : 0;

    useEffect(() => {
        if (response) {
            if (skipPost === 0) {
                dispatch(setPosts(response.results));
            }
            if (response.results.length > 0) {
                dispatch(addPosts(response.results));
            }
        }
    }, [response, dispatch, posts, skipPost]);

    useEffect(() => {
        if (response) {
            if (inView && !isFetching && !isLoadingMore && response.results.length < response.count) {
                setIsLoadingMore(true);
                const newSkipPost = skipPost + 5;
                dispatch(setSkipPost(newSkipPost));
            }
        }
    }, [inView, response, isLoadingMore, isFetching, skipPost, dispatch]);

    useEffect(() => {
        if (!isFetching) {
            setIsLoadingMore(false);
        }
    }, [isFetching]);

    return { posts, isError, ref, isSuccess, totalCount, isFetching, isLoading };
};
export default useProfilePosts;
