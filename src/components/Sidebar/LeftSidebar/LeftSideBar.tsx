import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { IconButton } from '@mui/material';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { useToggle } from '../../../hooks/useToggle';
import Menu from '../../Menu/Menu';
import styles from './LeftSideBar.module.css';

/**
 * Тип для скрытия левой панели
 */
export type LeftSideBarProps = {
    hidden: boolean;
};

const LeftSideBar: FC = memo(() => {
    const [isVisible, toggleVisible] = useToggle(false);

    //TODO: Переписать поведение sidebar
    const handleCollapse = () => {
        toggleVisible();
    };

    const handleMouseEnter = () => {};
    const handleMouseOut = () => {};

    return (
        <div
            className={styles.left_sidebar}
            style={{ width: isVisible ? '72px' : '' }}
            onMouseEnter={handleMouseEnter}
            onMouseOut={handleMouseOut}
        >
            <div className={styles.sidebar_header}>
                <div className={styles.head_icon_wrap}>
                    <Link to={'/'}>
                        <img src="src/assets/icons/favicon.png" alt="Lexema" className={styles.site_icon} />
                    </Link>
                    <span className={styles.site_title} hidden={isVisible}>
                        Lexema
                    </span>
                </div>
                <IconButton onClick={handleCollapse} style={{ visibility: isVisible ? 'hidden' : 'visible' }}>
                    {isVisible ? (
                        <ArrowForwardOutlinedIcon className={styles.Icon_btn} />
                    ) : (
                        <ArrowBackOutlinedIcon className={styles.Icon_btn} />
                    )}
                </IconButton>
            </div>
            <Menu hidden={isVisible} />
        </div>
    );
});
export default LeftSideBar;
