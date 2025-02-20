import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { Box, Button, CssThemeVariables, IconButton, Paper, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import useFileUpload from '../../hooks/useFileUpload';
import styles from './DropZone.module.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const dropZoneStyles: CssThemeVariables = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '300px',
    outline: '2px dashed',
    backgroundColor: 'background.paper',
    '&:hover': {
        backgroundColor: 'secondary.light',
    },
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'outline-color 0.2s ease ease-in-out',
};
// const imageContainer: CSSObject = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'stretch',
//     gap: '5px',
// };

const imageWrapper: CssThemeVariables = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
};

const DropZone: FC = () => {
    const {
        isDragActive,
        handleDragIn,
        handleDragOut,
        handleDrop,
        handleFileInputChange,
        selectedFiles,
        setSelectedFiles,
        previewUrls,
    } = useFileUpload();

    useEffect(() => {
        if (selectedFiles.length > 0) {
            console.log(selectedFiles);
        }
    }, [selectedFiles]);

    const deleteImage = (fileIndex: number) => {
        setSelectedFiles([...selectedFiles.filter((_, imgIndex) => imgIndex != fileIndex)]);
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
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
                <Box className={styles.imageContainer}>
                    {previewUrls.map((url, index) => (
                        <Box key={index} sx={{ ...imageWrapper }}>
                            <img src={url} alt={`preview-${index}`} />
                            <IconButton
                                aria-label="Удалить"
                                sx={{ position: 'absolute', top: 0, right: 0, color: 'secondary.light' }}
                                size="small"
                                onClick={deleteImage((fileIndex)=> index)}
                            >
                                <CancelOutlinedIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default DropZone;
