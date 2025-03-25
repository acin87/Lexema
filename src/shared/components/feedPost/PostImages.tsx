import { Box, Skeleton, SxProps } from '@mui/material';
import { FC } from 'react';
import ImageCarousel from '../imageCarousel/ImageCarousel';
import styles from './Post.module.css';
import { checkUrl } from '../../utils/Utils';

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
    '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
};


const PostImages: FC<PostImagesProps> = ({ images, loading }) => {
    if (loading) {
        return <Skeleton animation="wave" variant="rectangular" height={194} />;
    }

    return (
        <Box className={styles.imageContainer}>
            {images.length < 5 ? (
                images.map((url, index) => (
                    <Box key={index} sx={{...imageWrapper}}>
                        <img src={checkUrl(url)} alt={`preview-${index}`} />
                    </Box>
                ))
            ) : (
                <ImageCarousel images={images} />
            )}
        </Box>
    );
};

export default PostImages;