import { Avatar as MuiAvatar, Skeleton } from '@mui/material';
import { blue } from '@mui/material/colors';
import { FC } from 'react';
import { checkUrl } from '../../utils/Utils';

interface AvatarProps {
    src?: string | null;
    loading?: boolean;
    size?: number;
}

const Avatar: FC<AvatarProps> = ({ src, loading, size }) => {
    if (loading) {
        return <Skeleton animation="wave" variant="circular" width={size} height={size} />;
    }
    if (!src) {
        return <MuiAvatar sx={{ bgcolor: blue[500] }} aria-label="Avatar" />;
    }
    return <MuiAvatar sx={{ bgcolor: blue[500] }} aria-label="Avatar" src={checkUrl(src)} />;
};

export default Avatar;