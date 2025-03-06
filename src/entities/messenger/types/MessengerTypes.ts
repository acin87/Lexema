import { User } from '../../user/types/User';

export type MessagesResponse = {
    totalCount: number;
    messages: Message[];
};

export type DialoguesResponse = {
    totalCount: number;
    dialogues: Dialogues[];
};

export type Dialogues = {
    id: string;
    user_1: Pick<User, 'id' | 'firstName' | 'lastName' | 'image'>;
    user_2: Pick<User, 'id' | 'firstName' | 'lastName' | 'image'>;
    lastMessage: string;
    createdAt: string;
};

export type Message = {
    dialogue_id: number;
    sender_id: number;
    message: string;
    is_read: boolean;
    sent_at: string;
}
