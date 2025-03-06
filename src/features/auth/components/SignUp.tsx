import { Visibility, VisibilityOff } from '@mui/icons-material';
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
    TextField,
} from '@mui/material';
import { FC, useState } from 'react';

type Props = {
    onToggleSignUp: () => void;
};

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

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <Box sx={{ width: '50%', ...alignItemsCenter }} className="signIn">
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '28rem',
                    ...alignItemsCenter, //signUp
                }}
            >
                <Box sx={{ ...form }} className="form signIn">
                    <form id="login" method="post">
                        <Box sx={{ width: '100%' }}>
                            <TextField
                                id="username"
                                sx={{ lineHeight: '1.5rem' }}
                                label="Логин"
                                variant="outlined"
                                fullWidth
                            ></TextField>
                        </Box>
                        <Box sx={{ width: '100%', margin: '1rem 0' }}>
                            <FormControl variant="outlined" fullWidth>
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
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;
