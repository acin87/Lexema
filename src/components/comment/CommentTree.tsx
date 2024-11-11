import { memo, useEffect, useState } from 'react';
import { useGetRootCommentsQuery, useLazyGetRootCommentsQuery } from '../../app/reducers/comments/commentsApi';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { Comment } from './Comment';

type CommentsProps = {
    postId: number;
};

const CommentsTree = memo<CommentsProps>((props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;
    const [comments, setComments] = useState<CommentType[]>([]); // Массив комментариев
    const { data, isSuccess } = useGetRootCommentsQuery({
        postId: props.postId,
        page: 1,
        limit: 2,
    });
    const [trigger, result] = useLazyGetRootCommentsQuery();
    useEffect(() => {
        if (isSuccess) {
            setComments([...data.comments]);
        }
    }, [isSuccess]); //eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (result.isSuccess) {
            console.log(result.data.comments, 2);
            const newComments = result.data.comments.filter((comment) => !comments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setComments([...comments, ...newComments]);
        }
    }, [result]); //eslint-disable-line react-hooks/exhaustive-deps

    const loadMoreRootComments = () => {
        trigger({ postId: props.postId, page: currentPage + 1, limit: limit });
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            {comments && comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
            {<button onClick={loadMoreRootComments}>More</button>}
        </div>
    );
});

export default CommentsTree;
