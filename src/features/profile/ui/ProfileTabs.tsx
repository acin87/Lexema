import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import TabPanels from '../../../shared/ui/tabPanels/TabPanels';
import styles from './Profile.module.css';
import ProfileBody from './ProfileBody';

const ProfileTabs: FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    const tabs = [
        {
            label: 'Стена',
            children: <ProfileBody/>,
        },
        {
            label: 'Профиль',
            children: <div>Tab 2</div>,
        },
        {
            label: 'Галерея',
            children: <div>Tab 3</div>,
        },
        {
            label: 'Настройки',
            children: <div>Tab 4</div>,
        },
    ];

    return (
        <div className={styles.profileBody}>
            <TabPanels tabs={tabs} indicatorColor="primary" activeTab={Number(tab)}></TabPanels>
        </div>
    );
};

export default memo(ProfileTabs);
