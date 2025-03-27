import { Avatar, Box, Button, Paper, Theme, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';

interface WelcomeBannerProps {
    onFindFriendsClick?: () => void;
    onCompleteProfileClick?: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onFindFriendsClick, onCompleteProfileClick }) => {
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
                <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 60, height: 60 }}>
                    <img src={'src/assets/icons/WelcomeRocketIcon.png'} style={{ width: '100%', height: '100%' }} />
                </Avatar>
            </Box>

            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Добро пожаловать в Lexema! 🎉
            </Typography>

            <Typography variant="body1" paragraph>
                Мы рады, что ты с нами! Lexema — это место, где можно делиться мыслями, находить единомышленников и
                открывать для себя интересный контент.
            </Typography>

            <SectionBlock theme={theme} title="Почему лента пуста?">
                Пока здесь тихо, потому что ты ещё не подписался ни на кого. Начни с поиска друзей, авторов или
                сообществ по интересам — и твоя лента наполнится постами.
            </SectionBlock>

            <SectionBlock theme={theme} title="Не забудь заполнить профиль! 📝">
                Расскажи о себе, добавь фото или аватар, укажи интересы — так другие пользователи смогут легче найти
                тебя, а твоя лента станет более персонализированной.
            </SectionBlock>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                <Button variant="contained" color="primary" onClick={onFindFriendsClick} sx={{ px: 4 }}>
                    Найти друзей
                </Button>
                <Button variant="outlined" color="primary" onClick={onCompleteProfileClick} sx={{ px: 4 }}>
                    Заполнить профиль
                </Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 3, color: theme.palette.text.secondary }}>
                Если есть вопросы — мы всегда готовы помочь. Приятного общения в Lexema! 🚀
            </Typography>
        </Paper>
    );
};

const SectionBlock: FC<{ theme: Theme; title: string; children: React.ReactNode }> = ({ theme, title, children }) => (
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
