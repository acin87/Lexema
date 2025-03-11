import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlined from '@mui/icons-material/SendOutlined';
import {
    Box,
    Button,
    CssThemeVariables,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
    SnackbarCloseReason,
    TextField,
} from '@mui/material';
import { FC, Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../entities/auth/api/AuthApi';
import { isApiError } from '../../../shared/utils/Utils';

type Props = {
    onToggleSignUp: () => void;
};

interface IFormInput {
    username: string;
    password: string;
}

const alignItemsCenter = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'background.paper',
};

const form: CssThemeVariables = {
    padding: '1rem',
    backgroundColor: 'background.paper',
    borderRadius: '5px',
    width: '70%',
    filter: 'drop-shadow(0 0 0.3rem rgba(0, 0, 0, 0.35))',
    transform: 'scale(0)',
    transition: '0.5s ease-in-out',
    transitionDelay: '1s',
    '@media only screen and (max-width: 425px)': {
        width: '100%',
        filter: 'none',
    },
    '& > form': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
    },
};
const SignUp: FC<Props> = ({ onToggleSignUp }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const methods = useForm<IFormInput>();
    const { control, handleSubmit } = methods;

    const [login, { isError, isSuccess, error: loginError }] = useLoginMutation();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await login({ username: data.username, password: data.password }).unwrap();
    };

    const handleCloseSnackbar = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/', { replace: true });
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (isError && isApiError(loginError)) {
            Object.keys(loginError.data).forEach((field) => {
                const formField = field as keyof IFormInput;
                methods.setError(
                    formField,
                    { type: 'manual', message: loginError.data[formField].join(', ') },
                    { shouldFocus: true },
                );
                setSnackbarMessage(loginError.data[formField].join(', '));
            });
            setOpenSnackbar(true);
        }
    }, [isError, loginError, methods]);

    const action = (
        <Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <Box sx={{ width: '50%', ...alignItemsCenter }} className="signIn">
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '28rem',
                    ...alignItemsCenter,
                }}
            >
                <Box sx={{ ...form }} className="form signIn">
                    <FormProvider {...methods}>
                        <form id="login-form" method="post" onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ width: '100%' }}>
                                <Controller
                                    name="username"
                                    control={control}
                                    defaultValue=""
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            error={!!error}
                                            helperText={error ? error.message : ''}
                                            id="login"
                                            name="username"
                                            sx={{ lineHeight: '1.5rem' }}
                                            label="Логин"
                                            variant="outlined"
                                            fullWidth
                                        ></TextField>
                                    )}
                                />
                            </Box>
                            <Box sx={{ width: '100%', margin: '1rem 0' }}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="Password">Пароль</InputLabel>
                                    <Controller
                                        name="password"
                                        control={control}
                                        defaultValue=""
                                        render={({ field, fieldState: { error } }) => (
                                            <Fragment>
                                                <OutlinedInput
                                                    {...field}
                                                    error={!!error}
                                                    id="Password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Пароль"
                                                    required
                                                />
                                                {error && <FormHelperText>{error.message}</FormHelperText>}
                                            </Fragment>
                                        )}
                                    />
                                </FormControl>
                            </Box>
                            <Button variant="contained" endIcon={<SendOutlined />} type="submit">
                                Войти
                            </Button>
                            <Box sx={{ p: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span>'Еще не зарегестрированны? </span>
                                <Button size="small" onClick={onToggleSignUp}>
                                    Регистрация
                                </Button>
                            </Box>
                        </form>
                    </FormProvider>
                </Box>
            </Box>
            {openSnackbar && (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    message={snackbarMessage}
                    onClose={handleCloseSnackbar}
                    action={action}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    key={1}
                />
            )}
        </Box>
    );
};

export default SignUp;
