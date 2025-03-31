import CancelIcon from '@mui/icons-material/Cancel';
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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth * 0.95 + 'px',
    height: window.innerHeight * 0.95 + 'px',
    transition: 'all 0.3s ease-in-out',
    paddingRight: 6,
    paddingLeft: 2,
    paddingTop: 2,
    paddingBottom: 2,
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
                component="div"
                style={{ transformOrigin: '0 0 0' }}
            >
                <Box sx={modalStyles}>
                    <Box
                        component="img"
                        sx={{ width: '100%', height: '100%', borderRadius: '5px' }}
                        src={checkUrl(selectedImage)}
                        alt={`image-${selectedImage}`}
                        onClick={handleCloseOneImageModal}
                    />
                    <IconButton
                        aria-label="Закрыть"
                        sx={{ position: 'absolute', top: 0, right: 0, color: 'secondary.light' }}
                        size="large"
                        onClick={handleCloseOneImageModal}
                    >
                        <CancelIcon />
                    </IconButton>
                </Box>
            </Modal>
        </>
    );
};

export default PostImages;
