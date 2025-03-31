import { Button } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import UploadModal from '../../../../shared/ui/uploadModal/uploadModal';
import useCommentAction from '../../hooks/useCommentAction';
import styles from './Comment.module.css';
/**
 * Пропсы для компонента кнопки действий для комментария
 */
interface CommentActionButtonProps {
    commentId: number;
    content?: string;
    onUpdateStart?: () => void;
    onUpdateEnd?: () => void;
    onDeleteStart?: () => void;
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

    const handleDelete = () => {
        onDeleteStart?.();
        setTimeout(async () => {
            await handleDeleteComment(commentId);
        }, 850);
    };

    return (
        <Fragment>
            <Button aria-label="Редактировать" onClick={handleClick} className={styles.actionButton} size="small">
                <span className={styles.actionButtonText}>Редактировать</span>
            </Button>
            <Button aria-label="Удалить" onClick={handleDelete} className={styles.actionButton} size="small">
                <span className={styles.actionButtonText}>Удалить</span>
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
