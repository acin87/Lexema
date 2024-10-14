import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useFetchAllPostsQuery } from '../../app/reducers/posts/postsApi ';
import Post from './post';

const postList: FC = () => {
    const [skipPost, setSkipPost] = useState(0);
    const { data: posts, isLoading } = useFetchAllPostsQuery({ limit: 5, skip: skipPost });

    const { ref, inView } = useInView({ threshold: 0.8 });

    useEffect(() => {
        if (inView) {
            setSkipPost(skipPost + 5);
            console.log(posts);
        }
    }, [inView]);

    const postItem = posts?.posts.map((post, index) => {
        if (index + 1 === posts.posts.length) {
            return <Post key={post.id} {...post} ref={ref}></Post>;
        }
        return <Post key={post.id} {...post}></Post>;
    });

    return (
        <div style={{ paddingTop: '20px' }}>
            {postItem}
            {isLoading && <div>Загрузка данных</div>}
        </div>
    );
};
export default postList;
