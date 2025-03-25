import { Box, Button, Modal, SxProps, TextField, Typography, SnackbarCloseReason } from '@mui/material';
import { FC, Fragment, memo, SyntheticEvent } from 'react';
import DropZone from '../dropZoneArea/DropZone';
import SnackBar from '../snackbar/SnackBar';

interface UploadModalProps {
    open: boolean;
    onClose: () => void;
    title: string | undefined;
    postText?: string;
    setPostText?: (text: string) => void;
    handleFilesChange: (files: File[]) => void;
    handleUploadPost: () => void;
    openSnackbar: boolean;
    handleCloseSnackbar: (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => void;
    files: File[];
}
const style: SxProps = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '550px',
    height: '690px',
    '@media only screen and (max-width: 600px)  ': {
        width: '100%',
        height: 'auto',
    },
    '@media only screen and (min-width: 600px)': {
        width: '80%',
        height: '100%',
        overflow: 'auto',
    },
    '@media only screen and (min-width: 768px)': {
        width: '600px',
        height: 'auto',
        overflow: 'auto',
    },
    '@media only screen and (min-width: 992px)': {
        width: '600px',
        height: 'auto',
        overflow: 'auto',
    },
    bgcolor: 'background.paper',
    borderRadius: 5,
    pt: 2,
    px: 2,
    pb: 3,
};

const UploadModal: FC<UploadModalProps> = ({
    open,
    onClose,
    title,
    postText,
    setPostText,
    handleFilesChange,
    handleUploadPost,
    openSnackbar,
    handleCloseSnackbar,
    files,
}) => {
    
    return (
        <Fragment>
            <Modal open={open} onClose={onClose} component="div" closeAfterTransition={false}>
                <Box sx={{ ...style }}>
                    <Typography sx={{ textAlign: 'center' }} variant="h5" component="div">
                        {title}
                    </Typography>
                    <Box sx={{ p: 1 }}>
                        <DropZone onFilesChange={handleFilesChange}></DropZone>
                    </Box>
                    <Box>
                        <TextField
                            id="post-basic"
                            placeholder="Напишите текст тут...."
                            multiline
                            variant="filled"
                            minRows={8}
                            onChange={(e) => setPostText?.(e.target.value)}
                            value={postText}
                            sx={{
                                width: '100%',
                                outline: 'none',
                                border: 'none',
                                '.MuiFilledInput-root': { backgroundColor: 'background.paper' },
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUploadPost}
                            disabled={postText == '' && files.length === 0}
                        >
                            {title}
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {openSnackbar && (
                <SnackBar
                    message="Ошибка загрузки, сервер недоступен"
                    open={openSnackbar}
                    onClose={handleCloseSnackbar}
                    severity="error"
                />
            )}
        </Fragment>
    );
};

export default memo(UploadModal);
