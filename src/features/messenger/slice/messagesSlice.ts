import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store/store';
import { Message } from '../types/MessengerTypes';

interface MessagesState {
    messages: Message[] | undefined;
    dialogues: Message[] | undefined;
    dialoguesSortedType: 'all' | 'unread' | 'sender' | undefined;
}

const initialState: MessagesState = {
    messages: [],
    dialogues: [],
    dialoguesSortedType: 'all',
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
    },
});

export const { setMessages, clearMessages, setDialogues, setDialoguesSortedType } = messagesSlice.actions;
export const selectMessages = (state: RootState) => state.messages.messages;
export const selectDialogues = (state: RootState) => state.messages.dialogues;
export const selectDialoguesSortedType = (state: RootState) => state.messages.dialoguesSortedType;
export default messagesSlice.reducer;
