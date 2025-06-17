import { Avatar, Box, Paper, Theme, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';



export const FriendEmptyBanner: FC= () => {
    const theme = useTheme();

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                backgroundColor: theme.palette.background.paper,
                maxWidth: 600,
                mx: 'auto',
                my: 4,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar
                    sx={{
                        bgcolor: theme.palette.grey[200],
                        width: 60,
                        height: 60,
                    }}
                >
                    <Typography variant="h4" sx={{ color: theme.palette.text.secondary }}>
                        👋
                    </Typography>
                </Avatar>
            </Box>

            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Лента Вашего друга пока пуста
            </Typography>

            <Typography variant="body1" paragraph>
                Здесь будут отображаться посты людей и сообществ, на которые подписан Ваш друг, но пока здесь ничего
                нет.
            </Typography>

            <SectionBlock theme={theme} title="Почему лента пуста?">
                Возможно, Ваш друг еще не успел подписаться на кого-то или не публиковал посты. Вы можете помочь ему
                найти интересных авторов или друзей.
            </SectionBlock>

            <SectionBlock theme={theme} title="Предложите интересный контент">
                Если у вас есть интересные сообщества или авторы по темам, которые могут понравиться
                Вашему другу, поделитесь с ним рекомендациями.
            </SectionBlock>
        </Paper>
    );
};

const SectionBlock: React.FC<{
    theme: Theme;
    title: string;
    children: React.ReactNode;
}> = ({ theme, title, children }) => (
    <Box
        sx={{
            mt: 3,
            p: 2,
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.action.hover,
            textAlign: 'left',
            borderRadius: '0 4px 4px 0',
        }}
    >
        <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
            {title}
        </Typography>
        <Typography variant="body1">{children}</Typography>
    </Box>
);
