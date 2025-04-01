import { Avatar, AvatarGroup, Box, List, ListItem, SxProps, Typography } from '@mui/material';
import { cloneElement, FC, ReactElement } from 'react';
import useCustomScrollBar from '../../../shared/hooks/useCustomScrollBar';
import { useGetDialoguesQuery } from '../api/messengerApi';

const dialoguePanel: SxProps = {
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
    const { contentRef, listRef, scrollBar } = useCustomScrollBar();
    const { data: response, isLoading } = useGetDialoguesQuery({ id: 1 });

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
                component="main"
                sx={{
                    position: 'relative',
                    flex: 1,
                    overflow: 'hidden',
                    p: '1.25rem',
                    height: '100%',
                    '&:hover > div > .scrollbar-thumb': {
                        opacity: 0.8,
                        transition: 'opacity 0s linear',
                    },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        p: '17.5px',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden scroll',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                    ref={contentRef}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            component="span"
                            fontSize=".825rem"
                            color="primary.main"
                            fontWeight="500"
                            sx={{ mb: 1 }}
                        >
                            Частые контакты
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                mb: 1,
                            }}
                        >
                            <AvatarGroup max={5} spacing={1}>
                                <Avatar alt="Remy Sharp" src="/public/user/1.jpg" />
                                <Avatar alt="Travis Howard" src="/public/user/02.jpg" />
                                <Avatar alt="Cindy Baker" src="/public/user/03.jpg" />
                                <Avatar alt="Cindy Baker" src="/public/user/4.jpg" />
                                <Avatar alt="Cindy Baker" src="/public/user/05.jpg" />
                            </AvatarGroup>
                        </Box>
                    </Box>

                    <List sx={{ display: 'flex', flexDirection: 'column', margin: '0 -0.8rem' }} ref={listRef}>
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
                {scrollBar}
            </Box>
        </Box>
    );
};

export default MessangerPanel;
