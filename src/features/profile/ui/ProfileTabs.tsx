import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CollectionsIcon from '@mui/icons-material/Collections';
import FeedIcon from '@mui/icons-material/Feed';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { selectUserId } from '../../../entities/user/slice/userSlice';
import TabPanels from '../../../shared/ui/tabPanels/TabPanels';
import EditProfileTab from './EditProfile';
import FriendList from './FriendList';
import MasonryGallery from './MasonryGallery';
import styles from './Profile.module.css';
import ProfileBody from './ProfileBody';
import SettingsForms from './SettingsForms';

const ProfileTabs: FC = () => {
    const userId = useSelector(selectUserId);
    const { id } = useParams();
    const isOwner = userId === Number(id);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');

    const tabs = [];

    const wall = {
        label: 'Стена',
        children: <ProfileBody />,
        icon: <FeedIcon />,
    };
    const editProfile = {
        label: 'Профиль',
        children: <EditProfileTab />,
        icon: <AccountBoxIcon />,
    };
    const gallery = {
        label: 'Галерея',
        children: <MasonryGallery />,
        icon: <CollectionsIcon />,
    };
    const settings = {
        label: 'Настройки',
        children: <SettingsForms />,
        icon: <SettingsIcon />,
    };
    const friends = {
        label: 'Друзья',
        children: <FriendList />,
        icon: <PeopleIcon />,
    };

    if (isOwner) {
        tabs.push(wall, editProfile, gallery, settings);
    } else {
        tabs.push(wall, friends, gallery);
    }

    return (
        <div className={styles.profileBody}>
            <TabPanels tabs={tabs} indicatorColor="primary" activeTab={Number(tab)}></TabPanels>
        </div>
    );
};

export default ProfileTabs;
