import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMultipleImageLoadMutation } from '../../api/filesLoadApi';

interface DropZoneAreaProps {
    onFileUploaded: (fileUrl: string) => void;
}

const useDropZone = ({ onFileUploaded }: DropZoneAreaProps) => {
    const { handleSubmit } = useForm();
    const [isDragActive, setIsDragActive] = useState(false);
    const [uploadFile, { isLoading }] = useMultipleImageLoadMutation();

    const handleDragIn = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(true);
    }, []);

    const handleDragOut = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragActive(false);
    }, []);

    const handleDrop = useCallback(
        (event: DragEvent) => {
            event.preventDefault();
            setIsDragActive(false);
            const files = event.dataTransfer?.files;
            if (files && files?.length > 0) {
                const file = files[0];
                const formData = new FormData();
                formData.append('file', file);
                uploadFile(formData)
                    .unwrap()
                    .then((response) => {
                        onFileUploaded(response.fileUrl);
                    })
                    .catch((error) => {
                        console.error('Ошибка загрузки файла: ', error);
                    });
            }
        },
        [onFileUploaded, uploadFile],
    );

    const handleFileInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            const files = event.target.files;
            if (files && files.length > 0) {
                const file = files[0];
                const formData = new FormData();
                formData.append('file', file);
                uploadFile(formData)
                    .unwrap()
                    .then((response) => {
                        onFileUploaded(response.fileUrl);
                    })
                    .catch((error) => {
                        console.error('Ошибка загрузки файла: ', error);
                    });
            }
        },
        [onFileUploaded, uploadFile],
    );

    return { isDragActive, isLoading, handleSubmit, handleFileInputChange, handleDrop, handleDragIn, handleDragOut };
};

export default useDropZone;
