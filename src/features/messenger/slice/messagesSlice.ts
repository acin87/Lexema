import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store/store';
import { Message } from '../types/MessengerTypes';
import { Friend } from '../../friends/types/FriendTypes';

interface MessagesState {
    messages: Message[] | undefined;
    dialogues: Message[] | undefined;
    dialoguesSortedType: 'all' | 'unread' | 'sender' | undefined;
    newDialogueUser: {
        friend_id: number;
        username: string;
        full_name: string | null;
        avatar: string;
    } 
}

const initialState: MessagesState = {
    messages: [],
    dialogues: [],
    dialoguesSortedType: 'all',
    newDialogueUser: {
        friend_id: 0,
        username: '',
        full_name: '',
        avatar: '',
 
    
    }
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<{ messages: Message[] | undefined }>) => {
            state.messages = action.payload.messages;
        },
        setDialogues: (state, action: PayloadAction<{ dialogues: Message[] | undefined }>) => {
            state.dialogues = action.payload.dialogues;
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        setDialoguesSortedType: (state, action: PayloadAction<'all' | 'unread' | 'sender'>) => {
            state.dialoguesSortedType = action.payload;
        },
        setNewDialogueUser: (state, action: PayloadAction<Friend>) => {
            state.newDialogueUser.friend_id = action.payload.friend_id;
            state.newDialogueUser.username = action.payload.username;
            state.newDialogueUser.full_name = action.payload.full_name;
            state.newDialogueUser.avatar = action.payload.avatar as string;
        }
    },
});

export const { setMessages, clearMessages, setDialogues, setDialoguesSortedType, setNewDialogueUser } = messagesSlice.actions;
export const selectMessages = (state: RootState) => state.messages.messages;
export const selectDialogues = (state: RootState) => state.messages.dialogues;
export const selectDialoguesSortedType = (state: RootState) => state.messages.dialoguesSortedType;
export const selectNewDialogueUser = (state: RootState) => state.messages.newDialogueUser;
export default messagesSlice.reducer;
