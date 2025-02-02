import { Chip, Divider } from '@mui/material';
import { FC, Fragment, memo } from 'react';

import useRootComment from '../../../entities/comment/hooks/useRootComment';
import ChildComment from './ChildComment';
import Comment from './Comment';

interface CommentsProps {
    postId: number;
}

const RootComments:FC<CommentsProps> = (props) => {
    const { comments, loadMoreComments } = useRootComment(props.postId);

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
};

export default memo(RootComments);
