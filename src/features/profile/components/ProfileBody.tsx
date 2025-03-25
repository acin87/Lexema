import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import TabPanels from '../../../shared/components/tabPanels/TabPanels';
import ProfileWall from './ProfileWall';
interface ProfileBodyProps {
    id: number;
}

const ProfileBody = ({ id }: ProfileBodyProps) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');

    const tabs = [
        {
            label: 'Стена',
            children: <ProfileWall id={id} />,
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

    return <TabPanels tabs={tabs} indicatorColor="primary" activeTab={Number(tab)}></TabPanels>;
};
export default memo(ProfileBody);
