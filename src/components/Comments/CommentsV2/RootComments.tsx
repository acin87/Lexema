import { Chip, Divider } from '@mui/material';
import { Fragment, memo, useEffect, useState } from 'react';

import { useGetRootCommentsQuery, useLazyGetRootCommentsQuery } from '../../../app/reducers/comments/commentsApi';
import { CommentType } from '../../../app/reducers/comments/commntsType';
import ChildComment from './ChildComment';
import Comment from './Comment';

type CommentsProps = {
    postId: number;
};

const RootComments = memo<CommentsProps>((props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;
    const [comments, setComments] = useState<CommentType[]>([]);
    const { data: resultOnLoad, isSuccess } = useGetRootCommentsQuery({
        postId: props.postId,
        page: 1,
        limit: 2,
    });
    const [trigger, resultOnLazy] = useLazyGetRootCommentsQuery();

    useEffect(() => {
        if (isSuccess) {
            setComments([...resultOnLoad.comments]);
        }
    }, [isSuccess]); //eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (resultOnLazy.isSuccess) {
            const newComments = resultOnLazy.data.comments.filter((comment) => !comments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setComments([...comments, ...newComments]);
        }
    }, [resultOnLazy]); //eslint-disable-line react-hooks/exhaustive-deps

    const loadMoreComments = () => {
        trigger({ postId: props.postId, page: currentPage + 1, limit: limit });
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const renderCommentsTree = () => {
        return comments.map((comment) => {
            const childComments = comment.children || [];

            if (childComments.length === 0) {
                return (
                    <Fragment key={comment.id}>
                        <Comment comment={comment} />
                    </Fragment>
                );
            }
            return (
                <Fragment key={comment.id}>
                    <Comment comment={comment} />
                    <ChildComment parentComment={comment} level={1} />
                </Fragment>
            );
        });
    };
    return (
        <Fragment>
            {renderCommentsTree()}
            <Divider variant="middle" component="div" sx={{ pt: 2 }}>
                <Chip label="Показать следующие комментарии" size="small" onClick={loadMoreComments} color="primary" />
            </Divider>
        </Fragment>
    );
});

export default RootComments;
