import CloseIcon from '@mui/icons-material/Close';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Box,
    Button,
    CssThemeVariables,
    IconButton,
    Modal,
    Paper,
    Snackbar,
    SnackbarCloseReason,
    TextField,
    Typography,
} from '@mui/material';
import { FC, Fragment, memo, SyntheticEvent, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getUserId } from '../../../entities/auth/slice/authSlice';
import { useCreatePostMutation } from '../../../entities/post/api/postsApi ';
import DropZone from '../../../shared/components/dropZoneArea/DropZone';

interface CreatePostsProps {
    title?: string;
}

const CreatePosts: FC<CreatePostsProps> = () => {
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [postText, setPostText] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const [uploadFiles, { isSuccess }] = useCreatePostMutation();
    const me = useSelector(getUserId);

    const methods = useForm();
    //const { control, handleSubmit } = methods;

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
        }
    }, [isSuccess]);

    const handleCloseSnackbar = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleFilesChange = (files: File[]) => {
        setFiles(files);
    };
    const action = (
        <Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    const handleUploadPost = async () => {
        if (postText === '' && !files.length) {
            console.error('Ошибка загрузки файлов:', 'Пост не может быть пустым');
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('images', file);
        });
        formData.append('content', postText);
        formData.append('author', String(me));

        try {
            await uploadFiles(formData).unwrap();
        } catch (e) {
            console.error('Ошибка загрузки поста:', e);
            setOpenSnackbar(true);
        }
    };

    const style: CssThemeVariables = {
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
    return (
        <Paper sx={{ display: 'flex', width: '100%', p: 2, mb: 2, justifyContent: 'center' }}>
            <Button startIcon={<PostAddIcon />} onClick={handleOpen}>
                Создать пост
            </Button>
            <Modal open={open} onClose={handleClose} component="div" closeAfterTransition={false}>
                <FormProvider {...methods}>
                    <Box sx={{ ...style }}>
                        <Typography sx={{ textAlign: 'center' }} variant="h5" component="div">
                            Новый пост
                        </Typography>
                        <Box sx={{ p: 1 }}>
                            <DropZone onFilesChange={handleFilesChange}></DropZone>
                        </Box>
                        <Box>
                            <TextField
                                id="post-basic"
                                placeholder="Напишите текст поста тут...."
                                multiline
                                variant="filled"
                                minRows={8}
                                onChange={(e) => setPostText(e.target.value)}
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
                                Создать
                            </Button>
                        </Box>
                    </Box>
                </FormProvider>
            </Modal>
            {openSnackbar && (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    message="Ошибка загрузки поста, сервер недоступен"
                    onClose={handleCloseSnackbar}
                    action={action}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    key={1}
                />
            )}
        </Paper>
    );
};

export default memo(CreatePosts);
