import React, { useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Button,
    Container,
    Tabs,
    Tab,
    Divider,
    CircularProgress,
    Alert,
    Stack,
    Chip,
    IconButton,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetCommunityQuery } from '../api/communityApi';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ApiError } from '../../../app/api/Utils';
import GroupFeed from './GroupFeed';
import { useCommunityActions } from '../hooks/useCommunityActions';
import MembersTab from './MembersTab';
import AdvertisingWidget from '../../../widgets/advertising/AdvertisingWidget';

const CommunityPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: community, isLoading, isError, error } = useGetCommunityQuery(Number(id));
    const { joinCommunity, leaveCommunity } = useCommunityActions();
    const [tabValue, setTabValue] = useState(0);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !community) {
        return (
            <Alert severity="error" sx={{ my: 2 }}>
                {error ? (error as ApiError).data?.message || 'Ошибка загрузки сообщества' : 'Сообщество не найдено'}
            </Alert>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 3 }}>
                <IconButton component={Link} to="/communities" sx={{ mr: 1 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h4" component="h1" display="inline">
                    {community.name}
                </Typography>
            </Box>

            {/* Шапка сообщества */}
            <Box
                sx={{
                    position: 'relative',
                    height: 250,
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 3,
                    bgcolor: 'background.default',
                }}
            >
                {community.images.find((image) => image.image_type === 'cover') && (
                    <img
                        src={community.images.find((image) => image.image_type === 'cover')?.image}
                        alt={`Баннер ${community.name}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                )}

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 2,
                    }}
                >
                    <Avatar
                        src={community.images.find((image) => image.image_type === 'avatar')?.image}
                        alt={community.name}
                        sx={{
                            width: 100,
                            height: 100,
                            border: '3px solid white',
                            bgcolor: 'primary.main',
                        }}
                    />
                    <Box>
                        <Typography variant="h5" color="white" sx={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                            {community.name}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Chip
                                label={`${community.members_count} участников`}
                                size="small"
                                sx={{ background: 'rgba(255,255,255,0.8)' }}
                            />
                            {/* {community.tags?.map((tag) => (
                                <Chip key={tag} label={tag} size="small" sx={{ background: 'rgba(255,255,255,0.8)' }} />
                            ))} */}
                        </Stack>
                    </Box>
                </Box>

                <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                    {community.is_member ? (
                        <Button variant="contained" color="error" onClick={() => leaveCommunity(community.id)}>
                            Покинуть сообщество
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={() => joinCommunity(community.id)}>
                            Вступить
                        </Button>
                    )}
                </Box>
            </Box>

            {/* Контент сообщества */}
            <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
                <Tab label="Лента" />
                <Tab label="Участники" />
                <Tab label="Информация" />
                <Tab label="Мероприятия" />
            </Tabs>

            <Divider sx={{ mb: 3 }} />

            {tabValue === 0 && (
                <Box sx={{display: 'flex', gap: 2}}>
                    <GroupFeed groupId={community.id} />
                    <AdvertisingWidget />
                </Box>
            )}

            {tabValue === 1 && <MembersTab communityId={community.id} />}

            {tabValue === 2 && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Описание
                    </Typography>
                    <Typography component="p">{community.description}</Typography>

                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                        Правила
                    </Typography>
                    {/* <Typography component='p'>{community.rules || 'Правила сообщества не указаны.'}</Typography> */}
                </Box>
            )}

            {tabValue === 3 && <Typography paragraph>Предстоящие мероприятия сообщества будут здесь.</Typography>}
        </Container>
    );
};

export default CommunityPage;
