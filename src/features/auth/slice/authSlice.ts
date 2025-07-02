import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { USER_PERSISTENT_STATE } from '../../../entities/user/types/UserTypes';
import { loadState } from '../../../shared/utils/LocalStorage';
import { TokenResponse } from '../types/AuthTypes';

export interface AuthState {
    access: string | null;
    isAuthorized: boolean;
}

export const AUTH_PERSISTENT_STATE = 'auth';

const initialState: AuthState = loadState<AuthState>(AUTH_PERSISTENT_STATE) || {
    access: null,
    isAuthorized: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<TokenResponse>) => {
            const { access, refresh } = action.payload;
            state.access = access;
            state.isAuthorized = true;
            Cookies.set('refreshToken', refresh, { expires: 7 });
        },
        clearCredentials: (state) => {
            state.access = null;
            state.isAuthorized = false;
            Cookies.remove('refreshToken');
        },
        logout: (state) => {
            state.access = null;
            state.isAuthorized = false;
            localStorage.removeItem(AUTH_PERSISTENT_STATE);
            localStorage.removeItem(USER_PERSISTENT_STATE);
            Cookies.remove('refreshToken');
        },
        setIsAutorized: (state, action: PayloadAction<boolean>) => {
            state.isAuthorized = action.payload;
        },
    },
});

export const { setCredentials, clearCredentials, logout, setIsAutorized } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state: { auth: AuthState }) => state.auth.access;
export const selectIsAuthorized = (state: { auth: AuthState }) => state.auth.isAuthorized;
