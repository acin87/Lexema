import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, USER_PERSISTENT_STATE, User } from '../types/UserTypes';
import { loadState } from '../../../shared/utils/LocalStorage';
import { RootState } from '../../../app/store/store';
const initialState: UserState = loadState<UserState>(USER_PERSISTENT_STATE) || {
    data: {
        id: 0,
        username: '',
        first_name: '',
        last_name: '',
        avatar: '',
        is_staff: false,
        is_superuser: false,
        full_name: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.data = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.data;
export const selectUserId = (state: RootState) => state.user.data.id;
export const isAuthorizedUser = (state: RootState) => state.user.data.is_staff || state.user.data.is_superuser;
export const isAdminUser = (state: RootState) => state.user.data.is_superuser;
export default userSlice.reducer;


