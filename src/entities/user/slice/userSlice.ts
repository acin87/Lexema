import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store/store';
import { loadState, saveState } from '../../../shared/utils/LocalStorage';
import { User, USER_PERSISTENT_STATE, UserState } from '../types/UserTypes';
const initialState: UserState = loadState<UserState>(USER_PERSISTENT_STATE) || {
    data: {
        id: 0,
        username: '',
        first_name: '',
        last_name: '',
        profile_image: '',
        avatar: '',
        is_staff: false,
        is_superuser: false,
        full_name: '',
        last_login: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.data = action.payload;
            saveState<UserState>(state, USER_PERSISTENT_STATE);
        },
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.data;
export const selectUserId = (state: RootState) => state.user.data.id;
export const isAuthorizedUser = (state: RootState) => state.user.data.is_staff || state.user.data.is_superuser;
export const isAdminUser = (state: RootState) => state.user.data.is_superuser;
export default userSlice.reducer;
