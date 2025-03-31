import { Chip, Divider } from '@mui/material';
import { FC, Fragment, memo, useMemo } from 'react';

import useRootComment from '../../../../entities/comment/hooks/useRootComment';
import ChildComment from './ChildComment';
import Comment from './Comment';

interface CommentsProps {
    postId: number;
}

const RootComments: FC<CommentsProps> = (props) => {
    const { data, actions, meta } = useRootComment(props.postId);
    const { comments } = data;
    const { loadMoreComments } = actions;
    const { count } = meta;

    const renderCommentsTree = useMemo(() => {
        return comments.map((comment) => {
            const childComments = comment.replies || [];
            if (comments.length === 0) {
                return null;
            }

            if (childComments.length === 0) {
                return (
                    <Fragment key={comment.id}>
                        <Comment comment={comment} user={comment.user} level={0} />
                    </Fragment>
                );
            }
            return (
                <Fragment key={comment.id}>
                    <Comment comment={comment} user={comment.user} level={0} />
                    <ChildComment parentComment={comment} level={1} />
                </Fragment>
            );
        });
    }, [comments]);

    const renderMoreButton = () => {
        if (count && count > 10 && comments.length != count) {
            return (
                <Divider variant="middle" component="div" sx={{ pt: 2 }}>
                    <Chip
                        label="Показать следующие комментарии"
                        size="small"
                        onClick={loadMoreComments}
                        color="primary"
                    />
                </Divider>
            );
        }
        return null;
    };

    return (
        <Fragment>
            {renderCommentsTree}
            {renderMoreButton()}
        </Fragment>
    );
};

export default memo(RootComments);
