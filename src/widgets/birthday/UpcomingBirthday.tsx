import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Typography,
} from '@mui/material';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetUpcomingBirthdaysQuery } from '../../entities/friends/api/friendsApi';
import { checkUrl } from '../../shared/utils/Utils';
import styles from './birthday.module.css';
/**
 * Компонент для отображения ближайших дней рождения
 * @returns Компонент для отображения ближайших дней рождения
 */
const UpcomingBirthday: FC = () => {
    const { data: response, isLoading } = useGetUpcomingBirthdaysQuery();

    // Если нет ближайших дней рождения, то не отображаем компонент
    if (response?.length === 0) {
        return null;
    }

    const dataResponse = response?.map((friend, index) => {
        const birthDate = new Date(friend.profile.birth_date);
        const avatarImage = () => {
            if (friend.profile.images[0].avatar_image) {
                return checkUrl(friend.profile.images[0].avatar_image);
            }
            return undefined;
        };

        return (
            <ListItem key={index}>
                <ListItemAvatar>
                    {isLoading ? <Skeleton animation="wave" variant="circular" sx={{ height: '3.75rem', width: '3.75rem' }} /> : <Avatar src={avatarImage()} sx={{ height: '3.75rem', width: '3.75rem' }} />}
                </ListItemAvatar>
                <ListItemText
                    sx={{ paddingLeft: 3 }}
                    primary={
                        <NavLink to={`profile/${friend.profile.user.id}`}>
                            {friend.profile.user.first_name} {friend.profile.user.last_name}
                        </NavLink>
                    }
                    secondary={birthDate.toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                />
            </ListItem>
        );
    });

    return (
        <Card className={styles.birthday}>
            <CardHeader
                action={
                    isLoading ? null : (
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    )
                }
                title={
                    isLoading ? (
                        <Skeleton style={{ marginBottom: 6 }} animation="wave" height={15} width="100%" />
                    ) : (
                        <Typography variant="body1">Ближайшие дни рождения</Typography>
                    )
                }
            ></CardHeader>
            <Divider />
            <CardContent>
                <List sx={{ width: '100%', maxWidth: 300 }}>{isLoading ? <Skeleton /> : dataResponse}</List>
            </CardContent>
        </Card>
    );
};

export default UpcomingBirthday;
