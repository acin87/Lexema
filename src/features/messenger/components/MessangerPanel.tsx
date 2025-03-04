import { Box, CssThemeVariables, List, ListItem, Typography } from '@mui/material';
import { cloneElement, FC, ReactElement } from 'react';
import useCustomScrollBar from '../../../shared/hooks/useCustomScrollBar';

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
    const { contentRef, listRef, handleThumbMouseDown, scrollbarThumbRef } = useCustomScrollBar();

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
                    overflow: 'hidden',
                    p: '1.25rem',
                    
                    alignContent: 'flex-start',
                }}
                ref={contentRef}
            >
                <List sx={{ margin: '0 -0.8rem', display: 'flex', flexDirection: 'column' }} ref={listRef}>
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
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '12px',
                        height: '100%',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '6px',
                    }}
                >
                    <Box
                        ref={scrollbarThumbRef}
                        onMouseDown={handleThumbMouseDown}
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            backgroundColor: '#888',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default MessangerPanel;
