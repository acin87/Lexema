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
    Typography,
} from '@mui/material';
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useGetAllUsersQuery } from '../../app/reducers/user/userApi';
import styles from './birthday.module.css'

export const UpcomingBirthday: FC = memo(() => {
    const usersFieldList = 'id,firstName,lastName,image,birthDate';
    const { data: data } = useGetAllUsersQuery({ limit: 2, skip: 20, select: usersFieldList }); //Временно, переделать на конкретный АПИ

    const users = data?.users.map((key, index) => {
        return (
            <ListItem key={index}>
                <ListItemAvatar>
                    <Avatar src={key.image} sx={{ height: '3.75rem', width: '3.75rem' }} />
                </ListItemAvatar>
                <ListItemText
                    sx={{ paddingLeft: 3 }}
                    primary={
                        <NavLink to={`friends/user/${key.id}`}>
                            {key.firstName} {key.lastName}
                        </NavLink>
                    }
                    secondary={key.birthDate}
                />
            </ListItem>
        );
    });

    return (
        <Card className={styles.birthday}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Typography variant="body1">Ближайшие дни рождения</Typography>}
            ></CardHeader>
            <Divider />
            <CardContent>
                <List sx={{ width: '100%', maxWidth: 300 }}>{users}</List>
            </CardContent>
        </Card>
    );
});
