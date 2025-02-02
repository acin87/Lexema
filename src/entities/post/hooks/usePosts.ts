import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store/store';
import { useGetAllPostsQuery } from '../api/postsApi ';
import { postsActions } from '../slices/postSlice';

const usePosts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const limitPost = useSelector((state: RootState) => state.post.limit);
    const skipPost = useSelector((state: RootState) => state.post.skip);
    const posts = useSelector((state: RootState) => state.post.posts);

    const { data: newPosts, isError } = useGetAllPostsQuery({ limit: limitPost, start: skipPost });

    const { ref, inView } = useInView({ threshold: 0.1, rootMargin: '0px 0px 100px 0px' }); //react-intersection-observer

    useEffect(() => {
            if (newPosts){
                dispatch(postsActions.setPosts(newPosts.posts));
            }
        }, [newPosts, dispatch]); 

    useEffect(() => {
        if (inView) {
            dispatch(postsActions.setSkip(skipPost + limitPost));
            if (limitPost == 5) {
                dispatch(postsActions.setLimit(2));
            }
        }
    }, [inView, limitPost]); // eslint-disable-line react-hooks/exhaustive-deps

    return { posts, isError, ref };
};
export default usePosts;
