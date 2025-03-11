import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { loadState } from '../../../shared/utils/LocalStorage';
import { TokenResponse } from '../types/AuthTypes';

export interface AuthState {
    access: string | null;
    user_id: number | null;
    is_stuff: boolean | null;
    is_superuser: boolean | null;
}

export const AUTH_PERSISTENT_STATE = 'auth';

const initialState: AuthState = loadState<AuthState>(AUTH_PERSISTENT_STATE) || {
    access: null,
    user_id: null,
    is_stuff: null,
    is_superuser: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<TokenResponse>) => {
            const { user_id, is_stuff, is_superuser, access, refresh } = action.payload;
            state.access = access;
            state.user_id = user_id;
            state.is_stuff = is_stuff;
            state.is_superuser = is_superuser;
            console.log(action.payload.user_id);
            Cookies.set('refreshToken', refresh, { expires: 7 });
        },
        clearCredentials: (state) => {
            state.access = null;
            Cookies.remove('refreshToken');
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state: { auth: AuthState }) => state.auth.access;
export const getUserId = (state: { auth: AuthState }) => state.auth.user_id;
export const isStuff = (state: { auth: AuthState }) => state.auth.is_stuff;
export const isSuperuser = (state: { auth: AuthState }) => state.auth.is_superuser;
