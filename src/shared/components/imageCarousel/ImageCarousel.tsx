import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, CssThemeVariables, IconButton, Modal } from '@mui/material';
import React, { useState } from 'react';

interface ImageCarouselProps {
    images: string[];
    onDelete: (index: number) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, onDelete }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const getVisibleImages = () => {
        const prevIndex = (activeIndex - 1 + images.length) % images.length;
        const nextIndex = (activeIndex + 1) % images.length;
        return [prevIndex, activeIndex, nextIndex];
    };

    const handleImageClick = (index: number) => {
        setActiveIndex(index);
    };
    const modalStyles: CssThemeVariables= {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: window.innerWidth * 0.95+'px',
        height: window.innerHeight * 0.95+'px',
        transition: 'all 0.3s ease-in-out',
        paddingRight: 6,
        paddingLeft: 2,
        paddingTop: 2,
        paddingBottom: 2,
    };

    return (
        <Box position="relative" width="100%" maxWidth="800px" margin="auto">
            <Box
                component="img"
                src={images[activeIndex]}
                alt={`carousel-image-${activeIndex}`}
                width="100%"
                maxWidth="500px"
                height="280px"
                borderRadius={2}
                sx={{
                    display: 'block',
                    margin: '0 auto 16px',
                }}
                onClick={handleOpen}
            />
            <Modal open={open} onClose={handleClose} component="div" style={{ transformOrigin: '0 0 0' }}>
                <Box sx={{ ...modalStyles }}>
                    <Box
                        component="img"
                        src={images[activeIndex]}
                        alt={`carousel-image-${activeIndex}`}
                        width="100%"
                        height="100%"
                        borderRadius={2}
                
                        onClick={handleClose}
                    />
                    <IconButton
                        aria-label="Закрыть"
                        sx={{ position: 'absolute', top: 0, right: 0, color: 'secondary.light' }}
                        size='large'
                        onClick={handleClose}
                    >
                        <CancelIcon sx={{ ':hover': { color: 'primary.main' } }} />
                    </IconButton>
                </Box>
            </Modal>

            <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                {getVisibleImages().map((index) => (
                    <Box
                        key={index}
                        component="img"
                        src={images[index]}
                        alt={`carousel-image-${index}`}
                        width="30%"
                        height="auto"
                        borderRadius={2}
                        sx={{
                            transition: 'transform 0.3s ease, opacity 0.3s ease',
                            transform: index === activeIndex ? 'scale(1.1)' : 'scale(0.9)',
                            opacity: index === activeIndex ? 1 : 0.7,
                        }}
                        onClick={() => handleImageClick(index)}
                    />
                ))}
            </Box>

            <IconButton
                aria-label="Удалить"
                sx={{ position: 'absolute', top: 0, right: 0, color: 'secondary.light' }}
                onClick={() => onDelete(activeIndex)}
            >
                <DeleteIcon sx={{ ':hover': { color: 'primary.main' } }} />
            </IconButton>

            <IconButton
                onClick={handlePrev}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    transform: 'translateY(-50%)',
                    backgroundColor: 'background.paper',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                    },
                }}
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNext}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                    backgroundColor: 'background.paper',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                    },
                }}
            >
                <KeyboardArrowRight />
            </IconButton>
        </Box>
    );
};

export default ImageCarousel;
