import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useFetchAllPostsQuery } from '../../app/reducers/posts/postsApi ';
import { PostView } from '../../views/Posts/PostView';
import style from './Post.module.css';

const PostsList: FC = () => {
    const [skipPost, setSkipPost] = useState(0);
    const [limitPost, setLimitPost] = useState(5);

    const {
        data: data,
        isError,
    } = useFetchAllPostsQuery({ limit: limitPost, start: skipPost });

    const { ref, inView } = useInView({ threshold: 0.1, rootMargin: '0px 0px 100px 0px' });

    useEffect(() => {
        if (inView) {
            setSkipPost((skipPost) => skipPost + limitPost);
            setLimitPost(2);
        }
    }, [inView, limitPost]);

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className={style.postList}>
            {data?.posts.map((post, index) => {
                if (index + 1 === data.posts.length) {
                    return <PostView key={post.id} {...post} ref={ref} className="show"></PostView>;
                }
                return <PostView key={post.id} {...post}></PostView>;
            })}
        </div>
    );
};
export default PostsList;
