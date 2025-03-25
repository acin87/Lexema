import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography, styled } from '@mui/material';
import React from 'react';

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
}));

const StyledErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
    fontSize: '6rem',
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
}));

/**
 * Страница не найдена
 * @returns {JSX.Element} - Элемент JSX
 */
const NotFoundPage: React.FC = () => {
    return (
        <Container>
            <StyledErrorIcon />
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                Страница не найдена
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
                Извините, запрашиваемая страница не существует или была перемещена.
            </Typography>
        </Container>
    );
};

export default NotFoundPage;
