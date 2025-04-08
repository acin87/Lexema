import { User } from '../../../entities/user/types/UserTypes';

export const MESSANGER_STORAGE_KEY = 'messenger';

export interface MessengerState {
    lastDialoguesSenderId: number;
    avatarUrl: string | undefined
}

export type MessagesResponse = {
    count: number;
    previous: string;
    next: string;
    results: Message[];
};

export type Message = {
    id: number;
    sender: Pick<User, 'id' | 'full_name' | 'avatar' | 'username'>;
    recipient: Pick<User, 'id' | 'full_name' | 'avatar' | 'username'>;
    content?: string;
    short_content?: string;
    is_read: boolean;
    unread_count: number;
    timestamp: string;
};
