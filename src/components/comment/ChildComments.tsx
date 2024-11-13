import { memo, useEffect, useState } from 'react';
import { useLazyGetChildCommentsQuery } from '../../app/reducers/comments/commentsApi';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { ChildCommentLink } from './ChildCommentLink';
import { Comments } from './Comments ';

type CommentItemProps = {
    postId: number;
    comments: CommentType[];
    firstChildren?: boolean;
    childCount?: number;
};

export const ChildComments: React.FC<CommentItemProps> = memo(({ comments, postId, firstChildren, childCount }) => {
    const [expandCollapse, setExpandCollapse] = useState(false);
    const [childComments, setChildComments] = useState<CommentType[]>([]);
    const [trigger, resultLazy] = useLazyGetChildCommentsQuery();

    const expandComments = (commentId: number | undefined) => {
        setExpandCollapse(true);
        trigger({ postId: postId, parentId: commentId });
    };

    useEffect(() => {
        setChildComments(comments);
    }, [comments]);
    
    useEffect(() => {
        if (resultLazy.isSuccess) {
            console.log()
            const newComments = resultLazy.data.comments.filter((comment) => !childComments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setChildComments([...childComments, ...newComments]);
        }
    }, [resultLazy]);// eslint-disable-line react-hooks/exhaustive-deps

    const renderComment = childComments.map((comment) => {
        const childComments = comment.children || [];
        console.log(comment);
        if (firstChildren && comments.length === 1 && resultLazy.isUninitialized) {
            return <ChildCommentLink key={comment.id} {...comment} expand={expandComments} childCount={childCount} />;
        }else if(!resultLazy.isUninitialized){
            return <Comments key={comment.id} {...comment} />;
        }
        return <ChildComments comments={childComments} key={comment.id} {...comment} firstChildren={true}/>;
    });

    return <div>{renderComment}</div>;
});
