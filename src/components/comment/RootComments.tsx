import { Link } from '@mui/material';
import { Fragment, memo, useEffect, useState } from 'react';
import { useGetRootCommentsQuery, useLazyGetRootCommentsQuery } from '../../app/reducers/comments/commentsApi';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { ChildComments } from './ChildComments';
import { Comments } from './Comments ';

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
    }, [isSuccess]);//eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (resultOnLazy.isSuccess) {
            const newComments = resultOnLazy.data.comments.filter((comment) => !comments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setComments([...comments, ...newComments]);
        }
    }, [resultOnLazy]); //eslint-disable-line react-hooks/exhaustive-deps

    const loadMoreRootComments = () => {
        trigger({ postId: props.postId, page: currentPage + 1, limit: limit });
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const renderTree = comments.map((comment) => {
        const childComments = comment.children || [];
        if (childComments.length === 0) {
            return <Comments key={comment.id} comment={comment} />;
        }
        return (
            <Fragment key={comment.id}>
                <Comments comment={comment} />
                <ChildComments postId={props.postId} rootComment={comment} childCount={comment.childCount} level={1}/>
            </Fragment>
        );
    });

    return (
        <div>
            {renderTree}
            {<Link onClick={loadMoreRootComments}>Показать следующие комментарии</Link>}
        </div>
    );
});

export default RootComments;
