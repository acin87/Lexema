import { Email, Lock, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Box, Button, Divider, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface EmailFormData {
    newEmail: string;
    currentPassword: string;
}

interface UsernameFormData {
    newUsername: string;
    currentPassword: string;
}

const SettingsForms = () => {
    // Состояния для видимости паролей
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Состояния для уведомлений
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Формы
    const passwordForm = useForm<PasswordFormData>();
    const emailForm = useForm<EmailFormData>();
    const usernameForm = useForm<UsernameFormData>();

    const handleSubmitPassword = async (data: PasswordFormData) => {
        try {
            if (data.newPassword !== data.confirmPassword) {
                throw new Error('Пароли не совпадают');
            }

            // Здесь API запрос для смены пароля
            console.log('Changing password:', data);
            setSuccessMessage('Пароль успешно изменен');
            setErrorMessage('');
            passwordForm.reset();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Ошибка при изменении пароля');
            setSuccessMessage('');
        }
    };

    const handleSubmitEmail = async (data: EmailFormData) => {
        try {
            // Валидация email может быть добавлена здесь

            // Здесь API запрос для смены email
            console.log('Changing email:', data);
            setSuccessMessage('Email успешно изменен');
            setErrorMessage('');
            emailForm.reset();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Ошибка при изменении email');
            setSuccessMessage('');
        }
    };

    const handleSubmitUsername = async (data: UsernameFormData) => {
        try {
            // Здесь API запрос для смены логина
            console.log('Changing username:', data);
            setSuccessMessage('Логин успешно изменен');
            setErrorMessage('');
            usernameForm.reset();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Ошибка при изменении логина');
            setSuccessMessage('');
        }
    };

    return (
        <Box sx={{ maxWidth: 'md', mx: 'auto', py: 3 ,  '@media (max-width: 576px)': {
                        px: 2
                    },}}>
            <Typography variant="h4" gutterBottom sx={{pb:1, ml: 1}}>
                Настройки аккаунта
            </Typography>

            {/* Общие уведомления */}
            {successMessage && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {successMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMessage}
                </Alert>
            )}

            {/* Форма смены пароля */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <Lock sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Изменить пароль
                </Typography>
                <form onSubmit={passwordForm.handleSubmit(handleSubmitPassword)}>
                    <Controller
                        name="currentPassword"
                        control={passwordForm.control}
                        defaultValue=""
                        rules={{ required: 'Текущий пароль обязателен' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                type={showCurrentPassword ? 'text' : 'password'}
                                label="Текущий пароль"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    edge="end"
                                                >
                                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="newPassword"
                        control={passwordForm.control}
                        defaultValue=""
                        rules={{
                            required: 'Новый пароль обязателен',
                            minLength: {
                                value: 8,
                                message: 'Пароль должен быть не менее 8 символов',
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                type={showNewPassword ? 'text' : 'password'}
                                label="Новый пароль"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="confirmPassword"
                        control={passwordForm.control}
                        defaultValue=""
                        rules={{ required: 'Подтверждение пароля обязательно' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                type={showConfirmPassword ? 'text' : 'password'}
                                label="Подтвердите новый пароль"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        )}
                    />

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Сохранить пароль
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Divider sx={{ my: 3 }} />

            {/* Форма смены email */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <Email sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Изменить email
                </Typography>
                <form onSubmit={emailForm.handleSubmit(handleSubmitEmail)}>
                    <Controller
                        name="newEmail"
                        control={emailForm.control}
                        defaultValue=""
                        rules={{
                            required: 'Новый email обязателен',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Неверный формат email',
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                type="email"
                                label="Новый email"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="currentPassword"
                        control={emailForm.control}
                        defaultValue=""
                        rules={{ required: 'Текущий пароль обязателен' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                type={showCurrentPassword ? 'text' : 'password'}
                                label="Текущий пароль"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    edge="end"
                                                >
                                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        )}
                    />

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Сохранить email
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Divider sx={{ my: 3 }} />

            {/* Форма смены логина */}
            <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Изменить логин
                </Typography>
                <form onSubmit={usernameForm.handleSubmit(handleSubmitUsername)}>
                    <Controller
                        name="newUsername"
                        control={usernameForm.control}
                        defaultValue=""
                        rules={{
                            required: 'Новый логин обязателен',
                            minLength: {
                                value: 4,
                                message: 'Логин должен быть не менее 4 символов',
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Новый логин"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="currentPassword"
                        control={usernameForm.control}
                        defaultValue=""
                        rules={{ required: 'Текущий пароль обязателен' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                type={showCurrentPassword ? 'text' : 'password'}
                                label="Текущий пароль"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    edge="end"
                                                >
                                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        )}
                    />

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Сохранить логин
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default SettingsForms;
