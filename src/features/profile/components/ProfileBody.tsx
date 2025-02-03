import { memo } from 'react';
import TabPanels from '../../../shared/components/TabPanels';

const ProfileBody = () => {
    const tabs = [
        {
            label: 'Стена',
            children: <div>Tab 1</div>,
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
