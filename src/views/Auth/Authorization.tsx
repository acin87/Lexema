import { Visibility, VisibilityOff } from '@mui/icons-material';
import SendOutlined from '@mui/icons-material/SendOutlined';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import cn from 'classnames';
import { FC, memo, useEffect, useState } from 'react';
import styles from './Auth.module.css';
const Authorization: FC = memo(() => {
    const [showPassword, setShowPassword] = useState(false);
    const [styleChange, setStyleChange] = useState(false); // состояние для отслеживания изменения стиля
    const [timerStarted, setTimerStarted] = useState(false); // состояние для отслеживания старта таймера

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (!timerStarted) {
            setTimeout(() => {
                setStyleChange(!styleChange); // через 200 мс еще раз изменяем стиль
                setTimerStarted(true); // ставим таймер запущенным
            }, 200);
        }
    }, []); // срабатывает при начальной загрузке компонента

    const handleClick = () => {
        console.log(styleChange)
        setStyleChange(!styleChange); // изменяем стиль через кнопку
    };
    console.log(styleChange);
    return (
        <div className={cn(styles.container , styleChange ?  styles.signIn : styles.signUp)}>
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
                                    <InputLabel htmlFor="password">Пароль</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
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
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
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
                                <Button size="small" onClick={handleClick}>
                                    Войти
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cn(styles.col, styles.alignItemsCenter, styles.flexCol, styles.signIn)}>
                    <div className={cn(styles.formWrapper, styles.alignItemsCenter)}>
                        <div className={cn(styles.form, styles.signIn)}>
                            <div className={styles.inputGroup}>
                                <TextField
                                    id="auth-Email"
                                    className={styles.formControl}
                                    label="E-mail"
                                    variant="outlined"
                                    sx={{ width: '30ch' }}
                                ></TextField>
                            </div>
                            <div className={styles.inputGroup}>
                                <FormControl sx={{ width: '30ch' }} variant="outlined">
                                    <InputLabel htmlFor="auth-password">Пароль</InputLabel>
                                    <OutlinedInput
                                        id="auth-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
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
                            <Button variant="contained" endIcon={<SendOutlined />} sx={{ width: '65%' }}>
                                Войти
                            </Button>
                            <p className={styles.paragraph}>
                                <span>Еще не зарегестрированны?</span>
                                <Button size="small" onClick={handleClick}>
                                    Регистрация
                                </Button>
                            </p>
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
});
export default Authorization;
