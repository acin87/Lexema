import { Divider, Link } from '@mui/material';
import { Fragment, memo, useEffect, useState } from 'react';
import { useGetRootCommentsQuery, useLazyGetRootCommentsQuery } from '../../app/reducers/comments/commentsApi';
import { CommentType } from '../../app/reducers/comments/commntsType';

import { Comment } from './Comment';
import ChildComments from './ChildComments';

type CommentsProps = {
    postId: number;
};

const RootComments = memo<CommentsProps>((props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [areCommentsExpanded, setAreCommentsExpanded] = useState(false);
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

    //функция для переключения разделителя для корневого комментария
    const toggleExpand = (expand: boolean) => {
        setAreCommentsExpanded(expand);
    };

    const renderCommentsTree = () => {
        return comments.map((comment) => {
            const childComments = comment.children || [];

            if (childComments.length === 0) {
                return (
                    <Fragment key={comment.id}>
                        <Comment comment={comment} />
                        <Divider variant="inset" />
                    </Fragment>
                );
            }

            return (
                <Fragment key={comment.id}>
                    <Comment comment={comment} />
                    {areCommentsExpanded && <Divider variant="inset" />}
                    <ChildComments postId={props.postId} parentComment={comment} level={2} onToggleExpand={toggleExpand} />
                    {!areCommentsExpanded && <Divider variant="inset" />}
                </Fragment>
            );
        });
    };

    return (
        <Fragment>
            {renderCommentsTree()}
            {<Link onClick={loadMoreComments}>Показать следующие комментарии</Link>}
        </Fragment>
    );
});

export default RootComments;

// import { Divider, Link } from '@mui/material';
// import { Fragment, memo, useCallback, useEffect, useState } from 'react';
// import { useGetRootCommentsQuery } from '../../app/reducers/comments/commentsApi';
// import { CommentType } from '../../app/reducers/comments/commntsType';
// import { ChildComments } from './ChildComments';
// import { Comment } from './Comment';

// type CommentsProps = {
//     postId: number;
// };
// type RootQuery = {
//     postId: number;
//     page: number;
//     limit: number;
// };

// const RootComments = memo<CommentsProps>((props) => {
//     const [pageNumber, setPageNumber] = useState(0);
//     const [areCommentsExpanded, setAreCommentsExpanded] = useState(false);
//     const limit = 10;
//     const [comments, setComments] = useState<CommentType[]>([]);

//     const fetchRootComments = useCallback(async ({ postId, page, limit }: RootQuery) => {
//         const response = await useGetRootCommentsQuery({
//                     postId: postId,
//                     page: page,
//                     limit: limit,
//                 });
//         if (response.isSuccess) {
//             setComments([...response.data.comments]);
//         }
//     }, []);

//     useEffect(() => {
//         fetchRootComments({ postId: props.postId, page: 1, limit: 2 });
//     }, [fetchRootComments, props.postId]);

//     const loadMoreComments = async () => {
//         try {
//             setPageNumber((prevPage) => prevPage + 1);
//             await fetchRootComments({
//                 postId: props.postId,
//                 page: pageNumber + 1,
//                 limit: limit,
//             });
//         } catch (error) {}
//     };

//     const toggleExpand = (expand: boolean) => {
//         setAreCommentsExpanded(expand);
//     };

//     const renderCommentsTree = () => {
//         return comments.map((comment) => {
//             const childComments = comment.children || [];

//             if (childComments.length === 0) {
//                 return (
//                     <Fragment key={comment.id}>
//                         <Comment comment={comment} />
//                         <Divider variant="inset" />
//                     </Fragment>
//                 );
//             }

//             return (
//                 <Fragment key={comment.id}>
//                     <Comment comment={comment} />
//                     {areCommentsExpanded && <Divider variant="inset" />}
//                     <ChildComments postId={props.postId} parentComment={comment} level={2} openCloseForRootComment={toggleExpand} />
//                     {!areCommentsExpanded && <Divider variant="inset" />}
//                 </Fragment>
//             );
//         });
//     };

//     return (
//         <div>
//             {renderCommentsTree()}
//             {<Link onClick={loadMoreComments}>Показать следующие комментарии</Link>}
//         </div>
//     );
// });

// export default RootComments;
