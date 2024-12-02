import { Divider } from '@mui/material';
import { Fragment, memo, useEffect, useState } from 'react';
import { useLazyGetChildCommentsQuery } from '../../app/reducers/comments/commentsApi';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { Comment } from './Comment';
import { ExpandMoreComments } from './ExpandMoreComments';

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
        if (rootComment.children?.length === 1 && rootComment.childCount > 1 && resultLazy.isUninitialized) {
            return <ExpandMoreComments key={comment.id} {...comment} expand={expandComments} childCount={childCount} level={level} />;
        } else if (rootComment.children?.length === 1 && rootComment.childCount === 1 && resultLazy.isUninitialized) {
            return (
                <Fragment key={comment.id}>
                    <Comment comment={comment} />
                    <Divider variant="inset" />
                </Fragment>
            );
        } else if (!resultLazy.isUninitialized) {
            if (comment.children?.length === 1 && comment.childCount >= 1) {
                return (
                    <Fragment key={comment.id}>
                        <Comment comment={comment} />
                        <ChildComments postId={postId} rootComment={comment} childCount={comment.childCount} level={level + 1} />
                        <Divider variant="inset" />
                    </Fragment>
                );
            } else if (comment.childCount === 0) {
                return (
                    <Fragment key={comment.id}>
                        <Comment comment={comment}/>
                        <Divider variant="inset" />
                    </Fragment>
                );
            }
        }
    });

    return <div>{renderComment}</div>;
});
