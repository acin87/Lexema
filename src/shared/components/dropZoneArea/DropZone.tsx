import { CSSObject } from '@emotion/react';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { Box, Button, Paper, Typography } from '@mui/material';
import { FC, Fragment, useEffect } from 'react';
import useFileUpload from '../../hooks/useFileUpload';

// const DropZoneStyles = styled((props: DropAreaMuiProps) => (
//     <Box ref={props.dropzoneref} {...props}>
//         {props.children}
//     </Box>
// ))(({ theme }) => ({
//     width: '100%',
//     height: '100%',
//     minHeight: '400px',
//     outline: '1px dashed gray',
//     backgroundColor: theme.palette.background.paper,
//     '&:hover': {
//         backgroundColor: theme.palette.secondary.light,
//     },
//     cursor: 'pointer',
//     borderRadius: '8px',
//     transition: 'outline-color 0.2s ease-in-out',
// }));

const dropZoneStyles: CSSObject = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    minHeight: '400px',
    minWidth: '500px',
    outline: '2px dashed',
    backgroundColor: 'background.paper',
    '&:hover': {
        backgroundColor: 'secondary.light',
    },
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'outline-color 0.2s ease ease-in-out',
};

const imagesStyles: CSSObject = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    '&:nth-child(1)': {
        flex: '0 0 25%',
        height: '100%',
    },
    '&:nth-child(2), &:nth-child(3)': {
        flex: '0 0 25%',
        height: '50%',
    },
    '&:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4)': {
        flex: '0 0 25%',
        height: '50%',
    },
    '&:nth-child(1), &:nth-child(2) ': {
        flex: '0 0 50%',
        height: '100%',
    },
};

const DropZone: FC = () => {
    const {
        isDragActive,
        isLoading,
        handleDragIn,
        handleDragOut,
        handleDrop,
        handleFileInputChange,
        handleUpload,
        selectedFiles,
        previewUrls,
    } = useFileUpload();

    useEffect(() => {
        if (selectedFiles.length > 0) {
            console.log(selectedFiles);
        }
    }, [selectedFiles]);

    return (
        <Fragment>
            {previewUrls.length == 0 ? (
                <Paper
                    sx={{ ...dropZoneStyles, outlineColor: isDragActive ? 'secondary.main' : 'primary.main' }}
                    onDragOver={handleDragIn}
                    onDragLeave={handleDragOut}
                    onDrop={handleDrop}
                    component="div"
                >
                    <input
                        type="file"
                        id="file-input"
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                        multiple
                    />
                    <label htmlFor="file-input">
                        <DriveFolderUploadOutlinedIcon sx={{ fontSize: 60 }} />
                        <Typography>Перетащите фото сюда...</Typography>
                        <Box mt={2}>
                            <Button
                                component="label"
                                size="small"
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<DriveFolderUploadOutlinedIcon />}
                            >
                                Загрузить файлы
                            </Button>
                        </Box>
                    </label>
                </Paper>
            ) : (
                <Box sx={{ minHeight: '400px', minWidth: '500px', display: 'flex', flexWrap: 'wrap' }}>
                    {previewUrls.map((url, index) => (
                        <Box key={index} sx={{ ...imagesStyles }}>
                            <img
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                src={url}
                                alt={`preview-${index}`}
                            />
                        </Box>
                    ))}
                </Box>
            )}
        </Fragment>
    );
};

export default DropZone;
