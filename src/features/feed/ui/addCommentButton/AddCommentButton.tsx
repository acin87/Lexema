import AddCommentIcon from '@mui/icons-material/AddComment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { FC, useState } from 'react';
import UploadModal from '../../../../shared/ui/uploadModal/uploadModal';
import useCommentAction from '../../hooks/useCommentAction';
import styles from './AddCommentButton.module.css';

interface AddCommentButtonProps {
    postId: number;
}

const AddCommentButton: FC<AddCommentButtonProps> = ({ postId }) => {
    const [focus, setFocus] = useState(false);
    const { handleAddComment } = useCommentAction();
    const [openModal, setOpenModal] = useState(false);
    const [commentText, setCommentText] = useState<string>('');
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
        await handleAddComment(postId, commentText, null, files);
        setOpenModal(false);
        setCommentText('');
        setFiles([]);
    };

    return (
        <Box className={styles.commentContainer}>
            <TextField
                placeholder="Написать коментарий"
                fullWidth
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <AddCommentIcon fontSize="small" color="primary" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <AttachFileIcon
                                    fontSize="small"
                                    onClick={handleOpenModal}
                                    className={styles.attachFileIcon}
                                />
                            </InputAdornment>
                        ),
                    },
                }}
                variant="outlined"
                size="small"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            <Button
                color="primary"
                className={styles.sendButton}
                onClick={handleUploadPost}
                disabled={commentText === ''}
            >
                <SendIcon fontSize="small" className={focus ? styles.sendIconFocused : styles.sendIcon} />
            </Button>
            <UploadModal
                open={openModal}
                onClose={handleCloseModal}
                title="Добавить комментарий"
                postText={commentText}
                setPostText={setCommentText}
                handleFilesChange={handleFilesChange}
                handleUploadPost={handleUploadPost}
                openSnackbar={false}
                handleCloseSnackbar={() => {}}
                files={files}
            />
        </Box>
    );
};

export default AddCommentButton;
