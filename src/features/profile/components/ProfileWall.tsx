import { Box } from '@mui/material';
import { FC, memo } from 'react';
import Wall from '../../../entities/profile/components/Wall';
import UpcomingBirthday from '../../../widgets/birthday/UpcomingBirthday';
interface ProfileWallProps {
    id: number;
}

const ProfileWall: FC<ProfileWallProps> = ({ id }) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'calc(30% - 1rem) calc(70% - 1rem)', //надо учесть gap между колонками
                gap: '2rem',
                '@media (max-width: 992px)': { '& > div': { gridColumn: 'span 2' } },
            }}
        >
            <Box sx={{ gridColumn: '1 / 2' }}>
                <Box><UpcomingBirthday /></Box>
            </Box>
            <Box sx={{ gridColumn: '2 / 3', '& .post-list': { width: '100%' } }}>
                <Wall id={id} />
            </Box>
        </Box>
    );
};

export default memo(ProfileWall);
