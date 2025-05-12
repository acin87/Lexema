import { Box, CircularProgress, SxProps } from '@mui/material';
import { FC, Fragment, memo } from 'react';

import useAllFriends from '../hooks/useAllFriends';
import FriendView from './FriendView';
import FriendViewSkeleton from './FriendViewSkeleton';

const containerStyles: SxProps = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(19rem, 1fr))',
    gap: 2,
    '@media (max-width: 768px)': {
        gap: '.5rem',
    },
    '@media (max-width: 992px)': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(21rem, 1fr))',
    },
};
const circularProgressStyles: SxProps = {
    gridColumn: 'span 3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    '@media (max-width: 768px)': {
        gridColumn: 'span 1',
    },
};
const FriendList: FC = () => {
    const { friends, ref, isSuccess, totalCount, isLoading } = useAllFriends();
    if (isLoading) {
        const skeletons = [];
        for (let i = 0; i < 12; i++) {
            skeletons.push(<FriendViewSkeleton key={i} />);
        }
        return <Box sx={{ ...containerStyles }}>{skeletons}</Box>;
    }

    return (
        <Box sx={{ ...containerStyles }}>
            {friends.filter((user) => user.status === 'accepted').map((user, index) => {
                if (index + 1 === friends?.length) {
                    return (
                        <Fragment key={index}>
                            <FriendView {...user} />
                            {isSuccess && index + 1 != totalCount && (
                                <Box sx={{ ...circularProgressStyles }} ref={ref}>
                                    <CircularProgress />
                                </Box>
                            )}
                            {isSuccess && index + 1 == totalCount && (
                                <Box sx={{ ...circularProgressStyles }}>
                                    { totalCount > 9 && <Box component="h2">У Вас больше нет друзей</Box>}
                                </Box>
                            )}
                        </Fragment>
                    );
                }
                return <FriendView key={index} {...user} />;
            })}
        </Box>
    );
};
export default memo(FriendList);
