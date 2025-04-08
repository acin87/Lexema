import { FC, memo, useCallback, useState } from 'react';
import { saveState } from '../../../../shared/utils/LocalStorage';
import useMessages from '../../hooks/useMessages';
import { MESSANGER_STORAGE_KEY, MessengerState } from '../../types/MessengerTypes';
import ChatSideBar from './ChatSideBar';
import MessageList from './MessageList';

const ChatWidget: FC = () => {
    const [userId, setUserId] = useState<number>(0);
    const [avatar, setAvatar] = useState<string | undefined>('');
    const { dialogues } = useMessages();
    const handleLoadMessages = useCallback((user_id: number, avatar: string | undefined) => {
        setUserId(user_id);
        setAvatar(avatar);
        saveState<MessengerState>({ lastDialoguesSenderId: user_id, avatarUrl: avatar }, MESSANGER_STORAGE_KEY);
    }, []);

    return (
        <>
            <ChatSideBar dialogues={dialogues} onLoadMessages={handleLoadMessages} />
            <MessageList userId={userId} avatar={avatar} />
        </>
    );
};

export default memo(ChatWidget);
