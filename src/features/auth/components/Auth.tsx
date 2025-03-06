import { Box, CssThemeVariables, Paper, Typography, useTheme } from '@mui/material';
import { FC, memo, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const contentRow: CssThemeVariables = {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 6,
    width: '100%',
    pointerEvents: 'none',
    '@media only screen and (max-width: 425px)': {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    '& > div': {
        transform: 'translateY(0)',
        backgroundColor: 'unset',
    },
};

const alignItemsCenter: CssThemeVariables = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};
const Auth: FC = () => {
    const theme = useTheme();
    const [signInUp, setSignInUp] = useState(true);

    const handleSignInUp = () => {
        setSignInUp(!signInUp);
    };

    const ContainerStyled: CssThemeVariables = {
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        ':before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100vh',
            width: '300vw',
            transform: 'translate(35%, 0)',
            backgroundImage: `linear-gradient(-45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            transition: '1s ease-in-out',
            zIndex: 6,
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            borderBottomRightRadius: 'max(50vw, 50vh)',
            borderTopLeftRadius: ' max(50vw, 50vh)',
        },
        '&.signIn .form': {
            '&.signIn': {
                transform: 'scale(1)',
            },
        },
        '&.signUp .form': {
            '&.signUp': {
                transform: 'scale(1)',
            },
        },
        '&.signUp .title': {
            '&.signUp > h2': {
                transform: 'translateX(0)',
            },
        },
        '&.signIn .title': {
            '&.signIn > h2': {
                transform: 'translateX(0)',
            },
        },
        '&.signIn::before': {
            transform: 'translate(0, 0)',
            right: '50%',
        },
        '&.signUp::before': {
            transform: 'translate(100%, 0)',
            right: '50%',
        },
        '@media only screen and (max-width: 425px)': {
            ':before, &.signUp::before, &.signIn::before': {
                height: '100vh',
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 0,
                transform: 'none',
                right: 0,
                zIndex: 0,
            },
            '& > div > .signIn, & > div > .signUp': {
                width: '100%',
                borderTopRightRadius: '2rem',
                borderTopLeftRadius: '2rem',
                position: 'absolute',
                p: '2rem',
                transform: 'translateY(100%)',
                transition: '1s ease-in-out',
            },
            '&.signIn > div > .signIn, &.signUp > div > .signUp': {
                transform: 'translateY(0)',
            },
        },
    };

    return (
        <Box sx={{ ...ContainerStyled }} className={signInUp ? 'signIn' : 'signUp'}>
            <Paper
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    height: '100vh',
                    '@media only screen and (max-width: 425px)': { alignItems: 'flex-end', justifyContent: 'flex-end' },
                }}
            >
                <SignIn onToggleSignIn={handleSignInUp} />
                <SignUp onToggleSignUp={handleSignInUp} />
                <Box sx={{ ...contentRow }}>
                    <Box
                        sx={{
                            ...alignItemsCenter,
                            width: '50%',
                            flexDirection: 'column',
                            '@media only screen and (max-width: 425px)': {
                                width: '100%',
                                borderBottomRightRadius: '2rem',
                                borderTopLeftRadius: '2rem',
                                position: 'absolute',
                                p: '2rem',
                                transform: 'translateY(100%)',
                                transition: '1s ease-in-out',
                                '& > div': {
                                    margin: 0,
                                },
                                '& > div > h2': {
                                    margin: '.5rem',
                                    fontSize: '2rem',
                                },
                            },
                        }}
                    >
                        <Box
                            sx={{
                                m: '4rem',
                                '&.signIn > h2': {
                                    transform: 'translateX(-250%)',
                                },
                            }}
                            className="title signIn"
                        >
                            <Typography
                                variant="h2"
                                color="primary.contrastText"
                                sx={{
                                    fontSize: '3.5rem',
                                    fontWeight: 800,
                                    margin: '2rem 0',
                                    transition: '1s ease-in-out',
                                }}
                            >
                                Добро пожаловать
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            ...alignItemsCenter,
                            width: '50%',
                            flexDirection: 'column',
                            '@media only screen and (max-width: 425px)': {
                                width: '100%',
                                borderBottomRightRadius: '2rem',
                                borderTopLeftRadius: '2rem',
                                position: 'absolute',
                                p: '2rem',
                                transform: 'translateY(100%)',
                                transition: '1s ease-in-out',
                                '& > div': {
                                    margin: 0,
                                },
                                '& > div > h2': {
                                    margin: '.5rem',
                                    fontSize: '2rem',
                                },
                            },
                        }}
                    >
                        <Box
                            sx={{
                                m: '4rem',
                                '&.signUp > h2': {
                                    transform: 'translateX(250%)',
                                },
                            }}
                            className="title signUp"
                        >
                            <Typography
                                variant="h2"
                                color="primary.contrastText"
                                sx={{
                                    fontSize: '3.5rem',
                                    fontWeight: 800,
                                    margin: '2rem 0',
                                    transition: '1s ease-in-out',
                                }}
                            >
                                Регистрация
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default memo(Auth);
