import { Box, Button, Paper, SnackbarCloseReason, Typography } from '@mui/material';
import cn from 'classnames';
import { FC, SyntheticEvent, useState } from 'react';
import SnackBar from '../../../shared/ui/snackbar/SnackBar';
import styles from './Auth.module.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

/**
 * Компонент для авторизации пользователя
 * @returns компонент для авторизации пользователя
 */
const Auth: FC = () => {
    const [signInUp, setSignInUp] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const handleOpenSnackbar = (message: string) => {
        setMessage(message);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setMessage('');
    };

    const handleSignInUp = () => {
        setSignInUp(!signInUp);
    };

    return (
        <Box className={cn(styles.container, signInUp ? styles.signIn : styles.signUp)}>
            <Paper className={styles.row}>
                {/* Форма регистрации */}
                <Box className={cn(styles.col, styles.flexCol, styles.alignItemsCenter, styles.signUp)}>
                    <Box className={cn(styles.alignItemsCenter, styles.formWrapper)}>
                        <Box className={cn(styles.form, styles.signUp)}>
                            <SignUp onOpenSnackbar={handleOpenSnackbar} />
                            <Box className={styles.toggleButton}>
                                <span>Уже зарегистрированы?</span>
                                <Button size="small" onClick={handleSignInUp}>
                                    Войти
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Форма входа */}
                <Box className={cn(styles.col, styles.flexCol, styles.alignItemsCenter, styles.signIn)}>
                    <Box className={cn(styles.alignItemsCenter, styles.formWrapper)}>
                        <Box className={cn(styles.form, styles.signIn)}>
                            <SignIn onOpenSnackbar={handleOpenSnackbar} />
                            <Box className={styles.toggleButton}>
                                <span>Не зарегистрированы?</span>
                                <Button size="small" onClick={handleSignInUp}>
                                    Регистрация
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            {/* Заголовки */}
            <Box className={cn(styles.row, styles.contentRow)}>
                <Box className={cn(styles.col, styles.alignItemsCenter, styles.flexCol)}>
                    <Box className={cn(styles.text, styles.signIn)}>
                        <Typography variant="h2">Добро пожаловать</Typography>
                    </Box>
                </Box>
                <Box className={cn(styles.col, styles.alignItemsCenter, styles.flexCol)}>
                    <Box className={cn(styles.text, styles.signUp)}>
                        <Typography variant="h2">Регистрация</Typography>
                    </Box>
                </Box>
            </Box>
            {/* Снэкбар */}
            <SnackBar message={message} severity="error" open={openSnackbar} onClose={handleCloseSnackbar} />
        </Box>
    );
};

export default Auth;
