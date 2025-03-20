import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store/store';
import { useGetFeedPostsQuery } from '../api/postsApi ';
import { addPosts, setPosts, setSkipPost } from '../slices/postSlice';

const useFeedPosts = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const posts = useSelector((state: RootState) => state.post.posts);
    const skipPost = useSelector((state: RootState) => state.post.skipPost);

    const {
        data: response,
        isError,
        isSuccess,
        isFetching,
        isLoading,
    } = useGetFeedPostsQuery({ limit: 5, offset: skipPost });

    const { ref, inView } = useInView({ threshold: 0.8 }); //react-intersection-observer

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
export default useFeedPosts;
