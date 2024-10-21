import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useFetchAllPostsQuery } from '../../app/reducers/posts/postsApi ';
import { PostView } from '../../views/Posts/PostView';
import style from './Post.module.css';

const PostsList: FC = () => {
    const [skipPost, setSkipPost] = useState(0);
    const [limitPost, setLimitPost] = useState(5);
    const { data: posts, isLoading } = useFetchAllPostsQuery({ limit: limitPost, skip: skipPost });
    //const marginTopOffset = '0 0 500px 0';
    const { ref, inView } = useInView({ threshold: 0.1, rootMargin: '0px 0px -10px 0px' });

    useEffect(() => {
        if (inView) {
            setSkipPost(skipPost + limitPost);
            setLimitPost(1);
        }
    }, [inView]);

    const postItem = posts?.posts.map((post, index) => {
        if (index + 1 === posts.posts.length) {
            return <PostView key={post.id} {...post} ref={ref} className={'show'}></PostView>;
        }
        return <PostView key={post.id} {...post}></PostView>;
    });

    return (
        <div className={style.postList}>
            {postItem}
            {isLoading && <div>Загрузка данных</div>}
        </div>
    );
};
export default PostsList;
