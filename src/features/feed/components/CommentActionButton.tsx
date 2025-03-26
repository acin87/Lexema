import { Button } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import UploadModal from '../../../shared/components/uploadModal/uploadModal';
import useCommentAction from '../../../shared/hooks/useCommentAction';
/**
 * Пропсы для компонента кнопки действий для комментария
 */
interface CommentActionButtonProps {
    commentId: number;
    content?: string;
    onUpdateStart?: () => void;
    onUpdateEnd?: () => void;
    onDeleteStart?: () => void;
    onDeleteEnd?: () => void;
}
/**
 * Компонент кнопки действий для комментария
 */
const CommentActionButton: FC<CommentActionButtonProps> = ({
    commentId,
    content,
    onUpdateStart,
    onUpdateEnd,
    onDeleteStart,
    onDeleteEnd,
}) => {
    const { handleUpdateComment, handleDeleteComment } = useCommentAction();
    const [commentText, setCommentText] = useState(content);
    const [openModal, setOpenModal] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleClick = () => {
        setOpenModal(true);
    };


    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const handleUpdate = async () => {
        onUpdateStart?.();
        await handleUpdateComment(commentId, commentText, files);
        setOpenModal(false);
        setTimeout(() => {
            onUpdateEnd?.();
        }, 500);
    };

    const handleDelete = async () => {
        onDeleteStart?.();
        await handleDeleteComment(commentId);
        setTimeout(() => {
            onDeleteEnd?.();
        }, 500);
    };

    return (
        <Fragment>
            <Button
                aria-label="Редактировать"
                onClick={handleClick}
                sx={{ textTransform: 'lowercase', ml: '16px' }}
                size="small"
            >
                Редактировать
            </Button>
            <Button
                aria-label="Удалить"
                onClick={handleDelete}
                sx={{ textTransform: 'lowercase', ml: '16px' }}
                size="small"
            >
                Удалить
            </Button>

            <UploadModal
                open={openModal}
                onClose={handleCloseModal}
                title="Редактировать комментарий"
                postText={commentText}
                setPostText={setCommentText}
                handleFilesChange={setFiles}
                handleUploadPost={handleUpdate}
                openSnackbar={false}
                handleCloseSnackbar={() => {}}
                files={files}
            />
        </Fragment>
    );
};

export default CommentActionButton;
