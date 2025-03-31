import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { USER_PERSISTENT_STATE } from '../../../entities/user/types/UserTypes';
import { loadState } from '../../../shared/utils/LocalStorage';
import { TokenResponse } from '../types/AuthTypes';

export interface AuthState {
    access: string | null;
}

export const AUTH_PERSISTENT_STATE = 'auth';

const initialState: AuthState = loadState<AuthState>(AUTH_PERSISTENT_STATE) || {
    access: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<TokenResponse>) => {
            const { access, refresh } = action.payload;
            state.access = access;
            Cookies.set('refreshToken', refresh, { expires: 7 });
        },
        clearCredentials: (state) => {
            state.access = null;
            Cookies.remove('refreshToken');
        },
        logout: (state) => {
            state.access = null;
            localStorage.removeItem(AUTH_PERSISTENT_STATE);
            localStorage.removeItem(USER_PERSISTENT_STATE);
            Cookies.remove('refreshToken');
        },
    },
});

export const { setCredentials, clearCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state: { auth: AuthState }) => state.auth.access;
