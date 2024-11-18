import { Fragment, memo, useEffect, useState } from 'react';
import { useLazyGetChildCommentsQuery } from '../../app/reducers/comments/commentsApi';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { ExpandMoreComments } from './ExpandMoreComments';
import { Comments } from './Comments ';

type CommentItemProps = {
    postId: number;
    rootComment: CommentType;
    childCount: number;
    level: number;
};

export const ChildComments: React.FC<CommentItemProps> = memo(({ rootComment, postId, childCount, level }) => {
    const [expandCollapse, setExpandCollapse] = useState(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [trigger, resultLazy] = useLazyGetChildCommentsQuery();

    const expandComments = (commentId: number | undefined) => {
        setExpandCollapse(true);
        trigger({ postId: postId, parentId: commentId });
    };

    useEffect(() => {
        setComments(rootComment.children || []);
    }, [rootComment]);

    useEffect(() => {
        if (resultLazy.isSuccess) {
            console.log(resultLazy.data.comments);
            const newComments = resultLazy.data.comments.filter((comment) => !comments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setComments([...comments, ...newComments]);
        }
    }, [resultLazy]); // eslint-disable-line react-hooks/exhaustive-deps

    const renderComment = comments.map((comment) => {
        console.log(comment);
        if (rootComment.children?.length === 1 && rootComment.childCount > 1 && resultLazy.isUninitialized) {
            return <ExpandMoreComments key={comment.id} {...comment} expand={expandComments} childCount={childCount}  margin={level*7}/>;
        } else if (rootComment.children?.length === 1 && rootComment.childCount === 1 && resultLazy.isUninitialized) {
            return <Comments key={comment.id} comment={comment} sx={{marginLeft: (level*7)}}/>;
        } else if (!resultLazy.isUninitialized) {
            if (comment.children?.length === 1 && comment.childCount >= 1) {
                return (
                    <Fragment key={comment.id}>
                        <Comments comment={comment}  sx={{marginLeft: (level*7)}}/>
                        <ChildComments postId={postId} rootComment={comment} childCount={comment.childCount} level={level + 1} />
                    </Fragment>
                );
            } else if (comment.childCount === 0) {
                return <Comments key={comment.id} comment={comment} sx={{marginLeft: (level*7)}}/>;
            }
        }
    });

    return <div>{renderComment}</div>;
});
