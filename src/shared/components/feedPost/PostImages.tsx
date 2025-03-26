import { Box, Skeleton, SxProps } from '@mui/material';
import cn from 'classnames';
import { FC, useState } from 'react';
import { checkUrl } from '../../utils/Utils';
import ImageCarousel from '../imageCarousel/ImageCarousel';
import ImageViewerModal from '../imageViewerModal/ImageViewerModal';
import styles from './Post.module.css';

interface PostImagesProps {
    images: string[];
    loading?: boolean;
}

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

const PostImages: FC<PostImagesProps> = ({ images, loading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) {
        return <Skeleton animation="wave" variant="rectangular" height={194} />;
    }

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Box className={cn(styles.imageContainer, 'image-container')}>
                {images.length < 5 ? (
                    images.map((url, index) => (
                        <Box key={index} sx={{ ...imageWrapper }} onClick={handleImageClick}>
                            <img src={checkUrl(url)} alt={`preview-${index}`} />
                        </Box>
                    ))
                ) : (
                    <Box >
                        <ImageCarousel images={images} />
                    </Box>
                )}
            </Box>
            <ImageViewerModal open={isModalOpen} onClose={handleCloseModal} images={images} />
        </>
    );
};

export default PostImages;
