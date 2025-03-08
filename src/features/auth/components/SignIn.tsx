import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlined from '@mui/icons-material/SendOutlined';
import {
    Box,
    Button,
    CssThemeVariables,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
    SnackbarCloseReason,
    TextField,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { FC, Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRegisterMutation } from '../../../entities/auth/api/AuthApi';

type Props = {
    onToggleSignIn: () => void;
};

interface IFormInput {
    userName: string;
    userEmail: string;
    userPassword: string;
    confirmPassword: string;
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
const SignIn: FC<Props> = ({ onToggleSignIn }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const methods = useForm<IFormInput>();
    const { control, handleSubmit } = methods;

    const [register, { isError, isLoading }] = useRegisterMutation();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
        await register({ email: data.userEmail, password: data.userPassword });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleCloseSnackbar = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    useEffect(() => {
        if (isError) {
            setOpenSnackbar(true);
        }
    }, [isError]);



    const action = (
        <Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <Box sx={{ width: '50%', ...alignItemsCenter }} className="signUp">
            <Box sx={{ width: '100%', maxWidth: '28rem', ...alignItemsCenter }}>
                <Box sx={{ ...form }} className="form signUp">
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ position: 'relative', width: '100%', margin: '1rem 0' }}>
                                <Controller
                                    name="userName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="userName"
                                            label="Логин"
                                            variant="outlined"
                                            fullWidth
                                            required
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ position: 'relative', width: '100%', margin: '1rem 0' }}>
                                <Controller
                                    name="userEmail"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="userEmail"
                                            label="E-mail"
                                            variant="outlined"
                                            fullWidth
                                            required
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ position: 'relative', width: '100%', margin: '1rem 0' }}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="userPassword">Пароль</InputLabel>
                                    <Controller
                                        name="userPassword"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <OutlinedInput
                                                id="userPassword"
                                                {...field}
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
                                                label="userPassword"
                                                required
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ position: 'relative', width: '100%', margin: '1rem 0' }}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="confirmPassword">Повторить пароль</InputLabel>
                                    <Controller
                                        name="confirmPassword"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <OutlinedInput
                                                {...field}
                                                id="confirmPassword"
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
                                                label="confirmPassword"
                                                required
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Box>
                            <Button variant="contained" endIcon={<SendOutlined />} type="submit">
                                {isLoading ? <CircularProgress size={20} /> : 'Зарегистрироваться'}
                            </Button>
                            <Box sx={{ p: '10px' }}>
                                <span>Уже зарегестрированны?</span>
                                <Button size="small" onClick={onToggleSignIn}>
                                    Войти
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
                    message="Ошибка регистрации, сервер недоступен"
                    onClose={handleCloseSnackbar}
                    action={action}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    key={1}
                />
            )}
        </Box>
    );
};

export default SignIn;
