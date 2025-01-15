import { ExpandLess } from '@mui/icons-material';
import { Box, Button, Collapse, Divider } from '@mui/material';
import { FC, Fragment, memo, useCallback, useEffect, useState } from 'react';
import { useLazyGetChildCommentsQuery } from '../../app/reducers/comments/commentsApi';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { Comment } from './Comment';
import { MoreCommentsLink } from './MoreCommentsLink';

type CommentItemProps = {
    postId: number;
    parentComment: CommentType;
    level: number;
    onToggleExpand?: (opened: boolean) => void; // функция для переключения разделителя для корневого комментария
};

const ChildComments: FC<CommentItemProps> = memo(({ parentComment, postId, level, onToggleExpand }) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const [fetchComments, { data: lazyComments, isSuccess }] = useLazyGetChildCommentsQuery();

    const expandComments = useCallback(
        (commentId: number | undefined) => {
            if (!isOpen) {
                setIsOpen(true);
            }
            console.log(isOpen);
            if (onToggleExpand) {
                onToggleExpand(true);
            }
            fetchComments({ postId, parentId: commentId });
        },
        [fetchComments, onToggleExpand, isOpen], // eslint-disable-line react-hooks/exhaustive-deps
    );

    const toggleExpandComments = () => {
        setIsOpen(false);

        // Если передана функция для переключения разделителя для корневого комментария, вызываем ее
        if (onToggleExpand) {
            onToggleExpand(false);
        }
    };

    useEffect(() => {
        setComments(parentComment.children || []);
    }, [parentComment]);

    useEffect(() => {
        if (isSuccess) {
            const newComments = lazyComments.comments.filter((comment) => !comments.find((c) => c.id === comment.id)); // Исключаем дубликаты
            setComments([...comments, ...newComments]);
        }
    }, [lazyComments]); // eslint-disable-line react-hooks/exhaustive-deps

    const renderComment = () => {
        if (parentComment.children?.length === 1 && parentComment.childCount > 1 && (!isSuccess || !isOpen)) {
            return (
                <Fragment>
                    <MoreCommentsLink {...parentComment.children[0]} onExpand={expandComments} childCount={parentComment.childCount} level={level} />
                </Fragment>
            );
        } else if (parentComment.children?.length === 1 && parentComment.childCount === 1 && !isSuccess) {
            return (
                <Fragment>
                    <Divider variant="inset" sx={{ width: '100%' }} className={`id-one-${parentComment.children[0].id}`} />
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ marginLeft: '12%', width: '100%' }}>
                            <Comment comment={parentComment.children[0]} />
                            <Divider variant="inset" sx={{ width: '100%' }} className={`id-one-${parentComment.children[0].id}`} />
                        </Box>
                    </Box>
                </Fragment>
            );
        } else if (isSuccess) {
            return (
                <Box sx={{ display: 'flex' }}>
                    <Button
                        size="small"
                        sx={{
                            width: '10%',
                            justifyContent: 'center',
                            marginLeft: 1,
                        }}
                        variant="text"
                        onClick={toggleExpandComments}
                    >
                        <ExpandLess />
                    </Button>

                    <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                        {comments.map((comment, index) => (
                            <Fragment key={comment.id}>
                                <Comment comment={comment} />

                                {!isOpen && comment.childCount > 1 && (
                                    <Divider variant="inset" sx={{ width: '100%' }} className={`id-ch-${comment.id}`} />
                                )}
                                {comment.children?.length === 1 && comment.childCount >= 1 && (
                                    <ChildComments postId={postId} parentComment={comment} level={level + 1} />
                                )}
                                {isOpen && comment.childCount > 1 && (
                                    <Divider variant="inset" sx={{ width: '100%' }} className={`id-ch-${comment.id}`} />
                                )}
                            </Fragment>
                        ))}
                    </Collapse>
                </Box>
            );
        }
    };

    return renderComment();
});

export default ChildComments;
