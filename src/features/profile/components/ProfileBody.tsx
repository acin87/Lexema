import { memo } from 'react';
import TabPanels from '../../../shared/components/tabPanels/TabPanels';
import ProfileWall from './ProfileWall';

interface ProfileBodyProps {
    id: number;
}

const ProfileBody = ({ id }: ProfileBodyProps) => {
    const tabs = [
        {
            label: 'Стена',
            children: <ProfileWall id={id} />,
        },
        {
            label: 'Друзья',
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

    return <TabPanels tabs={tabs} indicatorColor="primary"></TabPanels>;
};
export default memo(ProfileBody);
