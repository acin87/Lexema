import { Box, Container } from '@mui/material';
import { FC, memo } from 'react';
import FriendList from '../features/friends/components/FriendList';

const FriendsPage: FC = memo(() => {
    return (
        <Container>
            <Box sx={{ display: 'flex', height: '100px', justifyContent: 'center', alignItems: 'center' }}>
                <h2>Мои друзья</h2>
            </Box>
            <FriendList />
        </Container>
    );
});

export default FriendsPage;
