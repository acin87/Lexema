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
            const newComments = resultLazy.data.comments.filter((comment) => !comments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setComments([...comments, ...newComments]);
        }
    }, [resultLazy]); // eslint-disable-line react-hooks/exhaustive-deps

    const renderComment = comments.map((comment) => {
        //Если родительский комментарий имеет  один загруженный дочерний комментарий и более одного дочернего комментария в БД
        if (rootComment.children?.length === 1 && rootComment.childCount > 1 && resultLazy.isUninitialized) {
            console.log(comment.id, 'id');
            //отображаем кнопку для загрузки дочерних комментариев
            return <MoreCommentsLink key={comment.id} {...comment} expand={expandComments} childCount={childCount} level={level} />;
            //Если родительский комментарий имеет один загруженный дочерний комментарий и нет дочерних комментариев в БД
        } else if (rootComment.children?.length === 1 && rootComment.childCount === 0 && resultLazy.isUninitialized) {
            //Отображаем дочерний комментарий
            return (
                <Fragment key={comment.id}>
                    <Comment comment={comment} />
                    <Divider variant="inset" />
                </Fragment>
            );
            //Если родительский комментарий имеет один загруженный дочерний комментарий и один дочерний комментарий в БД,
        } else if (rootComment.children?.length === 1 && rootComment.childCount === 1 && !resultLazy.isUninitialized) {
            //Отображаем уже загруженный дочерний комментарий
            return (
                <Fragment key={comment.id}>
                    <Comment comment={comment} />
                    <Divider variant="inset" />
                </Fragment>
            );
            //Если родительский комментарий имеет один загруженный дочерний комментарий и один дочерний комментарий в БД,
            //и если загрузка дочернего комментария еще не завершена
        } else if (rootComment.children?.length === 1 && rootComment.childCount === 1 && resultLazy.isUninitialized) {
            return (
                <Fragment key={comment.id}>
                    <Comment comment={comment} />
                    <Divider variant="inset" />
                </Fragment>
            );
            //Если инициализация запроса завершена
        } else if (!resultLazy.isUninitialized) {
            //Отображаем дочерний комментарий и рекурсивно вызываем функцию для дочернего комментария
            if (comment.children?.length === 1 && comment.childCount >= 1) {
                return (
                    <Fragment key={comment.id}>
                        <Comment comment={comment} />
                        <ChildComments postId={postId} rootComment={comment} childCount={comment.childCount} level={level + 1} />
                        <Divider variant="inset" />
                    </Fragment>
                );
                //Если дочерний комментарий не имеет дочерних комментариев
            } else if (comment.children?.length === 1 && comment.childCount === 0) {
         
                return (
                    <Fragment key={comment.id}>
                        <Comment comment={comment} />
                        <Divider variant="inset" />
                    </Fragment>
                );
                //Если дочерний комментарий не имеет уже загруженных дочерних комментариев и не имеет дочерних комментариев в БД
            } else if (comment.childCount === 0) {
                return (
                    <Fragment key={comment.id}>
                        <Comment comment={comment} />
                        <Divider variant="inset" />
                    </Fragment>
                );
            }
        }
    });

    if (resultLazy.isUninitialized) {
        return <Fragment>{renderComment}</Fragment>;
    }else{
        return <ExpandCollapseButton>{renderComment}</ExpandCollapseButton>;
    }
});
