import { Button } from '@mui/material';
import { FC, useState } from 'react';
import UploadModal from '../../../shared/components/uploadModal/uploadModal';
import useCommentAction from '../../../shared/hooks/useCommentAction';

interface CreateCommentButtonProps {
    postId: number;
    content?: string;
    id?: number;
    parent_id: number;
    editMode?: boolean;
    title?: string;
}

const CreateCommentButton: FC<CreateCommentButtonProps> = ({
    postId,
    content,
    id,
    parent_id,
    editMode = false,
    title = 'Ответить',
}) => {
    const { handleAddComment, handleUpdateComment } = useCommentAction();
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

        if (editMode && id) {
            await handleUpdateComment(id, commentText, files, parent_id);
        } else {
            await handleAddComment(postId, commentText, parent_id, files);
        }
        setOpenModal(false);
        setCommentText('');
        setFiles([]);
    };

    return (
        <>
            <Button sx={{ textTransform: 'lowercase', ml: '16px' }} size="small" onClick={handleOpenModal}>
                {title}
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

export default CreateCommentButton;
