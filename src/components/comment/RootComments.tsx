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
    const { data, isSuccess } = useGetRootCommentsQuery({
        postId: props.postId,
        page: 1,
        limit: 2,
    });
    const [trigger, resultLazy] = useLazyGetRootCommentsQuery();
    useEffect(() => {
        if (isSuccess) {
            setComments([...data.comments]);
        }
    }, [isSuccess]); //eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (resultLazy.isSuccess) {
            const newComments = resultLazy.data.comments.filter((comment) => !comments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setComments([...comments, ...newComments]);
        }
    }, [resultLazy]); //eslint-disable-line react-hooks/exhaustive-deps

    const loadMoreRootComments = () => {
        trigger({ postId: props.postId, page: currentPage + 1, limit: limit });
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const renderTree = comments.map((comment) => {
        const childComments = comment.children || [];
        if (childComments.length === 0) {
            return <Comments key={comment.id} {...comment} />;
        }
        return (
            <Fragment key={comment.id}>
                <Comments {...comment} />
                <ChildComments postId={props.postId} comments={childComments} firstChildren={true} childCount={comment.childCount}/>
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
