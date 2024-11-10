import { memo, useState } from 'react';
import { useGetRootCommentsQuery, useLazyGetAllRootCommentsQuery } from '../../app/reducers/comments/commentsApi';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { Comment } from './Comment';

type CommentsProps = {
    postId: number;
};

const CommentsTree = memo<CommentsProps>((props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(2);
    const { data, isSuccess, isError, error } = useGetRootCommentsQuery({
        postId: props.postId,
    });
    const [trigger, result] = useLazyGetAllRootCommentsQuery();
    const loadMore = () => {
        trigger({ postId: props.postId, page: currentPage + 1, limit: limit + 8 });
        setCurrentPage(currentPage + 1);
        setLimit(limit + 8);
    };

    return (
        <div>
            {isSuccess && data?.comments.map((comment: CommentType) => <Comment key={comment.id} comment={comment} />)}
            {result.isLoading && <div>Loading...</div>}
            {result.isSuccess &&
                result.data?.comments.map((comment: CommentType) => <Comment key={comment.id} comment={comment} />)}

            {isError && <div>{error.toString()}</div>}
            {<button onClick={loadMore}>More</button>}
        </div>
    );
});

export default CommentsTree;
