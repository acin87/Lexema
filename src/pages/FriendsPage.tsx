import { Box, Container } from '@mui/material';
import { FC, memo } from 'react';
import FriendList from '../features/friends/ui/FriendList';
import useScrollPosition from '../shared/hooks/useScrollPosition';
import useDocumentTitle from '../shared/hooks/useDocumentTitle';
const FriendsPage: FC = memo(() => {
    useScrollPosition('FriendsPage');
    useDocumentTitle('Lexema | Друзья');
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
