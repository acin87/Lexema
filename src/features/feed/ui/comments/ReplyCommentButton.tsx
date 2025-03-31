import { Button } from '@mui/material';
import { FC, useState } from 'react';
import UploadModal from '../../../../shared/ui/uploadModal/uploadModal';
import useCommentAction from '../../hooks/useCommentAction';
import styles from './Comment.module.css';

interface ReplyCommentButtonProps {
    postId: number;
    content?: string;
    parent_id: number;
    title?: string;
}

const ReplyCommentButton: FC<ReplyCommentButtonProps> = ({ postId, content, parent_id, title }) => {
    const { handleAddComment } = useCommentAction();
    const [openModal, setOpenModal] = useState(false);
    const [commentText, setCommentText] = useState<string>(content || '');
    const [files, setFiles] = useState<File[]>([]);
    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => setOpenModal(false);

    const handleFilesChange = (files: File[]) => {
        setFiles(files);
    };

    const handleUploadPost = async () => {
        if (commentText === '' && !files.length) {
            console.error('Ошибка загрузки файлов:', 'Комментарий не может быть пустым');
            return;
        }
        await handleAddComment(postId, commentText, parent_id, files);
        setOpenModal(false);
        setCommentText('');
        setFiles([]);
    };

    return (
        <>
            <Button className={styles.replyButton} size="small" onClick={handleOpenModal}>
                <span className={styles.replyButtonText}>{title}</span>
            </Button>
            <UploadModal
                open={openModal}
                onClose={handleCloseModal}
                title={title}
                postText={commentText}
                setPostText={setCommentText}
                handleFilesChange={handleFilesChange}
                handleUploadPost={handleUploadPost}
                openSnackbar={false}
                handleCloseSnackbar={() => {}}
                files={files}
            />
        </>
    );
};

export default ReplyCommentButton;
