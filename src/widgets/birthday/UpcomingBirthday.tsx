import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, IconButton, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { useGetAllUsersQuery } from '../../app/reducers/user/userApi';
import { NavLink } from 'react-router-dom';

export const UpcomingBirthday: FC = memo(() => {
    const usersFieldList = 'id,firstName,lastName,image,birthDate';
    const { data: data } = useGetAllUsersQuery({ limit: 2, skip: 20, select: usersFieldList }); //Временно, переделать на конкретный АПИ

    const users = data?.users.map((key) => {
        return (
            <Box sx={{ display: 'flex', paddingLeft: 1, marginBottom: '1.875rem' }}>
                <Box sx={{ display: 'flex' }}>
                    <Avatar  src={key.image}  sx={{height: '3.75rem',width: '3.75rem'}}/>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: 3, justifyContent: 'center'}}>
                    <Typography variant="h5" color='primary'>
                        <NavLink to={`friends/user/${key.id}`}>{key.firstName} {key.lastName}</NavLink>
                    </Typography>
                    <Typography variant="subtitle2">{key.birthDate}</Typography>
                </Box>
            </Box>
        );
    });

    return (
        <Card>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Typography variant="body1">Ближайшие дни рождения</Typography>}
            ></CardHeader>
            <Divider />
            <CardContent>{users}</CardContent>
        </Card>
    );
});
