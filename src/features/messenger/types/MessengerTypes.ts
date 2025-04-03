import { User } from '../../../entities/user/types/UserTypes';

export type MessagesResponse = {
    count: number;
    previous: string;
    next: string;
    results: Message[];
};

export type Message = {
    id: number;
    sender: Pick<User, 'id' | 'full_name' | 'avatar'>;
    content?: string;
    short_content?: string;
    is_read: boolean;
    unread_count: number;
    timestamp: string;
};
