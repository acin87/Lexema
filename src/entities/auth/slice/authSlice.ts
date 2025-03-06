import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
    accessToken: string | null;
}

const initialState: AuthState = {
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken;

            Cookies.set('refreshToken', refreshToken, { expires: 7 });
        },
        clearCredentials: (state) => {
            state.accessToken = null;
            Cookies.remove('refreshToken');
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
