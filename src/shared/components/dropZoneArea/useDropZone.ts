import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

export type DropZoneAreaProps = {
    onDragStateChange?: (isDragging: boolean) => void;
    onDrag?: () => void;
    onDragIn?: () => void;
    onDragOut?: () => void;
    onDrop?: () => void;
    onFilesDrop?: (files: File[]) => void;
};

export const useDropZone = (props: DropZoneAreaProps) => {
    const { onDragStateChange, onDrag, onDragIn, onDragOut, onDrop, onFilesDrop } = props;

    

    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef<null | HTMLDivElement>(null);

    const mapFileListToArray = (fileList: FileList) => {
        const files = [];
        for (let i = 0; i < fileList.length; i++) {
            files.push(fileList[i]);
        }
        return files;
    };

    const handleDragIn = useCallback(
        (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onDragIn?.();
            if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
                setIsDragging(true);
            }
        },
        [onDragIn],
    );

    const handleDragOut = useCallback(
        (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onDragOut?.();
            setIsDragging(false);
        },
        [onDragOut],
    );

    const handleDrag = useCallback(
        (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onDrag?.();
            if (!isDragging) {
                setIsDragging(true);
            }
        },
        [onDrag, isDragging],
    );
    const handleDrop = useCallback(
        (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            onDrop?.();
            setIsDragging(false);
            if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
                onFilesDrop?.(mapFileListToArray(e.dataTransfer.files));
                e.dataTransfer.clearData();
            }
        },
        [onDrop, onFilesDrop],
    );

    useEffect(() => {
        onDragStateChange?.(isDragging);
    }, [isDragging, onDragStateChange]);

    useEffect(() => {
        const zoneRef = ref.current;
        if (zoneRef) {
            zoneRef.addEventListener('dragenter', handleDragIn);
            zoneRef.addEventListener('dragleave', handleDragOut);
            zoneRef.addEventListener('dragover', handleDrag);
            zoneRef.addEventListener('drop', handleDrop);
        }
        return () => {
            if (zoneRef) {
                zoneRef.removeEventListener('dragenter', handleDragIn);
                zoneRef.removeEventListener('dragleave', handleDragOut);
                zoneRef.removeEventListener('dragover', handleDrag);
                zoneRef.removeEventListener('drop', handleDrop);
            }
        };
    });

    return ref;
};
