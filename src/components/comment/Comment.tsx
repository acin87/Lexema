import { useLazyGetChildCommentsQuery } from '../../app/reducers/comments/commentsApi';
import { CommentType } from '../../app/reducers/comments/commntsType';

type CommentItemProps = {
    comment: CommentType;
};

export const Comment: React.FC<CommentItemProps> = ({ comment }) => {
    const hasChildren = !!comment.children?.length;
    const childComments = comment.children || [];
    const [trigger, result] = useLazyGetChildCommentsQuery();
    
    if (!hasChildren) {
        return (
            <div style={{ marginLeft: '20px' }}>
                <p> {comment.body} -- {comment.id}</p>
            </div>
        );
    }

    

    function handleLoadChildren() {
        trigger({ parentId: comment.id, postId: comment.postId });
    }

    
    return (
        <div style={{ marginLeft: '20px' }}>
            <p>{comment.body} -- {comment.id} </p>
            {!result.isUninitialized && (
                <>{result.data?.comments.map((childComment) => <Comment key={childComment.id} comment={childComment} />)}</>
            )}
            <button disabled={result.isFetching} onClick={handleLoadChildren}>
                Показать ответы ({result.data ? result.data.comments.length : 0})
            </button>
        </div>
    );
};
