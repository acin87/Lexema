import { useCallback, useState } from 'react';
import { useMultipleImageLoadMutation } from '../api/filesLoadApi';



const useFileUpload = () => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [uploadFiles, { isLoading }] = useMultipleImageLoadMutation();
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

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragActive(false);
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            const filesArray = Array.from(files);
            setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
            createPreviewUrls(filesArray);
        }
    }, []);

    const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const files = event.target.files;
        if (files && files.length > 0) {
            const filesArray = Array.from(files);
            setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
            createPreviewUrls(filesArray);
        }
    }, []);

    const createPreviewUrls = (files: File[]) => {
        const imageFiles = files.filter((file) => file.type.startsWith('image/'));
        const urls = imageFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls((prevUrls) => [...prevUrls, ...urls]);
    }

    const handleUpload = useCallback(async () => {
        if (selectedFiles.length === 0) return;

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        try {
            await uploadFiles(formData).unwrap();
            setSelectedFiles([]);
        } catch (error) {
            console.error('Ошибка загрузки файлов: ', error);
        }
    }, [selectedFiles, uploadFiles]);

    return {
        isDragActive,
        isLoading,
        selectedFiles,
        setSelectedFiles,
        previewUrls,
        handleFileInputChange,
        handleDrop,
        handleDragIn,
        handleDragOut,
        handleUpload,
    };
};

export default useFileUpload;
