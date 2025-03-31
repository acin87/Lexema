import { Dialog, DialogContent } from '@mui/material';
import { FC } from 'react';
import ImageCarousel from '../imageCarousel/ImageCarousel';

interface ImageViewerModalProps {
    open: boolean;
    onClose: () => void;
    images: string[];
}

const ImageViewerModal: FC<ImageViewerModalProps> = ({ open, onClose, images }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                },
                '& .MuiDialogContent-root': {
                    overflow: 'hidden',
                },
            }}
        >
            <DialogContent sx={{ p: 0, '&:first-of-type': { pt: 0 } }}>
                <ImageCarousel images={images} />
            </DialogContent>
        </Dialog>
    );
};

export default ImageViewerModal;
