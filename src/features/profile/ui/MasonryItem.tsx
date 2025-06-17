import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Box, Fade, IconButton, Modal, Skeleton, styled } from '@mui/material';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { GalleryItem } from '../types/ProfileTypes';
interface MasonryItemProps {
    item: GalleryItem;
}
const StyledMasonryItem = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    boxShadow: theme.shadows[2],
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[6],
        '& .zoom-button': {
            opacity: 1,
        },
    },
}));

const ZoomButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    opacity: 0,
    transition: 'opacity 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
    },
}));

const MasonryItem = ({ item }: MasonryItemProps) => {
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '200px',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <StyledMasonryItem ref={ref}>
                <Box sx={{ position: 'relative', width: '100%', cursor: 'pointer' }} onClick={handleOpen}>
                    {!loaded && (
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                paddingBottom: `${(item.height / item.width) * 100}%`,
                                height: 0,
                                transform: 'none',
                            }}
                        />
                    )}

                    <Fade in={loaded} timeout={500}>
                        <Box>
                            {inView && (
                                <>
                                    <img
                                        src={item.src}
                                        onLoad={() => setLoaded(true)}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: loaded ? 'block' : 'none',
                                        }}
                                    />
                                    <ZoomButton
                                        className="zoom-button"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpen();
                                        }}
                                    >
                                        <ZoomInIcon fontSize="small" />
                                    </ZoomButton>
                                </>
                            )}
                        </Box>
                    </Fade>
                </Box>
            </StyledMasonryItem>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        outline: 'none',
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'common.white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={item.src}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '90vh',
                            display: 'block',
                            borderRadius: '4px',
                        }}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default MasonryItem;
