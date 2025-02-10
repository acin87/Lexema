import { Box, BoxProps, styled } from '@mui/material';
import { useState } from 'react';
import { useDropZone } from './useDropZone';
import FileList from './FileList';

interface DropAreaMuiProps extends BoxProps {
    dropzoneref: React.RefObject<HTMLDivElement>;
}

const DropZoneStyles = styled((props: DropAreaMuiProps) => <Box ref={props.dropzoneref} {...props}>{props.children}</Box>)(({ theme }) => ({
    width: '100%',
    height: '100%',
    minHeight: '400px',
    outline: '1px dashed gray',
    backgroundColor: theme.palette.background.paper, '&:hover': {
        backgroundColor: theme.palette.secondary.light
    },
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'outline-color 0.2s ease-in-out'
}));

const DropZone = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const onDragStateChange = (isDragging: boolean) => {
        setIsDragging(isDragging);
    };

    const onFilesDrop = (files: File[]) => {
        setFiles(files);
    };

    const ref = useDropZone({ onDragStateChange, onFilesDrop });

    return (
        <DropZoneStyles dropzoneref={ref}>
            <FileList files={files} />
        </DropZoneStyles>
    );
};

export default DropZone;
