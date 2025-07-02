import { Box, Paper, Typography, useTheme } from '@mui/material';
import Masonry from 'react-masonry-css';
import { useGetGalleryItemsQuery } from '../api/profileApi';
import MasonryItem from './MasonryItem';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUserId } from '../../../entities/user/slice/userSlice';
import './Gallery.css';
import { GalleryEmptyBanner } from './GalleryEmptyBanner';
interface MasonryGalleryProps {
    columns?: number | { [key: number | string]: number };
    gap?: number;
}

const MasonryGallery = ({ columns = { default: 4, 1200: 3, 800: 2, 500: 1 }, gap = 2 }: MasonryGalleryProps) => {
    const user_id = useSelector(selectUserId);
    const { id } = useParams();
    const theme = useTheme();
    const isOwner = user_id === Number(id);

    const { data: response } = useGetGalleryItemsQuery('0', { skip: !isOwner });
    if (!response) {
        return <GalleryEmptyBanner />;
    }

    if (response.count === 0) {
        return (
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    textAlign: 'center',
                    backgroundColor: theme.palette.background.paper,
                    mx: 'auto',
                    mb: 4,
                }}
            >
                <Typography>Вы еще не загрузили ни одно изображение</Typography>
            </Paper>
        );
    }

    const breakpointColumnsObj = typeof columns === 'number' ? { default: columns } : columns;

    return (
        <Box sx={{ width: '100%' }}>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid-column"
                style={{ gap: `${gap * 8}px` }}
            >
                {response.results.map((item, index) => (
                    <MasonryItem key={index} item={item} />
                ))}
            </Masonry>
        </Box>
    );
};

export default MasonryGallery;
