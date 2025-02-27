import { createTheme, CssThemeVariables } from '@mui/material';

const typography: CssThemeVariables = {
    fontFamily: [
        'Montserrat',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
    ].join(','),
    h1: {
        fontSize: 'calc(1.39205rem + 1.7046vw)',
    },
    h2: {
        fontSize: 'calc(1.32625rem + 0.915vw)',
    },
    h3: {
        fontSize: 'calc(1.29589rem + 0.55065vw)',
        '@media (min-width: 1200px)': {
            fontSize: '1.70888rem',
        },
    },
    h4: {
        fontSize: '1.225rem',
    },
    h5: {
        fontSize: '1.05rem',
    },
    h6: {
        fontSize: '0.875rem',
    },
    subtitle2: {
        fontSize: '0.781rem',
    },
};

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#575d5f',
            dark: '#454744',
            light: '#575d5f',
            contrastText: '#8a8c91',
        },
        secondary: {
            main: '#777d74',
            dark: '#656a63',
            light: '#2b2b2b',
            contrastText: '#ffffff',
        },
        background: {
            default: '#141414',
            paper: '#222222',
        },
        text: {
            primary: '#a0a0a0',
            secondary: '#a0a0a0',
        },
    },
    typography: { ...typography },
});
export const LightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#50b5ff',
            dark: '#449ad9',
            light: '#50b5ff',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#777d74',
            dark: '#656a63',
            light: '#f8f9fa',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8f9fa',
            paper: '#ffffff',
        },
        text: {
            primary: '#3f414d',
            secondary: '#777d74',
        },
    },

    typography: { ...typography },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 0.375rem 1rem rgba(0, 0, 0, 0.1);',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#50b5ff',
                    textDecoration: 'none',
                    '&:hover': {
                        color: '#449ad9',
                    },
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: '.5rem',
                    paddingRight: '.5rem',
                    '@media (min-width: 576px)': {
                        paddingLeft: '.5rem',
                        paddingRight: '.5rem',
                        maxWidth: '540px',
                    },
                    '@media (min-width: 768px)': {
                        maxWidth: '720px',
                    },
                    '@media (min-width: 992px)': {
                        maxWidth: '960px',
                    },
                    '@media (min-width: 1200px)': {
                        maxWidth: '1140px',
                    },
                    '@media (min-width: 1400px)': {
                        maxWidth: '1320px',
                    },
                },
            },
        },
    },
});
