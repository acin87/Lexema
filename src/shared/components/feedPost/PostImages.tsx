import CancelIcon from '@mui/icons-material/Cancel';
import { Box, IconButton, Modal, SxProps } from '@mui/material';
import cn from 'classnames';
import { FC, memo, useState } from 'react';
import { checkUrl } from '../../utils/Utils';
import ImageCarousel from '../imageCarousel/ImageCarousel';
import ImageViewerModal from '../imageViewerModal/ImageViewerModal';
import styles from './Post.module.css';

/**
 * Пропсы для компонента PostImages
 */
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
 * @param PostImagesProps props - Пропсы для компонента PostImages
 * @returns JSX.Element - Элемент JSX
 */
const PostImages: FC<PostImagesProps> = ({ images }) => {
    const [isViewerModalOpen, setIsViewerModalOpen] = useState(false);
    const [isOneImageModalOpen, setIsOneImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>('');

    const handleOpenImageViewerModal = () => {
        setIsViewerModalOpen(true);
    };

    const handleCloseImageViewerModal = () => {
        setIsViewerModalOpen(false);
    };

    const handleOpenOneImageModal = (url: string) => {
        setIsOneImageModalOpen(true);
        setSelectedImage(url);
    };

    const handleCloseOneImageModal = () => {
        setIsOneImageModalOpen(false);
    };

    const renderImages = () => {
        if (images.length < 5) {
            if (images.length <= 2) {
                return images.map((url, index) => (
                    <Box key={index} sx={{ ...imageWrapper }} onClick={() => handleOpenOneImageModal(url)}>
                        <img src={checkUrl(url)} alt={`preview-${index}`} />
                    </Box>
                ));
            } else {
                return images.map((url, index) => (
                    <Box key={index} sx={{ ...imageWrapper }} onClick={handleOpenImageViewerModal}>
                        <img src={checkUrl(url)} alt={`preview-${index}`} />
                    </Box>
                ));
            }
        }
        return <ImageCarousel images={images} />;
    };

    return (
        <>
            <Box className={cn(styles.imageContainer, 'image-container')}>{renderImages()}</Box>
            <ImageViewerModal open={isViewerModalOpen} onClose={handleCloseImageViewerModal} images={images} />
            <Modal
                open={isOneImageModalOpen}
                onClose={handleCloseOneImageModal}
                component="div"
                style={{ transformOrigin: '0 0 0' }}
            >
                <Box sx={{ ...modalStyles }}>
                    <Box
                        component="img"
                        src={checkUrl(selectedImage)}
                        alt={`image-${selectedImage}`}
                        width="100%"
                        height="100%"
                        borderRadius="5px"
                        onClick={handleCloseOneImageModal}
                    />
                    <IconButton
                        aria-label="Закрыть"
                        sx={{ position: 'absolute', top: 0, right: 0, color: 'secondary.light' }}
                        size="large"
                        onClick={handleCloseOneImageModal}
                    >
                        <CancelIcon sx={{ ':hover': { color: 'primary.main' } }} />
                    </IconButton>
                </Box>
            </Modal>
        </>
    );
};

export default memo(PostImages);
