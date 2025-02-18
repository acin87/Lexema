import { CSSObject } from '@emotion/react';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { Box, Button, Paper, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import useFileUpload from '../../hooks/useFileUpload';
import styles from './DropZone.module.css';

const dropZoneStyles: CSSObject = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '400px',
    outline: '2px dashed',
    backgroundColor: 'background.paper',
    '&:hover': {
        backgroundColor: 'secondary.light',
    },
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'outline-color 0.2s ease ease-in-out',
};
const imageContainer: CSSObject = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: '5px',
    '&>:only-child': {
        width: '100%',
    },
    '&>:only-child img': {
        width: '100%',
        height: 'auto',
    },
    '&> div:nth-child(1):nth-last-child(2), &> div:nth-child(2):nth-last-child(1)': {
        flexBasis: '50%',
    },
    '&> div:nth-child(1):nth-last-child(2) img, &> div:nth-child(2):nth-last-child(1) img': {
        width: '100%',
        height: 'auto',
    },
    '&> div:nth-child(1):nth-last-child(3)': {
        flexBasis: '50%',
    },
    '&> div:nth-child(1):nth-last-child(3) img': {
        width: '100%',
        height: 'auto',
    },
    '&> div:nth-child(2):nth-last-child(2), &> div:nth-child(3):nth-last-child(1)': {
        flexBasis: 'calc(50% - 5px)',
        marginLeft: '5px',
    },
    '&> div:nth-child(2):nth-last-child(2) img, &> div:nth-child(3):nth-last-child(1) img': {
        width: '100%',
        height: 'auto',
    },
    '&> div:nth-child(1):nth-last-child(4), &> div:nth-child(2):nth-last-child(3), &> div:nth-child(3):nth-last-child(2), &> div:nth-child(4):nth-last-child(1)':
        {
            flexBasis: '50%',
        },
    '&> div:nth-child(1):nth-last-child(4) img, &> div:nth-child(2):nth-last-child(3) img, &> div:nth-child(3):nth-last-child(2) img, &> div:nth-child(4):nth-last-child(1) img':
        {
            width: '100%',
            height: 'auto',
        },
    '&> div img': {
        maxWidth: '100%',
        height: 'auto',
    },
};

const imageWrapper: CSSObject = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
};

const DropZone: FC = () => {
    const { isDragActive, handleDragIn, handleDragOut, handleDrop, handleFileInputChange, selectedFiles, previewUrls } =
        useFileUpload();

    useEffect(() => {
        if (selectedFiles.length > 0) {
            console.log(selectedFiles);
        }
    }, [selectedFiles]);

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
                            <img  src={url} alt={`preview-${index}`} />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default DropZone;
