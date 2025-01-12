import { ExpandLess } from '@mui/icons-material';
import { Box, Button, Collapse, Divider } from '@mui/material';
import { FC, Fragment, memo, useEffect, useState } from 'react';
import { useLazyGetChildCommentsQuery } from '../../app/reducers/comments/commentsApi';
import { CommentType } from '../../app/reducers/comments/commntsType';
import { Comment } from './Comment';
import { MoreCommentsLink } from './MoreCommentsLink';

type CommentItemProps = {
    postId: number;
    rootComment: CommentType;
    level: number;
    expand?: (opened: boolean) => void;
};

/**
 * Компонент для рендера комментария
 *
 * @param {CommentItemProps} props - props компонента
 * @returns {JSX.Element} - компонент
 */

export const ChildComments: FC<CommentItemProps> = memo(({ rootComment, postId, level, expand }) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isExpand, setIsExpand] = useState<boolean>(false);
    const [trigger, { data: resultLazy, isSuccess }] = useLazyGetChildCommentsQuery();

    const expandComments = (commentId: number | undefined) => {
        if (!isOpen) {
            setIsOpen(true);
        }
        setIsExpand(true);

        if (expand) {
            expand(true);
        }

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
    /**
     *  Функция рендера комментария
     *
     * @returns Возвращает комментарий или кнопку для загрузки дочерних комментариев
     */
    const renderComment = () => {
        //Если родительский комментарий имеет один уже загруженный дочерний комментарий и более одного дочернего комментария в БД
        if (rootComment.children?.length === 1 && rootComment.childCount > 1 && (!isSuccess || !isOpen)) {
            //отображаем кнопку для загрузки остальных дочерних комментариев
            return (
                <Fragment>
                    <MoreCommentsLink {...rootComment.children[0]} expand={expandComments} childCount={rootComment.childCount} level={level} />
                </Fragment>
            );
        } else if (rootComment.children?.length === 1 && rootComment.childCount === 1 && !isSuccess) {
            return (
                <Fragment>
                    <Divider variant="inset" sx={{ width: '100%' }} className={`id-one-${rootComment.children[0].id}`} />
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ marginLeft: '12%', width: '100%' }}>
                            <Comment comment={rootComment.children[0]} />
                            <Divider variant="inset" sx={{ width: '100%' }} className={`id-one-${rootComment.children[0].id}`} />
                        </Box>
                    </Box>
                </Fragment>
            );
            //Отображаем все лениво загруженные коментарии и кнопку свернуть/развернуть
        } else if (isSuccess && isOpen) {
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
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <ExpandLess />
                    </Button>

                    <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                        {comments.map((comment, index) => (
                            <Fragment key={comment.id}>
                                <Comment comment={comment} />

                                {comment.children?.length === 1 && comment.childCount >= 1 && (
                                    <ChildComments postId={postId} rootComment={comment} level={level + 1} />
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
