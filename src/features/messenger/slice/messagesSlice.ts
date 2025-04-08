import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../types/MessengerTypes';

interface MessagesState {
    messages: Message[] | undefined;
}

const initialState: MessagesState = {
    messages: [],
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<{messages: Message[] | undefined}>) => {
            console.log(action.payload.messages);
            state.messages = action.payload.messages;
        },
        clearMessages: (state) => {
            state.messages = [];
        },
    },
});

export const { setMessages, clearMessages } = messagesSlice.actions;
export const selectMessages = (state: { messages: MessagesState }) => state.messages.messages;
export default messagesSlice.reducer;
