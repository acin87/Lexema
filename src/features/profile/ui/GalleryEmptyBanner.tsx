import { Avatar, Box, Paper, Theme, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';



export const GalleryEmptyBanner: FC= () => {
    const theme = useTheme();

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                backgroundColor: theme.palette.background.paper,
                mx: 'auto',
                mb: 4,
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
                У Вашего друга нет загруженных фотографий
            </Typography>

            <Typography variant="body1" component='p'>
                Здесь будут отображаться изображения, которые загрузил Ваш друг.
            </Typography>

            <SectionBlock theme={theme} title="Почему галлерея пуста?">
                Возможно, Ваш друг еще не успел загрузить изображения
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
