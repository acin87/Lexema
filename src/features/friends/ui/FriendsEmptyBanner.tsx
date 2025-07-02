import { PeopleOutline as PeopleOutlineIcon } from '@mui/icons-material';
import { Box, Paper, SvgIcon, Typography } from '@mui/material';
import { FC } from 'react';

export const FriendsEmptyBanner: FC = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'background.paper',
                maxWidth: 600,
                mx: 'auto',
                my: 4,
            }}
        >
            <Box
                sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                }}
            >
                <SvgIcon component={PeopleOutlineIcon} sx={{ fontSize: 60, color: 'text.secondary' }} />
            </Box>

            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 500 }}>
                У вас пока нет друзей
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
                Здесь будет отображаться список ваших друзей, когда вы добавите их или когда они добавят вас
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
                {/* <Button variant="contained" color="primary">
                    Найти друзей
                </Button>
                <Button variant="outlined" color="primary">
                    Пригласить друзей
                </Button> */}
            </Box>
        </Paper>
    );
};
