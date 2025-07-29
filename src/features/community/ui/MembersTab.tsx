import React, { useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Chip,
    Divider,
    Alert,
    TextField,
    InputAdornment,
    Skeleton,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useGetCommunityMembersQuery } from '../api/communityApi';
import { ApiError } from '../../../app/api/Utils';
import { useNavigate } from 'react-router-dom';

interface MembersTabProps {
    communityId: number;
}

const MembersTab: React.FC<MembersTabProps> = ({ communityId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: members, isLoading, isError, error } = useGetCommunityMembersQuery(communityId);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const filteredMembers =
        members?.filter((member) => member.full_name?.toLowerCase().includes(searchTerm.toLowerCase())) || [];

    if (isLoading) {
        return (
            <Box>
                {[...Array(5)].map((_, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                        <Box sx={{ flexGrow: 1 }}>
                            <Skeleton variant="text" width="60%" />
                            <Skeleton variant="text" width="40%" />
                        </Box>
                    </Box>
                ))}
            </Box>
        );
    }

    if (isError) {
        return (
            <Alert severity="error">
                {error ? (error as ApiError).data?.detail || 'Ошибка загрузки участников' : 'Произошла ошибка'}
            </Alert>
        );
    }

    return (
        <Box>
            <TextField
                fullWidth
                placeholder="Поиск участников..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            <Typography variant="subtitle1" gutterBottom>
                {filteredMembers.length} участников
            </Typography>

            <List>
                {filteredMembers.map((member, index) => (
                    <React.Fragment key={member.user_id}>
                        <ListItem
                            alignItems="flex-start"
                            sx={{
                                flexDirection: isMobile ? 'column' : 'row',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: 'secondary.light' },
                            }}
                            onClick={() => navigate(`/profile/${member.user_id}`)}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={member.avatar as string}
                                    alt={member.full_name!}
                                    sx={{ width: 48, height: 48 }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={member.full_name!}
                                secondary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mr: 1 }}
                                        >
                                            Участник с {new Date(member.joined_at!).toLocaleDateString()}
                                        </Typography>
                                        {member.is_staff && (
                                            <Chip
                                                label={member.is_superuser ? 'Администратор' : 'Модератор'}
                                                size="small"
                                                color={member.is_superuser ? 'primary' : 'default'}
                                                sx={{ ml: 1 }}
                                            />
                                        )}
                                    </Box>
                                }
                            />
                        </ListItem>
                        {index < filteredMembers.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>

            {filteredMembers.length === 0 && (
                <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    Участники не найдены
                </Typography>
            )}
        </Box>
    );
};

export default MembersTab;
