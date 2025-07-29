import {Container } from '@mui/material';
import useDocumentTitle from '../../shared/hooks/useDocumentTitle';
import useScrollPosition from '../../shared/hooks/useScrollPosition';
import CommunityHeader from '../../features/community/ui/CommunityHeader';
import CommunityList from '../../features/community/ui/CommunityList';

const CommunitiesPage: React.FC = () => {
    useScrollPosition('FeedPage');
    useDocumentTitle('Lexema | Сообщества');
    // const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    // const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <CommunityHeader />
            <CommunityList />
        </Container>
    );
};

export default CommunitiesPage;
