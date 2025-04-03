import { FC } from 'react';
import { useGetDialoguesQuery } from '../api/messengerApi';
import ChatSideBar from './ChatSideBar';
import MessageList from './MessageList';

const ChatWidget: FC = () => {
    const { data: response, isLoading } = useGetDialoguesQuery();
    return (
        <>
            <ChatSideBar messages={response?.results} count={response?.count} />
            <MessageList messages={response?.results} count={response?.count} />
        </>
    );
};

export default ChatWidget;
