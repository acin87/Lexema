import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal, SxProps } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import cn from 'classnames';
import { FC, useState } from 'react';
import ImageCarousel from '../../../../shared/ui/imageCarousel/ImageCarousel';
import { checkUrl } from '../../../../shared/utils/Utils';
import styles from './PostImages.module.css';
interface PostImagesProps {
    images: string[];
}

/**
 * Стили для компонента PostImages
 */
const imageWrapper: SxProps = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: '3px',
    cursor: 'pointer',
    '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
};

/**
 * Стили для модального окна
 */
const modalStyles: SxProps = {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    outline: 'none',
};

/**
 * Компонент для отображения изображений в посте
 * @param Object props - Свойства компонента
 * @param string[] props.images - Массив URL-адресов изображений
 */
const PostImages: FC<PostImagesProps> = ({ images }) => {
    const [isOneImageModalOpen, setIsOneImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>('');

    const handleOpenOneImageModal = (url: string) => {
        setIsOneImageModalOpen(true);
        setSelectedImage(url);
    };

    const handleCloseOneImageModal = () => {
        setIsOneImageModalOpen(false);
    };

    const renderImages = () => {
        if (images.length < 5) {
            return images.map((url, index) => (
                <Box key={index} sx={imageWrapper} onClick={() => handleOpenOneImageModal(url)}>
                    <img src={checkUrl(url)} alt={`preview-${index}`} />
                </Box>
            ));
        }
        return <ImageCarousel images={images} />;
    };

    return (
        <>
            <Box className={cn(styles.imageContainer, 'image-container')}>{renderImages()}</Box>
            <Modal
                open={isOneImageModalOpen}
                onClose={handleCloseOneImageModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Box sx={modalStyles}>
                    <IconButton
                        aria-label="Закрыть"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'common.white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1,
                        }}
                        onClick={handleCloseOneImageModal}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box
                        component="img"
                        sx={{
                            maxWidth: '100%',
                            maxHeight: '90vh',
                            display: 'block',
                            borderRadius: '4px',
                        }}
                        src={checkUrl(selectedImage)}
                        alt={`image-${selectedImage}`}
                        onClick={handleCloseOneImageModal}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default PostImages;
