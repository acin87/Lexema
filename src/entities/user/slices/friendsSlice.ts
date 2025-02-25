import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface FriendsState {
    friends: User[];
}

const initialState: FriendsState = {
    friends:[],
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState: initialState,
    reducers: {
        addFriends: (state, action: PayloadAction<User[]>) => {
            action.payload.forEach((friend) => {
                state.friends.push(friend);
            });
        },
        removeFriends: (state, action: PayloadAction<number>) => {
            state.friends = state.friends.filter((friend) => friend.id !== action.payload);
        },
    },
});

export const { addFriends, removeFriends } = friendsSlice.actions;
export default friendsSlice.reducer;