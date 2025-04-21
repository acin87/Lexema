import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography, styled } from '@mui/material';
import { FC } from 'react';
import { ApiError, isApiError } from '../../app/api/Utils';


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

interface ErrorPageProps {
    error?: ApiError | undefined;
    statusCode?: number;
}

interface ErrorCode {
    [key: number]: string;
}

interface ErrorMessage {
    [key: number]: string;
}

/**
 * Страница ошибки
 * @component
 * @returns JSX.Element - Элемент JSX
 */
const ErrorPage: FC<ErrorPageProps> = ({ error, statusCode = 404 }) => {
    const errorCode: ErrorCode = {
        400: 'Неверный запрос',
        401: 'Не авторизован',
        403: 'Доступ запрещен',
        404: 'Страница не найдена',
        500: 'Ошибка сервера',
    };

    const errorMessage: ErrorMessage = {
        400: 'Пожалуйста, проверьте введенные данные и попробуйте снова.',
        401: 'Пожалуйста, войдите в систему, чтобы получить доступ к этой странице.',
        403: 'У вас нет прав доступа к этой странице.',
        404: 'Извините, запрашиваемая страница не существует или была перемещена.',
        500: 'Что-то пошло не так на сервере. Пожалуйста, попробуйте позже.',
    };

    return (
        <Container>
            <StyledErrorIcon />
            <Typography variant="h1" component="h1" gutterBottom>
                Ошибка {statusCode}: {errorCode[statusCode]}
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                Что-то пошло не так
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
                    {isApiError(error) ? error.data?.detail : errorMessage[statusCode]}
            </Typography>
        </Container>
    );
};

export default ErrorPage;
