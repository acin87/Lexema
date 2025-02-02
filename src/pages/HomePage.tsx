import { CssBaseline, ThemeProvider } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../app/store/store';
import styles from '../shared/styles/Layout.module.css';
import { DarkTheme, LightTheme } from '../shared/styles/Theme';
import LeftSideBar from '../widgets/leftsidebar/LeftSideBar';
import Navbar from '../widgets/navbar/Navbar';
import RightSideBar from '../widgets/rightsidebar/RightSideBar';

const HomePage: FC = () => {
    const theme = useSelector((s: RootState) => s.ui.theme);
    const [darkOrLight, setDarkOrLight] = useState<string | null>('light');

    useEffect(() => {
        setDarkOrLight(theme);
    }, [theme]);

    return (
        <ThemeProvider theme={darkOrLight === 'dark' ? DarkTheme : LightTheme}>
            <CssBaseline enableColorScheme />
            <div className={styles.lsLayout}>
                <LeftSideBar />
                <Navbar />
                <RightSideBar />
                <div className={styles.contentPage}>
                    <div className={styles.container}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default HomePage;
