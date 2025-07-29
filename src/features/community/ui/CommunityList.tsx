import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    Paper,
    Typography,
} from '@mui/material';
import { useGetCommunitiesQuery } from '../api/communityApi';
import { useCommunityActions } from '../hooks/useCommunityActions';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { selectUser } from '../../../entities/user/slice/userSlice';
import { useSelector } from 'react-redux';

const CommunityList = () => {
    const { data: communities, isLoading, isError, error } = useGetCommunitiesQuery();
    const { joinCommunity, leaveCommunity, deleteCommunity } = useCommunityActions();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    console.log(isLoading);
    return (
        <>
            {isLoading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Alert severity="error">{error instanceof Error ? error.message : 'Ошибка загрузки сообществ'}</Alert>
            ) : (
                <Paper sx={{ borderRadius: 2, overflow: 'hidden', width: '100%', p: 0 }}>
                    <List sx={{ p: 0 }}>
                        {communities?.results.map((community) => (
                            <ListItem
                                key={community.id}
                                sx={{ width: '100%', cursor: 'pointer', p: 0, '&:not(:last-child)': { mb: 1 } }}
                                onClick={() => navigate(`${community.id}/`)}
                            >
                                <Card
                                    sx={{
                                        width: '100%',
                                        flexShrink: 0,
                                        '&:hover': { backgroundColor: 'secondary.light' },
                                    }}
                                >
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                src={
                                                    community.images.find((image) => image.image_type === 'avatar')
                                                        ?.image
                                                }
                                                alt={community.name}
                                                sx={{ width: 56, height: 56 }}
                                            />
                                        }
                                        title={community.name}
                                        subheader={`${community.members_count} участников`}
                                        action={
                                            user.is_superuser && (
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteCommunity(community.id);
                                                    }}
                                                >
                                                    <DeleteForeverIcon sx={{ color: 'primary.main' }} />
                                                </IconButton>
                                            )
                                        }
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {community.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {community.is_member ? (
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    leaveCommunity(community.id);
                                                }}
                                            >
                                                Отписаться
                                            </Button>
                                        ) : (
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    joinCommunity(community.id);
                                                }}
                                            >
                                                Подписаться
                                            </Button>
                                        )}
                                    </CardActions>
                                </Card>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </>
    );
};

export default CommunityList;
