import { Box } from '@mui/material';
import Masonry from 'react-masonry-css';
import { useGetGalleryItemsQuery } from '../api/profileApi';
import MasonryItem from './MasonryItem';

import './Gallery.css'
interface MasonryGalleryProps {
    columns?: number | { [key: number | string]: number };
    gap?: number;
}

const MasonryGallery = ({ columns = { default: 4, 1200: 3, 800: 2, 500: 1 }, gap = 2 }: MasonryGalleryProps) => {
    const { data: response } = useGetGalleryItemsQuery();
    if (!response) {
        return null;
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
                {response.results.map((item) => (
                    <MasonryItem key={item.id} item={item} />
                ))}
            </Masonry>
        </Box>
    );
};

export default MasonryGallery;
