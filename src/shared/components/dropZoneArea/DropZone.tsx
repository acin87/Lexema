import DeleteIcon from '@mui/icons-material/Delete';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { Box, Button, CssThemeVariables, Divider, IconButton, Paper, Typography } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import ImageCarousel from '../imageCarousel/ImageCarousel';
import styles from './DropZone.module.css';

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
interface DropZoneAreaProps {
    onFilesChange: (files: File[]) => void;
}

const DropZone: FC<DropZoneAreaProps> = ({ onFilesChange }) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleDragIn = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(true);
    }, []);

    const handleDragOut = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);
    }, []);

    const addFiles = useCallback(
        (files: File[]) => {
            const newFiles = [...selectedFiles, ...files];
            setSelectedFiles(newFiles);
            onFilesChange(newFiles);

            const imageFiles = files.filter((file) => file.type.startsWith('image/'));
            const urls = imageFiles.map((file) => URL.createObjectURL(file));
            setPreviewUrls((prevUrls) => [...prevUrls, ...urls]);
        },
        [selectedFiles, onFilesChange],
    );

    const removeFile = useCallback(
        (index: number) => {
            const newFiles = selectedFiles.filter((_, i) => i !== index);
            setSelectedFiles(newFiles);
            onFilesChange(newFiles);

            const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
            setPreviewUrls(newPreviewUrls);
        },
        [selectedFiles, previewUrls, onFilesChange],
    );

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragActive(false);
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            const filesArray = Array.from(files);
            addFiles(filesArray);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const filesArray = Array.from(files);
            addFiles(filesArray);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const hasFiles = selectedFiles.length > 0;
    const dropZoneStyles: CssThemeVariables = {
        display: hasFiles ? 'none' : 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        height: 'auto',
        minHeight: '300px',
        boxShadow: ' 0 0 1.25rem 0 rgba(0, 0, 0, .1);',
        backgroundColor: 'background.paper',
        '&:hover': {
            backgroundColor: 'secondary.light',
        },
        cursor: 'pointer',
        borderRadius: '8px',
        outline: '2px dashed',
        outlineColor: isDragActive ? 'secondary.main' : 'primary.main',
    };

    const previewImages = previewUrls.map((url, index) => {
        return (
            <Box key={index} sx={{ ...imageWrapper }}>
                <img src={url} alt={`preview-${index}`} />
                <IconButton
                    aria-label="Удалить"
                    sx={{ position: 'absolute', top: 0, right: 0, color: 'secondary.light' }}
                    size="small"
                    onClick={() => removeFile(index)}
                >
                    <DeleteIcon sx={{ ':hover': { color: 'primary.main' } }} />
                </IconButton>
            </Box>
        );
    });

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <Box
                className={styles.imageContainer}
                sx={{ visibility: hasFiles ? 'visible' : 'hidden' }}
                onDragOver={handleDragIn}
                onDragLeave={handleDragOut}
                onDrop={handleDrop}
            >
                {previewUrls.length < 5 && previewImages}
                {previewUrls.length >= 5 && <ImageCarousel images={previewUrls} onDelete={removeFile} />}
            </Box>
            <Paper
                sx={{ ...dropZoneStyles }}
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
                            component="span"
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
            <Divider variant="middle" component="div" sx={{ color: 'primary.main', mt: 3 }} />
        </Box>
    );
};

export default DropZone;
