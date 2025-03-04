import { Box, CssThemeVariables, List, ListItem, Typography } from '@mui/material';
import { cloneElement, FC, ReactElement } from 'react';

const dialoguePanel: CssThemeVariables = {
    borderRight: '1px solid #eaeaea',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
    height: '100%',
    flexShrink: 0,
    width: '320px',
    '@media (max-width: 1599px)': {
        width: '280px',
    },
    zIndex: 1,
};

const generate = (element: ReactElement<unknown>) => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((value, index) =>
        cloneElement(element, { key: value }, <span> {index} </span>),
    );
};

const MessangerPanel: FC = () => {
    return (
        <Box sx={{ ...dialoguePanel }}>
            <Box
                component="header"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '65px',
                    p: '0 1.25rem',
                    borderBottom: '1px solid #eaeaea',
                }}
            >
                <Typography variant="h6">Чат</Typography>
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    flex: 1,
                    overflow: 'auto',
                    p: '1.25rem',
                    height: '100%',
                    alignContent: 'flex-start',
                }}
            >
                <Box
                    sx={{
                        overflow: 'hidden',
                        width: 'inherit',
                        height: 'inherit',
                        maxWidth: 'inherit',
                        maxHeight: 'inherit',
                        m: '-17.5px',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            overflow: 'hidden',
                            width: 'auto !important',
                            height: 'auto !important',
                            zIndex: 0,
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                overflowY: 'hidden scroll',
                                width: 'auto',
                                height: '100%',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                '&::-webkit-scrollbar': {
                                    width: '0.5rem',
                                    height: '0.5rem'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#eaeaea',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: '#f2f2f2',
                                },
                                ':hover': {
                                    overflowY: 'scroll',
                                },
                                
                            }}
                        >
                            <Box sx={{ p: '17.5px' }}>
                                <List sx={{ margin: '0 -0.8rem', display: 'flex', flexDirection: 'column' }}>
                                    {generate(
                                        <ListItem
                                            sx={{
                                                height: '50px',
                                                backgroundColor: 'red',
                                                borderRadius: '.5rem',
                                                marginBottom: '.25rem',
                                                ':hover': { backgroundColor: '#f2f2f2' },
                                                minWidth: 0,
                                            }}
                                        />,
                                    )}
                                </List>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MessangerPanel;
