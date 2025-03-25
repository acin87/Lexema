import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import UploadModal from '../../../shared/components/uploadModal/uploadModal';
import useCommentAction from '../../../shared/hooks/useCommentAction';
/**
 * Пропсы для компонента кнопки действий для комментария
 */
interface CommentActionButtonProps {
    commentId: number;
    content?: string;
}
/**
 * Компонент кнопки действий для комментария
 */
const CommentActionButton: FC<CommentActionButtonProps> = ({ commentId, content }) => {
    const { handleUpdateComment, handleDeleteComment } = useCommentAction();
    const [commentText, setCommentText] = useState(content);
    const [openModal, setOpenModal] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleUpdate = () => {
        handleUpdateComment(commentId, commentText, files);
        setOpenModal(false);
    };

    const handleDelete = () => {
        handleDeleteComment(commentId);
    };

    return (
        <Fragment>
            <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertOutlinedIcon />
            </IconButton>
            <Menu
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => setOpenModal(true)}>
                    <Typography variant="body2" component="span">
                        Редактировать
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <Typography variant="body2" component="span">
                        Удалить
                    </Typography>
                </MenuItem>
            </Menu>
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
