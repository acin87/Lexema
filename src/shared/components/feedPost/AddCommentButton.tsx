import AttachFileIcon from '@mui/icons-material/AttachFile';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { FC, useState } from 'react';
import useCommentAction from '../../hooks/useCommentAction';
import UploadModal from '../uploadModal/uploadModal';

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
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <TextField
                placeholder="Написать коментарий"
                fullWidth
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <CommentOutlinedIcon fontSize="small" color="primary" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <AttachFileIcon fontSize="small" onClick={handleOpenModal} sx={{ cursor: 'pointer', color: 'primary.main', '&:hover': { color: 'error.main' } }} />
                            </InputAdornment>
                        ),
                    },
                }}
                variant="outlined"
                size="small"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            <Button color="primary" sx={{ ml: 2 }} onClick={handleUploadPost} disabled={commentText === ''}>
                <SendIcon
                    fontSize="small"
                    sx={{ color: focus ? 'error.main' : 'primary.main', '&:hover': { color: 'primary.main' } }}
                />
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
