import { Visibility, VisibilityOff } from '@mui/icons-material';
import SendOutlined from '@mui/icons-material/SendOutlined';
import {
    Button,
    CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import cn from 'classnames';
import { FC, FormEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { JWT_PERSISTENT_STATE, LoginForm } from '../../app/reducers/user/usersTypes.ts';

import { useLoginUserMutation } from '../../app/reducers/user/userApi.ts';
import { saveState } from '../../app/util/LocalStorage.ts';
import styles from './Auth.module.css';

const Authorization: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [styleChange, setStyleChange] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    const navigate = useNavigate();
    const [loginUser, { isError, isLoading, isSuccess, data }] = useLoginUserMutation();


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as typeof event.target & LoginForm;
        const { username, password } = target;
        loginUser({ password: password, username: username });
    };
    useEffect(() => {
        if (isSuccess) {
            navigate('/');
            saveState({ jwt: data.accessToken }, JWT_PERSISTENT_STATE);
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (!timerStarted) {
            setTimeout(() => {
                setStyleChange(!styleChange);
                setTimerStarted(true);
            }, 200);
        }
    }, []);

    const handleStyleChangeClick = () => {
        setStyleChange(!styleChange);
    };

    return (
        <div className={cn(styles.container, styleChange ? styles.signIn : styles.signUp)}>
            <div className={styles.wrapper}>
                <div className={cn(styles.col, styles.alignItemsCenter, styles.flexCol, styles.signUp)}>
                    <div className={cn(styles.formWrapper, styles.alignItemsCenter)}>
                        <div className={cn(styles.form, styles.signUp)}>
                            <div className={styles.inputGroup}>
                                <TextField
                                    id="userId"
                                    className={styles.formControl}
                                    label="Логин"
                                    variant="outlined"
                                    sx={{ width: '30ch' }}
                                ></TextField>
                            </div>
                            <div className={styles.inputGroup}>
                                <TextField
                                    id="userEmail"
                                    className={styles.formControl}
                                    label="E-mail"
                                    variant="outlined"
                                    sx={{ width: '30ch' }}
                                ></TextField>
                            </div>
                            <div className={styles.inputGroup}>
                                <FormControl sx={{ width: '30ch' }} variant="outlined">
                                    <InputLabel htmlFor="pass">Пароль</InputLabel>
                                    <OutlinedInput
                                        id="pass"
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
                                        label="Password"
                                    />
                                </FormControl>
                            </div>
                            <div className={styles.inputGroup}>
                                <FormControl sx={{ width: '30ch' }} variant="outlined">
                                    <InputLabel htmlFor="confirmPassword">Повторить пароль</InputLabel>
                                    <OutlinedInput
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
                                        label="Confirm Password"
                                    />
                                </FormControl>
                            </div>
                            <Button variant="contained" endIcon={<SendOutlined />} sx={{ width: '65%' }}>
                                Зарегистрироваться
                            </Button>
                            <p className={styles.paragraph}>
                                <span>Уже зарегестрированны?</span>
                                <Button size="small" onClick={handleStyleChangeClick}>
                                    Войти
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={cn(styles.col, styles.alignItemsCenter, styles.flexCol, styles.signIn)}>
                    <div className={cn(styles.formWrapper, styles.alignItemsCenter)}>
                        <div className={cn(styles.form, styles.signIn)}>
                            <form id="login" onSubmit={handleSubmitLogin} method="post">
                                <div className={styles.inputGroup}>
                                    <TextField
                                        error={isError}
                                        id="username"
                                        className={styles.formControl}
                                        label="Логин"
                                        variant="outlined"
                                        sx={{ width: '30ch' }}
                                    ></TextField>
                                </div>
                                <div className={styles.inputGroup}>
                                    <FormControl sx={{ width: '30ch' }} variant="outlined" error={isError}>
                                        <InputLabel htmlFor="password">Пароль</InputLabel>
                                        <OutlinedInput
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                </div>
                                <Button
                                    variant="contained"
                                    endIcon={
                                        isLoading ? <CircularProgress size={25} color="inherit" /> : <SendOutlined />
                                    }
                                    sx={{ width: '65%' }}
                                    type="submit"
                                >
                                    {isError ? 'error' : 'Войти'}
                                </Button>
                                <p className={styles.paragraph}>
                                    <span>'Еще не зарегестрированны?{isError} </span>
                                    <Button size="small" onClick={handleStyleChangeClick}>
                                        Регистрация
                                    </Button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn(styles.row, styles.contentRow)}>
                <div className={cn(styles.col, styles.alignItemsCenter, styles.flexCol)}>
                    <div className={cn(styles.title, styles.signIn)}>
                        <h2>Добро пожаловать</h2>
                    </div>
                </div>

                <div className={cn(styles.col, styles.alignItemsCenter, styles.flexCol)}>
                    <div className={cn(styles.title, styles.signUp)}>
                        <h2>Регистрация</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Authorization;
