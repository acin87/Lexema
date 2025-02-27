import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store/store';
import { useGetAllPostsQuery } from '../api/postsApi ';
import { setPosts, setSkipPost } from '../slices/postSlice';

const usePosts = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const posts = useSelector((state: RootState) => state.post.posts);
    const skipPost = useSelector((state: RootState) => state.post.skipPost);

    const {
        data: response,
        isError,
        isSuccess,
        isFetching,
    } = useGetAllPostsQuery({ limit: 5, start: skipPost, userId: 1 }); //временно юзерИд

    const { ref, inView } = useInView({ threshold: 0.8, rootMargin: '0px 0px 200px 0px' }); //react-intersection-observer

    const totalCount = response ? response.totalCount : 0;

    useEffect(() => {
        if (response) {
            const newPosts = response.posts.filter((post) => !posts.some((p) => p.id === post.id));
            if (newPosts.length > 0) {
                dispatch(setPosts(newPosts));
            }
        }
    }, [response, dispatch, posts]);

    useEffect(() => {
        if (response) {
            if (inView && !isFetching && !isLoadingMore && response.posts.length < response.totalCount) {
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

    return { posts, isError, ref, isSuccess, totalCount };
};
export default usePosts;
