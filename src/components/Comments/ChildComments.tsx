import { Divider } from '@mui/material';
import { Fragment, memo, useEffect, useState } from 'react';
import { useLazyGetChildCommentsQuery } from '../../app/reducers/comments/commentsApi';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { Comment } from './Comment';
import { MoreCommentsLink } from './MoreCommentsLink';
import { ExpandCollapseButton } from './ExpandCollapseButton';

type CommentItemProps = {
    postId: number;
    rootComment: CommentType;
    childCount: number;
    level: number;
};

export const ChildComments: React.FC<CommentItemProps> = memo(({ rootComment, postId, childCount, level }) => {
    const [expandCollapse, setExpandCollapse] = useState(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [trigger, {data: resultLazy, isSuccess, isLoading}] = useLazyGetChildCommentsQuery();

    const expandComments = (commentId: number | undefined) => {
        setExpandCollapse(true);
        trigger({ postId: postId, parentId: commentId });
    };

    useEffect(() => {
        setComments(rootComment.children || []);
    }, [rootComment]);

    useEffect(() => {
        if (isSuccess) {
            const newComments = resultLazy.comments.filter((comment) => !comments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setComments([...comments, ...newComments]);
        }
    }, [resultLazy]); // eslint-disable-line react-hooks/exhaustive-deps

    const renderComment = () => {
        console.log(isLoading)
        //Если родительский комментарий имеет  один загруженный дочерний комментарий и более одного дочернего комментария в БД
        if (rootComment.children?.length === 1 && rootComment.childCount > 1 && !isSuccess) {
            //отображаем кнопку для загрузки дочерних комментариев
            return <MoreCommentsLink {...rootComment.children[0]} expand={expandComments} childCount={childCount} level={level} />;
            //Если родительский комментарий имеет один загруженный дочерний комментарий и нет дочерних комментариев в БД
        // } else if (rootComment.children?.length === 1 && rootComment.childCount === 0 && isLoading) {
        //     return (
        //       <Fragment>
        //         <Comment comment={rootComment.children[0]} />
        //         <Divider variant="inset" />
        //       </Fragment>
        //     );
        } else if (rootComment.children?.length === 1 && rootComment.childCount === 1 && !isSuccess) {
            return (
              <Fragment>
                <Comment comment={rootComment.children[0]} />
                <Divider variant="inset" />
              </Fragment>
            );
        } else if (isSuccess) {
            return (
                <Fragment>
                  {comments.map((comment) => (
                    <Fragment key={comment.id}>
                      <Comment comment={comment} />
                      {comment.children?.length === 1 && comment.childCount >= 1 ? (
                        <ChildComments postId={postId} rootComment={comment} childCount={comment.childCount} level={level + 1} />
                      ) : null}
                      <Divider variant="inset" />
                    </Fragment>
                  ))}
                </Fragment>
              );
        }
    }


        return <ExpandCollapseButton>{renderComment()}</ExpandCollapseButton>;
    
});
