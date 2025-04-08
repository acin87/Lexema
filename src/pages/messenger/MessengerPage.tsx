import { FC, memo } from 'react';
import ChatLayout from '../../features/messenger/ui/ChatLayout';

const MessengerPage: FC = () => {
    return <ChatLayout />;
};

export default memo(MessengerPage);
